<template>
  <div>
    <div class="page-title">
      <h3>{{'Sites'|localize}}</h3>
    </div>
    <section>
      <Loader v-if="loading"/>
      <div class="row" v-else>
        <SiteCreate @created="addNewSite"/>

        <SiteEdit
          v-if="sites.length"
          :sites="sites"
          :key="sites.length + updateCount"
          @updated="updateSites"
        />
        <p v-else class="center">{{'NoSites'|localize}}</p>
      </div>
    </section>
  </div>
</template>

<script>
import SiteCreate from '@/components/SiteCreate'
import SiteEdit from '@/components/SiteEdit'

export default {
  name: 'sites',
  metaInfo() {
    return {
      title: this.$title('Menu_Sites')
    }
  },
  data: () => ({
    sites: [],
    loading: true,
    updateCount: 0
  }),
  async mounted() {
    this.sites = await this.$store.dispatch('fetchSites')
    this.loading = false
  },
  components: {
    SiteCreate,
    SiteEdit
  },
  methods: {
    addNewSite(site) {
      this.sites.push(site)
    },
    updateSites(site) {
      const idx = this.sites.findIndex(s => s.id === site.id)
      this.sites[idx].siteName = site.SiteName
      this.updateCount++
    }
  }
}
</script>
