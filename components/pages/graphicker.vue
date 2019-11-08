<template>
  <div class="media">
    <svg
      class="bd-placeholder-img mr-3"
      width="64"
      height="64"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
      role="img"
      aria-label="Placeholder: 64x64"
    >
      <title>Placeholder</title>
      <rect width="100%" height="100%" fill="#868e96" />
      <text x="20%" y="50%" fill="#dee2e6" dy=".3em">64x64</text>
    </svg>
    <div class="media-body">
      <h5 class="mt-0">{{ name }}</h5>
      {{ introduction }}
    </div>
  </div>
</template>

<style>
.media {
  border: solid 1px #000000;
  border-radius: 10px;
  padding: 1ex;
}
</style>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    name: {
      type: String,
      default: '名無し'
    },
    introduction: {
      type: String,
      default: '自己紹介はありません'
    }
  }
})
</script>
