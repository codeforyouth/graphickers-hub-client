<template>
  <div class="wrapper">
    <div class="inner">
      <h3 class="graphickerName">
        <nuxt-link :to="path">{{ name }}</nuxt-link>
      </h3>
      <span class="graphickerEmail">{{ email }}</span>
      <div class="imageWrapper">
        <svg
          class="bd-placeholder-img mr-3 graphickerImage"
          width="256"
          height="181"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
          aria-label="Placeholder: 256x181"
        >
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#868e96" />
          <text x="50%" y="50%" fill="#dee2e6" dx="-3.5ex" dy="0.5em">
            256x181
          </text>
        </svg>
      </div>
      <div class="introduction">
        {{ introduction }}
      </div>
    </div>
  </div>
</template>

<style>
.wrapper {
  padding: 1ex;
}
.inner {
  border: solid 1px #000000;
  border-radius: 10px;
  padding: 2ex;
}
.graphickerName {
  padding: 1ex 0 0 1ex;
}
.graphickerEmail {
  padding: 1ex 0 0 2ex;
  color: #777777;
}
.imageWrapper {
  padding: 2ex;
}
.graphickerImage {
  width: 100%;
  height: 70%;
}
.introduction {
  padding: 0 0 0 2ex;
}
</style>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    id: {
      type: Number,
      default: null
    },
    email: {
      type: String,
      default: 'none@none.com'
    },
    name: {
      type: String,
      default: '名無し'
    },
    introduction: {
      type: String,
      default: '自己紹介はありません'
    }
  },
  data() {
    return {
      path: '/graphicker/' + this.id
    }
  }
})
</script>
