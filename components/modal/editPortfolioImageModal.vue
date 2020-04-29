<template>
  <b-modal
    id="bv-modal-edit-portfolio-image"
    size="xl"
    title="作品・実績画像編集"
    hide-footer
  >
    <div v-for="avatar in avatars" :key="avatar" class="avatar">
      <b-button
        class="delete_button"
        pill
        variant="danger"
        @click="deleteAvatar(avatar)"
        >X</b-button
      >
      <b-img :src="avatar" alt="avatar image"></b-img>
    </div>
    <b-form-file
      id="new-avatar"
      v-model="newFile"
      placeholder="画像の追加"
      drop-placeholder="画像をここにドロップ"
      browse-text="選択"
      size="lg"
      @change="onUpload()"
    ></b-form-file>
  </b-modal>
</template>

<style>
.avatar {
  position: relative;
}

.avatar > .delete_button {
  position: absolute;
  top: 1ex;
  left: 1ex;
}

#new-avatar {
  position: relative;
  margin: 3ex 0;
}
</style>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'

export default Vue.extend({
  data() {
    return {
      newFile: null
    }
  },
  computed: {
    ...mapGetters('portfolios', {
      id: 'getId',
      getAvatars: 'getAvatars'
    }),
    ...mapGetters('sessionGraphicker', {
      graphickerId: 'getId',
      token: 'getToken'
    }),
    avatars: {
      get() {
        return this.getAvatars
      },
      set(val) {}
    }
  },
  methods: {
    async deleteAvatar(avatar) {
      const avatarIndex = this.avatars.indexOf(avatar)

      await this.deletePortfolioImage({
        id: this.id,
        avatarIndex,
        graphickerId: this.graphickerId,
        token: this.token
      })

      // 登録失敗
      if (this.isCreateError) {
        return
      }

      await this.fetchPortfolio({ id: this.id })
      await this.fetchGraphickerPortfolios({ graphickerId: this.graphickerId })
    },
    async onUpload() {
      const avatar = event.target.files[0]

      await this.appendPortfolioImage({
        id: this.id,
        avatar,
        graphickerId: this.graphickerId,
        token: this.token
      })

      // 登録失敗
      if (this.isCreateError) {
        return
      }

      this.newFile = null
      await this.fetchPortfolio({ id: this.id })
      await this.fetchGraphickerPortfolios({ graphickerId: this.graphickerId })
    },
    ...mapActions('portfolios', {
      appendPortfolioImage: 'appendPortfolioImage',
      deletePortfolioImage: 'deletePortfolioImage',
      fetchPortfolio: 'fetchPortfolio',
      fetchGraphickerPortfolios: 'fetchGraphickerPortfolios'
    })
  }
})
</script>
