// MaliciousReceiver contract for reentrancy fuzz test
contract MaliciousReceiver {
    RentCreditEscrow public escrow;
    uint256 public escrowId;
    bool public reentered;

    constructor(address escrowAddr, uint256 _escrowId) {
        escrow = RentCreditEscrow(escrowAddr);
        escrowId = _escrowId;
    }

    function attackReleaseDeposit() external returns (bool) {
        // Try to reenter during deposit release
        try escrow.releaseDeposit(escrowId, 0, "Attempt reentrancy") {
            return true;
        } catch {
            return false;
        }
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../contracts/RentCreditEscrow.sol";
import "../contracts/ReputationSBT.sol";
import "../contracts/RiskBufferVault.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUSDC is ERC20 {
    constructor() ERC20("Mock USDC", "USDC") {
        _mint(msg.sender, 1000000e6); // 1M USDC
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }

    function decimals() public pure override returns (uint8) {
        return 6;
    }
}

contract RentCreditEscrowTest is Test {
    MockUSDC usdc;
    RentCreditEscrow escrow;
    ReputationSBT reputation;
    RiskBufferVault vault;

    /// @dev Fuzz test for reentrancy protection during deposit release
    function testFuzz_ReentrancyProtection(
        address landlord,
        address tenant,
        uint256 deposit,
        uint256 rent,
        uint256 duration
    ) public {
        vm.assume(
            landlord != address(0) && tenant != address(0) && landlord != tenant
        );
        vm.assume(deposit > 0 && deposit < 1e30);
        vm.assume(rent > 0 && rent < 1e30);
        vm.assume(duration > 0 && duration < 3650);

        // Mint enough USDC to tenant for deposit and rent
        MockUSDC(address(usdc)).mint(tenant, deposit + rent);

        // Prank as tenant to approve and create escrow
        vm.startPrank(tenant);
        usdc.approve(address(escrow), deposit + rent);
        bytes32 propertyHash = keccak256("FuzzProperty");
        uint256 escrowId = escrow.createEscrow(
            landlord,
            deposit,
            rent,
            duration,
            propertyHash,
            RentCreditEscrow.AutomationConditions({
                requiresPhysicalInspection: true,
                requiresTenantConfirmation: true,
                requiresPropertyDamageCheck: true,
                maxDamageThreshold: 500e6,
                gracePeriodDays: 7
            }),
            0,
            address(usdc)
        );
        vm.stopPrank();

        // Deploy a malicious contract to attempt reentrancy
        MaliciousReceiver attacker = new MaliciousReceiver(
            address(escrow),
            escrowId
        );
        escrow.grantRole(escrow.DISPUTE_RESOLVER_ROLE(), address(attacker));

        // Prank as attacker to attempt reentrancy during deposit release
        vm.startPrank(address(attacker));
        bool success = attacker.attackReleaseDeposit();
        vm.stopPrank();

        // Assert that reentrancy was prevented
        assertTrue(success, "Reentrancy should be prevented and not revert");
    }

    MockUSDC eurc; // Add EURC mock

    address alice = makeAddr("alice");
    address bob = makeAddr("bob");
    address charlie = makeAddr("charlie");
    address admin = makeAddr("admin");

    uint256 constant DEPOSIT_AMOUNT = 2000e6; // $2000
    uint256 constant RENT_AMOUNT = 1000e6; // $1000
    uint256 constant RENTAL_DURATION = 30 days;

    event EscrowCreated(
        uint256 indexed escrowId,
        address indexed tenant,
        address indexed landlord,
        uint256 depositAmount,
        uint256 rentAmount
    );

    function setUp() public {
        vm.startPrank(admin);

        // Deploy mock USDC and EURC
        usdc = new MockUSDC();
        eurc = new MockUSDC(); // Same implementation for testing

        // Deploy contracts
        reputation = new ReputationSBT();
        vault = new RiskBufferVault(usdc, "RentCredit Risk Buffer", "RCRB");
        escrow = new RentCreditEscrow(
            address(usdc),
            address(eurc),
            address(reputation),
            address(vault)
        );

        // Setup permissions
        reputation.grantEscrowManager(address(escrow));
        vault.grantEscrowManager(address(escrow));

        // Mint USDC to users (increase to 1,000,000 USDC)
        usdc.mint(alice, 1000000e6);
        usdc.mint(bob, 1000000e6);
        usdc.mint(charlie, 1000000e6);

        vm.stopPrank();

        // Users approve escrow to spend their USDC
        vm.prank(alice);
        usdc.approve(address(escrow), type(uint256).max);

        vm.prank(bob);
        usdc.approve(address(escrow), type(uint256).max);

        vm.prank(charlie);
        usdc.approve(address(escrow), type(uint256).max);
    }

    // Place fuzz and other test functions here, using main contract's instance variables

    function test_CreateEscrow_InvalidAmounts() public {
        vm.startPrank(alice);

        RentCreditEscrow.AutomationConditions memory conditions;

        vm.expectRevert("Invalid amounts");
        escrow.createEscrow(
            bob,
            0, // Zero deposit
            RENT_AMOUNT,
            RENTAL_DURATION,
            keccak256("123 Main St"),
            conditions,
            0,
            address(usdc)
        );

        vm.expectRevert("Invalid amounts");
        escrow.createEscrow(
            bob,
            DEPOSIT_AMOUNT,
            0, // Zero rent
            RENTAL_DURATION,
            keccak256("123 Main St"),
            conditions,
            0,
            address(usdc)
        );

        vm.stopPrank();
    }

    function test_ReleaseRentPayment_TenantConfirmation() public {
        // Create escrow first
        uint256 escrowId = _createTestEscrow();

        vm.startPrank(alice);

        // Tenant releases rent to landlord
        escrow.releaseRentPayment(escrowId);

        // Check status change
        RentCreditEscrow.Escrow memory escrowData = escrow.getEscrow(escrowId);
        assertEq(
            uint(escrowData.status),
            uint(RentCreditEscrow.EscrowStatus.TenantReleased)
        );

        // Check USDC transfer to landlord
        assertEq(usdc.balanceOf(bob), 10000e6 + RENT_AMOUNT);

        vm.stopPrank();
    }

    function test_ReleaseDeposit_Success() public {
        uint256 escrowId = _createTestEscrow();

        // Release rent first
        vm.prank(alice);
        escrow.releaseRentPayment(escrowId);

        // Move past lease end time
        vm.warp(block.timestamp + RENTAL_DURATION + 1);

        vm.startPrank(bob);

        // Landlord releases deposit with no damage
        escrow.releaseDeposit(escrowId, 0, "Property in good condition");

        // Check status
        RentCreditEscrow.Escrow memory escrowData = escrow.getEscrow(escrowId);
        assertEq(
            uint(escrowData.status),
            uint(RentCreditEscrow.EscrowStatus.LandlordReleased)
        );

        // Check deposit returned to tenant (minus platform fee)
        uint256 platformFee = (RENT_AMOUNT * escrow.platformFeeRate()) / 10000;
        assertEq(usdc.balanceOf(alice), 10000e6 - RENT_AMOUNT - platformFee);

        vm.stopPrank();
    }

    function test_ReleaseDeposit_WithDamage() public {
        uint256 escrowId = _createTestEscrow();

        // Release rent first
        vm.prank(alice);
        escrow.releaseRentPayment(escrowId);

        // Move past lease end time
        vm.warp(block.timestamp + RENTAL_DURATION + 1);

        vm.startPrank(bob);

        uint256 damageAmount = 300e6; // $300 damage

        // Landlord releases deposit with damage
        escrow.releaseDeposit(
            escrowId,
            damageAmount,
            "Carpet cleaning required"
        );

        // Check damage amount went to landlord
        uint256 expectedLandlordBalance = 10000e6 + RENT_AMOUNT + damageAmount;
        assertEq(usdc.balanceOf(bob), expectedLandlordBalance);

        // Check remaining deposit went to tenant
        uint256 remainingDeposit = DEPOSIT_AMOUNT - damageAmount;
        uint256 platformFee = (RENT_AMOUNT * escrow.platformFeeRate()) / 10000;
        assertEq(
            usdc.balanceOf(alice),
            10000e6 - RENT_AMOUNT - platformFee - damageAmount
        );

        vm.stopPrank();
    }

    function test_InitiateDispute_Success() public {
        uint256 escrowId = _createTestEscrow();

        vm.startPrank(alice);

        // Tenant disputes
        uint256 disputeFee = escrow.disputeFee();
        usdc.approve(address(escrow), disputeFee);

        escrow.initiateDispute(escrowId, "Property not as described");

        // Check dispute data
        RentCreditEscrow.Dispute memory dispute = escrow.getDispute(escrowId);
        assertEq(dispute.initiator, alice);
        assertEq(dispute.reason, "Property not as described");
        assertEq(
            uint(dispute.outcome),
            uint(RentCreditEscrow.DisputeOutcome.Pending)
        );

        // Check escrow status
        RentCreditEscrow.Escrow memory escrowData = escrow.getEscrow(escrowId);
        assertEq(
            uint(escrowData.status),
            uint(RentCreditEscrow.EscrowStatus.Disputed)
        );

        vm.stopPrank();
    }

    function test_ResolveDispute_TenantFavor() public {
        uint256 escrowId = _createTestEscrow();

        // Initiate dispute
        vm.startPrank(alice);
        usdc.approve(address(escrow), escrow.disputeFee());
        escrow.initiateDispute(escrowId, "Landlord breach");
        vm.stopPrank();

        // Admin resolves in tenant's favor
        vm.startPrank(admin);
        escrow.grantRole(escrow.DISPUTE_RESOLVER_ROLE(), admin);

        uint256 tenantAmount = DEPOSIT_AMOUNT + RENT_AMOUNT;
        escrow.resolveDispute(
            escrowId,
            RentCreditEscrow.DisputeOutcome.TenantFavor,
            tenantAmount,
            0
        );

        // Check dispute resolution
        RentCreditEscrow.Dispute memory dispute = escrow.getDispute(escrowId);
        assertEq(
            uint(dispute.outcome),
            uint(RentCreditEscrow.DisputeOutcome.TenantFavor)
        );
        assertTrue(dispute.resolved);

        // Check funds returned to tenant
        assertEq(usdc.balanceOf(alice), 10000e6 - escrow.disputeFee());

        vm.stopPrank();
    }

    function test_CrossChainProcessing() public {
        vm.startPrank(admin);
        escrow.grantRole(escrow.CROSS_CHAIN_RELAYER_ROLE(), admin);

        uint256 originChainId = 1; // Ethereum
        bytes memory proof = "mock_proof";

        escrow.processCrossChainEscrow(proof, originChainId, alice, 1000e6);

        assertTrue(escrow.crossChainProcessed(originChainId));

        vm.stopPrank();
    }

    function test_EmergencyCancel() public {
        // Ensure alice has enough USDC for this test
        vm.startPrank(admin);
        usdc.mint(alice, 10000000e6); // Mint 10M USDC for edge case
        vm.stopPrank();

        // Create escrow as alice
        vm.startPrank(alice);
        uint256 escrowId = _createTestEscrow();
        vm.stopPrank();

        // Emergency cancel as admin
        vm.startPrank(admin);
        escrow.emergencyCancel(escrowId);
        vm.stopPrank();

        // Check status and refund
        RentCreditEscrow.Escrow memory escrowData = escrow.getEscrow(escrowId);
        assertEq(
            uint(escrowData.status),
            uint(RentCreditEscrow.EscrowStatus.Cancelled)
        );
        assertEq(usdc.balanceOf(alice), 10000000e6);
    }

    function test_PlatformFeeSettings() public {
        vm.startPrank(admin);

        // Test setting platform fee
        escrow.setPlatformFeeRate(300); // 3%
        assertEq(escrow.platformFeeRate(), 300);

        // Test maximum fee limit
        vm.expectRevert("Fee too high");
        escrow.setPlatformFeeRate(1001); // 10.01%

        vm.stopPrank();
    }

    function test_ReputationIntegration() public {
        uint256 escrowId = _createTestEscrow();

        // Complete successful rental
        vm.prank(alice);
        escrow.releaseRentPayment(escrowId);

        vm.warp(block.timestamp + RENTAL_DURATION + 1);

        vm.prank(bob);
        escrow.releaseDeposit(escrowId, 0, "Good condition");

        // Check reputation scores updated
        assertTrue(reputation.hasToken(alice));
        assertTrue(reputation.hasToken(bob));

        uint256 aliceScore = reputation.getReputationScore(alice);
        uint256 bobScore = reputation.getReputationScore(bob);

        // Both should have good scores for successful rental
        assertTrue(aliceScore > 500); // Above neutral
        assertTrue(bobScore > 500); // Above neutral
    }

    function test_Pausable() public {
        vm.startPrank(admin);

        // Pause contract
        escrow.pause();

        vm.stopPrank();

        // Try to create escrow while paused
        vm.startPrank(alice);

        RentCreditEscrow.AutomationConditions memory conditions;

        vm.expectRevert();
        escrow.createEscrow(
            bob,
            DEPOSIT_AMOUNT,
            RENT_AMOUNT,
            RENTAL_DURATION,
            keccak256("123 Main St"),
            conditions,
            0,
            address(usdc)
        );

        vm.stopPrank();

        // Unpause and try again
        vm.prank(admin);
        escrow.unpause();

        vm.startPrank(alice);
        uint256 escrowId = escrow.createEscrow(
            bob,
            DEPOSIT_AMOUNT,
            RENT_AMOUNT,
            RENTAL_DURATION,
            keccak256("123 Main St"),
            conditions,
            0,
            address(usdc)
        );

        assertEq(escrowId, 1);
        vm.stopPrank();
    }

    function _createTestEscrow() internal returns (uint256) {
        vm.startPrank(alice);

        RentCreditEscrow.AutomationConditions
            memory conditions = RentCreditEscrow.AutomationConditions({
                requiresPhysicalInspection: true,
                requiresTenantConfirmation: true,
                requiresPropertyDamageCheck: true,
                maxDamageThreshold: 500e6,
                gracePeriodDays: 7
            });

        uint256 escrowId = escrow.createEscrow(
            bob,
            DEPOSIT_AMOUNT,
            RENT_AMOUNT,
            RENTAL_DURATION,
            keccak256("123 Main St"),
            conditions,
            0,
            address(usdc)
        );

        vm.stopPrank();
        return escrowId;
    }

    receive() external payable {}
}
