<template>
  <div class="graphickers-list container">
    <div class="row">
      <graphicker
        :id="id"
        class="col-lg-4 col-md-12"
        :name="name"
        :introduction="introduction"
      />
      <graphicker
        :id="id"
        class="col-lg-4 col-md-12"
        :name="name"
        :introduction="introduction"
      />
      <graphicker
        :id="id"
        class="col-lg-4 col-md-12"
        :name="name"
        :introduction="introduction"
      />
    </div>
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
      id: 'sensu_watson',
      name: '渡辺 賢',
      introduction: 'Code for Nagoya, Aichi, Youthで活躍中。'
    }
  }
})
</script>
