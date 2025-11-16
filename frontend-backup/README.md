# Arc Bridge - Cross-Chain USDC Transfer Application

A Next.js application that enables users to transfer USDC across multiple blockchain networks using Circle's Bridge Kit and Arc blockchain integration.

## Features

- 🌉 **Cross-Chain USDC Transfers** - Move USDC between Ethereum, Polygon, Avalanche, Base, and Arc
- ⚡ **Fast & Secure** - Powered by Circle's Bridge Kit infrastructure
- 💳 **Wallet Integration** - Support for all major wallets via RainbowKit
- 🔄 **Real-time Status** - Live transaction tracking and status updates
- 🎨 **Beautiful UI** - Modern, responsive design with smooth animations
- 📱 **Mobile Friendly** - Optimized for both desktop and mobile use

## Architecture

### Smart Contracts (Arc Blockchain)
- **RentCreditEscrow**: Advanced programmable escrow system with automated conditions
- **ReputationSBT**: Soulbound tokens for tracking rental reputation
- **RiskBufferVault**: ERC4626 vault for risk management and yield generation

### Frontend Application
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **Zustand** for state management
- **Wagmi** for Web3 integration

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- A wallet (MetaMask recommended)
- Circle API key for Bridge Kit integration
- WalletConnect Project ID

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd arc-rentcredit/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your API keys
```

4. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
NEXT_PUBLIC_CIRCLE_API_KEY=your_circle_api_key
```

### Getting API Keys

1. **WalletConnect Project ID**:
   - Visit [WalletConnect Cloud](https://cloud.walletconnect.com/)
   - Create a new project
   - Copy the Project ID

2. **Circle API Key**:
   - Visit [Circle Developer Console](https://console.circle.com/)
   - Create an account and get your API key
   - For testnet use: `SAND_API_KEY:your_key_here`

## Supported Networks

The application supports USDC transfers between the following networks:

- **Ethereum** (ETH)
- **Polygon** (MATIC)
- **Avalanche** (AVAX)
- **Arbitrum One** (ARB)
- **Base** (BASE)
- **Arc** (ARC) - Our custom implementation

## How It Works

### Bridge Process

1. **Connect Wallet** - Users connect their Web3 wallet
2. **Select Networks** - Choose source and destination networks
3. **Enter Amount** - Specify USDC amount to transfer
4. **Approve Transfer** - Approve USDC spending (if needed)
5. **Initiate Bridge** - Submit transaction to Bridge Kit
6. **Monitor Status** - Track transfer progress in real-time
7. **Complete** - Receive USDC on destination network

### Technical Implementation

```typescript
// Bridge Kit Integration
const bridgeTransfer = await bridgeSDK.createTransfer({
  fromChain: sourceNetwork.circleChainId,
  toChain: destinationNetwork.circleChainId,
  amount: parseUnits(amount, 6).toString(),
  recipient: address,
  token: 'USDC',
})

// Send transaction
const txHash = await sendTransaction({
  to: bridgeTransfer.contractAddress,
  data: bridgeTransfer.calldata,
  value: BigInt(bridgeTransfer.value || '0'),
})
```

## Advanced Features

### Programmable Logic (Smart Contracts)

The smart contracts demonstrate advanced programmable logic:

1. **Automated Escrow Conditions**:
   - Time-based releases
   - Multi-party confirmations
   - Damage assessments

2. **Reputation System**:
   - Onchain credit scoring
   - Soulbound tokens (non-transferable)
   - Cross-border reputation tracking

3. **Risk Management**:
   - ERC4626 vault for yield generation
   - Automated buffer management
   - Emergency withdrawal mechanisms

### User Experience Features

- **Real-time Balance Updates** - Live USDC balances across networks
- **Fee Estimation** - Transparent bridge fee calculations
- **Transaction History** - Persistent transfer record
- **Error Handling** - Comprehensive error states and recovery
- **Loading States** - Smooth loading indicators
- **Mobile Optimization** - Touch-friendly interface

## Development

### Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main bridge interface
│   ├── layout.tsx         # Root layout
│   └── providers.tsx      # Context providers
├── components/            # React components
│   ├── NetworkSelector.tsx
│   ├── AmountInput.tsx
│   ├── TransferButton.tsx
│   └── TransferStatus.tsx
├── lib/                   # Utilities and configurations
│   ├── bridge-kit.tsx     # Bridge Kit integration
│   └── constants.ts       # Network and app constants
└── store/                 # State management
    └── transfer.ts        # Transfer state with Zustand
```

### Key Components

- **NetworkSelector**: Grid-based network selection with visual indicators
- **AmountInput**: USDC amount input with balance checking and validation
- **TransferButton**: Main CTA with transaction handling and loading states
- **TransferStatus**: Real-time status updates with progress indicators

### Building for Production

```bash
npm run build
npm run start
```

## Deployment

The application can be deployed to any platform supporting Next.js:

- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- **Railway**
- **Self-hosted**

### Environment Configuration

Ensure all environment variables are set in your deployment platform:

- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`
- `NEXT_PUBLIC_CIRCLE_API_KEY`

## Testing

### Manual Testing Checklist

1. ✅ Wallet connection across different providers
2. ✅ Network switching functionality
3. ✅ Amount validation and balance checking
4. ✅ Transfer initiation and monitoring
5. ✅ Error handling and user feedback
6. ✅ Mobile responsiveness
7. ✅ Transaction history persistence

### Example Test Transfer

1. Connect MetaMask wallet
2. Select Ethereum → Arc transfer
3. Enter amount: 10 USDC
4. Approve USDC spending
5. Initiate bridge transfer
6. Monitor status updates
7. Verify USDC arrival on Arc

## Security Considerations

- **Client-side validation** for all inputs
- **Balance verification** before transfers
- **Transaction simulation** where possible
- **Error boundaries** for graceful failure handling
- **No private key storage** (wallet-based signing only)

## Troubleshooting

### Common Issues

1. **"Insufficient Balance"** - Ensure sufficient USDC and ETH for gas
2. **"Network Not Supported"** - Switch to a supported network
3. **"Transaction Failed"** - Check gas settings and try again
4. **"Bridge Timeout"** - Wait for network congestion to clear

### Debug Mode

Enable debug logging in development:

```javascript
localStorage.setItem('arc-bridge-debug', 'true')
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For support and questions:
- Create an issue on GitHub
- Join our Discord community
- Email: support@arcbridge.dev

---

Built with ❤️ for the Arc Hackathon - showcasing the power of programmable money and cross-chain USDC transfers.