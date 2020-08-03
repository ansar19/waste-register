<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <!-- <h4>{{'Create'|localize}}</h4> -->
      </div>
      <div class="card-body">
        <form @submit.prevent="submitHandler">
          <!-- <div class="form-group">
          <label>{{'SelectSite'|localize}}</label>
          <select ref="converterSelect" v-model="current" class="form-control-custom">
            <option v-for="c of converters" :key="c.id" :value="c.coef">{{c.name}}</option>
          </select>
          </div>-->

          <div class="table-responsive">
            <table class="table table-stripped table-hover">
              <caption class="caption-top">Редактор списка коэффициентов</caption>
              <thead>
                <tr class="bg-primary text-white">
                  <th>Название отхода и единица измерения</th>
                  <th>Коэффициент для перевода в тонны</th>
                  <!-- <th></th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="(unitOfMeasurement, k) in unitOfMeasurements" :key="k">
                  <td>
                    <input class="form-control" type="text" v-model="unitOfMeasurement.name" />
                  </td>
                  <td>
                    <input class="form-control" type="text" v-model.number="unitOfMeasurement.coef" />
                  </td>
                  <!-- <td scope="row" class="trashIconContainer">
                    <button
                      class="btn waves-effect waves-light red lighten-2"
                      @click="deleteRow(k, unitOfMeasurement)"
                    >
                      <i class="material-icons">delete_outline</i>
                    </button>
                  </td> -->
                </tr>
              </tbody>
            </table>
          </div>
          <button type="button" class="btn btn-info" @click="addNewRow">Добавить новый коэф</button>
          <button class="btn btn-success waves-effect waves-light" type="submit">
            {{'Create'|localize}}
            <i class="material-icons right">send</i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import localizeFilter from '@/filters/localize.filter'

export default {
  props: {
    converters: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    converterSelect: null,
    // converters: [],
    unitOfMeasurements: [{ name: '', coef: '' }],
    name: '',
    coef: '',
    current: null,
  }),
  // validations: {
  //   unitOfMeasurement: { required },
  // },
  watch: {
    current(converterId) {
      const { unitOfMeasurements } = this.converters.find(
        (c) => c.id === converterId
      )
      this.unitOfMeasurements = unitOfMeasurements
    },
  },
  created() {
    const { id, unitOfMeasurements } = this.converters[0]
    this.current = id
    this.unitOfMeasurements = unitOfMeasurements
  },
  methods: {
    async submitHandler() {
      //   if (this.$v.$invalid) {
      //     this.$v.$touch()
      //     return
      //   }
      try {
        const converterData = {
          id: this.current,
          unitOfMeasurements: this.unitOfMeasurements,
        }
        await this.$store.dispatch('updateConverter', converterData)
        this.$message(localizeFilter('Converter_HasBeenUpdated'))
        this.$emit('updated', converterData)
      } catch (e) {}
    },
    addNewRow() {
      this.unitOfMeasurements.push({
        name: '',
        coef: '',
      })
    },
    async deleteRow(id) {

        await this.$store.dispatch('deleteConverter', id)
        this.$message(localizeFilter('Converter_HasBeenUpdated'))
        this.$emit('updated', id)

    },
  },
  mounted() {
    this.converterSelect = M.FormSelect.init(this.$refs.converterSelect)
    M.updateTextFields()
  },
  destroyed() {
    if (this.converterSelect && this.converterSelect.destroy) {
      this.converterSelect.destroy()
    }
  },
}
</script>

<style scoped>
.caption-top {
  caption-side: top;
}
</style>
