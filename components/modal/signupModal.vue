<template>
  <b-modal id="bv-modal-signup" title="新規登録" centered hide-footer>
    <b-form @submit="onSubmit" @reset="onReset">
      <h2>新規登録</h2>
      <b-form-group
        label="アカウント名"
        label-for="name-input"
        invalid-feedback="アカウント名は必須です"
      >
        <b-form-input
          id="name-input"
          v-model="signup.name"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="メールアドレス"
        label-for="email-input"
        invalid-feedback="メールアドレスは必須です"
      >
        <b-form-input
          id="email-input"
          v-model="signup.email"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="パスワード"
        label-for="password-input"
        invalid-feedback="パスワードは必須です"
      >
        <b-form-input
          id="password-input"
          v-model="signup.password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="パスワード(確認)"
        label-for="password-confirmation-input"
        invalid-feedback="パスワード(確認)は必須です"
      >
        <b-form-input
          id="confirmation"
          v-model="signup.passwordConfirmation"
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
        email: '',
        password: '',
        passwordConfirmation: ''
      }
    }
  },
  computed: {
    ...mapState('sessionGraphicker', {
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
        email: this.signup.email,
        password: this.signup.password,
        passwordConfirmation: this.signup.passwordConfirmation
      })

      // 新規登録失敗
      if (this.isSignupError) {
        return
      }

      // ログイン処理
      await this.loginGraphicker({
        name: this.signup.name,
        password: this.signup.password
      })

      this.$bvModal.hide('bv-modal-signup')

      this.$router.push('/mypage')
    },
    onReset(event) {
      event.preventDefault()

      // フォームのリセット
      this.signup.name = ''
      this.signup.email = ''
      this.signup.password = ''
      this.signup.passwordConfirmation = ''
    },
    ...mapActions('sessionGraphicker', {
      signupGraphicker: 'createGraphicker',
      loginGraphicker: 'loginGraphicker'
    })
  }
})
</script>
