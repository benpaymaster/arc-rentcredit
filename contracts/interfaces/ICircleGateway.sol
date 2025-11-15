// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title ICircleGateway
 * @notice Interface for Circle's Gateway service for programmable wallets
 * @dev Provides secure wallet infrastructure for CrossRent deposits
 */
interface ICircleGateway {
    struct WalletConfig {
        string name;
        address owner;
        uint256 blockchain;
        bool isActive;
        bytes32 entitySecretCiphertext;
    }

    struct Transaction {
        string walletId;
        address to;
        uint256 value;
        bytes data;
        uint256 gasLimit;
        uint256 gasPrice;
        uint256 nonce;
        bool executed;
    }

    /**
     * @notice Create a new programmable wallet
     * @param name Wallet name for identification
     * @param blockchain Target blockchain identifier
     * @param entitySecretCiphertext Encrypted entity secret for wallet control
     * @return walletId Unique identifier for the created wallet
     */
    function createWallet(
        string calldata name,
        uint256 blockchain,
        bytes32 entitySecretCiphertext
    ) external returns (string memory walletId);

    /**
     * @notice Execute a transaction from a programmable wallet
     * @param walletId The wallet identifier
     * @param to Transaction recipient
     * @param value Transaction value in wei
     * @param data Transaction data
     * @param gasLimit Gas limit for the transaction
     * @return transactionId Unique identifier for the transaction
     */
    function executeTransaction(
        string calldata walletId,
        address to,
        uint256 value,
        bytes calldata data,
        uint256 gasLimit
    ) external returns (string memory transactionId);

    /**
     * @notice Get wallet configuration
     * @param walletId The wallet identifier
     * @return config Wallet configuration struct
     */
    function getWallet(string calldata walletId) 
        external 
        view 
        returns (WalletConfig memory config);

    /**
     * @notice Get wallet address from wallet ID
     * @param walletId The wallet identifier
     * @return walletAddress The on-chain address of the wallet
     */
    function getWalletAddress(string calldata walletId) 
        external 
        view 
        returns (address walletAddress);

    /**
     * @notice Get wallet balance for a specific token
     * @param walletId The wallet identifier
     * @param token Token contract address (zero address for native token)
     * @return balance Token balance
     */
    function getWalletBalance(string calldata walletId, address token)
        external
        view
        returns (uint256 balance);

    /**
     * @notice Transfer tokens from wallet to recipient
     * @dev Simplified interface for token transfers
     * @param walletId Source wallet identifier
     * @param token Token contract address
     * @param recipient Transfer recipient
     * @param amount Amount to transfer
     * @return transactionId Transaction identifier
     */
    function transferTokens(
        string calldata walletId,
        address token,
        address recipient,
        uint256 amount
    ) external returns (string memory transactionId);

    /**
     * @notice Set wallet permissions for automated operations
     * @param walletId The wallet identifier
     * @param operator Address allowed to operate the wallet
     * @param permissions Bitmap of allowed operations
     */
    function setWalletPermissions(
        string calldata walletId,
        address operator,
        uint256 permissions
    ) external;

    /**
     * @notice Pause or unpause a wallet
     * @param walletId The wallet identifier
     * @param paused Whether to pause the wallet
     */
    function setWalletPaused(string calldata walletId, bool paused) external;

    /**
     * @notice Emitted when a new wallet is created
     * @param walletId Unique wallet identifier
     * @param owner Wallet owner address
     * @param walletAddress On-chain wallet address
     */
    event WalletCreated(
        string indexed walletId,
        address indexed owner,
        address indexed walletAddress
    );

    /**
     * @notice Emitted when a transaction is executed
     * @param walletId Source wallet identifier
     * @param transactionId Transaction identifier
     * @param to Transaction recipient
     * @param value Transaction value
     * @param success Whether transaction succeeded
     */
    event TransactionExecuted(
        string indexed walletId,
        string indexed transactionId,
        address indexed to,
        uint256 value,
        bool success
    );

    /**
     * @notice Emitted when wallet permissions are updated
     * @param walletId Wallet identifier
     * @param operator Operator address
     * @param permissions Permission bitmap
     */
    event PermissionsUpdated(
        string indexed walletId,
        address indexed operator,
        uint256 permissions
    );
}