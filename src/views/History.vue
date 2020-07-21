<template>
  <div>
    <div class="page-title">
      <h5>{{'History_Title'|localize}}</h5>
      <p class="subcomponent-title">{{ companyName }}</p>
    </div>


    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      {{'NoRecords'|localize}}.
      <router-link to="/record">{{'AddFirst'|localize}}</router-link>
    </p>

    <section v-else>
      <div class="row">
        <div class="col-lg-12">
          <router-link to="/record">
            <button class="btn-sm btn-primary float-right">{{'Menu_NewRecord'|localize}}</button>
          </router-link>
        </div>
      </div>
      
      <FilteredTable :records="items" />

    </section>
  </div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin'
import HistoryTable from '@/components/HistoryTable'
import FilteredTable from '@/components/FilteredTable'

import { Doughnut } from 'vue-chartjs'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'history',
  metaInfo() {
    return {
      title: this.$title('Menu_History')
    }
  },
  extends: Doughnut,
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: []
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    const categoires = await this.$store.dispatch('fetchCategories')
    const sites = await this.$store.dispatch('fetchSites')
    const transporters = await this.$store.dispatch('fetchTransporters')
    const utilizators = await this.$store.dispatch('fetchUtilizators')

    this.setup(categoires, sites, transporters, utilizators)

    this.loading = false
  },
  methods: {
    setup(categoires, sites, transporters, utilizators) {
      this.setupPagination(
        this.records.map(record => {
          return {
            ...record,
            categoryName: categoires.find(c => c.id === record.categoryId)
              .title,
            wasteColor: categoires.find(
              c => c.id === record.categoryId
            ).wasteColor,
            typeClass: record.type === 'income' ? 'green' : 'orange',
            transpoterName: transporters.find(
              t => t.id === record.transporterId
            ).title,
            typeText:
              record.type === 'income'
                ? localizeFilter('Income')
                : localizeFilter('Outcome'),
            siteName: sites.find(s => s.id === record.siteId).siteName,
            utilizatorName: utilizators.find(u => u.id === record.utilizatorId)
            // .title,
          }
        })
      )
    }
  },
  computed: {
    companyName() {
      return this.$store.getters.info.companyName
    },
    // IE 11 or later
    format(date) {
      var month = date.toLocaleString('en-US', { month: 'short' })
      return date.getDate() + ' ' + month + ' ' + date.getFullYear()
    }
  },
  components: {
    HistoryTable,
    FilteredTable
  }
}
</script>
