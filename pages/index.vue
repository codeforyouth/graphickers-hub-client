<template>
  <div class="container">
    <header class="jumbotron">
      <h1>Graphicker's Hub</h1>
      <p>グラフィックレコーダー、グラフィックファシリテータと繋がる！！</p>
    </header>
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

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>グラフィッカー</em>
            </template>
            <b-dropdown-item @click="showLoginModal">ログイン</b-dropdown-item>
            <b-dropdown-item href="#"
              >{{ session.name }}のページ</b-dropdown-item
            >
            <b-dropdown-item href="#">個人情報</b-dropdown-item>
            <b-dropdown-item href="#">実績情報</b-dropdown-item>
            <b-dropdown-item href="#">ログアウト</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <main>
      <graphickersList />
    </main>
    <footer></footer>
    <loginModal />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import graphickersList from '~/components/pages/graphickersList.vue'
import loginModal from '~/components/pages/loginModal.vue'

export default Vue.extend({
  components: {
    graphickersList,
    loginModal
  },
  data() {
    return {
      isOpenLoginModal: false,
      visible: false
    }
  },
  computed: {
    ...mapState('session', {
      session: 'session'
    })
  },
  methods: {
    showLoginModal() {
      this.$bvModal.show('bv-modal-login')
    }
  }
})
</script>
