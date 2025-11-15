// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/extensions/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface IReputationSBT {
    function updateRentalHistory(address user, IERC20 currency, uint256 amount, bool successful) external;
    function getReputationScore(address user) external view returns (uint256);
}

interface IMultiCurrencyRiskVault {
    function lockBuffer(uint256 escrowId, IERC20 currency, uint256 amount, uint256 duration, address escrowAddress) external returns (uint256 lockId);
    function releaseBuffer(uint256 lockId) external;
    function claimBuffer(uint256 lockId, address recipient, uint256 amount) external;
}

/**
 * @title MultiCurrencyRentEscrow
 * @dev Advanced programmable escrow system supporting both USDC and EURC
 * 
 * This addresses Challenge 1: Multi-Currency Support by allowing tenants to 
 * pay deposits in either USDC or EURC while maintaining unified escrow logic
 */
contract MultiCurrencyRentEscrow is AccessControlEnumerable, Pausable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    bytes32 public constant DISPUTE_RESOLVER_ROLE = keccak256("DISPUTE_RESOLVER_ROLE");

    // Supported currencies
    IERC20 public immutable USDC;
    IERC20 public immutable EURC;
    IReputationSBT public reputation;
    IMultiCurrencyRiskVault public riskBufferVault;

    enum EscrowStatus {
        Active,
        TenantReleased,
        LandlordReleased,
        Disputed,
        Resolved,
        Cancelled
    }

    enum DisputeOutcome {
        Pending,
        TenantFavor,
        LandlordFavor,
        Split
    }

    struct EscrowDetails {
        address tenant;
        address landlord;
        IERC20 currency;          // USDC or EURC
        uint256 depositAmount;
        uint256 monthlyRent;
        uint256 damageThreshold;
        uint256 startTime;
        uint256 endTime;
        uint256 nextRentDue;
        EscrowStatus status;
        bool autoRelease;
        bool requireInspection;
        bool requireTenantConfirmation;
        string propertyDetails;   // IPFS hash or property identifier
        uint256 riskBufferLockId; // Lock ID in the risk buffer vault
    }

    struct DisputeDetails {
        uint256 escrowId;
        address initiator;
        string reason;
        uint256 claimedAmount;
        IERC20 currency;
        uint256 timestamp;
        DisputeOutcome outcome;
        bool resolved;
        string evidenceHash;      // IPFS hash for evidence
    }

    struct AutomationConfig {
        bool enableAutoRentRelease;
        bool enableAutoDepositReturn;
        uint256 gracePeriod;      // Grace period for rent payments
        uint256 inspectionPeriod; // Time allowed for final inspection
    }

    mapping(uint256 => EscrowDetails) public escrows;
    mapping(uint256 => DisputeDetails) public disputes;
    mapping(uint256 => AutomationConfig) public automationConfig;
    mapping(address => uint256[]) public tenantEscrows;
    mapping(address => uint256[]) public landlordEscrows;

    uint256 public nextEscrowId = 1;
    uint256 public nextDisputeId = 1;

    // Exchange rate oracle (simplified - in production use Chainlink)
    // This helps convert between USDC and EURC values for comparison
    uint256 public usdcToEurcRate = 92e16; // 0.92 EURC per USDC (example rate)

    // Events
    event EscrowCreated(
        uint256 indexed escrowId,
        address indexed tenant,
        address indexed landlord,
        IERC20 currency,
        uint256 depositAmount,
        uint256 monthlyRent
    );
    
    event RentReleased(uint256 indexed escrowId, uint256 amount, IERC20 currency);
    event DepositReturned(uint256 indexed escrowId, uint256 amount, IERC20 currency);
    event DisputeCreated(uint256 indexed disputeId, uint256 indexed escrowId, address indexed initiator);
    event DisputeResolved(uint256 indexed disputeId, DisputeOutcome outcome, uint256 tenantAmount, uint256 landlordAmount);
    event ExchangeRateUpdated(uint256 newRate);

    constructor(
        address _usdc,
        address _eurc,
        address _reputation,
        address _riskBufferVault
    ) {
        require(_usdc != address(0) && _eurc != address(0), "Invalid currency addresses");
        require(_reputation != address(0) && _riskBufferVault != address(0), "Invalid contract addresses");

        USDC = IERC20(_usdc);
        EURC = IERC20(_eurc);
        reputation = IReputationSBT(_reputation);
        riskBufferVault = IMultiCurrencyRiskVault(_riskBufferVault);

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(DISPUTE_RESOLVER_ROLE, msg.sender);
    }

    /**
     * @dev Create a new rental escrow with either USDC or EURC
     * @param landlord Address of the landlord
     * @param currency The currency for this escrow (USDC or EURC)
     * @param depositAmount Security deposit amount
     * @param monthlyRent Monthly rent amount
     * @param damageThreshold Threshold for automatic damage deduction
     * @param leaseDuration Duration of the lease in seconds
     * @param autoRelease Whether to enable automatic rent releases
     * @param requireInspection Whether final inspection is required
     * @param propertyDetails IPFS hash or property identifier
     */
    function createEscrow(
        address landlord,
        IERC20 currency,
        uint256 depositAmount,
        uint256 monthlyRent,
        uint256 damageThreshold,
        uint256 leaseDuration,
        bool autoRelease,
        bool requireInspection,
        string calldata propertyDetails
    ) external whenNotPaused nonReentrant returns (uint256 escrowId) {
        require(landlord != address(0) && landlord != msg.sender, "Invalid landlord");
        require(isSupportedCurrency(currency), "Unsupported currency");
        require(depositAmount > 0 && monthlyRent > 0, "Invalid amounts");
        require(leaseDuration > 0, "Invalid duration");

        escrowId = nextEscrowId++;

        // Transfer deposit to contract
        currency.safeTransferFrom(msg.sender, address(this), depositAmount);

        // Lock risk buffer
        uint256 riskBufferAmount = calculateRiskBuffer(depositAmount);
        uint256 lockId = riskBufferVault.lockBuffer(
            escrowId,
            currency,
            riskBufferAmount,
            leaseDuration,
            address(this)
        );

        // Create escrow
        escrows[escrowId] = EscrowDetails({
            tenant: msg.sender,
            landlord: landlord,
            currency: currency,
            depositAmount: depositAmount,
            monthlyRent: monthlyRent,
            damageThreshold: damageThreshold,
            startTime: block.timestamp,
            endTime: block.timestamp + leaseDuration,
            nextRentDue: block.timestamp + 30 days,
            status: EscrowStatus.Active,
            autoRelease: autoRelease,
            requireInspection: requireInspection,
            requireTenantConfirmation: true,
            propertyDetails: propertyDetails,
            riskBufferLockId: lockId
        });

        // Set automation config
        automationConfig[escrowId] = AutomationConfig({
            enableAutoRentRelease: autoRelease,
            enableAutoDepositReturn: !requireInspection,
            gracePeriod: 3 days,
            inspectionPeriod: 7 days
        });

        // Track escrows for users
        tenantEscrows[msg.sender].push(escrowId);
        landlordEscrows[landlord].push(escrowId);

        emit EscrowCreated(escrowId, msg.sender, landlord, currency, depositAmount, monthlyRent);
    }

    /**
     * @dev Release monthly rent to landlord
     * @param escrowId The escrow ID
     */
    function releaseRent(uint256 escrowId) external whenNotPaused nonReentrant {
        EscrowDetails storage escrow = escrows[escrowId];
        require(escrow.status == EscrowStatus.Active, "Escrow not active");
        require(
            msg.sender == escrow.landlord || 
            msg.sender == escrow.tenant || 
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "Not authorized"
        );
        require(block.timestamp >= escrow.nextRentDue, "Rent not due yet");

        // Transfer rent to landlord
        escrow.currency.safeTransfer(escrow.landlord, escrow.monthlyRent);

        // Update next rent due date
        escrow.nextRentDue += 30 days;

        // Update reputation for on-time payment
        reputation.updateRentalHistory(escrow.tenant, escrow.currency, escrow.monthlyRent, true);

        emit RentReleased(escrowId, escrow.monthlyRent, escrow.currency);
    }

    /**
     * @dev Return security deposit to tenant (at lease end)
     * @param escrowId The escrow ID
     * @param damageAmount Amount to deduct for damages
     */
    function returnDeposit(
        uint256 escrowId,
        uint256 damageAmount
    ) external whenNotPaused nonReentrant {
        EscrowDetails storage escrow = escrows[escrowId];
        require(escrow.status == EscrowStatus.Active, "Escrow not active");
        require(msg.sender == escrow.landlord, "Only landlord can return deposit");
        require(block.timestamp >= escrow.endTime, "Lease not ended");
        require(damageAmount <= escrow.damageThreshold, "Damage amount too high");

        uint256 returnAmount = escrow.depositAmount - damageAmount;

        // Update status
        escrow.status = EscrowStatus.LandlordReleased;

        // Release risk buffer
        riskBufferVault.releaseBuffer(escrow.riskBufferLockId);

        // Transfer amounts
        if (returnAmount > 0) {
            escrow.currency.safeTransfer(escrow.tenant, returnAmount);
        }
        if (damageAmount > 0) {
            escrow.currency.safeTransfer(escrow.landlord, damageAmount);
        }

        // Update reputation
        reputation.updateRentalHistory(escrow.tenant, escrow.currency, escrow.depositAmount, damageAmount == 0);

        emit DepositReturned(escrowId, returnAmount, escrow.currency);
    }

    /**
     * @dev Create a dispute
     * @param escrowId The escrow ID
     * @param reason Reason for the dispute
     * @param claimedAmount Amount being disputed
     * @param evidenceHash IPFS hash of evidence
     */
    function createDispute(
        uint256 escrowId,
        string calldata reason,
        uint256 claimedAmount,
        string calldata evidenceHash
    ) external whenNotPaused nonReentrant returns (uint256 disputeId) {
        EscrowDetails storage escrow = escrows[escrowId];
        require(escrow.status == EscrowStatus.Active, "Escrow not active");
        require(
            msg.sender == escrow.tenant || msg.sender == escrow.landlord,
            "Not authorized"
        );
        require(claimedAmount <= escrow.depositAmount, "Claimed amount too high");

        disputeId = nextDisputeId++;
        escrow.status = EscrowStatus.Disputed;

        disputes[disputeId] = DisputeDetails({
            escrowId: escrowId,
            initiator: msg.sender,
            reason: reason,
            claimedAmount: claimedAmount,
            currency: escrow.currency,
            timestamp: block.timestamp,
            outcome: DisputeOutcome.Pending,
            resolved: false,
            evidenceHash: evidenceHash
        });

        emit DisputeCreated(disputeId, escrowId, msg.sender);
    }

    /**
     * @dev Resolve a dispute
     * @param disputeId The dispute ID
     * @param outcome The dispute outcome
     * @param tenantAmount Amount to give to tenant
     * @param landlordAmount Amount to give to landlord
     */
    function resolveDispute(
        uint256 disputeId,
        DisputeOutcome outcome,
        uint256 tenantAmount,
        uint256 landlordAmount
    ) external onlyRole(DISPUTE_RESOLVER_ROLE) whenNotPaused nonReentrant {
        DisputeDetails storage dispute = disputes[disputeId];
        require(!dispute.resolved, "Dispute already resolved");

        EscrowDetails storage escrow = escrows[dispute.escrowId];
        require(tenantAmount + landlordAmount <= escrow.depositAmount, "Amounts exceed deposit");

        // Update dispute
        dispute.outcome = outcome;
        dispute.resolved = true;

        // Update escrow status
        escrow.status = EscrowStatus.Resolved;

        // Release risk buffer
        riskBufferVault.releaseBuffer(escrow.riskBufferLockId);

        // Transfer funds
        if (tenantAmount > 0) {
            escrow.currency.safeTransfer(escrow.tenant, tenantAmount);
        }
        if (landlordAmount > 0) {
            escrow.currency.safeTransfer(escrow.landlord, landlordAmount);
        }

        // Update reputation based on outcome
        bool tenantSuccess = outcome == DisputeOutcome.TenantFavor || outcome == DisputeOutcome.Split;
        reputation.updateRentalHistory(escrow.tenant, escrow.currency, escrow.depositAmount, tenantSuccess);

        emit DisputeResolved(disputeId, outcome, tenantAmount, landlordAmount);
    }

    /**
     * @dev Check if currency is supported
     */
    function isSupportedCurrency(IERC20 currency) public view returns (bool) {
        return currency == USDC || currency == EURC;
    }

    /**
     * @dev Calculate equivalent amount in different currency
     * @param amount Amount in source currency
     * @param fromCurrency Source currency
     * @param toCurrency Target currency
     */
    function convertCurrency(
        uint256 amount,
        IERC20 fromCurrency,
        IERC20 toCurrency
    ) public view returns (uint256) {
        if (fromCurrency == toCurrency) {
            return amount;
        }
        
        if (fromCurrency == USDC && toCurrency == EURC) {
            return (amount * usdcToEurcRate) / 1e18;
        } else if (fromCurrency == EURC && toCurrency == USDC) {
            return (amount * 1e18) / usdcToEurcRate;
        }
        
        revert("Unsupported currency pair");
    }

    /**
     * @dev Calculate risk buffer amount (10% of deposit)
     */
    function calculateRiskBuffer(uint256 depositAmount) public pure returns (uint256) {
        return (depositAmount * 1000) / 10000; // 10%
    }

    /**
     * @dev Update exchange rate (admin only)
     */
    function updateExchangeRate(uint256 newRate) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(newRate > 0, "Invalid rate");
        usdcToEurcRate = newRate;
        emit ExchangeRateUpdated(newRate);
    }

    /**
     * @dev Get escrow details
     */
    function getEscrow(uint256 escrowId) external view returns (EscrowDetails memory) {
        return escrows[escrowId];
    }

    /**
     * @dev Get user escrows
     */
    function getUserEscrows(address user) external view returns (uint256[] memory tenantIds, uint256[] memory landlordIds) {
        return (tenantEscrows[user], landlordEscrows[user]);
    }

    /**
     * @dev Emergency functions
     */
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
}