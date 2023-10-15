import { ethers } from "ethers";
import { defineStore } from "pinia";

import apecoinAbi from "@/abi/ethereum-ape-token-abi.json";
import apecoinGoerliAbi from "@/abi/goerli-ape-token-abi.json";
import { notificationObject } from "@/models/notification";
import { transactionObject } from "@/models/transaction";
import { userObject } from "@/models/user";

/* Ape Token Contract Addresses */
const apecoinAddress = "0x4d224452801ACEd8B2F0aebE155379bb5D594381";
const apecoinGoerliAddress = "0x328507DC29C95c170B56a1b3A758eB7a9E73455c";
const apecoinContract =
  process.env.NODE_ENV && process.env.NODE_ENV === "development"
    ? apecoinGoerliAddress
    : apecoinAddress;
const apecoinABI = process.env.NODE_ENV === "development" ? apecoinGoerliAbi.abi : apecoinAbi.abi;

export const useStore = defineStore({
  id: "store",
  state: () => ({
    loading: false,
    connected: false,
    wallet: "",
    safes: [] as string[],
    user: <userObject>{},
    account: "",
    ethBalance: "",
    apecoinBalance: "",
    transaction: <transactionObject>{},
    transactions: [] as transactionObject[],
    notification: <notificationObject>{},
    notifications: [] as notificationObject[],
  }),
  getters: {
    isLoading(state) {
      return state.loading;
    },
    getConnected(state) {
      return state.connected;
    },
    getWallet(state) {
      return state.wallet;
    },
    getSafes(state) {
      return state.safes;
    },
    getUser(state) {
      return state.user;
    },
    getAccount(state) {
      return state.account;
    },
    getBalance(state) {
      return state.ethBalance;
    },
    getApecoinBalance(state) {
      return state.apecoinBalance;
    },
    getTransaction(state) {
      return state.transaction;
    },
    getTransactions(state) {
      return state.transactions;
    },
    getNotification(state) {
      return state.notification;
    },
    getNotifications(state) {
      return state.notifications;
    },
  },
  actions: {
    setLoading(isLoading: boolean) {
      this.loading = isLoading;
    },
    setConnected(connected: boolean) {
      this.connected = connected;
    },
    setWallet(wallet: string) {
      this.wallet = wallet;
    },
    setSafes(safes: string[]) {
      this.safes = safes;
    },
    setUser(user: userObject) {
      this.user = user;
    },
    setAccount(account: string) {
      this.account = account;
    },
    setBalance(balance: string) {
      this.ethBalance = balance;
    },
    setApecoinBalance(balance: string) {
      this.apecoinBalance = balance;
    },
    setTransaction(transaction: transactionObject) {
      this.transaction = transaction;
    },
    setTransactions(transactions: transactionObject[]) {
      this.transactions = transactions;
    },
    addTransactions(...transactions: transactionObject[]) {
      this.transactions.push(...transactions);
    },
    setNotification(notification: notificationObject) {
      this.notification = notification;
    },
    setNotifications(notifications: notificationObject[]) {
      this.notifications = notifications;
    },
    addNotifications(...notifications: notificationObject[]) {
      this.notifications.push(...notifications);
    },

    async checkETHBalance(account: string) {
      try {
        const { ethereum } = window;
        if (!ethereum) {
          console.log(`Please connect web3 wallet to continue!`);
          return;
        }
        const provider = new ethers.providers.Web3Provider(ethereum);
        const wei = await provider.getBalance(account);
        const ethBalance = ethers.utils.formatEther(wei);
        this.setBalance(ethBalance);
      } catch (error) {
        console.log("Error", error);
      }
    },
    async checkApecoinBalance(account: string) {
      try {
        const { ethereum } = window;
        if (!ethereum) {
          console.log(`Please connect web3 wallet to continue!`);
          return;
        }
        const provider = new ethers.providers.Web3Provider(ethereum);
        const contract = new ethers.Contract(apecoinContract, apecoinABI, provider);
        const balance = await contract.balanceOf(account);
        const apecoinBalance = ethers.utils.formatUnits(balance, 18);
        this.setApecoinBalance(apecoinBalance);
      } catch (error) {
        console.log("Error", error);
      }
    },
  },
});
