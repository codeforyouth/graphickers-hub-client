<template>
  <div class="container">
    <header class="jumbotron">
      <h1>Graphicker's Hub</h1>
      <p>グラフィックレコーダー、グラフィックファシリテータと繋がる！！</p>
    </header>
    <main>
      <graphickersList />
      <nav>
        <ul class="pagination justify-content-center">
          <li class="page-item"><a class="page-link" href="#">Previous</a></li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
      </nav>
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
  },
  data() {
    return {
      name: '渡辺 賢',
      introduction: 'Code for Nagoya, Aichi, Youthで活躍中。'
    }
  }
})
</script>
