<template>
  <b-modal id="bv-modal-signup" title="新規登録" centered hide-footer>
    <b-form @submit="onSubmit" @reset="onReset">
      <h2>新規登録</h2>
      <b-form-group
        label="Name"
        label-for="name-input"
        invalid-feedback="Name is required"
      >
        <b-form-input
          id="name-input"
          v-model="signup.name"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Email"
        label-for="email-input"
        invalid-feedback="Email is required"
      >
        <b-form-input
          id="email-input"
          v-model="signup.email"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Password"
        label-for="password-input"
        invalid-feedback="Password is required"
      >
        <b-form-input
          id="password-input"
          v-model="signup.password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>

      <span v-if="isSignupError" class="error-message">{{ ErrorMessage }}</span>

      <b-button class="float-right" type="submit" variant="primary"
        >新規登録</b-button
      >
    </b-form>
  </b-modal>
</template>

<style>
.error-message {
  color: #ff0000;
}
</style>

<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'

export default Vue.extend({
  data() {
    return {
      signup: {
        name: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState('session', {
      session: 'session',
      ErrorMessage: 'ErrorMessage',
      isSignupError: 'isSignupError'
    })
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()

      // 新規登録処理
      await this.signupGraphicker({
        name: this.signup.name,
        password: this.signup.password
      })

      // 新規登録失敗
      if (this.isSignupError) {
        return
      }

      this.$bvModal.hide('bv-modal-signup')
    },
    onReset(event) {
      event.preventDefault()

      // フォームのリセット
      this.signup.name = ''
      this.signup.password = ''
    },
    ...mapActions({
      signupGraphicker: 'session/signupGraphicker'
    })
  }
})
</script>
