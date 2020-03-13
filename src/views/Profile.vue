<template>
  <div>
    <div class="page-title">
      <h3>{{'ProfileTitle' | localize}}</h3>
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
import { required } from 'vuelidate/lib/validators'
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
    isRuLocale: true
  }),
  validations: {
    name: { required },
    companyName: { required }
  },
  mounted() {
    this.name = this.info.name
    this.companyName = this.info.companyName
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
