<template>
  <div>
    <div class="page-title">
      <h5>{{'Menu_Distribution'|localize}}</h5>
      <!-- <h5>{{info.bill.toFixed(2)}} {{'TON' | localize}}</h5> -->
    </div>

    <!-- <Loader v-if="loading"/> -->

    <!-- <p class="center" v-else-if="!categories.length">
      {{'NoCategories'|localize}}.
      <router-link to="/categories">{{'AddFirst'|localize}}</router-link>
    </p>-->

    <section>
      <div class="history-chart text-center">
        <p class="text-align-center">{{'Waste_Pie_Title'|localize}}</p>

        <div class="chart-container">
          <canvas ref="canvas"></canvas>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin'
import { Doughnut } from 'vue-chartjs'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'distribution',
  extends: Doughnut,
  mixins: [paginationMixin],
  metaInfo() {
    return {
      title: this.$title('Menu_Planning')
    }
  },
  data: () => ({
    loading: true,
    currency: null,
    records: []
  }),
  async mounted() {
    // this.currency = await this.$store.dispatch('fetchCurrency')
    this.records = await this.$store.dispatch('fetchRecords')
    const categoires = await this.$store.dispatch('fetchCategories')
    const sites = await this.$store.dispatch('fetchSites')
    const transporters = await this.$store.dispatch('fetchTransporters')
    const utilizators = await this.$store.dispatch('fetchUtilizators')

    this.setup(categoires, sites, transporters, utilizators)

    this.loading = false
  },
  methods: {
    async refresh() {
      this.loading = true
      // this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    },
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
              '#f44336',
              '#e91e63',
              '#9c27b0',
              '#673ab7',
              '#3f51b5',
              '#2196f3',
              '#03a9f4',
              '#00bcd4',
              '#009688',
              '#4caf50',
              '#ffeb3b',
              '#ffc107',
              '#ff9800',
              '#ff5722',
              '#795548',
              '#9e9e9e',
              '#607d8b'
            ],
            borderColor: [
              '#f44336',
              '#e91e63',
              '#9c27b0',
              '#673ab7',
              '#3f51b5',
              '#2196f3',
              '#03a9f4',
              '#00bcd4',
              '#009688',
              '#4caf50',
              '#ffeb3b',
              '#ffc107',
              '#ff9800',
              '#ff5722',
              '#795548',
              '#9e9e9e',
              '#607d8b'
            ],
            borderWidth: 1
          }
        ]
      })
    }
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
