<template>
  <div>
    <div class="page-title">
      <h5>{{'Menu_Planning'|localize}}</h5>
      <h5>{{info.bill.toFixed(2)}} {{'TON' | localize}}</h5>
      <div slot="table-actions">
        <download-excel
          :data="categories"
          :fields="json_fields"
          class="btn-sm btn-info mt-2 mb-2 ml-2 mr-4"
          worksheet="Wastes"
          name="actual_wastes.xls"
          v-tooltip="'Download_Data'"
        >
          <span class="material-icons">cloud_download</span>
        </download-excel>
      </div>
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
          {{cat.spend.toFixed(3) }} {{'TON' | localize}} {{'Of'|localize}} {{cat.limit }} {{'TON' | localize}}
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
  name: 'planning',
  metaInfo() {
    return {
      title: this.$title('Menu_Planning'),
    }
  },
  data: () => ({
    loading: true,
    categories: [],
    // related to excel export
    json_fields: {
      Название: 'title',
      'Факт. объем, т': 'spend',
      'Лимит, т': 'limit',
    },
    json_meta: [
      [
        {
          key: 'charset',
          value: 'utf-8',
        },
      ],
    ],
  }),
  computed: {
    ...mapGetters(['info']),
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categoires = await this.$store.dispatch('fetchCategories')

    this.categories = categoires.map((cat) => {
      const spend = records
        .filter((r) => r.categoryId === cat.id)
        .filter((r) => r.type === 'outcome')
        .reduce((total, record) => {
          return (total += +record.amount)
        }, 0)

      const percent = (100 * spend) / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor =
        percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'

      const tooltipValue = cat.limit - spend
      const tooltip = `${
        tooltipValue < 0 ? localizeFilter('MoreThan') : localizeFilter('Stayed')
      } ${Math.abs(tooltipValue)}`

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip,
      }
    })

    this.loading = false
  },
}
</script>
