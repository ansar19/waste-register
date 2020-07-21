<template>
  <div>
    <div class="page-title">
      <h5>{{'ProfileTitle' | localize}}</h5>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="form-group">
        <label for="description">{{'Name'|localize}}</label>
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}" class="form-control"
        >
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >{{'Message_EnterName'|localize}}</small>
      </div>

      <div class="form-group">
        <label for="company-name">{{'Company_Name'|localize}}</label>
        <input
          id="company-name"
          type="text"
          v-model="companyName"
          :class="{invalid: $v.companyName.$dirty && !$v.companyName.required}" class="form-control"
        >
        <small
          class="helper-text invalid"
          v-if="$v.companyName.$dirty && !$v.companyName.required"
        >{{'Message_Enter_Company_Name'|localize}}</small>
      </div>

      <div class="form-group">
        <label for="company-bin">{{'Company_BIN'|localize}}</label>
        <input
          id="company-bin"
          type="text"
          v-model="companyBin"
          :class="{invalid: $v.companyBin.$dirty && !$v.companyBin.required}" class="form-control"
        >
        <small
          class="helper-text invalid"
          v-if="$v.companyBin.$dirty && !$v.companyBin.required"
        >{{'Message_Enter_Company_Bin'|localize}}</small>

        <small class="helper-text invalid" v-if="!$v.companyBin.minLength">
          {{'Message_Enter_Company_Bin_Min'|localize}} {{$v.companyBin.$params.minLength.min}}.
          </small>

        <small class="helper-text invalid" v-if="!$v.companyBin.maxLength">
          {{'Message_Enter_Company_Bin_Max'|localize}}  {{$v.companyBin.$params.maxLength.max}}.
          </small>
      </div>

      <div class="form-group">
        <label for="company-head">{{'Company_Head'|localize}}</label>
        <input
          id="company-head"
          type="text"
          v-model="companyHead"
          :class="{invalid: $v.companyHead.$dirty && !$v.companyHead.required}" class="form-control"
        >
        <small class="helper-text invalid" v-if="!$v.companyHead.minLength">
          {{'Message_Enter_Company_Head'|localize}} {{$v.companyHead.$params.minLength.min}}.
          </small>
      </div>

      <div class="form-group">
        <label for="company-phone">{{'Company_Phone'|localize}}</label>
        <input
          id="company-phone"
          type="tel" 
          v-model="companyPhone"
          pattern="^\+?77(\d{9,10})$"
          class="form-control"
          required
        >
      </div>

      <div class="form-group">
        <label for="company-email">{{'Company_Email'|localize}}</label>
        <input
          id="company-email"
          type="email"
          v-model="companyEmail"
          :class="{invalid: !$v.companyEmail.email}" class="form-control"
        >
        <small class="helper-text invalid" v-if="!$v.companyEmail.email">
          {{'Message_Enter_Company_Email'|localize}}.
          </small>
      </div>

      <div class="form-group">
        <label for="company-fax">{{'Company_Fax'|localize}}</label>
        <input
          id="company-fax"
          type="text" 
          v-model="companyFax"
          class="form-control"
        >
      </div>

      <div class="form-group">
        <label for="company-bank-account">{{'Company_Bank_Account'|localize}}</label>
        <input
          id="company-bank-account"
          type="text" 
          v-model="companyBankAccount"
          class="form-control"
        >
      </div>

      <div class="form-group">
        <label for="company-bank">{{'Company_Bank'|localize}}</label>
        <textarea 
          id="company-bank"
          type="textarea" 
          v-model="companyBank"
          class="form-control"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="company-address">{{'Company_Address'|localize}}</label>
        <textarea 
          id="company-address"
          type="textarea" 
          v-model="companyAddress"
          class="form-control"
        ></textarea>
      </div>

      <div class="mb-3 custom-control custom-switch">
        <span class="custom-control-description text-muted mr-3">Kazakh</span>
        <d-checkbox inline v-model="isRuLocale" toggle>
        </d-checkbox> <span class="custom-control-description text-muted ">Русский</span>
      </div>

      <button class="btn btn-success waves-effect waves-light" type="submit">
        {{'Update'|localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import localeFilter from '@/filters/localize.filter'

export default {
  metaInfo() {
    return {
      title: this.$title('ProfileTitle')
    }
  },
  data: () => ({
    name: '',
    companyName: '',
    companyBin: '',
    companyHead: '',
    companyPhone: '',
    companyFax: '',
    companyEmail: '',
    companyBankAccount: '',
    companyBank: '',
    companyAddress: '',
    isRuLocale: true
  }),
  validations: {
    name: { required },
    companyName: { required },
    companyBin: { required, minLength: minLength(12), maxLength: maxLength(12) },
    companyHead: { minLength: minLength(2) },
    companyEmail: { email }
  },
  mounted() {
    this.name = this.info.name
    this.companyName = this.info.companyName
    this.companyBin = this.info.companyBin
    this.companyHead = this.info.companyHead
    this.companyPhone = this.info.companyPhone
    this.companyFax = this.info.companyFax
    this.companyEmail = this.info.companyEmail
    this.companyBankAccount = this.info.companyBankAccount
    this.companyBank = this.info.companyBank
    this.companyAddress = this.info.companyAddress
    this.isRuLocale = this.info.locale === 'ru-RU'
    setTimeout(() => {
      M.updateTextFields()
    })
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.updateInfo({
          name: this.name,
          companyName: this.companyName,
          companyBin: this.companyBin,
          companyHead: this.companyHead,
          companyPhone: this.companyPhone,
          companyFax: this.companyFax,
          companyEmail: this.companyEmail,
          companyBankAccount: this.companyBankAccount,
          companyBank: this.companyBank,
          companyAddress: this.companyAddress,
          locale: this.isRuLocale ? 'ru-RU' : 'kz-KZ'
        })
      } catch (e) {}
    }
  }
}
</script>


<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
