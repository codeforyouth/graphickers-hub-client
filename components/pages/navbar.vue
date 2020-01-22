<template>
  <div class="wrapper">
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand href="#">Graphicker's Hub</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="'/'">ホーム</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="検索"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >検索</b-button
            >
          </b-nav-form>

          <b-nav-item-dropdown v-if="isLogin" right>
            <template v-slot:button-content>
              <em>{{
                graphicker.name ? graphicker.name : 'グラフィッカーページ'
              }}</em>
            </template>
            <b-dropdown-item :to="mypage">グラフィッカー情報</b-dropdown-item>
            <b-dropdown-item :to="myworks">作品・実績情報</b-dropdown-item>
            <b-dropdown-item @click="logout">ログアウト</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-navbar-nav v-else right>
            <b-nav-item @click="showSignupModal">新規登録</b-nav-item>
            <b-nav-item @click="showLoginModal">ログイン</b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <loginModal />
    <signupModal />
  </div>
</template>

<style>
.wrapper {
  margin: 0 0 20px 0;
}
</style>

<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import loginModal from '~/components/pages/loginModal.vue'
import signupModal from '~/components/pages/signupModal.vue'

export default Vue.extend({
  components: {
    loginModal,
    signupModal
  },
  data() {
    return {
      isOpenLoginModal: false,
      visible: false,
      mypage: '/mypage',
      myworks: '/myworks'
    }
  },
  computed: {
    ...mapState('sessionGraphicker', {
      graphicker: 'graphicker',
      isLogin: 'isLogin'
    })
  },
  methods: {
    showLoginModal() {
      this.$bvModal.show('bv-modal-login')
    },
    showSignupModal() {
      this.$bvModal.show('bv-modal-signup')
    },
    logout() {
      this.logoutGraphicker({
        id: this.graphicker.id,
        token: this.graphicker.token
      })
    },
    ...mapActions('sessionGraphicker', {
      logoutGraphicker: 'logoutGraphicker',
      loadCurrentSession: 'loadCurrentSession'
    })
  }
})
</script>
