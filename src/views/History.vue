<template>
  <div>
    <div class="page-title">
      <h3>{{'History_Title'|localize}}</h3>
      <p class="subcomponent-title">{{ companyName }}</p>
    </div>

    <div class="history-chart text-center">
      <p class="text-align-center">{{'Waste_Pie_Title'|localize}}</p>

      <div class="chart-container">
        <canvas ref="canvas"></canvas>
      </div>
    </div>
    <br />
    <hr />
    <br />

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

      this.renderChart({
        labels: categoires.map(c => c.title),
        datasets: [
          {
            label: localizeFilter('CostsForCategories'),
            data: categoires.map(c => {
              return this.records.reduce((total, r) => {
                if (r.categoryId === c.id && r.type === 'outcome') {
                  total += +r.amount
                }
                return total
              }, 0)
            }),
            options: {
              // responsive: false,
              maintainAspectRatio: false
            },
            backgroundColor: [
              'rgba(0, 105, 255, 0.5)',
              'rgba(62, 174, 226, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(217, 199, 255, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(116, 62, 226, 0.5)'
            ],
            borderColor: [
              'rgba(0, 105, 255, 1)',
              'rgba(62, 174, 226, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(217, 199, 255, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(116, 62, 226, 1)'
            ],
            borderWidth: 1
          }
        ]
      })
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

<style scoped>
.chart-container {
  position: relative;
  text-align: center;
  margin: 0 auto;
  max-width: 600px;
  min-width: 320px;
}
</style>
