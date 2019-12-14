<template>
  <b-modal id="bv-modal-login" title="ログイン" centered hide-footer>
    <b-form @submit="onSubmit" @reset="onReset">
      <h2>ログイン</h2>
      <b-form-group
        label="Name"
        label-for="name-input"
        invalid-feedback="Name is required"
      >
        <b-form-input
          id="name-input"
          v-model="login.name"
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
          v-model="login.password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>

      <span v-if="isLoginError" class="error-message">{{ ErrorMessage }}</span>

      <b-button class="float-right" type="submit" variant="primary"
        >ログイン</b-button
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
      login: {
        name: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState('session', {
      session: 'session',
      ErrorMessage: 'ErrorMessage',
      isLoginError: 'isLoginError'
    })
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()

      // ログイン処理
      await this.loginGraphicker({
        name: this.login.name,
        password: this.login.password
      })

      // ログイン失敗
      if (this.isLoginError) {
        return
      }

      this.$bvModal.hide('bv-modal-login')
    },
    onReset(event) {
      event.preventDefault()

      // フォームのリセット
      this.login.name = ''
      this.login.password = ''
    },
    ...mapActions({
      loginGraphicker: 'session/loginGraphicker'
    })
  }
})
</script>
