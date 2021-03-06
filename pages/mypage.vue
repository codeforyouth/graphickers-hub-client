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
        <b-form-group label="- アバター" label-for="avatar-input">
          <b-button class="avatar_upload" @click="triggerAvatarUpload">
            <b-img :src="avatarUrl" alt="Avatar"></b-img>
          </b-button>
          <b-form-file
            id="new-avatar"
            v-model="newFile"
            plain
            @change="onAvatarUpload()"
          ></b-form-file>
        </b-form-group>

        <p v-if="isUpdateMode">変更する箇所を入力してください。</p>

        <b-form-group
          label="- メールアドレス"
          label-for="email-input"
          invalid-feedback="メールアドレスは'hogehoge@example.com'という形式で入力してください"
        >
          <b-form-input
            v-if="isUpdateMode"
            id="email-input"
            v-model="form.email"
            :state="checkEmail"
            type="text"
          ></b-form-input>
          <span v-if="!isUpdateMode">{{ form.email }}</span>
        </b-form-group>

        <b-form-group
          label="- 興味・関心のある分野"
          label-for="introduction-input"
        >
          <b-form-textarea
            v-if="isUpdateMode"
            id="introduction-input"
            v-model="form.introduction"
            placeholder="どんな仕事を受けてみたいか"
            rows="3"
            type="text"
          ></b-form-textarea>
          <span v-if="!isUpdateMode">{{ form.introduction }}</span>
        </b-form-group>

        <b-form-group
          label="- 使っている道具(ペン・ペンケース等)"
          label-for="equipment-input"
        >
          <b-form-textarea
            v-if="isUpdateMode"
            id="equipment-input"
            v-model="form.equipment"
            placeholder="使っているペンは何か。
イベントの際にペンをどのように持ち運ぶか。
ペン以外に何か使っているか"
            rows="3"
            type="text"
          ></b-form-textarea>
          <span v-if="!isUpdateMode">{{ form.equipment }}</span>
        </b-form-group>

        <b-form-group
          v-if="isUpdateMode"
          label="- 新パスワード"
          label-for="new-password-input"
          invalid-feedback="パスワードは8文字以上で入力してください"
        >
          <b-form-input
            id="new-password-input"
            v-model="form.newPassword"
            :state="checkPassword"
            type="password"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          v-if="isUpdateMode"
          label="- 新パスワード確認"
          label-for="new-password-confirmation-input"
          invalid-feedback="パスワードが一致していません"
        >
          <b-form-input
            id="new-password-confirmation"
            v-model="form.newPasswordConfirmation"
            :state="checkPasswordConfirmation"
            type="password"
          ></b-form-input>
        </b-form-group>

        <span v-if="isError" class="error-message">{{ ErrorMessage }}</span>

        <div class="right">
          <b-button-group>
            <b-button
              v-if="!isUpdateMode"
              variant="danger"
              @click="destroyGraphicker"
              >アカウント削除</b-button
            >
            <b-button v-if="!isUpdateMode" variant="primary" type="reset"
              >登録内容変更</b-button
            >
            <b-button v-if="isUpdateMode" variant="secondary" type="reset"
              >変更取消</b-button
            >
            <b-button v-if="isUpdateMode" type="submit" variant="primary"
              >更新</b-button
            >
          </b-button-group>
        </div>
      </b-form>
    </main>
    <pageFooter />
    <sessionModals />
    <deleteGraphickerModal />
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

.avatar_upload {
  border: none;
  padding: 0;
}

#new-avatar {
  display: none;
}
</style>

<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import navbar from '~/components/pages/navbar.vue'
import pageFooter from '~/components/pages/pageFooter.vue'
import sessionModals from '~/components/modal/sessionModals.vue'
import deleteGraphickerModal from '~/components/modal/deleteGraphickerModal.vue'

export default Vue.extend({
  components: {
    navbar,
    pageFooter,
    sessionModals,
    deleteGraphickerModal
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
        equipment: this.$store.getters['sessionGraphicker/getEquipment'],
        newPassword: '',
        newPasswordConfirmation: ''
      },
      id: this.$store.getters['sessionGraphicker/getId'],
      newFile: null,
      token: this.$store.getters['sessionGraphicker/getToken'],
      isUpdateMode: false
    }
  },
  computed: {
    checkEmail() {
      return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        this.form.email
      )
    },
    checkPassword() {
      return (
        this.form.newPassword.length === 0 || this.form.newPassword.length > 7
      )
    },
    checkPasswordConfirmation() {
      return this.form.newPassword === this.form.newPasswordConfirmation
    },
    avatarUrl() {
      return this.graphicker.avatar_url
        ? this.graphicker.avatar_url
        : '/noimage.png'
    },
    ...mapState('sessionGraphicker', {
      graphicker: 'graphicker',
      isError: 'isError',
      ErrorMessage: 'ErrorMessage'
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
        equipment: this.form.equipment ? this.form.equipment : null,
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
    triggerAvatarUpload() {
      const newAvatarInput = document.querySelector('#new-avatar')
      newAvatarInput.click()
    },
    async onAvatarUpload() {
      const avatar = event.target.files[0]

      await this.updateGraphickerAvatar({
        id: this.id,
        avatar,
        graphickerId: this.graphickerId,
        token: this.token
      })

      // 登録失敗
      if (this.isError) {
        return
      }

      this.newFile = null
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
    destroyGraphicker() {
      this.$bvModal.show('bv-modal-delete-graphicker')
    },
    ...mapActions('sessionGraphicker', {
      updateGraphicker: 'updateGraphicker',
      updateGraphickerAvatar: 'updateGraphickerAvatar'
    })
  }
})
</script>
