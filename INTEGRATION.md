# CrossRent Smart Contract Integration

## Overview

The CrossRent frontend has been integrated with Web3.js to connect with the deployed smart contracts on Arc. The application supports both live blockchain interactions and demo mode for testing purposes.

## Smart Contract Integration Features

### 🔗 Wallet Connection
- MetaMask integration via Web3.js 4.2.0
- Automatic wallet detection and connection
- Account switching support
- Connection status indicators in the UI

### 🌉 Bridge Integration (CrossRentBridge.sol)
- **Function**: `bridgeTokens(token, amount, destinationChainId, recipient)`
- **Features**: Cross-chain USDC bridging via Circle CCTP
- **UI Integration**: Real-time transaction status updates
- **Fallback**: Demo mode if contracts not deployed

### 🏠 Escrow Integration (RentCreditEscrow.sol)
- **Function**: `createEscrow(landlord, tenant, depositAmount, rentAmount, duration, token)`
- **Features**: On-chain escrow contract creation with USDC deposits
- **UI Integration**: Contract address display, transaction hash tracking
- **Fallback**: Demo mode with local state management

### 💳 Rent Payment Integration
- **Function**: `payRent(escrowId)`
- **Features**: Automatic monthly rent payments via smart contract
- **UI Integration**: Transaction confirmations, payment history
- **Fallback**: Demo mode with balance simulation

## Contract Addresses (Arc Testnet)

Update these addresses in `frontend/index.html` after deployment:

```javascript
const CONTRACT_ADDRESSES = {
    CrossRentBridge: "0x0000000000000000000000000000000000000000", // Deploy CrossRentBridge.sol first
    RentCreditEscrow: "0x0000000000000000000000000000000000000000", // From Deploy.s.sol output
    ReputationSBT: "0x0000000000000000000000000000000000000000", // From Deploy.s.sol output  
    RiskBufferVault: "0x0000000000000000000000000000000000000000", // From Deploy.s.sol output
    USDC: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831" // Arc testnet USDC
};
```

## Deployment Instructions

1. **Deploy Contracts to Arc**:
   ```bash
   cd /home/benpaymaster/arc-rentcredit
   forge script script/Deploy.s.sol --broadcast --rpc-url <ARC_RPC_URL> --private-key <PRIVATE_KEY>
   ```

2. **Update Contract Addresses**:
   - Copy deployed addresses from the deployment output
   - Update `CONTRACT_ADDRESSES` object in `frontend/index.html`

3. **Test Integration**:
   - Connect MetaMask to Arc testnet
   - Ensure you have Arc testnet USDC
   - Test bridge, escrow creation, and rent payments

## Demo vs Live Mode

### Demo Mode (Default)
- Used when wallet not connected or contracts not deployed
- Local state management with mock transactions
- Toast notifications show "Demo mode" status
- Ideal for hackathon demos and development

### Live Mode (When Connected)
- Real blockchain transactions via smart contracts
- MetaMask transaction confirmations required
- Real gas costs and token transfers
- Production-ready functionality

## UI Integration Status Indicators

The interface shows:
- 🟢 **Wallet Connected** - MetaMask connected and ready
- ⚫ **Demo Mode** - Using local simulation
- 🟢 **Contracts Deployed** - Live smart contracts available
- 🟡 **Contracts Pending** - Using demo mode, contracts not deployed

## Architecture Benefits

1. **Progressive Enhancement**: Works in demo mode, enhanced with real contracts
2. **Error Resilience**: Graceful fallback to demo mode on errors
3. **Development Friendly**: Easy testing without blockchain dependency
4. **Production Ready**: Full Web3 integration when contracts deployed

## Next Steps

1. Deploy contracts to Arc testnet
2. Update contract addresses in frontend
3. Test full integration with real USDC
4. Configure appropriate gas limits for Arc network
5. Add reputation tracking integration (ReputationSBT.sol)
6. Add risk buffer vault interactions (RiskBufferVault.sol)

## Security Considerations

- Contract addresses are hardcoded (update for production)
- Private keys should never be exposed in frontend code
- Always validate transaction parameters before signing
- Implement proper error handling for failed transactions
- Consider implementing transaction retry mechanisms

## Technical Stack

- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Web3**: Web3.js 4.2.0 for blockchain connectivity
- **Contracts**: Solidity 0.8.24, OpenZeppelin libraries
- **Network**: Arc testnet (Base L2) with USDC support
- **Bridge**: Circle CCTP for cross-chain transfers