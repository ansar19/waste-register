<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'Create'|localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="from-group">
          <label for="title-transporter">{{'Title_Transporter'|localize}}</label>
          <input id="title-transporter" type="text" v-model="title" :class="{invalid: $v.title.$dirty && !$v.title.required}" class="form-control">
          <span v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid">{{'Message_TransporterTitle'|localize}}</span>
        </div>

        <div class="from-group">
          <label for="transporter-phone">{{'Phone_Transporter'|localize}}</label>
          <input id="transporter-phone" type="text" v-model="transporterPhone" :class="{invalid: $v.transporterPhone.$dirty && !$v.transporterPhone.required}" class="form-control">
          <span v-if="$v.transporterPhone.$dirty && !$v.transporterPhone.required"
            class="helper-text invalid">{{'Message_Phone_Transporter'|localize}}</span>
        </div>

        <div class="form-group">
          <label for="transporter-bank-details">{{'Transporter_Bank_Detail'|localize}}</label>
          <textarea id="transporter-bank-details" type="textarea" v-model="transporterBankDetail"
            class="form-control">
          </textarea>
        </div>

        <div class="mb-3">
          <label for="formFileMultiple" class="form-label">{{ 'Attach_Documents' | localize }}</label>
          <input class="form-control" type="file" id="formFileMultiple" multiple>
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
    transporterPhone: '',
    transporterBankDetail: ''
  }),
  validations: {
    title: { required },
    transporterPhone: { required }
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
        const transporter = await this.$store.dispatch('createTransporter', {
          title: this.title,
          transporterPhone: this.transporterPhone,
          transporterBankDetail: this.transporterBankDetail
        })
        this.title = ''
        this.transporterPhone = ''
        this.transporterBankDetail = ''
        this.$v.$reset()
        this.$message(localizeFilter('Transporter_HasBeenCreated'))
        this.$emit('created', transporter)
      } catch (e) {}
    }
  }
}
</script>
