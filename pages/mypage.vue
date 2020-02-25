<template>
  <b-container>
    <b-jumbotron
      header="MyPage - Graphicker's Hub"
      lead="グラフィッカー情報ページです"
    />
    <navbar />
    <main>
      <b-form @submit="onSubmit" @reset="toggleUpdateMode">
        <h2>登録内容</h2>
        <p v-if="isUpdateMode">変更する箇所を入力してください。</p>
        <b-form-group label="- Avatar" label-for="avatar-input">
          <b-form-file
            v-if="isUpdateMode"
            id="avatar-input"
            v-model="form.avatarName"
            placeholder="Choose a file or drop it here..."
            @change="onUpload()"
          ></b-form-file>
          <b-img v-if="!isUpdateMode" :src="avatarUrl" alt="Avatar"></b-img>
        </b-form-group>

        <b-form-group label="- Email" label-for="email-input">
          <b-form-input
            v-if="isUpdateMode"
            id="email-input"
            v-model="form.email"
            type="text"
          ></b-form-input>
          <span v-if="!isUpdateMode">{{ form.email }}</span>
        </b-form-group>

        <b-form-group label="- Introduction" label-for="introduction-input">
          <b-form-textarea
            v-if="isUpdateMode"
            id="introduction-input"
            v-model="form.introduction"
            rows="3"
            type="text"
          ></b-form-textarea>
          <span v-if="!isUpdateMode">{{ form.introduction }}</span>
        </b-form-group>

        <b-form-group
          v-if="isUpdateMode"
          label="- NewPassword"
          label-for="new-password-input"
        >
          <b-form-input
            id="new-password-input"
            v-model="form.newpassword"
            type="password"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          v-if="isUpdateMode"
          label="- NewPasswordConfirmation"
          label-for="new-password-confirmation-input"
          invalid-feedback="Password Confirmation is required"
        >
          <b-form-input
            id="new-password-confirmation"
            v-model="form.newPasswordConfirmation"
            type="password"
          ></b-form-input>
        </b-form-group>

        <span v-if="isUpdateError" class="error-message">{{
          ErrorMessage
        }}</span>

        <div class="right">
          <b-button-group>
            <b-button v-if="!isUpdateMode" variant="primary" type="reset"
              >登録内容変更</b-button
            >
            <b-button v-if="isUpdateMode" variant="secondary" type="reset"
              >取消</b-button
            >
            <b-button v-if="isUpdateMode" type="submit" variant="primary"
              >更新</b-button
            >
          </b-button-group>
        </div>
      </b-form>
    </main>
    <pageFooter />
    <modals />
  </b-container>
</template>

<style>
.error-message {
  color: #ff0000;
}
.main {
  margin: 20px 0;
}

.right:after {
  content: '';
  display: table;
}
.right:after {
  clear: both;
}
.right > * {
  float: right;
}
</style>

<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import navbar from '~/components/pages/navbar.vue'
import pageFooter from '~/components/pages/pageFooter.vue'
import modals from '~/components/modal/modals.vue'

export default Vue.extend({
  components: {
    navbar,
    pageFooter,
    modals
  },
  fetch({ store }) {
    store.commit('sessionGraphicker/setSessionFromCookie')
  },
  data() {
    return {
      form: {
        avatar: null,
        avatarName: null,
        email: this.$store.getters['sessionGraphicker/getEmail'],
        introduction: this.$store.getters['sessionGraphicker/getIntroduction'],
        newPassword: '',
        newPasswordConfirmation: ''
      },
      id: this.$store.getters['sessionGraphicker/getId'],
      token: this.$store.getters['sessionGraphicker/getToken'],
      isUpdateMode: false
    }
  },
  computed: {
    avatarUrl() {
      return this.graphicker.avatar_url
        ? this.graphicker.avatar_url
        : '/noimage.png'
    },
    ...mapState('sessionGraphicker', {
      graphicker: 'graphicker',
      isUpdateError: 'isUpdateError'
    })
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()

      // 更新処理
      await this.updateGraphicker({
        id: this.id,
        email: this.form.email ? this.form.email : null,
        introduction: this.form.introduction ? this.form.introduction : null,
        newPassword: this.form.newPassword ? this.form.newPassword : null,
        newPasswordConfirmation: this.form.newPasswordConfirmation
          ? this.form.newPasswordConfirmation
          : null,
        avatar: this.form.avatar,
        token: this.token
      })

      this.toggleUpdateMode()
    },
    onUpload() {
      this.form.avatar = event.target.files[0]
    },
    toggleUpdateMode() {
      event.preventDefault()

      this.form.email = this.$store.getters['sessionGraphicker/getEmail']
      this.form.introduction = this.$store.getters[
        'sessionGraphicker/getIntroduction'
      ]
      this.form.newPassword = ''
      this.form.newPasswordConfirmation = ''

      this.isUpdateMode = !this.isUpdateMode
    },
    ...mapActions('sessionGraphicker', {
      updateGraphicker: 'updateGraphicker'
    })
  }
})
</script>
