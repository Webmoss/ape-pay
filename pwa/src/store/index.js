import { defineStore } from "pinia";

export const useStore = defineStore({
  id: "store",
  state: () => ({
    loading: false,
    wallet: null,
    account: null,
    balance: null,
    transaction: null,
    transactions: [],
  }),
  getters: {
    isLoading(state) {
      return state.loading;
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
    setLoading(value) {
      this.loading = value;
    },
    setWallet(wallet) {
      this.wallet = wallet;
    },
    setAccount(account) {
      this.account = account;
    },
    setBalance(balance) {
      this.balance = balance;
    },
    setTransaction(transaction) {
      this.transaction = transaction;
    },
    setTransactions(transactions) {
      this.transactions = transactions;
    },
    addTransactions(...transactions) {
      this.transactions.push(...transactions);
    },
  },
});
