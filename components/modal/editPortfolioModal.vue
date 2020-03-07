<template>
  <b-modal id="bv-modal-edit-portfolio" title="作品・実績編集" hide-footer>
    <b-form @submit="editPortfolio">
      <b-form-group
        label="Title"
        label-for="title-input"
        invalid-feedback="Title is required"
      >
        <b-form-input
          id="title-input"
          v-model="editPortfolio.title"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Show" label-for="show-input">
        <b-form-textarea
          id="show-input"
          v-model="editPortfolio.show"
          rows="3"
          type="text"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group label="Avatar" label-for="avatar-input">
        <b-form-file
          id="avatar-input"
          v-model="editPortfolio.avatarNames"
          placeholder="Choose a file or drop it here..."
          multiple
          @change="onUpload()"
        ></b-form-file>
      </b-form-group>

      <b-button class="float-right" type="submit" variant="primary"
        >作品・実績編集</b-button
      >
    </b-form>
  </b-modal>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      editPortfolio: {
        title: '',
        show: '',
        avatars: null,
        avatarNames: null
      },
      path: '/graphicker/' + this.graphickerId
    }
  }
})
</script>
