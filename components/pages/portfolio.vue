<template>
  <div class="container">
    <b-card no-body>
      <b-row>
        <b-col md="4">
          <b-card-img src="/noimage.png" alt="Card image"></b-card-img>
        </b-col>
        <b-col md="8">
          <b-card-body class="description">
            <b-card-text>
              <h3>
                <nuxt-link :to="path">{{ title }}</nuxt-link>
              </h3>
              {{ show }}</b-card-text
            >
            <b-button v-if="isOwner" class="edit float-right" variant="primary"
              >編集</b-button
            >
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<style>
.card {
  margin: 10px 0;
  padding: 0;
  box-shadow: 10px 10px 10px rgba(122, 130, 141, 0.4);
}
.description {
  height: 100%;
}
.edit {
  margin: 0 0 10px 0;
}
</style>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  props: {
    id: {
      type: Number,
      default: null,
      required: true
    },
    title: {
      type: String,
      default:
        '名古屋工業大学白松研究室でグラフィックファシリテーションをしました',
      required: true
    },
    show: {
      type: String,
      default:
        '2019年2月30日、\n白松研究室の修士卒記念に残りの1ヶ月で大学生活を送る後輩が喜ぶアプリを作ろうと、\n2019年度卒の5人が集まって会議を行いました。\nその際、私はグラフィックファシリテーションの取入れを提案し、1時間の会議の進行と記録を行いました。',
      required: true
    },
    graphickerId: {
      type: Number,
      default: 0,
      required: true
    }
  },
  data() {
    return {
      path: '/graphicker/' + this.graphickerId
    }
  },
  computed: {
    isOwner() {
      return this.graphicker ? this.graphicker.id === this.graphickerId : false
    },
    ...mapState('sessionGraphicker', {
      graphicker: 'graphicker'
    })
  }
})
</script>
