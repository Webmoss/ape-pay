/* eslint-disable @typescript-eslint/no-explicit-any */
// import type { IProvider } from "@web3auth/base";
// import { ethers } from "ethers";

// export default class EthereumRpc {
//   private provider: IProvider;

//   constructor(provider: IProvider) {
//     this.provider = provider;
//   }

//   async getChainId(): Promise<any> {
//     try {
//       const ethersProvider = new ethers.providers.Web3Provider(this.provider);
//       // Get the connected Chain's ID
//       const networkDetails = await ethersProvider.getNetwork();
//       return networkDetails.chainId;
//     } catch (error) {
//       return error;
//     }
//   }

//   async getAccounts(): Promise<any> {
//     try {
//       const ethersProvider = new ethers.providers.Web3Provider(this.provider);

//       // For ethers v5
//       const signer = ethersProvider.getSigner();

//       // Get user's Ethereum public address
//       const address = signer.getAddress();

//       return await address;
//     } catch (error) {
//       return error;
//     }
//   }

//   async getBalance(): Promise<string> {
//     try {
//       const ethersProvider = new ethers.providers.Web3Provider(this.provider);
//       const signer = ethersProvider.getSigner();
//       const address = signer.getAddress();
//       const balance = ethers.utils.formatEther(
//         await ethersProvider.getBalance(address) // Balance is in wei
//       );
//       return balance;
//     } catch (error) {
//       return error as string;
//     }
//   }

//   async sendTransaction(address: string, amt: string): Promise<any> {
//     try {
//       // For ethers v5
//       const ethersProvider = new ethers.providers.Web3Provider(this.provider);
//       const signer = ethersProvider.getSigner();

//       const destination = address;

//       // Convert 1 ether to wei
//       // const amount = ethers.utils.parseEther("0.001");
//       const amount = ethers.utils.parseEther(amt);

//       // Submit transaction to the blockchain
//       const tx = await signer.sendTransaction({
//         to: destination,
//         value: amount,
//         maxPriorityFeePerGas: "5000000000", // Max priority fee per gas
//         maxFeePerGas: "6000000000000", // Max fee per gas
//       });

//       // Wait for transaction to be mined
//       const receipt = await tx.wait();

//       return receipt;
//     } catch (error) {
//       return error as string;
//     }
//   }

//   async signMessage(message: string) {
//     try {
//       // For ethers v5
//       const ethersProvider = new ethers.providers.Web3Provider(this.provider);
//       const signer = ethersProvider.getSigner();
//       // Sign the message
//       const signedMessage = await signer.signMessage(message);

//       return signedMessage;
//     } catch (error) {
//       return error as string;
//     }
//   }

//   async getPrivateKey(): Promise<any> {
//     try {
//       const privateKey = await this.provider.request({
//         method: "eth_private_key",
//       });

//       return privateKey;
//     } catch (error) {
//       return error as string;
//     }
//   }
// }
