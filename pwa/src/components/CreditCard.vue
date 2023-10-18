<template>
  <div id="credit-card" class="card">
    <div v-if="tab === 'credit-card'" class="payment-form">
      <div class="input-row">
        <label for="firstName">First Name</label>
        <input
          v-model="creditCard.firstName"
          name="firstName"
          type="text"
          class="address-input"
          placeholder="ex. John"
        />
      </div>
      <div class="input-row">
        <label for="lastName">Last Name</label>
        <input
          v-model="creditCard.lastName"
          name="lastName"
          type="text"
          class="address-input"
          placeholder="ex. Smith"
        />
      </div>
      <div class="input-row">
        <label for="currency">Currency</label>
        <select v-model="creditCard.currency" class="iso-code">
          <option disabled value="-1" selected>Select payment currency</option>
          <option v-for="option in currencies" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
      <div class="input-row">
        <label for="isoCode">ISO Country Code</label>
        <select v-model="creditCard.isoCode" class="iso-code">
          <option disabled value="-1" selected>Select ISO code</option>
          <option v-for="option in isoCodes" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
      <div class="button-container-end margin-top">
        <button class="blue-button-sml" @click="swtichTab('payment')">Next</button>
      </div>
    </div>
    <div v-if="tab === 'payment'" class="payment-form">
      <div class="input-row">
        <label for="address">Send To</label>
        <input
          v-model="form.address"
          name="address"
          type="text"
          class="address-input"
          placeholder="Sent to address"
        />
      </div>
      <div class="input-row">
        <label for="amount">Amount</label>
        <input
          v-model="form.amount"
          name="amount"
          type="text"
          class="amount-input"
          placeholder="Enter an amount"
        />
      </div>
      <div class="input-row">
        <label for="message">Message</label>
        <textarea
          v-model="form.message"
          name="message"
          type="text"
          class="message-input"
          placeholder="Add an optional message"
        />
      </div>
      <div class="balance-container">
        <span class="account-balance">
          <div class="account-total">
            <span class="account-icon">
              <img src="@/assets/images/Apecoin-Icon.png" height="24" />
            </span>
            {{
              apecoinBalance ? parseFloat(apecoinBalance).toFixed(4) : parseFloat("0").toFixed(4)
            }}
          </div>
        </span>
        <span class="account-balance">
          <div class="account-total">
            <span class="account-icon circle">
              <img src="@/assets/images/eth-diamond-black.png" height="24" />
            </span>
            {{ ethBalance ? parseFloat(ethBalance).toFixed(4) : parseFloat("0").toFixed(4) }}
          </div>
        </span>
      </div>
      <div class="checkbox-row">
        <input v-model="form.fees" name="fees" type="checkbox" class="checkbox-input" />
        <label for="fees" class="checkbox-label">Pay fees with ApeCoin</label>
      </div>
      <div class="button-container-end">
        <button v-if="connected" class="grey-button-sml" @click="swtichTab('credit-card')">
          Back
        </button>
        <button v-if="connected" class="green-button-sml" :disabled="disabled" @click="makePayment">
          Pay Now
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Currency, OrderState, PaymentStandard } from "@monerium/sdk";
  import SafeApiKit from "@safe-global/api-kit";
  import { MoneriumPack } from "@safe-global/onramp-kit";
  import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
  import { ethers } from "ethers";
  import { Notyf } from "notyf";
  import { storeToRefs } from "pinia";
  import { onMounted, onUnmounted, ref } from "vue";

  import { useStore } from "@/store";

  const store = useStore();
  const { connected, ethBalance, apecoinBalance } = storeToRefs(store);

  const txServiceUrl =
    process.env.NODE_ENV && process.env.NODE_ENV === "development"
      ? "https://safe-transaction-goerli.safe.global"
      : "https://safe-transaction-mainnet.safe.global";

  /* Create an instance of Notyf */
  const notyf = new Notyf({
    duration: 5000,
    position: {
      x: "center",
      y: "bottom",
    },
    types: [
      {
        type: "loading",
        background: "orange",
        duration: 15000,
        dismissible: false,
        icon: {
          className: "icon icon-loading",
          tagName: "i",
        },
      },
      {
        type: "success",
        background: "green",
        duration: 20000,
        dismissible: false,
        icon: {
          className: "icon icon-success",
          tagName: "i",
        },
      },
      {
        type: "error",
        background: "indianred",
        duration: 10000,
        dismissible: false,
        icon: {
          className: "icon icon-error",
          tagName: "i",
        },
      },
    ],
  });

  const disabled = ref(false);
  const orderState = ref();
  const tab = ref("credit-card");

  const currencies = ref([
    { value: "eur", label: "Euro" },
    { value: "usd", label: "USD" },
    { value: "gbp", label: "Pounds" },
    { value: "isk", label: "Kronur" },
  ]);

  const isoCodes = ref([
    { value: "US", label: "United States" },
    { value: "GB", label: "Great Britain" },
    { value: "FR", label: "France" },
    { value: "ZA", label: "South Africa" },
  ]);

  const creditCard = ref({
    firstName: "",
    lastName: "",
    currency: "usd",
    isoCode: "US",
  });

  const form = ref({
    address: "",
    amount: "",
    message: "",
    fees: true,
  });

  const swtichTab = (type: string) => {
    tab.value = type;
  };

  const clearForm = async () => {
    creditCard.value = {
      firstName: "",
      lastName: "",
      currency: "",
      isoCode: "",
    };

    form.value = {
      address: "",
      amount: "",
      message: "",
      fees: true,
    };
  };

  const moneriumPack = ref();

  const makePayment = async () => {
    /* Init loading indicator */
    const loadingIndicator = notyf.open({
      type: "loading",
      message: "⏳ Processing payment now...please wait!",
    });
    /* Disable our Pay Now button */
    disabled.value = true;

    try {
      const { ethereum } = window;
      if (!ethereum) {
        throw Error();
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      const safeOwner = provider.getSigner(0);
      const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: safeOwner,
      });

      const safeService = new SafeApiKit({ txServiceUrl, ethAdapter });
      console.log("safeService", safeService);

      const safeAddress = (await safeOwner.getAddress()).toString();
      console.log("safeAddress", safeAddress);

      const safeSdk = await Safe.create({ ethAdapter, safeAddress: safeAddress });
      console.log("safeSdk", safeSdk);

      const pack = new MoneriumPack({
        clientId: "66d4aa01-6c01-11ee-8fe7-ea5d4f777a10",
        environment: "sandbox",
      });
      console.log("pack", pack);

      await pack.init({
        safeSdk,
      });

      const moneriumClient = await pack.open({
        redirectUrl: "http://localhost:8080/monerium",
      });

      console.log("moneriumClient", moneriumClient);

      pack.subscribe(OrderState.pending, (notification) => {
        orderState.value = notification.meta.state;
      });

      pack.subscribe(OrderState.placed, (notification) => {
        orderState.value = notification.meta.state;
      });

      pack.subscribe(OrderState.rejected, (notification) => {
        orderState.value = notification.meta.state;
        setTimeout(() => {
          orderState.value = undefined;
        }, 5000);
      });

      pack.subscribe(OrderState.processed, (notification) => {
        orderState.value = notification.meta.state;
        setTimeout(() => {
          orderState.value = undefined;
        }, 5000);
      });

      const threshold = await safeSdk.getThreshold();
      console.log("threshold", threshold);

      const owners = await safeSdk.getOwners();
      console.log("owners", owners);

      moneriumPack.value = pack;

      /* Safe account address configured in the safeSdk to link to your Monerium account. */
      await pack.init({ safeSdk });
      const authCode = await moneriumPack.open({ redirectUrl: "https://apepay.netlify.app/" });
      console.log("authCode", authCode);

      const safeMoneriumClient = await pack.open({
        authCode: "66d4aa01-6c01-11ee-8fe7-ea5d4f777a10",
      });

      const authContext = await safeMoneriumClient.getAuthContext();
      const moneriumProfile = await safeMoneriumClient.getProfile(authContext.defaultProfile);
      console.log("moneriumProfile", moneriumProfile);

      const moneriumBalances = await safeMoneriumClient.getBalances();
      console.log("moneriumBalances", moneriumBalances);

      const moneriumOrders = await safeMoneriumClient.getOrders();
      console.log("moneriumOrders", moneriumOrders);

      localStorage.setItem("MONERIUM_TOKEN", safeMoneriumClient.bearerProfile.refresh_token);
      console.log("MONERIUM_TOKEN", localStorage.getItem("MONERIUM_TOKEN"));

      transfer();

      const paymentDate = new Date();
      const paymentDateTimestamp = paymentDate.getTime();
      const paymentDateString = paymentDateTimestamp.toString();
      console.log("Payment Date :", paymentDateString);

      /* Update our Balances */
      store.checkApecoinBalance(safeAddress);
      store.checkETHBalance(safeAddress);

      /* Clear Form */
      clearForm();
      /* Enable our Pay Now button */
      disabled.value = false;
      return;
    } catch (error) {
      notyf.dismiss(loadingIndicator);
      notyf.error("❌ Error processing payment!");
      /* Enable our Pay Now button */
      disabled.value = false;
      return error as string;
    }
  };

  const startMoneriumFlow = async (authCode?: string, refreshToken?: string) => {
    if (!moneriumPack.value) return;

    const moneriumClient = await moneriumPack.value.open({
      redirectUrl: "http://localhost:8080/monerium",
      authCode,
      refreshToken,
    });

    const authContext = await moneriumClient.getAuthContext();
    const profile = await moneriumClient.getProfile(authContext.defaultProfile);
    const balances = await moneriumClient.getBalances();
    const orders = await moneriumClient.getOrders();

    console.group("Monerium data");
    console.log("AuthContext", authContext);
    console.log("Profile", profile);
    console.log("Balances", balances);
    console.log("Orders", orders);
    console.log("Bearer Profile", moneriumClient.bearerProfile);
    console.groupEnd();

    if (moneriumClient.bearerProfile) {
      localStorage.setItem("MONERIUM_TOKEN", moneriumClient.bearerProfile.refresh_token);
    }

    // setMoneriumClient(moneriumClient);
    // setAuthContext(authContext);
  };

  const transfer = async () => {
    const moneriumClient = await moneriumPack.value.open({
      redirectUrl: "http://localhost:3000/monerium",
    });

    const firstName = creditCard.value.firstName;
    console.log("firstName", firstName);

    const lastName = creditCard.value.lastName;
    console.log("lastName", lastName);

    const currency = creditCard.value.currency;
    console.log("currency", currency);

    const isoCode = creditCard.value.isoCode;
    console.log("isoCode", isoCode);

    const destination = form.value.address;
    console.log("destination", destination);

    const amount = ethers.utils.parseUnits(form.value.amount, "ether").toHexString();
    console.log("amount", amount);

    const message = form.value.message;
    console.log("message", message);

    const tx = await moneriumClient.send({
      amount: amount,
      currency: Currency.eur, // You can redeem the currency of your choice. Your Monerium IBAN will be linked to a single token.
      counterpart: {
        identifier: {
          standard: "iban" as PaymentStandard.iban,
          iban,
        },
        details: {
          firstName: firstName,
          lastName: lastName,
          country: isoCode,
        },
      },
      memo: message,
    });
    console.log("New proposed transaction", tx);
    return tx;
  };

  const closeMoneriumFlow = async () => {
    moneriumPack.value?.close();
    localStorage.removeItem("MONERIUM_TOKEN");
  };

  onMounted(async () => {
    const authCode = new URLSearchParams(window.location.search).get("code") || undefined;
    const refreshToken = localStorage.getItem("MONERIUM_TOKEN") || undefined;

    if (authCode || refreshToken) startMoneriumFlow(authCode, refreshToken);
  });

  onUnmounted(async () => {
    closeMoneriumFlow();
  });
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/variables.scss";
  @import "@/assets/styles/mixins.scss";

  .card {
    width: 405px;
    height: 440px;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: flex-start;
    padding: 2em 2em 0;
    border-radius: 16px;
    border: 1px solid $grey-100;
    color: $white;
    background: $black;
  }

  .margin-top {
    margin-top: 10px;
  }
</style>
