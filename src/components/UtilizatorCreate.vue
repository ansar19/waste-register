<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'Create'|localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="from-group">
          <label for="name">{{'Title_Utilizator'|localize}}</label>
          <input id="name" type="text" v-model="title" :class="{invalid: $v.title.$dirty && !$v.title.required}"
            class="form-control">
          <span v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid">{{'Message_Utilizator_Title'|localize}}</span>
        </div>

        <div class="from-group">
          <label for="bin">{{'BIN_Utilizator'|localize}}</label>
          <input id="bin" type="text" v-model="utilizatorBin"
            :class="{invalid: $v.utilizatorBin.$dirty && !$v.utilizatorBin.required}" class="form-control">
          <span v-if="$v.utilizatorBin.$dirty && !$v.utilizatorBin.required"
            class="helper-text invalid">{{'Message_Bin_Utilizator'|localize}}</span>
        </div>

        <div class="from-group">
          <label for="phone">{{'Phone_Utilizator'|localize}}</label>
          <input id="phone" type="text" v-model="utilizatorPhone"
            :class="{invalid: $v.utilizatorPhone.$dirty && !$v.utilizatorPhone.required}" class="form-control">
          <span v-if="$v.utilizatorPhone.$dirty && !$v.utilizatorPhone.required"
            class="helper-text invalid">{{'Message_Phone_Utilizator'|localize}}</span>
        </div>

        <div class="form-group">
          <label for="utilizator-bank-details">{{'Utilizator_Bank_Detail'|localize}}</label>
          <textarea id="utilizator-bank-details" type="textarea" v-model="utilizatorBankDetail" class="form-control">
          </textarea>
        </div>

        <div class="form-group">
          <label>{{'Select_Disposal_Site_Type'|localize}}</label>
          <v-select :options="disposalSiteTypeOptions" v-model="selectedDisposalSiteType" :searchable="false"
            label="disposalSiteTypeName" />
          <!-- <span>Выбрано: {{ selectedDisposalSiteType }}</span> -->
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
import {
  required
} from 'vuelidate/lib/validators'
import localizeFilter from '@/filters/localize.filter'
import 'vue-select/dist/vue-select.css';

export default {
  data: () => ({
    title: '',
    utilizatorPhone: '',
    utilizatorBin: '',
    utilizatorBankDetail: '',
    disposalSiteTypeOptions: [{
        disposalSiteType: 'temporary',
        disposalSiteTypeName: 'Временное',
      },
      {
        disposalSiteType: 'permanent',
        disposalSiteTypeName: 'Постоянное',
      }
    ],
    selectedDisposalSiteType: {}
  }),
  validations: {
    title: {
      required
    },
    utilizatorPhone: {
      required
    },
    utilizatorBin: {
      required
    }
  },
  mounted() {
    M.updateTextFields();
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
          utilizatorBin: this.utilizatorBin,
          utilizatorBankDetail: this.utilizatorBankDetail,
          selectedDisposalSiteType: this.selectedDisposalSiteType
        })
        this.title = ''
        this.utilizatorPhone = ''
        this.utilizatorBin = ''
        this.utilizatorBankDetail = ''
        this.selectedDisposalSiteType = {}
        this.$v.$reset()
        this.$message(localizeFilter('Utilizator_HasBeenCreated'))
        this.$emit('created', utilizator)
      } catch (e) {}
    }
  }
}
</script>
