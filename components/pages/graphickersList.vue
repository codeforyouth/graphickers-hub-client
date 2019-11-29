<template>
  <div class="graphickers-list container">
    <div class="row">
      <graphicker
        v-for="graphicker in graphickers"
        :id="graphicker.id"
        :key="graphicker.id"
        :name="graphicker.name"
        :introduction="graphicker.introduction"
        class="col-lg-4 col-md-12"
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
      graphickers: []
    }
  },
  created() {
    this.$store.dispatch('graphickers/fetchGraphickers')
    this.graphickers = this.$store.state.graphickers.list
  }
})
</script>
