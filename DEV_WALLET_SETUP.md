# Dev-Controlled Wallet Implementation

## Overview

This implementation uses a **dev-controlled wallet approach** as required by the hackathon organizers. Instead of users connecting their own wallets, the system uses a pre-configured wallet controlled by the development team/organizers.

## Architecture

### 🔑 **Dev Wallet Configuration**
- **Purpose**: Single wallet controlled by organizers for consistent demo experience
- **Address**: `0x742d35cC6634C0532925a3B8D4caF4E2f27b2c8A` (update with actual)
- **Private Key**: Provided by organizers (stored securely)
- **Permissions**: Admin access to all contracts, pre-funded with test tokens

### 🏗️ **Contract Deployment**
```bash
# Deploy using dev-controlled wallet
forge script script/DevControlledDeploy.s.sol \
  --rpc-url $ARC_RPC_URL \
  --private-key $DEV_PRIVATE_KEY \
  --broadcast
```

### 🎯 **Key Benefits**
1. **Consistent Demo**: Same wallet across all presentations
2. **Pre-funded**: Organizers control token distribution
3. **Admin Access**: Full contract permissions for demonstrations
4. **Reliable**: No dependency on user wallet setup

## Setup Instructions

### 1. Environment Configuration

Create `.env` file with organizer-provided values:
```bash
# Dev-controlled wallet (provided by organizers)
DEV_PRIVATE_KEY=0x1234...abcd
ARC_RPC_URL=https://api.arc.net/testnet
CHAIN_ID=412346621
```

### 2. Deploy Contracts

```bash
# Deploy all contracts with dev wallet
cd /home/benpaymaster/arc-rentcredit
forge script script/DevControlledDeploy.s.sol \
  --rpc-url $ARC_RPC_URL \
  --private-key $DEV_PRIVATE_KEY \
  --broadcast \
  --verify
```

### 3. Update Frontend Addresses

Copy deployment output to `frontend/index.html`:
```javascript
const CONTRACT_ADDRESSES = {
    RentCreditEscrow: "0x...", // From deployment output
    ReputationSBT: "0x...",    // From deployment output  
    RiskBufferVault: "0x...",  // From deployment output
    USDC: "0x...",             // Mock USDC from deployment
    EURC: "0x..."              // Mock EURC from deployment
};
```

## Frontend Integration

### 🔗 **Wallet Connection**
- Users connect MetaMask as normal
- System detects if connected wallet is the dev wallet
- Shows special "DEV WALLET" indicator for admin access
- Fallback to demo mode for regular users

### 🎨 **UI Indicators**
- **🔴 DEV WALLET**: Admin mode with full permissions
- **🟢 User Wallet**: Demo mode with limited functionality
- **⚫ Demo Mode**: Local simulation without wallet

### ⚡ **Contract Interactions**
- **Dev Wallet**: Real blockchain transactions with pre-funded tokens
- **User Wallets**: Demo mode with simulated transactions
- **Graceful Fallback**: Works without any wallet connection

## Deployment Script Features

### 🏦 **Token Setup**
- Deploys Mock USDC and EURC tokens
- Mints 10M tokens to dev wallet
- Mints 1M tokens to demo addresses
- Full control over token distribution

### 🏠 **Contract Configuration**
- Deploys complete escrow system
- Configures all permissions and roles
- Links reputation and vault systems
- Sets dev wallet as admin for all contracts

### 📊 **Demo Data**
- Pre-configured demo addresses with tokens
- Example escrow scenarios
- Test reputation scores
- Yield farming setup

## Security Considerations

### ✅ **Safe Practices**
- Private key stored securely by organizers
- Contract admin functions restricted to dev wallet
- Clear separation between dev and user modes
- All transactions logged and traceable

### ⚠️ **Important Notes**
- Dev wallet has admin privileges over all contracts
- Test tokens only - no real value
- Designed for hackathon demo purposes
- Should not be used in production

## Demo Flow

### 1. **Organizer Setup**
1. Organizers provide dev wallet private key
2. Deploy contracts using DevControlledDeploy.s.sol
3. Update frontend with deployed addresses
4. Verify all systems working with dev wallet

### 2. **User Demo**
1. User visits frontend application
2. Can connect any wallet or use demo mode
3. If connecting dev wallet: full admin access
4. If connecting other wallet: demo simulation
5. All core functionality demonstrated

### 3. **Presentation**
- Show wallet connection with dev wallet
- Demonstrate escrow creation with real transactions
- Display reputation scoring and yield farming
- Prove live blockchain integration

## Troubleshooting

### Common Issues
1. **Wrong Network**: Ensure MetaMask connected to Arc testnet
2. **No Tokens**: Dev wallet should be pre-funded from deployment
3. **Contract Errors**: Verify addresses updated in frontend
4. **Demo Mode**: Fallback works without wallet connection

### Debug Steps
1. Check contract deployment succeeded
2. Verify dev wallet has tokens
3. Confirm frontend has correct addresses
4. Test with dev wallet connection
5. Verify fallback demo mode works

## Production Migration

When moving to production:
1. Remove dev wallet hardcoding
2. Use real USDC/EURC addresses
3. Implement proper access controls
4. Remove demo mode functionality
5. Add proper key management

---

**This dev-controlled approach ensures a smooth, reliable demonstration experience while maintaining the flexibility for users to interact with the system in demo mode.**