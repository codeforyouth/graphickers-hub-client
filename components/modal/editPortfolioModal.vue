<template>
  <b-modal id="bv-modal-edit-portfolio" title="作品・実績編集" hide-footer>
    <b-form @submit="editPortfolio">
      <b-form-group
        label="イベント名"
        label-for="title-input"
        invalid-feedback="Title is required"
      >
        <b-form-input
          id="title-input"
          v-model="title"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="イベント詳細" label-for="show-input">
        <b-form-textarea
          id="show-input"
          v-model="show"
          placeholder="どういうイベントか。
どういうところに気を付けたか。
使っているツールは何か。etc…"
          rows="3"
          type="text"
        ></b-form-textarea>
      </b-form-group>

      <b-button class="float-right" type="submit" variant="primary"
        >作品・実績編集</b-button
      >
    </b-form>
  </b-modal>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'

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
      getTitle: 'getTitle',
      getShow: 'getShow'
    }),
    title: {
      get() {
        return this.getTitle
      },
      set(val) {
        this.setTitle(val)
      }
    },
    show: {
      get() {
        return this.getShow
      },
      set(val) {
        this.setShow(val)
      }
    }
  },
  methods: {
    async editPortfolio(event) {
      event.preventDefault()

      await this.updatePortfolio({
        id: this.getId,
        title: this.title,
        show: this.show,
        graphickerId: this.graphickerId,
        token: this.token
      })

      // 登録失敗
      if (this.isUpdateError) {
        return
      }

      await this.fetchGraphickerPortfolios({ graphickerId: this.graphickerId })

      this.$bvModal.hide('bv-modal-edit-portfolio')
    },
    ...mapActions('portfolios', {
      updatePortfolio: 'updatePortfolio',
      fetchGraphickerPortfolios: 'fetchGraphickerPortfolios'
    }),
    ...mapMutations('portfolios', {
      setTitle: 'setTitle',
      setShow: 'setShow'
    })
  }
})
</script>
