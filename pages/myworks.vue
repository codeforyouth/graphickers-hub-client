<template>
  <b-container>
    <b-jumbotron
      header="MyWorks - Graphicker's Hub"
      lead="作品・実績情報ページです"
    />
    <navbar />
    <main>
      <b-button block variant="primary" @click="showAddPerfomanceModal"
        >作品・実績追加</b-button
      ><b-modal
        id="bv-modal-add-performance"
        title="作品・実績追加"
        hide-footer
      >
        <b-form-group
          label="Title"
          label-for="title-input"
          invalid-feedback="Title is required"
        >
          <b-form-input
            id="title-input"
            v-model="newPerformance.title"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Show" label-for="show-input">
          <b-form-textarea
            id="show-input"
            v-model="newPerformance.show"
            rows="3"
            type="text"
          ></b-form-textarea>
        </b-form-group>
      </b-modal>
    </main>
    <pageFooter />
  </b-container>
</template>

<script>
import Vue from 'vue'
import navbar from '~/components/pages/navbar.vue'
import pageFooter from '~/components/pages/pageFooter.vue'

export default Vue.extend({
  components: {
    navbar,
    pageFooter
  },
  data() {
    return {
      newPerformance: {
        title: ''
      }
    }
  },
  methods: {
    showAddPerfomanceModal() {
      this.$bvModal.show('bv-modal-add-performance')
    }
  }
})
</script>
