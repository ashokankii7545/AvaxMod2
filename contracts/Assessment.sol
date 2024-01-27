// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Avengers {
    
    address payable public ContractOwner;
    uint256 public secretBalance;
    uint256 public secretKey;

    mapping(address => uint256) public userBalances;

    event onDeposit(address indexed user, uint256 amount);
    event onWithdraw(address indexed user, uint256 amount);
    event onPurchaseNFT(address indexed user, uint256 amount);
    event onTransfer(address indexed from, address indexed to, uint256 amount);

    constructor(uint256 initBal) payable {
        ContractOwner = payable(msg.sender);
        secretBalance = initBal;
        secretKey = 1234;
    }

    modifier onlyOwner() {
        require(msg.sender == ContractOwner, "Only the contract owner can call this function.");
        _;
    }

    modifier sufficientBalance(uint256 amount) {
        require(secretBalance >= amount, "Insufficient contract balance.");
        _;
    }

    function getBalance() public view returns (uint256) {
        return secretBalance;
    }

    function getUserBalance(address user) public view returns (uint256) {
        return userBalances[user];
    }

    function depositToken(uint256 amt, uint256 key) public payable {
        require(key == secretKey, "Key doesn't match.");
        secretBalance += amt;
        userBalances[msg.sender] += amt;
        emit onDeposit(msg.sender, amt);
    }

    function withdrawToken(uint256 amt, uint256 key) public sufficientBalance(amt) {
        require(key == secretKey, "Key doesn't match.");
        require(userBalances[msg.sender] >= amt, "Insufficient user balance.");
        
        secretBalance -= amt;
        userBalances[msg.sender] -= amt;
        payable(msg.sender).transfer(amt);
        emit onWithdraw(msg.sender, amt);
    }

    function purchaseNFT(uint256 amt, uint256 key) public sufficientBalance(amt) {
        require(key == secretKey, "Key doesn't match.");
        require(userBalances[msg.sender] >= amt, "Insufficient user balance.");
        
        secretBalance -= amt;
        userBalances[msg.sender] -= amt;
        // Perform NFT purchase logic here
        emit onPurchaseNFT(msg.sender, amt);
    }

    function transfer(address to, uint256 amt) public {
        require(userBalances[msg.sender] >= amt, "Insufficient balance.");
        
        userBalances[msg.sender] -= amt;
        userBalances[to] += amt;
        emit onTransfer(msg.sender, to, amt);
    }

    function transferOwnership(address newOwner) public onlyOwner {
        ContractOwner = payable(newOwner);
    }

    receive() external payable {
        secretBalance += msg.value;
    }

    function withdrawAll() public onlyOwner {
        uint256 balanceToSend = secretBalance;
        secretBalance = 0;
        ContractOwner.transfer(balanceToSend);
    }

    function emergencyWithdraw(uint256 amount) public onlyOwner {
        require(amount <= address(this).balance, "Insufficient contract balance.");
        ContractOwner.transfer(amount);
    }
}
