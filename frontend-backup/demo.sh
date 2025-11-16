#!/bin/bash

# Arc Bridge Demo Setup Script
# This script demonstrates the cross-chain USDC transfer application

echo "🌉 Arc Bridge - Cross-Chain USDC Transfer Demo"
echo "=============================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the frontend directory"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install --silent

echo ""
echo "🔧 Setting up environment..."

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    cp .env.example .env.local
    echo "📝 Created .env.local file"
    echo "⚠️  Please add your API keys to .env.local before starting the app"
else
    echo "✅ Environment file already exists"
fi

echo ""
echo "🏗️  Building the application..."
npm run build --silent

echo ""
echo "🎯 Demo Features Overview:"
echo "========================="
echo ""
echo "🌐 Supported Networks:"
echo "  • Ethereum (ETH)"
echo "  • Polygon (MATIC)" 
echo "  • Avalanche (AVAX)"
echo "  • Arbitrum One (ARB)"
echo "  • Base (BASE)"
echo "  • Arc (ARC) - Our custom implementation"
echo ""
echo "⚡ Key Features:"
echo "  • Cross-chain USDC transfers"
echo "  • Real-time transaction tracking"
echo "  • Wallet integration (RainbowKit)"
echo "  • Mobile-responsive design"
echo "  • Advanced error handling"
echo "  • Transfer history persistence"
echo ""
echo "🔒 Smart Contract Integration:"
echo "  • Programmable escrow system"
echo "  • Soulbound reputation tokens"
echo "  • ERC4626 risk buffer vault"
echo ""

echo "📱 Demo Scenarios:"
echo "=================="
echo ""
echo "1. 🔗 Basic Cross-Chain Transfer:"
echo "   - Connect wallet (MetaMask recommended)"
echo "   - Select source network (e.g., Ethereum)"
echo "   - Select destination network (e.g., Arc)"
echo "   - Enter USDC amount (minimum \$1)"
echo "   - Review fees and confirm transfer"
echo "   - Monitor real-time status updates"
echo ""
echo "2. 🏠 Rental Escrow Integration:"
echo "   - Create rental escrow with USDC deposit"
echo "   - Automated release conditions"
echo "   - Dispute resolution mechanism"
echo "   - Reputation score updates"
echo ""
echo "3. 📊 Risk Management:"
echo "   - Deposit USDC into risk buffer vault"
echo "   - Earn yield on locked funds"
echo "   - Automated risk assessment"
echo ""

echo "🚀 Starting the development server..."
echo "======================================"
echo ""
echo "Visit http://localhost:3000 to see the demo"
echo ""
echo "💡 Demo Tips:"
echo "  • Use testnet tokens for safe testing"
echo "  • Connect to Arbitrum Sepolia for Arc demo"
echo "  • Check console for debug information"
echo "  • Try different wallet providers"
echo ""

# Start the development server
npm run dev