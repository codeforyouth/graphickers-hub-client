<template>
  <div class="graphickers-list container">
    <span v-if="isError" class="error-message">{{ ErrorMessage }}</span>
    <div class="row">
      <graphicker
        v-for="graphicker in graphickers"
        :id="graphicker.id"
        :key="graphicker.id"
        :email="graphicker.email"
        :name="graphicker.name"
        :introduction="graphicker.introduction"
        class="col-lg-6 col-md-12"
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
import { mapActions, mapState } from 'vuex'
import graphicker from '~/components/pages/graphicker.vue'

export default Vue.extend({
  components: {
    graphicker
  },
  computed: {
    ...mapState({
      graphickers: 'graphickers/graphickers',
      ErrorMessage: 'graphickers/ErrorMessage',
      isError: 'graphickers/isError'
    })
  },
  mounted() {
    this.getList()
  },
  methods: {
    ...mapActions({
      getList: 'graphickers/fetchGraphickers'
    })
  }
})
</script>
