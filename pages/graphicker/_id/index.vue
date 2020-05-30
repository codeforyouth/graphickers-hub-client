<template>
  <b-container>
    <b-jumbotron :header="title" :lead="leadMessage" />
    <navbar />
    <p v-if="isGraphickerLoading">
      Now Loading...
    </p>
    <main v-if="!isGraphickerLoading">
      <section>
        <h2>グラフィッカー情報</h2>
        <b-card no-body>
          <b-row>
            <b-col md="4">
              <b-card-img
                :src="avatarUrl"
                alt="Card image"
              ></b-card-img> </b-col
            ><b-col md="8">
              <b-card-body>
                <b-card-text>
                  <h2 class="name">{{ graphicker.name }}</h2>
                  <section class="self-introduction">
                    <h5>- 自己紹介</h5>
                    <p>{{ graphicker.introduction }}</p>
                  </section>
                  <section class="equipment">
                    <h5>- 道具紹介</h5>
                    <p>{{ graphicker.equipment }}</p>
                  </section>
                  <section class="contact">
                    <h5>- 連絡先</h5>
                    <p>{{ graphicker.email }}</p>
                  </section>
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </section>
      <section>
        <h2>作品・実績情報</h2>
        <p v-if="isPortfoliosLoading">Now Loading...</p>
        <portfoliosList :portfolios="portfolios" />
      </section>
    </main>
    <pageFooter />
    <sessionModals />
    <editPortfolioImageModal />
    <editPortfolioModal />
    <deletePortfolioModal />
  </b-container>
</template>

<style>
.name {
  margin-bottom: 20px;
}
section {
  margin: 30px 0 0 0;
}
</style>

<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import navbar from '~/components/pages/navbar.vue'
import pageFooter from '~/components/pages/pageFooter.vue'
import portfoliosList from '~/components/pages/portfoliosList.vue'
import sessionModals from '~/components/modal/sessionModals.vue'
import editPortfolioImageModal from '~/components/modal/editPortfolioImageModal.vue'
import editPortfolioModal from '~/components/modal/editPortfolioModal.vue'
import deletePortfolioModal from '~/components/modal/deletePortfolioModal.vue'

export default Vue.extend({
  components: {
    navbar,
    pageFooter,
    sessionModals,
    editPortfolioImageModal,
    editPortfolioModal,
    deletePortfolioModal,
    portfoliosList
  },
  fetch({ store }) {
    store.commit('sessionGraphicker/setSessionFromCookie')
  },
  computed: {
    title() {
      return this.graphicker.name + " - Graphicker's Hub"
    },
    leadMessage() {
      return this.graphicker.name + 'さんのページです'
    },
    avatarUrl() {
      return this.graphicker.avatar_url
        ? this.graphicker.avatar_url
        : '/noimage.png'
    },
    ...mapState('graphickers', {
      graphicker: 'graphicker',
      ErrorMessage: 'ErrorMessage',
      isError: 'isError',
      isGraphickerLoading: 'isLoading'
    }),
    ...mapState('portfolios', {
      portfolios: 'portfolios',
      isPortfoliosLoading: 'isLoading'
    })
  },
  mounted() {
    this.getOne({ id: this.$route.params.id })
    this.fetchGraphickerPortfolios({ graphickerId: this.$route.params.id })
  },
  methods: {
    ...mapActions('graphickers', {
      getOne: 'fetchGraphicker'
    }),
    ...mapActions('portfolios', {
      fetchGraphickerPortfolios: 'fetchGraphickerPortfolios'
    })
  }
})
</script>
