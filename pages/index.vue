<template>
  <div class="container">
    <header class="jumbotron">
      <h1>Graphicker's Hub</h1>
      <p>グラフィックレコーダー、グラフィックファシリテータと繋がる！！</p>
    </header>
    <main>
      <graphickersList />
    </main>
    <footer></footer>
  </div>
</template>

<script>
import Vue from 'vue'
import graphickersList from '~/components/pages/graphickersList.vue'

export default Vue.extend({
  components: {
    graphickersList
  }
})
</script>
