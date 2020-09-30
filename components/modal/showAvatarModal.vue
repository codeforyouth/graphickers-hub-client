<template>
  <b-modal id="bv-modal-show-avatar" size="xl" centered hide-footer>
    <b-img class="b-img" :src="imgUrl"></b-img>
  </b-modal>
</template>

<style>
.b-img {
  object-fit: contain;
  width: 100%;
  height: 80vh;

  margin-left: 0;
  margin-right: 0;
}
</style>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState('portfolios', {
      imgUrl: 'avatarUrl',
    }),
  },
})
</script>
