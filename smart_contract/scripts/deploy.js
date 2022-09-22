const hre = require("hardhat");

// Contract address = 0x5b910dED3056bC924AE7268363f2A53ec4d0B970

const main = async () => {
  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transaction = await Transactions.deploy();

  await transaction.deployed();

  console.log(`Transactions deployed to ${transaction.address}`);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
