<template>
  <b-container>
    <b-jumbotron
      header="MyWorks - Graphicker's Hub"
      lead="作品・実績情報ページです"
    />
    <navbar />
    <main>
      <portfoliosList :portfolios="portfolios" />
      <b-button block variant="primary" @click="showAddPortfolioModal"
        >作品・実績追加</b-button
      >
    </main>
    <pageFooter />
    <sessionModals />
    <addPortfolioModal />
    <editPortfolioModal />
    <editPortfolioImageModal />
    <deletePortfolioModal />
  </b-container>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import navbar from '~/components/pages/navbar.vue'
import pageFooter from '~/components/pages/pageFooter.vue'
import portfoliosList from '~/components/pages/portfoliosList.vue'
import sessionModals from '~/components/modal/sessionModals.vue'
import addPortfolioModal from '~/components/modal/addPortfolioModal.vue'
import editPortfolioModal from '~/components/modal/editPortfolioModal.vue'
import editPortfolioImageModal from '~/components/modal/editPortfolioImageModal.vue'
import deletePortfolioModal from '~/components/modal/deletePortfolioModal.vue'

export default Vue.extend({
  components: {
    navbar,
    pageFooter,
    portfoliosList,
    sessionModals,
    addPortfolioModal,
    editPortfolioModal,
    editPortfolioImageModal,
    deletePortfolioModal,
  },
  fetch({ store }) {
    store.commit('sessionGraphicker/setSessionFromCookie')
  },
  data() {
    return {
      newPortfolio: {
        title: '',
        show: '',
        avatars: null,
        avatarNames: null,
      },
      graphickerId: this.$store.getters['sessionGraphicker/getId'],
      token: this.$store.getters['sessionGraphicker/getToken'],
    }
  },
  computed: {
    ...mapState('sessionGraphicker', {
      graphicker: 'graphicker',
    }),
    ...mapState('portfolios', {
      portfolios: 'portfolios',
      isError: 'isError',
    }),
  },
  mounted() {
    this.fetchGraphickerPortfolios({ graphickerId: this.graphickerId })
  },
  methods: {
    showAddPortfolioModal() {
      this.$bvModal.show('bv-modal-add-portfolio')
    },
    onUpload() {
      this.newPortfolio.avatars = event.target.files
    },
    async addPortfolio(event) {
      event.preventDefault()

      await this.createPortfolios({
        title: this.newPortfolio.title,
        show: this.newPortfolio.show,
        avatars: this.newPortfolio.avatars,
        graphickerId: this.graphickerId,
        token: this.token,
      })

      // 登録失敗
      if (this.isError) {
        return
      }

      this.$bvModal.hide('bv-modal-add-portfolio')
    },
    ...mapActions('portfolios', {
      createPortfolios: 'createPortfolios',
      fetchGraphickerPortfolios: 'fetchGraphickerPortfolios',
    }),
  },
})
</script>
