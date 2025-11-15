// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title ICircleBridge
 * @notice Interface for Circle's Cross-Chain Transfer Protocol (CCTP)
 * @dev Based on Circle's TokenMessenger contract for USDC/EURC bridging
 */
interface ICircleBridge {
    /**
     * @notice Deposits and burns tokens from sender to be minted on destination domain
     * @dev Emits a `DepositForBurn` event
     * @param amount Amount of tokens to burn
     * @param destinationDomain Destination domain identifier
     * @param mintRecipient Address of mint recipient on destination domain
     * @param burnToken Address of contract to burn deposited tokens, on local domain
     * @return nonce The nonce for this burn
     */
    function depositForBurn(
        uint256 amount,
        uint32 destinationDomain,
        bytes32 mintRecipient,
        address burnToken
    ) external returns (uint64 nonce);

    /**
     * @notice Replace a BurnMessage to change the mint recipient
     * @dev Allows the owner of a BurnMessage to replace it with a new BurnMessage specifying a new mint recipient.
     * @param originalMessage Original message bytes
     * @param originalAttestation Original attestation bytes
     * @param newDestinationCaller The new destination caller
     * @param newMintRecipient The new mint recipient address
     */
    function replaceDepositForBurn(
        bytes calldata originalMessage,
        bytes calldata originalAttestation,
        bytes32 newDestinationCaller,
        bytes32 newMintRecipient
    ) external;

    /**
     * @notice Receive a message. Messages with a given nonce
     * can only be received once for a (sourceDomain, destinationDomain)
     * pair. The message body cannot be empty.
     * @param message Message bytes
     * @param signature Signature bytes
     * @return success bool, true if successful
     */
    function receiveMessage(
        bytes memory message,
        bytes memory signature
    ) external returns (bool success);

    /**
     * @notice Get the domain identifier for the current chain
     */
    function localDomain() external view returns (uint32);

    /**
     * @notice Get the version of the contract
     */
    function version() external view returns (uint32);

    /**
     * @notice Check if a message has already been received
     * @param messageHash Hash of the message
     */
    function usedNonces(bytes32 messageHash) external view returns (bool);

    /**
     * @notice Emitted when tokens are deposited for burning
     * @param nonce Unique nonce for the burn
     * @param burnToken Address of the burned token
     * @param amount Amount of tokens burned
     * @param depositor Address of the depositor
     * @param mintRecipient Mint recipient address
     * @param destinationDomain Destination domain
     * @param destinationTokenMessenger Address of destination token messenger
     * @param destinationCaller Authorized caller on destination domain
     */
    event DepositForBurn(
        uint64 indexed nonce,
        address indexed burnToken,
        uint256 amount,
        address indexed depositor,
        bytes32 mintRecipient,
        uint32 destinationDomain,
        bytes32 destinationTokenMessenger,
        bytes32 destinationCaller
    );

    /**
     * @notice Emitted when a message is received
     * @param caller Address of the caller
     * @param sourceDomain Source domain identifier
     * @param nonce Message nonce
     * @param sender Message sender on source domain
     * @param messageBody Message body bytes
     */
    event MessageReceived(
        address indexed caller,
        uint32 sourceDomain,
        uint64 indexed nonce,
        bytes32 indexed sender,
        bytes messageBody
    );
}