import { ethers } from "ethers";
import SafeApiKit from "@safe-global/api-kit";
import Safe, {
  SafeFactory,
  SafeAccountConfig,
  EthersAdapter,
} from "@safe-global/protocol-kit";

// import { useStore } from "../store";

const txServiceUrl = "https://safe-transaction-mainnet.safe.global";

const { ethereum } = window;
if (!ethereum) {
  throw Error();
}
const web3Provider = ethereum;
const provider = new ethers.providers.Web3Provider(web3Provider);
const safeOwner = provider.getSigner(0);

const ethAdapter = new EthersAdapter({
  ethers,
  signerOrProvider: safeOwner,
});

const owners = ['gor:0x0ce6551a18BC5882d085118aF602826652Ca7C63'];
const threshold = 3;
const safeAccountConfig: SafeAccountConfig = {
  owners,
  threshold
};

const safeSdk: Safe = await safeFactory.deploySafe({ safeAccountConfig });


const safeService = new SafeApiKit({ txServiceUrl, ethAdapter });

const safeFactory = await SafeFactory.create({ ethAdapter });

const safeSdk = await Safe.create({ ethAdapter, safeAddress });
