import { defineStore } from "pinia";

export const useStore = defineStore({
  id: "store",
  state: () => ({
    loading: false,
    account: null,
    balance: null,
    transaction: null,
    transactions: [],
  }),
  getters: {
    isLoading(state) {
      return state.loading;
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
