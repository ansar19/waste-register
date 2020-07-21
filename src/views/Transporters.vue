<template>
  <div>
    <div class="page-title">
      <h5>{{'Transporters'|localize}}</h5>
    </div>
    <section>
      <Loader v-if="loading"/>
      <div class="row" v-else>
        <TransporterCreate @created="addNewTransporter"/>

        <TransporterEdit
          v-if="transporters.length"
          :transporters="transporters"
          :key="transporters.length + updateCount"
          @updated="updateTransporters"
        />
        <p v-else class="center">{{'NoTransporters'|localize}}</p>
      </div>
    </section>
  </div>
</template>

<script>
import TransporterCreate from '@/components/TransporterCreate'
import TransporterEdit from '@/components/TransporterEdit'

export default {
  name: 'transporters',
  metaInfo() {
    return {
      title: this.$title('Menu_Transporters')
    }
  },
  data: () => ({
    transporters: [],
    loading: true,
    updateCount: 0
  }),
  async mounted() {
    this.transporters = await this.$store.dispatch('fetchTransporters')
    this.loading = false
  },
  components: {
    TransporterCreate,
    TransporterEdit
  },
  methods: {
    addNewTransporter(transporter) {
      this.transporters.push(transporter)
    },
    updateTransporters(transporter) {
      const idx = this.transporters.findIndex(t => t.id === transporter.id)
      this.transporters[idx].title = transporter.title
      this.updateCount++
    }
  }
}
</script>
