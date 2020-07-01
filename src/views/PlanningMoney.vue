<template>
  <div>
    <div class="page-title">
      <h5>{{'Menu_Planning_KZT'|localize}}</h5>
      <!-- <h5>{{info.bill.toFixed(2)}} {{'KZT' | localize}}</h5> -->
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      {{'NoCategories'|localize}}.
      <router-link to="/categories">{{'AddFirst'|localize}}</router-link>
    </p>

    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{cat.title}}:</strong>
          {{((cat.limitKZT / cat.limit)*cat.spendMoney).toFixed(2) }} {{'KZT' | localize}} {{'Of'|localize}} {{cat.limitKZT }} {{'KZT' | localize}}
        </p>

        <div class="progress" v-tooltip.noloc="cat.tooltip">
          <div
            class="determinate progress-bar"
            role="progressbar"
            :class="[cat.progressColor]"
            :style="{width: cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import 'materialize-css/dist/js/materialize.min'

import { mapGetters } from 'vuex'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'
export default {
  name: 'planning-money',
  metaInfo() {
    return {
      title: this.$title('Menu_Planning_KZT')
    }
  },
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info']),
  },

  // unitAmount = limitKZT / limit
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categoires = await this.$store.dispatch('fetchCategories')

    this.categories = categoires.map(cat => {
      const spendMoney = records
        .filter(r => r.categoryId === cat.id)
        .filter(r => r.type === 'outcome')
        .reduce((total, record) => {
          return (total += +record.amount)
        }, 0)

      const percent = (100 * ((cat.limitKZT / cat.limit)*spendMoney)) / cat.limitKZT
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor =
        percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'

      const tooltipValue = cat.limitKZT - ((cat.limitKZT / cat.limit)* spendMoney)
      const tooltip = `${
        tooltipValue < 0 ? localizeFilter('MoreThan') : localizeFilter('Stayed')
      } ${currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...cat,
        progressPercent,
        progressColor,
        spendMoney,
        tooltip
      }
    })

    this.loading = false
  }
}
</script>
