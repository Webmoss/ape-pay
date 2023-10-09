<template>
  <div id="notifications-card" class="card">
    <table>
      <tr>
        <th>Notification ID</th>
        <th>Wallet</th>
        <th>Type</th>
        <th>Description</th>
        <th>Fee</th>
        <th>Fee Token</th>
        <th>Amount</th>
        <th>Paid To</th>
        <th>Date</th>
      </tr>
      <template v-if="notifications.length > 0">
        <tr
          v-for="notification in notifications"
          :key="notification.notification_id"
        >
          <td>{{ notification.notification_id }}</td>
          <td>{{ notification.wallet_address }}</td>
          <td>{{ notification.type }}</td>
          <td>{{ notification.description }}</td>
          <td>{{ notification.fee }}</td>
          <td>{{ notification.feeToken }}</td>
          <td>{{ notification.amount }}</td>
          <td>{{ notification.paid_to }}</td>
          <td>{{ notification.updated_date }}</td>
        </tr>
      </template>
      <template v-else>
        <tr colspan="9">
          <td colspan="9">
            No notification results available...please try agai
          </td>
        </tr>
      </template>
    </table>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStore } from "@/store";

const store = useStore();
const { notifications } = storeToRefs(store);
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

.card {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  padding: 1em;
  border-radius: 16px;
  border: 1px solid $white;
  color: $black;
  background: $white;

  table {
    width: 100%;
    border-radius: 16px;
    border: 1px solid $black;
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid $white;
    border-collapse: collapse;
  }
  th,
  td {
    background-color: $white;
    padding: 4px 6px;
  }
}
</style>
