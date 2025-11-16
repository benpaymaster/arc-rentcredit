// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../contracts/RentCreditEscrow.sol";
import "../contracts/ReputationSBT.sol";
import "../contracts/RiskBufferVault.sol";

/**
 * @title ArcTestnetDeploy
 * @notice Simplified deployment script for Arc testnet demo
 * @dev Deploys core contracts without Circle Bridge dependency for testing
 */
contract ArcTestnetDeploy is Script {
    
    // Contract addresses that will be deployed
    address public reputation;
    address public usdcVault;
    address public rentEscrow;
    address public mockUSDC;
    address public mockEURC;

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        console.log("=== CrossRent Arc Testnet Deployment ===");
        console.log("Deployer:", deployer);
        console.log("Chain ID:", block.chainid);
        console.log("Block number:", block.number);
        console.log("");

        vm.startBroadcast(deployerPrivateKey);

        // Deploy Mock USDC for Arc testnet (since real USDC might not be available)
        console.log("1. Deploying Mock Tokens...");
        MockToken usdc = new MockToken("USD Coin", "USDC", 6);
        MockToken eurc = new MockToken("Euro Coin", "EURC", 6);
        
        mockUSDC = address(usdc);
        mockEURC = address(eurc);
        
        console.log("   Mock USDC deployed at:", mockUSDC);
        console.log("   Mock EURC deployed at:", mockEURC);
        console.log("");

        // Deploy ReputationSBT
        console.log("2. Deploying Reputation System...");
        ReputationSBT sbt = new ReputationSBT();
        reputation = address(sbt);
        console.log("   ReputationSBT deployed at:", reputation);
        console.log("");

        // Deploy USDC Vault
        console.log("3. Deploying USDC Yield Vault...");
        RiskBufferVault vault = new RiskBufferVault(
            IERC20(mockUSDC),
            "CrossRent USDC Vault",
            "xrUSDC"
        );
        usdcVault = address(vault);
        console.log("   USDC Vault deployed at:", usdcVault);
        console.log("");

        // Deploy RentCreditEscrow
        console.log("4. Deploying Rent Credit Escrow...");
        RentCreditEscrow escrow = new RentCreditEscrow(
            mockUSDC,
            mockEURC,
            reputation,
            usdcVault
        );
        rentEscrow = address(escrow);
        console.log("   RentCreditEscrow deployed at:", rentEscrow);
        console.log("");

        // Configure permissions
        console.log("5. Configuring Permissions...");
        
        // Allow escrow to manage SBT reputation
        sbt.grantEscrowManager(rentEscrow);
        console.log("   [OK] Escrow granted SBT management permissions");

        // Allow escrow to manage vault
        vault.grantEscrowManager(rentEscrow);
        console.log("   [OK] Escrow granted vault management permissions");

        // Grant deployer roles for testing
        escrow.grantRole(escrow.DISPUTE_RESOLVER_ROLE(), deployer);
        escrow.grantRole(escrow.CROSS_CHAIN_RELAYER_ROLE(), deployer);
        vault.grantRole(vault.RISK_MANAGER_ROLE(), deployer);
        
        console.log("   [OK] Deployer granted admin roles");
        console.log("");

        // Mint test tokens
        console.log("6. Minting Test Tokens...");
        usdc.mint(deployer, 1000000 * 10**6); // 1M USDC
        eurc.mint(deployer, 1000000 * 10**6); // 1M EURC
        console.log("   [OK] Minted 1,000,000 USDC to deployer");
        console.log("   [OK] Minted 1,000,000 EURC to deployer");
        console.log("");

        vm.stopBroadcast();

        console.log("=== DEPLOYMENT COMPLETE ===");
        console.log("");
        console.log("[CONTRACT ADDRESSES]");
        console.log("+-----------------------+-----------------------------------------+");
        console.log("| Contract              | Address                                 |");
        console.log("+-----------------------+-----------------------------------------+");
        console.log("| Mock USDC            |", mockUSDC, "|");
        console.log("| Mock EURC            |", mockEURC, "|");
        console.log("| ReputationSBT        |", reputation, "|");
        console.log("| USDC Vault           |", usdcVault, "|");
        console.log("| RentCreditEscrow     |", rentEscrow, "|");
        console.log("+-----------------------+-----------------------------------------+");
        console.log("");
        console.log("[NEXT STEPS]");
        console.log("1. Copy addresses above to frontend/index.html");
        console.log("2. Update CONTRACT_ADDRESSES object");
        console.log("3. Test wallet connection and contract interactions");
        console.log("4. Verify escrow creation and rent payments work");
        console.log("");
        console.log("CrossRent is now live on Arc testnet!");
    }
}

/**
 * @title MockToken
 * @notice Mock ERC20 token for testing
 */
contract MockToken is IERC20 {
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    
    uint256 private _totalSupply;
    uint8 private _decimals;
    string private _name;
    string private _symbol;
    
    constructor(string memory name_, string memory symbol_, uint8 decimals_) {
        _name = name_;
        _symbol = symbol_;
        _decimals = decimals_;
    }
    
    function name() public view returns (string memory) { return _name; }
    function symbol() public view returns (string memory) { return _symbol; }
    function decimals() public view returns (uint8) { return _decimals; }
    function totalSupply() public view override returns (uint256) { return _totalSupply; }
    function balanceOf(address account) public view override returns (uint256) { return _balances[account]; }
    
    function transfer(address to, uint256 amount) public override returns (bool) {
        address owner = msg.sender;
        _transfer(owner, to, amount);
        return true;
    }
    
    function allowance(address owner, address spender) public view override returns (uint256) {
        return _allowances[owner][spender];
    }
    
    function approve(address spender, uint256 amount) public override returns (bool) {
        address owner = msg.sender;
        _approve(owner, spender, amount);
        return true;
    }
    
    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        address spender = msg.sender;
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }
    
    function mint(address to, uint256 amount) public {
        _totalSupply += amount;
        _balances[to] += amount;
        emit Transfer(address(0), to, amount);
    }
    
    function _transfer(address from, address to, uint256 amount) internal {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");
        
        uint256 fromBalance = _balances[from];
        require(fromBalance >= amount, "ERC20: transfer amount exceeds balance");
        unchecked {
            _balances[from] = fromBalance - amount;
        }
        _balances[to] += amount;
        
        emit Transfer(from, to, amount);
    }
    
    function _approve(address owner, address spender, uint256 amount) internal {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");
        
        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }
    
    function _spendAllowance(address owner, address spender, uint256 amount) internal {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            require(currentAllowance >= amount, "ERC20: insufficient allowance");
            unchecked {
                _approve(owner, spender, currentAllowance - amount);
            }
        }
    }
}