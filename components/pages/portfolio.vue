<template>
  <div class="container">
    <b-card no-body>
      <b-row>
        <b-col md="4">
          <b-card-img
            v-if="noAvatars"
            src="/noimage.png"
            alt="Card image"
          ></b-card-img>
          <b-card-img
            v-for="(avatar, index) in avatars"
            :key="index"
            :src="avatar"
            alt="Card image"
            @click="showShowAvatarModal(index)"
          ></b-card-img>
        </b-col>
        <b-col md="8">
          <b-card-body class="description">
            <b-card-text>
              <h3>
                <nuxt-link :to="path">{{ title }}</nuxt-link>
              </h3>
              {{ show }}
            </b-card-text>
            <div class="dateandplace">
              - {{ eventDate ? eventDate : '日付未登録' }} @{{
                place ? place : '場所未登録'
              }}
            </div>
            <div v-if="isOwner" class="float-right editButtonGroup">
              <b-button
                class="edit"
                variant="primary"
                @click="showEditPortfolioImageModal"
                >画像編集</b-button
              >

              <b-button
                class="edit"
                variant="primary"
                @click="showEditPortfolioModal"
                >編集</b-button
              >

              <b-button
                class="edit"
                variant="danger"
                @click="showDeletePortfolioModal"
                >削除</b-button
              >
            </div>
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
.dateandplace {
  width: 100%;
  text-align: right;
}
.editButtonGroup {
  margin-top: 10px;
}
.edit {
  margin: 0 0 10px 0;
}
</style>

<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'

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
    place: {
      type: String,
      default: '',
      required: false
    },
    eventDate: {
      type: String,
      default: '',
      required: false
    },
    avatars: {
      type: Array,
      default: null,
      required: false
    },
    graphickerId: {
      type: Number,
      default: 0,
      required: true
    }
  },
  data() {
    return {
      editPortfolio: {
        title: '',
        show: '',
        place: '',
        eventDate: '',
        avatars: null,
        avatarNames: null
      },
      path: '/graphicker/' + this.graphickerId
    }
  },
  computed: {
    noAvatars() {
      return !this.avatars
    },
    isOwner() {
      return this.graphicker ? this.graphicker.id === this.graphickerId : false
    },
    ...mapState('sessionGraphicker', {
      graphicker: 'graphicker'
    })
  },
  methods: {
    showEditPortfolioImageModal() {
      this.fetchPortfolio({ id: this.id })
      this.$bvModal.show('bv-modal-edit-portfolio-image')
    },
    showEditPortfolioModal() {
      this.fetchPortfolio({ id: this.id })
      this.$bvModal.show('bv-modal-edit-portfolio')
    },
    showDeletePortfolioModal() {
      this.fetchPortfolio({ id: this.id })
      this.$bvModal.show('bv-modal-delete-portfolio')
    },
    showShowAvatarModal(index) {
      this.fetchAvatar({ portfolioId: this.id, avatarId: index })
      this.$bvModal.show('bv-modal-show-avatar')
    },
    ...mapActions('portfolios', {
      fetchPortfolio: 'fetchPortfolio',
      fetchAvatar: 'fetchAvatar'
    })
  }
})
</script>
