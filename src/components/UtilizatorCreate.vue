<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'Create'|localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="from-group">
          <label for="name">{{'Title_Utilizator'|localize}}</label>
          <input id="name" type="text" v-model="title" :class="{invalid: $v.title.$dirty && !$v.title.required}" class="form-control">
          <span v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid">{{'Message_Utilizator_Title'|localize}}</span>
        </div>

        <div class="from-group">
          <label for="phone">{{'Phone_Utilizator'|localize}}</label>
          <input id="phone" type="text" v-model="utilizatorPhone" :class="{invalid: $v.utilizatorPhone.$dirty && !$v.utilizatorPhone.required}" class="form-control">
          <span v-if="$v.utilizatorPhone.$dirty && !$v.utilizatorPhone.required"
            class="helper-text invalid">{{'Message_Phone_Utilizator'|localize}}</span>
        </div>

        <div class="form-group">
          <label for="utilizator-bank-details">{{'Utilizator_Bank_Detail'|localize}}</label>
          <textarea id="utilizator-bank-details" type="textarea" v-model="utilizatorBankDetail"
            class="form-control">
          </textarea>
        </div>

        <button class="btn btn-success waves-effect waves-light" type="submit">
          {{'Create'|localize}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import localizeFilter from '@/filters/localize.filter'

export default {
  data: () => ({
    title: '',
    utilizatorPhone: '',
    utilizatorBankDetail: ''
  }),
  validations: {
    title: { required },
    utilizatorPhone: { required }
  },
  mounted() {
    M.updateTextFields()
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const utilizator = await this.$store.dispatch('createUtilizator', {
          title: this.title,
          utilizatorPhone: this.utilizatorPhone,
          utilizatorBankDetail: this.utilizatorBankDetail
        })
        this.title = ''
        this.utilizatorPhone = ''
        this.utilizatorBankDetail = ''
        this.$v.$reset()
        this.$message(localizeFilter('Utilizator_HasBeenCreated'))
        this.$emit('created', utilizator)
      } catch (e) {}
    }
  }
}
</script>
