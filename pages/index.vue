<template>
  <b-container>
    <b-jumbotron
      header="Graphicker's Hub"
      lead="グラフィックレコーダー、グラフィックファシリテータと繋がる！！"
    />
    <navbar />
    <main>
      <graphickersList />
    </main>
    <pageFooter />
    <modals />
  </b-container>
</template>

<script>
import Vue from 'vue'
import navbar from '~/components/pages/navbar.vue'
import pageFooter from '~/components/pages/pageFooter.vue'
import graphickersList from '~/components/pages/graphickersList.vue'
import modals from '~/components/modal/modals.vue'

export default Vue.extend({
  components: {
    graphickersList,
    navbar,
    pageFooter,
    modals
  },
  fetch({ store }) {
    store.commit('sessionGraphicker/setSessionFromCookie')
  }
})
</script>
