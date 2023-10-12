import { defineStore } from "pinia";
import { userObject } from "@/models/user";
import { transactionObject } from "@/models/transaction";
import { notificationObject } from "@/models/notification";

export const useStore = defineStore({
  id: "store",
  state: () => ({
    loading: false,
    connected: false,
    wallet: "",
    safes: [] as string[],
    user: <userObject>{},
    account: "",
    balance: 0,
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
      return state.balance;
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
    setNotification(notification: notificationObject) {
      this.notification = notification;
    },
    setNotifications(notifications: notificationObject[]) {
      this.notifications = notifications;
    },
    addNotifications(...notifications: notificationObject[]) {
      this.notifications.push(...notifications);
    },
  },
});
