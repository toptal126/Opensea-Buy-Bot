const Web3 = require("web3");
const { OpenSeaSDK, Network } = require("opensea-js");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { makeBigNumber } = require("opensea-js/lib/utils/utils");
require("dotenv").config();
const OPENSEA_API_KEY = process.env.OPENSEA_API_KEY;
// This example provider won't let you make transactions, only read-only calls:
const extragas = new makeBigNumber(5000000000);
const privateKeys = [process.env.PRIVATE_KEY];
const provider = new HDWalletProvider(
  privateKeys,
  "https://rpc.ankr.com/eth",
  0,
  1
);
const openseaSDK = new OpenSeaSDK(provider, {
  networkName: Network.Main,
  apiKey: OPENSEA_API_KEY,
});

const bidOnItem = async () => {
  openseaSDK.gasPriceAddition = extragas;
  try {
    const order = await openseaSDK.api.getOrder({
      assetContractAddress: "0x495f947276749ce646f68ac8c248420045cb7b5e",
      tokenId:
        "11907930999196393265357986037885259643051530813372200869290194477594544439297",
      side: "ask",
    });
    // console.log(order);

    const transactionHash = await openseaSDK.fulfillOrder({
      order,
      accountAddress: "0x7D5030CA30D4856bd858242c4AA36CCB79F87582",
    });
    console.log(transactionHash);
  } catch (error) {
    console.log(error);
  }
};

bidOnItem();
