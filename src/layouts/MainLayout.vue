<template>
  <div>
    <Loader v-if="loading" />
    <div v-else>
      <!-- app-main-layout  -->
      <Navbar @click="isOpen = !isOpen" />

      <Sidebar v-model="isOpen" :key="locale" />

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view />
        </div>
      </main>
    </div>

  </div>
</template>

<script>

import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'
import messages from '@/utils/messages'

export default {
  name: 'main-layout',
  data: () => ({
    isOpen: false,
    loading: true
  }),
  async mounted() {
    if (!this.$store.getters.info.bill || !this.$store.getters.info.name) {
      await this.$store.dispatch('fetchInfo')
    }

    this.loading = false
  },
  components: {
    Navbar,
    Sidebar
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
    locale() {
      return this.$store.getters.info.locale
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    },
    '$route' () {
      this.isOpen = false
    }
  }
}
</script>
