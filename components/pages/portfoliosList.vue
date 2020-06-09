<template>
  <div class="portfolios-list">
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
import portfolio from '~/components/pages/portfolio.vue'

export default Vue.extend({
  components: {
    portfolio
  },
  props: {
    portfolios: {
      type: Array,
      default: null,
      required: true
    }
  }
})
</script>
