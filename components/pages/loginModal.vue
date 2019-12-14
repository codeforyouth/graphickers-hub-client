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

      <b-button class="float-right" type="submit" variant="primary"
        >ログイン</b-button
      >
    </b-form>
  </b-modal>
</template>

<style></style>

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
      graphicker: 'graphicker'
    })
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      this.loginGraphicker({
        name: this.login.name,
        password: this.login.password
      })
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
