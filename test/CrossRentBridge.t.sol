// Mock implementation of ICircleBridge for testing
contract MockCircleBridge is ICircleBridge {
    function receiveMessage(
        bytes memory,
        bytes memory
    ) external pure override returns (bool) {
        return true;
    }

    function localDomain() external pure override returns (uint32) {
        return 0;
    }

    function version() external pure override returns (uint32) {
        return 1;
    }

    function usedNonces(bytes32) external pure override returns (bool) {
        return false;
    }

    uint64 public lastNonce;

    function depositForBurn(
        uint256 amount,
        uint32 destinationDomain,
        bytes32 mintRecipient,
        address burnToken
    ) external override returns (uint64 nonce) {
        lastNonce++;
        return lastNonce;
    }

    function replaceDepositForBurn(
        bytes calldata,
        bytes calldata,
        bytes32,
        bytes32
    ) external override {}
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../contracts/CrossRentBridge.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockToken is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}

contract CrossRentBridgeTest is Test {
    CrossRentBridge bridge;
    MockToken token;
    MockCircleBridge circleBridge;
    address admin = address(0xA);
    address user = address(0xB);
    uint256 chainId = 9999;
    uint32 domain = 42;

    function setUp() public {
        token = new MockToken("MockToken", "MTK");
        circleBridge = new MockCircleBridge();
        bridge = new CrossRentBridge(
            address(circleBridge),
            address(0x2),
            address(token),
            address(0x3),
            admin
        );
        vm.prank(admin);
        bridge.addSupportedToken(address(token));
        vm.prank(admin);
        bridge.addChainDomain(chainId, domain);
    }

    function test_AddSupportedTokenAndChain() public {
        // Token and chain should be supported
        assertTrue(bridge.supportedTokens(address(token)));
        assertEq(bridge.chainIdToDomain(chainId), domain);
    }

    function test_BridgeTokensWithNewTokenAndChain() public {
        token.mint(user, 1000 ether);
        vm.startPrank(user);
        token.approve(address(bridge), 1000 ether);
        uint64 nonce = bridge.bridgeTokens(
            address(token),
            1000 ether,
            chainId,
            user
        );
        vm.stopPrank();
        // Check event emission and nonce (mocked)
        assertGt(nonce, 0);
    }
}
