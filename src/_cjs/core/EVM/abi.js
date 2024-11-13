"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.balanceOfAbi =
  exports.getEthBalanceAbi =
  exports.allowanceAbi =
  exports.approveAbi =
    void 0;
exports.approveAbi = [
  {
    name: "approve",
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    outputs: [{ internalType: "bool", name: "approved", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];
exports.allowanceAbi = [
  {
    name: "allowance",
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    outputs: [{ internalType: "uint256", name: "allowance", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];
exports.getEthBalanceAbi = [
  {
    inputs: [{ name: "_owner", type: "address" }],
    name: "getEthBalance",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
    stateMutability: "view",
  },
];
exports.balanceOfAbi = [
  {
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
    stateMutability: "view",
  },
];
//# sourceMappingURL=abi.js.map
