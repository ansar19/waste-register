<template>
  <div>
    <div class="page-title">
      <h3>{{'Main_Panel'|localize}}</h3>
      <p class="subcomponent-title">{{ companyName }}</p>
      <!-- <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>-->
    </div>

    <div class="row">
      <div class="col-lg-12">
        <Distribution />
      </div>
    </div>

    <div class="card" style="width: 100%;">
      <div class="card-body">
        <!-- <h5 class="card-title">Card title</h5>
        <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>-->
        <p class="card-text">{{'Instruction_Line1'|localize}}</p>
        <p class="card-text">{{'Instruction_Line2'|localize}}</p>
        <p class="card-text">{{'Instruction_Line3'|localize}}</p>
        <p class="card-text">{{'Instruction_Line4'|localize}}</p>
        <p class="card-text">{{'Instruction_Line5'|localize}}</p>
        <p class="card-text">{{'Instruction_Line6'|localize}}</p>

        <span class="copyright ml-auto my-auto mr-2 card-link">
          Copyright © 2018 - 2020
          <a
            href="https://ecomarine.kz/"
            rel="nofollow"
            target="_blank"
          >EcoMarine.kz</a>
        </span>
      </div>
    </div>

    <!-- <Loader v-if="loading"/>

    <div v-else class="row">
      <HomeBill :rates="currency.rates"/>

      <HomeCurrency :rates="currency.rates" :date="currency.date"/>
    </div>-->
  </div>
</template>

<script>
import Planning from '@/views/Planning'
import PlanningMoney from '@/views/PlanningMoney'
import Distribution from '@/components/Distribution'
import HomeBill from '@/components/HomeBill'
import HomeCurrency from '@/components/HomeCurrency'

export default {
  name: 'home',
  metaInfo() {
    return {
      title: this.$title('Menu_Bill')
    }
  },
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
    }
  },
  components: {
    Planning,
    PlanningMoney,
    Distribution
    // HomeBill,
    // HomeCurrency
  }
}
</script>
