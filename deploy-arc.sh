#!/bin/bash

echo "🚀 Arc Hackathon Deployment Script"
echo "=================================="

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if required environment variables are set
check_env() {
    echo -e "${BLUE}Checking environment variables...${NC}"
    
    if [ -z "$PRIVATE_KEY" ]; then
        echo -e "${RED}❌ PRIVATE_KEY not set. Please export your private key:${NC}"
        echo "export PRIVATE_KEY=your_private_key"
        exit 1
    fi
    
    if [ -z "$RPC_URL" ]; then
        echo -e "${YELLOW}⚠️  RPC_URL not set. Using default Arc testnet...${NC}"
        export RPC_URL="https://testnet-rpc.arc.xyz"  # Replace with actual Arc RPC
    fi
    
    echo -e "${GREEN}✅ Environment variables configured${NC}"
}

# Compile contracts
compile() {
    echo -e "${BLUE}Compiling contracts...${NC}"
    forge build
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Compilation successful${NC}"
    else
        echo -e "${RED}❌ Compilation failed${NC}"
        exit 1
    fi
}

# Deploy full system
deploy_system() {
    echo -e "${BLUE}Deploying CrossRent system to Arc blockchain...${NC}"
    
    forge script script/DeployCrossRent.s.sol \
        --rpc-url $RPC_URL \
        --broadcast \
        --verify \
        -vvvv
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ System deployment successful${NC}"
    else
        echo -e "${RED}❌ Deployment failed${NC}"
        exit 1
    fi
}

# Run demonstration
demo() {
    echo -e "${BLUE}Running hackathon demonstration...${NC}"
    
    forge script script/ArcHackathonDemo.s.sol
    
    echo -e "${GREEN}✅ Demonstration complete${NC}"
}

# Set up demo scenarios
setup_demo() {
    echo -e "${BLUE}Setting up demo scenarios...${NC}"
    
    forge script script/DemoSetup.s.sol \
        --rpc-url $RPC_URL \
        --broadcast \
        -v
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Demo scenarios created${NC}"
    else
        echo -e "${YELLOW}⚠️  Demo setup encountered issues (non-critical)${NC}"
    fi
}

# Run tests with gas report
test_system() {
    echo -e "${BLUE}Running test suite with gas reports...${NC}"
    
    forge test --gas-report
    
    echo -e "${GREEN}✅ Testing complete${NC}"
}

# Main deployment flow
main() {
    echo -e "${YELLOW}🏆 Arc Hackathon - CrossRent Deployment${NC}"
    echo ""
    echo "This script will:"
    echo "1. Check environment setup"
    echo "2. Compile smart contracts"
    echo "3. Deploy to Arc blockchain"
    echo "4. Run demonstration"
    echo "5. Setup demo scenarios"
    echo ""
    
    read -p "Continue with deployment? (y/N) " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        check_env
        compile
        deploy_system
        demo
        setup_demo
        
        echo ""
        echo -e "${GREEN}🎉 DEPLOYMENT COMPLETE! 🎉${NC}"
        echo ""
        echo "Your CrossRent system is now live on Arc blockchain!"
        echo ""
        echo "Next steps:"
        echo "1. Test the frontend at localhost:3000"
        echo "2. Submit to Arc hackathon"
        echo "3. Monitor contract interactions"
        echo ""
        echo -e "${BLUE}📄 Check HACKATHON_SUBMISSION.md for complete documentation${NC}"
    else
        echo "Deployment cancelled."
        exit 0
    fi
}

# Check command line arguments
case "${1:-}" in
    "check")
        check_env
        ;;
    "compile")
        compile
        ;;
    "deploy")
        check_env
        compile
        deploy_system
        ;;
    "demo")
        demo
        ;;
    "test")
        test_system
        ;;
    "setup")
        setup_demo
        ;;
    *)
        main
        ;;
esac