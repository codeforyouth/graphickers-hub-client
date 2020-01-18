<template>
  <b-container>
    <b-jumbotron :header="title" :lead="leadMessage" />
    <navbar />
    <main>
      <section>
        <h2>グラフィッカー情報</h2>
        <b-card img-src="/noimage.png" img-left>
          <b-card-text>
            <h2 class="name">{{ graphicker.name }}</h2>
            <section class="self-introduction">
              <h5>- 自己紹介</h5>
              <p>{{ graphicker.introduction }}</p>
            </section>
            <section class="contact">
              <h5>- 連絡先</h5>
              <p>{{ graphicker.email }}</p>
            </section>
          </b-card-text>
        </b-card>
      </section>
      <section>
        <h2>作品・実績情報</h2>
        <portfoliosList :portfolios="portfolios" />
      </section>
    </main>
    <pageFooter />
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

export default Vue.extend({
  components: {
    navbar,
    pageFooter,
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
    ...mapState('graphickers', {
      graphicker: 'graphicker',
      ErrorMessage: 'ErrorMessage',
      isError: 'isError'
    }),
    ...mapState('portfolios', {
      portfolios: 'portfolios'
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
