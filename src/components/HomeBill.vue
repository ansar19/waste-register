<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">

        <span class="card-title">{{'BillInCurrency'|localize}}</span>

        <p v-for="cur of currencies" :key="cur" class="currency-line">
          <span>{{ getCurrency(cur) | currency(cur) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates'],
  data: () => ({
    currencies: ['TON', 'M3', 'PCS']
    // currencies: ['RUB', 'USD', 'EUR']

  }),
  computed: {
    base() {
      return (
        this.$store.getters.info.bill / (this.rates['TON'] / this.rates['M3'])
      )
    }
  },
  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency])
    }
  }
}
</script>
