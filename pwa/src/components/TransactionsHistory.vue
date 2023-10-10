<template>
  <div id="transactions-card" class="card">
    <table>
      <tr>
        <th>Transaction ID</th>
        <th>Wallet</th>
        <th>Type</th>
        <th>Description</th>
        <th>Fee</th>
        <th>Fee Token</th>
        <th>Amount</th>
        <th>Paid To</th>
        <th>Date</th>
      </tr>
      <template v-if="transactions.length > 0">
        <tr
          v-for="transaction in transactions"
          :key="transaction.transaction_id"
        >
          <td>{{ transaction.transaction_id }}</td>
          <td>{{ transaction.wallet_address }}</td>
          <td>{{ transaction.type }}</td>
          <td>{{ transaction.description }}</td>
          <td>{{ transaction.fee }}</td>
          <td>{{ transaction.feeToken }}</td>
          <td>{{ transaction.amount }}</td>
          <td>{{ transaction.paid_to }}</td>
          <td>{{ transaction.updated_date }}</td>
        </tr>
      </template>
      <template v-else>
        <tr colspan="9">
          <td colspan="9">No transaction results available</td>
        </tr>
      </template>
    </table>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { useStore } from "@/store";

  const store = useStore();
  const { transactions } = storeToRefs(store);
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
