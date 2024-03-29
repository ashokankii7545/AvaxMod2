// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hrdhat = require("hardhat");

async function startFunction() {
  const initAmount = 1;
  const AvengersWallet =
    await hrdhat.ethers.getContractFactory(
      "Avengers",
    );
  const AvengersAssessment =
    await AvengersWallet.deploy(
      initAmount,
    );
  await AvengersAssessment.deployed();

  console.log(
    `Contract deployed to ${AvengersAssessment.address} with initial balance = ${initAmount} `,
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
startFunction().catch(
  (
    error,
  ) => {
    console.error(
      error,
    );
    process.exitCode = 1;
  },
);
