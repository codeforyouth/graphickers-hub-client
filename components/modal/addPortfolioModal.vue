<template>
  <b-modal id="bv-modal-add-portfolio" title="作品・実績追加" hide-footer>
    <b-form @submit="addPortfolio">
      <b-form-group
        label="イベント名"
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

      <b-form-group label="イベント詳細" label-for="show-input">
        <b-form-textarea
          id="show-input"
          v-model="newPortfolio.show"
          placeholder="どういうイベントか。
どういうところに気を付けたか。
使っているツールは何か。etc…"
          rows="3"
          type="text"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group label="場所" label-for="place-input">
        <b-form-input
          id="title-input"
          v-model="newPortfolio.place"
          type="text"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="日付" label-for="event-date-input">
        <b-form-input
          id="event-date-input"
          v-model="newPortfolio.eventDate"
          type="date"
        ></b-form-input>
      </b-form-group>

      <b-button class="float-right" type="submit" variant="primary"
        >作品・実績追加</b-button
      >
    </b-form>
  </b-modal>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'

export default Vue.extend({
  fetch({ store }) {
    store.commit('sessionGraphicker/setSessionFromCookie')
  },
  data() {
    return {
      newPortfolio: {
        title: '',
        show: '',
        place: '',
        eventDate: '',
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
    async addPortfolio(event) {
      event.preventDefault()

      await this.createPortfolios({
        title: this.newPortfolio.title,
        show: this.newPortfolio.show,
        place: this.newPortfolio.place,
        eventDate: this.newPortfolio.eventDate,
        graphickerId: this.graphickerId,
        token: this.token,
      })

      // 登録失敗
      if (this.isError) {
        return
      }

      await this.fetchGraphickerPortfolios({ graphickerId: this.graphickerId })

      this.$bvModal.hide('bv-modal-add-portfolio')
    },
    ...mapActions('portfolios', {
      createPortfolios: 'createPortfolios',
      fetchGraphickerPortfolios: 'fetchGraphickerPortfolios',
    }),
  },
})
</script>
