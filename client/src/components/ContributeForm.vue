<template>
  <div class="contributeform">
    <b-form v-if="!submitted" @submit.prevent="addContribution">
      <b-card class="mb-3">Send the nominated BTC amount to the address below.</b-card>
      <b-alert show variant="primary"><b>Address:</b> {{pool.address_btc}}</b-alert>
      <b-form-group
        id="email"
        label="Email address:"
        label-for="email"
      >
        <b-form-input
          id="email"
          v-model="form.email"
          placeholder="Enter email"
          @change.native="setEmail($event.target.value)"
          :state="$v.form.email.$dirty ? !$v.form.email.$invalid : null"
          aria-describedby="email-feedback"
        ></b-form-input>
        <b-form-invalid-feedback id="email-feedback">
          Please enter a valid email address.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        id="notes"
        label="Notes:"
        label-for="notes"
        description="Notes will be publicly visable."
      >
        <b-form-input
          id="notes"
          v-model="form.notes"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="amt"
        label="Amount"
        label-for="amt"
      >
        <b-input-group prepend="USD" class="mb-2 mr-sm-2 mb-sm-0">
          <b-form-input
            v-model="form.amt"
            id="amt"
            v-debounce:350ms="getSellPrice"
            @change.native="setAmt($event.target.value)"
            :state="$v.form.amt.$dirty ? !$v.form.amt.$invalid : null"
            aria-describedby="amt-feedback"
          >
          </b-form-input>
          <b-form-invalid-feedback id="amt-feedback">
            Enter a valid integer or decimal amount.
          </b-form-invalid-feedback>
        </b-input-group>
      </b-form-group>
      <b-alert v-if="!$v.form.amt.$invalid" show variant="primary"><b>BTC:</b> {{ this.btc_amt }}</b-alert>
      <b-form-group>
        <b-tooltip target="txid-tooltip-icon" title="A transaction ID is generated when you complete a transfer."></b-tooltip>
        <label for="txid">Transaction ID <font-awesome-icon id="txid-tooltip-icon" icon="question-circle"/></label>
        <b-form-input
          v-model.trim="form.txid"
          id="txid"
          @change.native="setTxid($event.target.value)"
          :state="$v.form.txid.$dirty ? !$v.form.txid.$invalid : null"
          aria-describedby="txid-feedback"
        ></b-form-input>
        <b-form-invalid-feedback id="txid-feedback">
          Invalid transaction ID.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-button type="submit" variant="primary" :disabled="$v.form.$invalid">Contribute</b-button>
    </b-form>
    <div v-else>
      <b-alert show variant="success">Your contribution was successfully submitted.
      <br /><br />Your contribution will remain in a pending state until your transaction has been verified. This may take up to 24 hours.
      </b-alert>
      <b-button variant="primary" @click="reset">Continue</b-button>
    </div>
    <b-alert v-if="error" show variant="danger" class="mt-2">An error occured whilst submitting your contribution.</b-alert>
  </div>
</template>

<script>
import { required, email, decimal, alphaNum, minValue } from "vuelidate/lib/validators";

export default {
  name: "ContributeForm",
  props: {
    pool: Object
  },
  data() {
    return {
      form: {},
      btc_amt: null,
      submitted: false,
      error: false
    }
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      amt: {
        required,
        decimal,
        minValue: minValue(0.01)
      },
      txid: {
        required,
        alphaNum
      }
    }
  },
  methods: {
    setEmail(value) {
      this.form.email = value;
      this.$v.form.email.$touch();
    },
    setAmt(value) {
      this.form.amt = value;
      this.$v.form.amt.$touch();
    },
    setTxid(value) {
      this.form.txid = value;
      this.$v.form.txid.$touch();
    },
    addContribution() {
      const self = this;
      this.$recaptcha("addcontribution").then((token) => {
        this.$http
          .post(`http://localhost:3000/pool/${this.pool.id}/contributions/add`, { ...this.form, token })
          .then(response => {
            console.log(response);
            self.submitted = true;
            self.error = false;
          })
          .catch(function(error) {
            console.log(error);
            self.error = true;
          });
        });
    },
    getSellPrice() {
      this.$http
      .get(`http://localhost:3000/rates/sell/BTC-USD`)
      .then(response => {
        const btc_amt = this.form.amt / response.data.data.amount;
        if (btc_amt)
          this.btc_amt = btc_amt;
      })
      .catch(function(error) {
        console.log(error);
      });
    },
    reset() {
      this.form = { email: "", amt: 0, notes: "" };
      this.submitted = false;
      this.$v.form.$reset();
    }
  }
}
</script>
    