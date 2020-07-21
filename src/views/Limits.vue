<template>
  <div>
    <div class="page-title">
      <h5>{{'Limit_Panel'|localize}}</h5>
      <p class="subcomponent-title">{{ companyName }}</p>
    </div>
    <div class="row">
      <div class="col-lg-6">
        <PlanningMoney />
      </div>

      <div class="col-lg-6">
        <Planning />
      </div>
    </div>
  </div>
</template>

<script>
import Planning from '@/views/Planning'
import PlanningMoney from '@/views/PlanningMoney'

export default {
  name: 'limits',
  data: () => ({
    loading: true,
    currency: null
  }),
  async mounted() {
    // this.currency = await this.$store.dispatch('fetchCurrency')
    this.loading = false
  },
  computed: {
    companyName() {
      return this.$store.getters.info.companyName
    },
  },
  components: {
    Planning,
    PlanningMoney
  }
}
</script>