<template>
  <b-modal id="bv-modal-delete-graphicker" title="アカウント削除" hide-footer>
    <b-form @submit="deleteGraphicker">
      <p>本当にアカウントを削除しても宜しいですか。</p>

      <b-button class="float-right" type="submit" variant="danger"
        >削除</b-button
      >
    </b-form>
  </b-modal>
</template>

<script>
import Vue from 'vue'
import { mapActions } from 'vuex'

export default Vue.extend({
  data() {
    return {
      graphickerId: this.$store.getters['sessionGraphicker/getId'],
      token: this.$store.getters['sessionGraphicker/getToken'],
    }
  },
  methods: {
    async deleteGraphicker(event) {
      event.preventDefault()

      await this.destroyGraphicker({
        id: this.graphickerId,
        token: this.token,
      })

      // 削除失敗
      if (this.isError) {
        return
      }

      this.$bvModal.hide('bv-modal-delete-portfolio')
      this.$router.push('/')
    },
    ...mapActions('sessionGraphicker', {
      destroyGraphicker: 'destroyGraphicker',
    }),
  },
})
</script>
