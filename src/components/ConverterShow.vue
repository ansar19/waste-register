<template>
  <div class="col s12 m6">
          <Loader v-if="loading" />
    <div class="card-body">
      <!-- <h5>Простой конвертер отходов в тонны</h5> -->
      <form>
        <div class="form-group">
          <label for="inputConverterValue">{{'Enter_Number_To_Calculate'| localize }}:</label>
          <input
            type="number"
            class="form-control"
            v-model="kg"
            id="inputConverterValue"
            aria-describedby="inputConverterHelp"
          />
          <small id="inputConverterHelp" class="form-text text-muted">{{'Enter_Number' | localize }}</small>
        </div>
        <div class="form-group">
        <select ref="siteSelect" v-model="current" class="form-control-custom">
            <option v-for="c of unitOfMeasurements" :key="c.id" :value="c.id">{{c.name}}</option>
          </select>
          <label for="formControlSelect">{{'Select_Option_To_Convert' | localize}}:</label>
          <select v-model="selectedCoef" class="custom-select" id="formControlSelect">
            <option
              v-for="(unitOfMeasurement, index) in unitOfMeasurements"
              v-bind:value="unitOfMeasurement.coef"
              v-bind:key="index"
            >{{unitOfMeasurement.name}}</option>
          </select>
        </div>       
      </form>
      <div
        class="alert alert-primary"
        role="alert"
      >{{ 'Conversion_Result' | localize }}: {{wasteToTon.toFixed(3)}} {{'TON' | localize }}</div>
      <br />
      <div class="table-responsive">
        <table class="table table-stripped table-hover" >
          <caption class="caption-top">{{'Coefficient_List' | localize}}</caption>
          <thead>
            <tr class="bg-primary text-white">
              <th>{{'Waste_Name_And_UOM' | localize}}</th>
              <th>{{'Conversion_Factor_To_Tons' | localize}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(unitOfMeasurement, idx) in unitOfMeasurements" v-bind:key="idx">
              <td>{{unitOfMeasurement.name}}</td>
              <td>{{unitOfMeasurement.coef}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'converter-show',
  data: () => ({
    title: '',
    kg: 0,
    t: 0,
    converters: [],
    unitOfMeasurements: [],
    selectedCoef: 0.25,
    loading: true,
    current: null
  }),
  async mounted() {
    this.converters = await this.$store.dispatch('fetchConverters')
    const { unitOfMeasurements } = this.converters[0]
    this.unitOfMeasurements = unitOfMeasurements
    this.loading = false
  },
  computed: {
    wasteToTon() {
      return (this.t = this.kg * this.selectedCoef)
    },
  },
}
</script>

<style scoped>
.caption-top {
  caption-side: top;
}
</style>