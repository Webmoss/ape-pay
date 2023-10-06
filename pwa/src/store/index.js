import { defineStore } from "pinia";

export const useStore = defineStore({
  id: "store",
  state: () => ({
    loading: false,
    account: null,
    balance: null,
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
  },
});
