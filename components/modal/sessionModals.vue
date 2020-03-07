<template>
  <div>
    <loginModal />
    <signupModal />
  </div>
</template>

<script>
import Vue from 'vue'
import loginModal from '~/components/modal/loginModal.vue'
import signupModal from '~/components/modal/signupModal.vue'

export default Vue.extend({
  components: {
    loginModal,
    signupModal
  }
})
</script>
