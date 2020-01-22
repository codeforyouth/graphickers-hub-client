<template>
  <div class="container">
    <b-card>
      <b-card-img :src="avatarUrl" alt="Card image"></b-card-img>
      <b-card-text class="introduction">
        <h3>
          <nuxt-link :to="path">{{ name }}</nuxt-link>
        </h3>
        {{ selfIntroduction }}
      </b-card-text>
    </b-card>
  </div>
</template>

<style>
.card {
  padding: 0;
  box-shadow: 10px 10px 10px rgba(122, 130, 141, 0.4);
}
</style>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    id: {
      type: Number,
      default: null,
      required: true
    },
    avatar: {
      type: String,
      default: null,
      required: false
    },
    email: {
      type: String,
      default: 'none@none.com',
      required: true
    },
    name: {
      type: String,
      default: '名無し',
      required: true
    },
    introduction: {
      type: String,
      default: '自己紹介はありません',
      required: false
    }
  },
  data() {
    return {
      path: '/graphicker/' + this.id
    }
  },
  computed: {
    selfIntroduction() {
      return this.introduction ? this.introduction : '自己紹介はありません'
    },
    avatarUrl() {
      return this.avatar ? this.avatar : '/noimage.png'
    }
  }
})
</script>
