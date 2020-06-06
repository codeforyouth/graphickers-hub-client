<template>
  <b-modal id="bv-modal-delete-portfolio" title="作品・実績削除" hide-footer>
    <b-form @submit="deletePortfolio">
      <p>{{ title }}を削除しても宜しいですか。</p>

      <b-button class="float-right" type="submit" variant="danger"
        >削除</b-button
      >
    </b-form>
  </b-modal>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'

export default Vue.extend({
  data() {
    return {
      graphickerId: this.$store.getters['sessionGraphicker/getId'],
      token: this.$store.getters['sessionGraphicker/getToken']
    }
  },
  computed: {
    ...mapGetters('portfolios', {
      getId: 'getId',
      getTitle: 'getTitle'
    }),
    title() {
      return this.getTitle
    }
  },
  methods: {
    async deletePortfolio(event) {
      event.preventDefault()

      await this.destroyPortfolio({
        id: this.getId,
        graphickerId: this.graphickerId,
        token: this.token
      })

      // 削除失敗
      if (this.isUpdateError) {
        return
      }

      await this.fetchGraphickerPortfolios({ graphickerId: this.graphickerId })

      this.$bvModal.hide('bv-modal-delete-portfolio')
    },
    ...mapActions('portfolios', {
      destroyPortfolio: 'destroyPortfolio',
      fetchGraphickerPortfolios: 'fetchGraphickerPortfolios'
    })
  }
})
</script>
