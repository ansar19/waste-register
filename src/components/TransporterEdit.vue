<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'Edit'|localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="form-group">
          <label>{{'SelectTransporter'|localize}}</label>
          <select ref="select2" v-model="current" class="form-control-custom">
            <option v-for="t of transporters" :key="t.id" :value="t.id">{{t.title}}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="name">{{'Title_Transporter'|localize}}</label>
          <input id="name" type="text" v-model="title" :class="{invalid: $v.title.$dirty && !$v.title.required}"
            class="form-control">
          <span v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid">{{'Message_TransporterTitle'|localize}}</span>
        </div>

        <div class="from-group">
          <label for="phone">{{'Phone_Transporter'|localize}}</label>
          <input id="phone" type="text" v-model="transporterPhone" :class="{invalid: $v.title.$dirty && !$v.title.required}" class="form-control">
          <span v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid">{{'Message_Phone_Transporter'|localize}}</span>
        </div>

        <div class="form-group">
          <label for="transporter-bank-details">{{'Transporter_Bank_Detail'|localize}}</label>
          <textarea id="transporter-bank-details" type="textarea" v-model="transporterBankDetail"
            class="form-control">
          </textarea>
        </div>


        <button class="btn btn-success waves-effect waves-light" type="submit">
          {{'Update'|localize}}
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
  props: {
    transporters: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select2: null,
    title: '',
    transporterPhone: '',
    transporterBankDetail: '',
    current: null
  }),
  validations: {
    title: { required },
    transporterPhone : { required }
  },
  watch: {
    current(transpId) {
      const { title, transporterPhone, transporterBankDetail } = this.transporters.find(t => t.id === transpId)
      this.title = title,
      this.transporterPhone = transporterPhone,
      this.transporterBankDetail = transporterBankDetail
    }
  },
  created() {
    const { id, title, transporterPhone, transporterBankDetail } = this.transporters[0]
    this.current = id
    this.title = title
    this.transporterPhone = transporterPhone,
    this.transporterBankDetail
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const transporterData = {
          id: this.current,
          title: this.title,
          transporterPhone: this.transporterPhone,
          transporterBankDetail: this.transporterBankDetail
        }
        await this.$store.dispatch('updateTransporter', transporterData)
        this.$message(localizeFilter('Transporter_HasBeenUpdated'))
        this.$emit('updated', transporterData)
      } catch (e) {}
    }
  },
  mounted() {
    this.select2 = M.FormSelect.init(this.$refs.select2)
    M.updateTextFields()
  },
  destroyed() {
    if (this.select2 && this.select2.destroy) {
      this.select2.destroy()
    }
  }
}
</script>
