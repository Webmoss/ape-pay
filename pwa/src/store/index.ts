import { defineStore } from "pinia";
import { transactionObject } from "@/models/transaction";

export const useStore = defineStore({
  id: "store",
  state: () => ({
    loading: false,
    connected: false,
    wallet: {},
    account: "",
    balance: 0,
    transaction: <transactionObject>{},
    transactions: [] as transactionObject[],
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
    getAccount(state) {
      return state.account;
    },
    getBalance(state) {
      return state.balance;
    },
    getTransaction(state) {
      return state.transaction;
    },
    getTransactions(state) {
      return state.transactions;
    },
  },
  actions: {
    setLoading(isLoading: boolean) {
      this.loading = isLoading;
    },
    setConnected(connected: boolean) {
      this.connected = connected;
    },
    setWallet(wallet: object) {
      this.wallet = wallet;
    },
    setAccount(account: string) {
      this.account = account;
    },
    setBalance(balance: number) {
      this.balance = balance;
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
  },
});
