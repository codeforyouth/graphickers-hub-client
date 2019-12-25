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
  </b-container>
</template>

<script>
import Vue from 'vue'
import navbar from '~/components/pages/navbar.vue'
import pageFooter from '~/components/pages/pageFooter.vue'
import graphickersList from '~/components/pages/graphickersList.vue'

export default Vue.extend({
  components: {
    graphickersList,
    navbar,
    pageFooter
  },
  fetch({ store }) {
    store.commit('sessionGraphicker/setSessionFromCookie')
  }
})
</script>
