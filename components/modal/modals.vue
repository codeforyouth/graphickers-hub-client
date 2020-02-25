<template>
  <div>
    <loginModal />
    <signupModal />
    <addPortfolioModal />
  </div>
</template>

<script>
import Vue from 'vue'
import loginModal from '~/components/modal/loginModal.vue'
import signupModal from '~/components/modal/signupModal.vue'
import addPortfolioModal from '~/components/modal/addPortfolioModal.vue'

export default Vue.extend({
  components: {
    loginModal,
    signupModal,
    addPortfolioModal
  }
})
</script>
