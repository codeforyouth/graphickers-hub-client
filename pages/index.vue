<template>
  <div class="container">
    <header class="jumbotron">
      <h1>Graphicker's Hub</h1>
      <p>グラフィックレコーダー、グラフィックファシリテータと繋がる！！</p>
    </header>
    <main>
      <div class="graphickers-list container">
        <div class="row">
          <graphicker
            class="col-lg-4 col-md-12"
            :name="name"
            :introduction="introduction"
          />
          <graphicker
            class="col-lg-4 col-md-12"
            :name="name"
            :introduction="introduction"
          />
          <graphicker
            class="col-lg-4 col-md-12"
            :name="name"
            :introduction="introduction"
          />
        </div>
      </div>
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

<style>
.graphickers-list {
  padding: 1ex;
}
</style>

<script>
import Vue from 'vue'
import graphicker from '~/components/pages/graphicker.vue'

export default Vue.extend({
  components: {
    graphicker
  },
  data() {
    return {
      name: '渡辺 賢',
      introduction: 'Code for Nagoya, Aichi, Youthで活躍中。'
    }
  }
})
</script>
