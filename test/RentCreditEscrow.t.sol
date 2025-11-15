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
    RentCreditEscrow escrow;
    ReputationSBT reputation;
    RiskBufferVault vault;
    MockUSDC usdc;
    MockUSDC eurc; // Add EURC mock
    
    address alice = makeAddr("alice");
    address bob = makeAddr("bob");
    address charlie = makeAddr("charlie");
    address admin = makeAddr("admin");
    
    uint256 constant DEPOSIT_AMOUNT = 2000e6; // $2000
    uint256 constant RENT_AMOUNT = 1000e6;    // $1000
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
        escrow = new RentCreditEscrow(address(usdc), address(eurc), address(reputation), address(vault));
        
        // Setup permissions
        reputation.grantEscrowManager(address(escrow));
        vault.grantEscrowManager(address(escrow));
        
        // Mint USDC to users
        usdc.mint(alice, 10000e6);
        usdc.mint(bob, 10000e6);
        usdc.mint(charlie, 10000e6);
        
        vm.stopPrank();
        
        // Users approve escrow to spend their USDC
        vm.prank(alice);
        usdc.approve(address(escrow), type(uint256).max);
        
        vm.prank(bob);
        usdc.approve(address(escrow), type(uint256).max);
        
        vm.prank(charlie);
        usdc.approve(address(escrow), type(uint256).max);
    }
    
    function test_CreateEscrow_Success() public {
        vm.startPrank(alice);
        
        RentCreditEscrow.AutomationConditions memory conditions = RentCreditEscrow.AutomationConditions({
            requiresPhysicalInspection: false,
            requiresTenantConfirmation: true,
            requiresPropertyDamageCheck: true,
            maxDamageThreshold: 500e6,
            gracePeriodDays: 7
        });
        
        bytes32 propertyHash = keccak256("123 Main St");
        
        vm.expectEmit(true, true, true, true);
        emit EscrowCreated(1, alice, bob, DEPOSIT_AMOUNT, RENT_AMOUNT);
        
        uint256 escrowId = escrow.createEscrow(
            bob,
            DEPOSIT_AMOUNT,
            RENT_AMOUNT,
            RENTAL_DURATION,
            propertyHash,
            conditions,
            0,
            address(usdc) // Add token parameter
        );
        
        assertEq(escrowId, 1);
        
        // Check escrow data
        RentCreditEscrow.Escrow memory escrowData = escrow.getEscrow(escrowId);
        assertEq(escrowData.tenant, alice);
        assertEq(escrowData.landlord, bob);
        assertEq(escrowData.depositAmount, DEPOSIT_AMOUNT);
        assertEq(escrowData.rentAmount, RENT_AMOUNT);
        assertEq(uint(escrowData.status), uint(RentCreditEscrow.EscrowStatus.Active));
        
        // Check USDC transfer
        assertEq(usdc.balanceOf(address(escrow)), DEPOSIT_AMOUNT + RENT_AMOUNT);
        assertEq(usdc.balanceOf(alice), 10000e6 - DEPOSIT_AMOUNT - RENT_AMOUNT);
        
        vm.stopPrank();
    }
    
    function test_CreateEscrow_InvalidLandlord() public {
        vm.startPrank(alice);
        
        RentCreditEscrow.AutomationConditions memory conditions;
        
        vm.expectRevert("Invalid landlord");
        escrow.createEscrow(
            alice, // Same as tenant
            DEPOSIT_AMOUNT,
            RENT_AMOUNT,
            RENTAL_DURATION,
            keccak256("123 Main St"),
            conditions,
            0,
            address(usdc)
        );
        
        vm.expectRevert("Invalid landlord");
        escrow.createEscrow(
            address(0), // Zero address
            DEPOSIT_AMOUNT,
            RENT_AMOUNT,
            RENTAL_DURATION,
            keccak256("123 Main St"),
            conditions,
            0,
            address(usdc)
        );
        
        vm.stopPrank();
    }
    
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
        assertEq(uint(escrowData.status), uint(RentCreditEscrow.EscrowStatus.TenantReleased));
        
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
        assertEq(uint(escrowData.status), uint(RentCreditEscrow.EscrowStatus.LandlordReleased));
        
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
        escrow.releaseDeposit(escrowId, damageAmount, "Carpet cleaning required");
        
        // Check damage amount went to landlord
        uint256 expectedLandlordBalance = 10000e6 + RENT_AMOUNT + damageAmount;
        assertEq(usdc.balanceOf(bob), expectedLandlordBalance);
        
        // Check remaining deposit went to tenant
        uint256 remainingDeposit = DEPOSIT_AMOUNT - damageAmount;
        uint256 platformFee = (RENT_AMOUNT * escrow.platformFeeRate()) / 10000;
        assertEq(usdc.balanceOf(alice), 10000e6 - RENT_AMOUNT - platformFee - damageAmount);
        
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
        assertEq(uint(dispute.outcome), uint(RentCreditEscrow.DisputeOutcome.Pending));
        
        // Check escrow status
        RentCreditEscrow.Escrow memory escrowData = escrow.getEscrow(escrowId);
        assertEq(uint(escrowData.status), uint(RentCreditEscrow.EscrowStatus.Disputed));
        
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
        assertEq(uint(dispute.outcome), uint(RentCreditEscrow.DisputeOutcome.TenantFavor));
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
        uint256 escrowId = _createTestEscrow();
        
        vm.startPrank(admin);
        
        // Admin emergency cancels
        escrow.emergencyCancel(escrowId);
        
        // Check status
        RentCreditEscrow.Escrow memory escrowData = escrow.getEscrow(escrowId);
        assertEq(uint(escrowData.status), uint(RentCreditEscrow.EscrowStatus.Cancelled));
        
        // Check full refund to tenant
        assertEq(usdc.balanceOf(alice), 10000e6);
        
        vm.stopPrank();
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
        assertTrue(bobScore > 500);   // Above neutral
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
        
        RentCreditEscrow.AutomationConditions memory conditions = RentCreditEscrow.AutomationConditions({
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
