<template>
  <form @submit.prevent='submitForm'>
    <div class='form-control' :class='{ errors: !email.isValid }'>
      <label for='email'>Your email</label>
      <input type='email' id='email' v-model.trim='email.val' @blur='clearValidity("email")'>
      <p v-if='!email.isValid'>Email must not be empty</p>
    </div>
    <div class='form-control' :class='{ errors: !message.isValid }'>
      <label for='message'>Messages</label>
      <textarea rows='5' id='message' v-model.trim='message.val' @blur='clearValidity("message")'></textarea>
      <p v-if='!message.isValid'>Email must not be empty</p>
    </div>
    <p v-if='!formIsValid'> Please enter a valid email and non-empty message.</p>
    <div class='actions'>
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>
<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      email: {
        val: '',
        isValid: true
      },
      message: {
        val: '',
        isValid: true
      },
      formIsValid: true

    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.email.val === '' || !this.email.includes('@')) {
        this.email.isValid = false
        this.formIsValid = false;
      }
      if (this.message.val === '') {
        this.message.isValid = false
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      const formData = {
        email: this.email.val,
        message: this.message.val
      }
      this.$emit('save-data', formData);
    }
  }

}
</script>
<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
