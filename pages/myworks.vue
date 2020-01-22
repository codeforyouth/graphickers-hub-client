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
      <b-modal id="bv-modal-add-portfolio" title="作品・実績追加" hide-footer>
        <b-form @submit="addPortfolio">
          <b-form-group
            label="Title"
            label-for="title-input"
            invalid-feedback="Title is required"
          >
            <b-form-input
              id="title-input"
              v-model="newPortfolio.title"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Show" label-for="show-input">
            <b-form-textarea
              id="show-input"
              v-model="newPortfolio.show"
              rows="3"
              type="text"
            ></b-form-textarea>
          </b-form-group>

          <b-form-group label="Avatar" label-for="avatar-input">
            <b-form-file
              id="avatar-input"
              v-model="newPortfolio.avatarNames"
              placeholder="Choose a file or drop it here..."
              multiple
              @change="onUpload()"
            ></b-form-file>
          </b-form-group>

          <b-button class="float-right" type="submit" variant="primary"
            >作品・実績追加</b-button
          >
        </b-form>
      </b-modal>
    </main>
    <pageFooter />
  </b-container>
</template>

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
  data() {
    return {
      newPortfolio: {
        title: '',
        show: '',
        avatars: null,
        avatarNames: null
      },
      graphickerId: this.$store.getters['sessionGraphicker/getId'],
      token: this.$store.getters['sessionGraphicker/getToken']
    }
  },
  computed: {
    ...mapState('sessionGraphicker', {
      graphicker: 'graphicker'
    }),
    ...mapState('portfolios', {
      portfolios: 'portfolios',
      isCreateError: 'isCreateError'
    })
  },
  mounted() {
    this.fetchGraphickerPortfolios({ graphickerId: this.graphickerId })
  },
  methods: {
    showAddPortfolioModal() {
      this.$bvModal.show('bv-modal-add-portfolio')
    },
    onUpload() {
      this.form.avatars = event.target.files
    },
    async addPortfolio(event) {
      event.preventDefault()

      await this.createPortfolios({
        title: this.newPortfolio.title,
        show: this.newPortfolio.show,
        avatars: this.newPortfolio.avatars,
        graphickerId: this.graphickerId,
        token: this.token
      })

      // 登録失敗
      if (this.isCreateError) {
        return
      }

      this.$bvModal.hide('bv-modal-add-portfolio')
    },
    ...mapActions('portfolios', {
      createPortfolios: 'createPortfolios',
      fetchGraphickerPortfolios: 'fetchGraphickerPortfolios'
    })
  }
})
</script>
