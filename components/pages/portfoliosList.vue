<template>
  <div class="portfolios-list">
    <b-form inline>
      <label class="mr-sm-2" for="sort">並び替え</label>
      <b-form-select
        id="sort"
        v-model="portfoliosOrder"
        class="mb-2 mr-sm-2 mb-sm-0"
        :options="orderOpt"
        @change="changePortfoliosOrder"
      ></b-form-select>

      <label class="mr-sm-2" for="ascdesc">昇順・降順</label>
      <b-form-select
        id="ascdesc"
        v-model="portfoliosAscDesc"
        class="mb-2 mr-sm-2 mb-sm-0"
        :options="ascDescOpt"
        @change="changePortfoliosOrder"
      ></b-form-select>
    </b-form>
    <portfolio
      v-for="portfolio in portfolios"
      :id="portfolio.id"
      :key="portfolio.id"
      :title="portfolio.title"
      :show="portfolio.show"
      :place="portfolio.place"
      :event-date="portfolio.event_date"
      :avatars="portfolio.avatars_url"
      :graphicker-id="portfolio.graphicker_id"
    />
  </div>
</template>

<style>
.portfolios-list {
  margin: 20px 0;
}
</style>

<script>
import Vue from 'vue'
import { mapActions, mapMutations, mapGetters } from 'vuex'
import portfolio from '~/components/pages/portfolio.vue'

export default Vue.extend({
  components: {
    portfolio,
  },
  props: {
    portfolios: {
      type: Array,
      default: null,
      required: true,
    },
  },
  data() {
    return {
      orderOpt: [
        { value: 'id', text: '登録順' },
        { value: 'event_date', text: '開催日順' },
      ],
      ascDescOpt: [
        { value: 'asc', text: '昇順' },
        { value: 'desc', text: '降順' },
      ],
    }
  },
  computed: {
    ...mapGetters('graphickers', {
      getGraphickerId: 'getId',
    }),
    ...mapGetters('portfolios', {
      getPortfoliosOrder: 'getPortfoliosOrder',
      getPortfoliosAscDesc: 'getPortfoliosAscDesc',
    }),
    portfoliosOrder: {
      get() {
        return this.getPortfoliosOrder
      },
      set(val) {
        this.setPortfoliosOrder(val)
      },
    },
    portfoliosAscDesc: {
      get() {
        return this.getPortfoliosAscDesc
      },
      set(val) {
        this.setPortfoliosAscDesc(val)
      },
    },
  },
  methods: {
    ...mapActions('portfolios', {
      fetchGraphickerPortfolios: 'fetchGraphickerPortfolios',
    }),
    ...mapMutations('portfolios', {
      setPortfoliosOrder: 'setPortfoliosOrder',
      setPortfoliosAscDesc: 'setPortfoliosAscDesc',
    }),
    changePortfoliosOrder() {
      const graphickerId = this.getGraphickerId
      const ordering = this.getPortfoliosOrder
      const ascdesc = this.getPortfoliosAscDesc
      this.fetchGraphickerPortfolios({ graphickerId, ordering, ascdesc })
    },
  },
})
</script>
