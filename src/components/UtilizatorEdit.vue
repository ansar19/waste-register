<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'Edit'|localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="form-group">
          <label>{{'SelectUtilizator'|localize}}</label>
          <select ref="select3" v-model="current" class="form-control-custom">
            <option v-for="u of utilizators" :key="u.id" :value="u.id">{{u.title}}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="name-edit">{{'Title_Utilizator'|localize}}</label>
          <input id="name-edit" type="text" v-model="title" :class="{invalid: $v.title.$dirty && !$v.title.required}"
            class="form-control">
          <span v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid">{{'Message_Utilizator_Title'|localize}}</span>
        </div>

        <div class="from-group">
          <label for="phone-edit">{{'Phone_Utilizator'|localize}}</label>
          <input id="phone-edit" type="text" v-model="utilizatorPhone"
            :class="{invalid: $v.title.$dirty && !$v.title.required}" class="form-control">
          <span v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid">{{'Message_Phone_Utilizator'|localize}}</span>
        </div>

        <div class="form-group">
          <label for="utilizator-bank-details-edit">{{'Utilizator_Bank_Detail'|localize}}</label>
          <textarea id="utilizator-bank-details-edit" type="textarea" v-model="utilizatorBankDetail"
            class="form-control">
          </textarea>
        </div>

        <div class="form-group">
          <label>{{'Select_Disposal_Site_Type'|localize}}</label>
          <v-select :options="disposalSiteTypeOptions" v-model="selectedDisposalSiteType" :searchable="false"
            label="disposalSiteTypeName" />
          <!-- <span>Выбрано: {{ selectedDisposalSiteType }}</span> -->
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
const disposalSiteTypeOptions = [{
    disposalSiteType: 'temporary',
    disposalSiteTypeName: 'Временное',
  },
  {
    disposalSiteType: 'permanent',
    disposalSiteTypeName: 'Постоянное',
  }
];
import {
  required
} from 'vuelidate/lib/validators'
import localizeFilter from '@/filters/localize.filter'
export default {
  props: {
    utilizators: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select3: null,
    title: '',
    utilizatorPhone: '',
    utilizatorBankDetail: '',
    current: null,
    selectedDisposalSiteType: {},
  }),
  validations: {
    title: {
      required
    },
    utilizatorPhone: {
      required
    }
  },
  watch: {
    current(utilId) {
      const {
        title,
        utilizatorPhone,
        utilizatorBankDetail,
        selectedDisposalSiteType
      } = this.utilizators.find(u => u.id === utilId)
      this.title = title,
        this.utilizatorPhone = utilizatorPhone,
        this.utilizatorBankDetail = utilizatorBankDetail,
        this.selectedDisposalSiteType = selectedDisposalSiteType
    },
  },
  created() {
    const {
      id,
      title,
      utilizatorPhone,
      utilizatorBankDetail,
      selectedDisposalSiteType
    } = this.utilizators[0]
    this.current = id
    this.title = title
    this.utilizatorPhone = utilizatorPhone,
      this.utilizatorBankDetail = utilizatorBankDetail
    this.selectedDisposalSiteType = selectedDisposalSiteType
  },
  computed: {
    disposalSiteTypeOptions: () => disposalSiteTypeOptions,
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const utilizatorData = {
          id: this.current,
          title: this.title,
          utilizatorPhone: this.utilizatorPhone,
          utilizatorBankDetail: this.utilizatorBankDetail,
          selectedDisposalSiteType: this.selectedDisposalSiteType
        }
        await this.$store.dispatch('updateUtilizator', utilizatorData)
        this.$message(localizeFilter('Utilizator_HasBeenUpdated'))
        this.$emit('updated', utilizatorData)
      } catch (e) {}
    },
  },
  mounted() {
    this.select3 = M.FormSelect.init(this.$refs.select3);
    M.updateTextFields();
  },
  destroyed() {
    if (this.select3 && this.select3.destroy) {
      this.select3.destroy()
    }
  }
}
</script>
