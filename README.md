# Avengers Smart Contract

This Solidity smart contract, named `Avengers`, is a simple Ethereum-based wallet that allows the owner to deposit, withdraw, and purchase NFTs. The contract is written in Solidity version 0.8.9.

## Features

1. **Initialization**: The contract is initialized with an initial balance and a secret key.

2. **Deposit**: Users can deposit tokens into the wallet by providing the correct secret key.

3. **Withdraw**: Users can withdraw tokens from the wallet, ensuring that the withdrawal amount does not exceed the current balance.

4. **Purchase NFT**: A function `purchaseNFT` is provided to facilitate the purchase of NFTs, deducting the amount from the user's balance.

5. **Transfer**: Users can transfer tokens to other addresses.

6. **Ownership Transfer**: The contract owner can transfer ownership to another address.

7. **Emergency Withdrawal**: The contract owner can perform an emergency withdrawal if needed.

## Smart Contract Details

### State Variables

- `ContractOwner`: The address of the wallet owner.
- `secretBalance`: The current balance of the wallet.
- `secretKey`: A secret key required for deposit, withdrawal, and NFT purchase.

### Events

- `onDeposit(address indexed user, uint256 amount)`: Emitted when tokens are deposited into the wallet.
- `onWithdraw(address indexed user, uint256 amount)`: Emitted when tokens are withdrawn from the wallet.
- `onPurchaseNFT(address indexed user, uint256 amount)`: Emitted when an NFT is purchased.
- `onTransfer(address indexed from, address indexed to, uint256 amount)`: Emitted when tokens are transferred between users.

### Constructor

The constructor initializes the contract with an initial balance and sets the contract owner as the sender of the deployment transaction.

### Functions

- `getBalance()`: Retrieves the current balance of the wallet.
- `getUserBalance(address user)`: Retrieves the balance of a specific user.
- `depositToken(uint256 amt, uint256 key)`: Allows users to deposit tokens into the wallet.
- `withdrawToken(uint256 amt, uint256 key)`: Allows users to withdraw tokens from the wallet.
- `purchaseNFT(uint256 amt, uint256 key)`: Facilitates the purchase of NFTs.
- `transfer(address to, uint256 amt)`: Allows users to transfer tokens to other addresses.
- `transferOwnership(address newOwner)`: Allows the contract owner to transfer ownership.
- `withdrawAll()`: Allows the contract owner to withdraw the entire contract balance.
- `emergencyWithdraw(uint256 amount)`: Allows the contract owner to perform an emergency withdrawal.

## Project Setup Instructions

To run this project on your computer after cloning the GitHub repository, follow the steps below:

1. **Install Dependencies:**
   - Navigate to the project directory in the terminal.
   - Run the following command to install project dependencies:
     ```bash
     npm install
     ```

2. **Start Ethereum Node:**
   - Open two additional terminals in your Visual Studio Code or preferred code editor.

   - In the second terminal, start the local Ethereum node using Hardhat:
     ```bash
     npx hardhat node
     ```

3. **Deploy Smart Contract:**
   - In the third terminal, deploy the smart contract to the local Ethereum network:
     ```bash
     npx hardhat run --network localhost scripts/deploy.js
     ```

4. **Launch Front-end:**
   - Go back to the first terminal and start the front-end application:
     ```bash
     npm run dev
     ```

5. **Access the Project:**
   - The project will be accessible on your local machine, typically at [http://localhost:3000/](http://localhost:3000/).

Now, the project is successfully running on your localhost. Ensure to follow these steps in sequence for a smooth setup process.
