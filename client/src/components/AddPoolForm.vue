<template>
  <div id="addpoolform">
    <b-form v-if="!submitted" @submit.prevent="addPool">
      <b-form-group
        label="Title:"
        label-for="title"
      >
      <b-form-input
        id="title"
        v-model="form.title"
        @change.native="setTitle($event.target.value)"
        :state="$v.form.title.$dirty ? !$v.form.title.$invalid : null"
        aria-describedby="title-feedback"
      ></b-form-input>
      <b-form-invalid-feedback id="title-feedback">
        A title is required.
      </b-form-invalid-feedback>  
      </b-form-group>
      <b-form-group
        label="URL:"
        label-for="url"
        description="If a URL exists for the content, include it here."
      >
      <b-form-input
        id="url"
        v-model="form.url"
        @change.native="setUrl($event.target.value)"
        :state="$v.form.url.$dirty ? !$v.form.url.$invalid : null"
        aria-describedby="url-feedback"
      ></b-form-input>
      <b-form-invalid-feedback id="url-feedback">
        The URL you entered is invalid. Please use full URL (including http://).
      </b-form-invalid-feedback>  
      </b-form-group>
      <b-form-group
        label="Description:"
        label-for="description"
      >
        <b-form-textarea
          id="description"
          v-model="form.description"
          placeholder="Describe the content you are aiming to purchase."
          rows="3"
          max-rows="6"
          @change.native="setDescription($event.target.value)"
          :state="$v.form.description.$dirty ? !$v.form.description.$invalid : null"
          aria-describedby="description-feedback"
        ></b-form-textarea>
      <b-form-invalid-feedback id="description-feedback">
        A description is required. Description should be at least 50 characters in length.
      </b-form-invalid-feedback>  
      </b-form-group>
      <b-form-group
        label="Target Amount"
        label-for="goal"
      >
      <b-input-group prepend="USD" class="mb-2 mr-sm-2 mb-sm-0">
        <b-input
          v-model="form.goal"
          id="goal"
          @change.native="setGoal($event.target.value)"
          :state="$v.form.goal.$dirty ? !$v.form.goal.$invalid : null"
          aria-describedby="goal-feedback"
        ></b-input>
      <b-form-invalid-feedback id="goal-feedback">
        A valid funding goal is required.
      </b-form-invalid-feedback>  
      </b-input-group>     
      </b-form-group>
      <b-button
        type="submit"
        :disabled="$v.form.$invalid"
        variant="primary"
      >Add Pool
      </b-button>
    </b-form>
    <b-alert v-else show variant="success">Your Pool was successfully submitted for verification.</b-alert>
    <b-alert v-if="error" show variant="danger" class="mt-2">An error occured whilst submitting your pool.</b-alert>
  </div>
</template>

<script>
import { required, url, decimal, minValue, minLength, alpha } from "vuelidate/lib/validators";

export default {
  name: 'AddPoolForm',
  data() {
    return {
      form: {
          title: '',
          url: '',
          description: '',
          goal: 0
      },
      submitted: false,
      error: false
    }
  },
  validations: {
    form: {
      title: {
        required,
        alpha
      },
      url: {
        url
      },
      description: {
        required,
        minLength: minLength(50)
      },
      goal: {
        decimal,
        minValue: minValue(0.1)
      }
    }
  },
  methods: {
    setUrl(value) {
      this.form.url = value;
      this.$v.form.url.$touch();
    },
    setTitle(value) {
      this.form.title = value;
      this.$v.form.title.$touch();
    },
    setDescription(value) {
      this.form.description = value;
      this.$v.form.description.$touch();
    },
    setGoal(value) {
      this.form.goal = value;
      this.$v.form.goal.$touch();
    },
    addPool() {
      const self = this;
      this.$recaptcha("addpool").then((token) => {
        this.$http
          .post("http://localhost:3000/pool/add", { ...this.form, token })
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
    }
  }
}
</script>
