<template>
  <div>
    <div class="page-title">
      <h5>{{'Menu_NewRecord'|localize}}</h5>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!sites.length">
      {{'NoSites'|localize}}.
      <router-link to="/sites">{{'AddFirst_Site'|localize}}</router-link>
    </p>

    <p class="center" v-else-if="!categories.length">
      {{'NoCategories'|localize}}.
      <router-link to="/categories">{{'AddFirst'|localize}}</router-link>
    </p>

    <p class="center" v-else-if="!transporters.length">
      {{'NoTransporters'|localize}}.
      <router-link to="/transporters">{{'AddFirst_Transporter'|localize}}</router-link>
    </p>

    <p class="center" v-else-if="!utilizators.length">
      {{'NoUtilizators'|localize}}.
      <router-link to="/utilizators">{{'AddFirst_Utilizator'|localize}}</router-link>
    </p>

    <form class="form" v-else @submit.prevent="handleSubmit">

      <!-- Участок -->
      <div class="from-group">
        <label for="choose-site">{{'SelectSite'|localize}}</label>
        <select ref="selectSite" v-model="site" class="form-control-custom" id="choose-site">
          <option v-for="s in sites" :key="s.id" :value="s.id">{{s.siteName}}</option>
        </select>
      </div>

      <!-- Отход -->

      <div class="from-group">
        <label for="choose-waste">{{'SelectCategory'|localize}}</label>
        <select ref="select" v-model="category" class="form-control-custom" id="choose-waste">
          <option v-for="c in categories" :key="c.id" :value="c.id">{{c.title}}</option>
        </select>
      </div>

      <!-- Перевозчик -->

      <div class="from-group">
        <label for="choose-transporter">{{'SelectTransporter'|localize}}</label>
        <select ref="select2" v-model="transporter" class="form-control-custom" id="choose-transporter">
          <option v-for="t in transporters" :key="t.id" :value="t.id">{{t.title}}</option>
        </select>
      </div>

      <!-- Место утилизации -->

      <div class="from-group">
        <label for="choose-utilizator">{{'SelectUtilizator'|localize}}</label>
        <select ref="select3" v-model="utilizator" class="form-control-custom" id="choose-utilizator">
          <option v-for="u in utilizators" :key="u.id" :value="u.id">{{u.title}}</option>
        </select>
      </div>

      <!-- Способ утилизации -->

      <div class="from-group">
        <label for="sel">{{ 'Select_Utilization_Way' | localize }}</label>
        <v-select v-model="utilizationWay" label="text" :options="utilizationWayOptions"
          :reduce="option => option.value"></v-select>
      </div>

      <!-- Принято или отправлено -->

      <fieldset>
        <div class="custom-control custom-radio d-block my-2">
          <input id="in" class="custom-control-input" name="in" type="radio" value="income" v-model="type" />
          <label class="custom-control-label" for="in">
            <span>{{'Income'|localize}}</span>
          </label>
        </div>

        <div class="custom-control custom-radio d-block my-2">
          <input id="out" class="custom-control-input" name="out" type="radio" value="outcome" v-model="type" />
          <label class="custom-control-label" for="out">
            <span>{{'Outcome'|localize}}</span>
          </label>
        </div>
      </fieldset>

      <!-- Дата -->

      <div class="from-group">
        <!-- <div>Opened: <span :class="[opened ? 'text-success' : 'text-danger']">{{ opened }}</span></div> -->
        <div>📅 {{'Removal_Date'|localize}}:</div>
        <!-- <span>{{ removalDate }}</span> -->
        <d-datepicker v-model="removalDate" :language="ru" />
      </div>

      <!-- decimal number - масса отходов -->
      <div class="from-group">
        <label for="amount">{{'Amount'|localize}}</label>
        <input id="amount" type="text" v-model.number="amount"
          :class="{invalid: $v.amount.$dirty && !$v.amount.$decimal &&!!$v.amount.minValue}" class="from-control" />
        <span v-if="$v.amount.$dirty &&  !$v.amount.$decimal && !$v.amount.$minValue"
          class="helper-text invalid">{{'Message_MinLength'|localize}} {{$v.amount.$params.minValue.min}}</span>
      </div>

      <!-- Описание / комментарий -->

      <div class="form-group">
        <label for="description">{{'Description'|localize}}</label>
        <input id="description" type="text" v-model="description"
          :class="{invalid: $v.description.$dirty && !$v.description.required}" />
        <span v-if="$v.description.$dirty && !$v.description.required"
          class="helper-text invalid">{{'Message_EnterDescription'|localize}}</span>
      </div>

      <button class="btn btn-success waves-effect waves-light" type="submit">
        {{'Create'|localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {
  en,
  ru
} from 'vuejs-datepicker/dist/locale'

import {
  required,
  decimal,
  minValue
} from 'vuelidate/lib/validators'

import {
  mapGetters
} from 'vuex'
import localizeFilter from '@/filters/localize.filter'

import 'vue-select/dist/vue-select.css';


export default {
  name: 'record',
  metaInfo() {
    return {
      title: this.$title('Menu_NewRecord')
    }
  },
  data: () => ({
    ru: ru,
    en: en,
    loading: true,
    selectSite: null,
    select: null,
    select2: null,
    select3: null,
    sites: [],
    categories: [],
    transporters: [],
    utilizators: [],
    site: null,
    category: null,
    transporter: null,
    utilizator: null,
    type: 'outcome',
    removalDate: new Date(),
    opened: false,
    amount: 0.001,
    description: '',
    utilizationWay: null,
    utilizationWayOptions: [
      { text: 'Передано сторонним организациям, предприятиям', value: 'transferredTo3rdParties' },
      { text: 'Переработка, повторное использование для получения продукции', value: 'recyclingReuse' },
      { text: 'Инсинерация (сжигание) с извлечением энергии на предприятии', value: 'incinerationWithEnergyRecovery' },
      { text: 'Инсинерация (сжигание) без извлечения энергии на предприятии', value: 'incinerationWithOutEnergyRecovery' },
      { text: 'Полное обезвреживание на предприятии', value: 'fullNeutralizationAtCompany' },
      { text: 'Частичное обезвреживание на предприятии', value: 'partialNeutralizationAtCompany' },
      { text: 'Хранение на собственных объектах размещения отходов', value: 'storageAtOwnWasteFacilities' },
      { text: 'Захоронение на собственных объектах размещения отходов', value: 'dumpingAtOwnWasteFacilities' },
      { text: 'Размещение на собственном полигоне ТБО', value: 'disposalAtOwnSolidDomesticLlandfill' }
    ]
  }),
  validations: {
    amount: {
      required,
      minValue: minValue(0.001),
      decimal
    },
    description: {
      required
    }
  },
  async mounted() {
    this.sites = await this.$store.dispatch('fetchSites')
    this.categories = await this.$store.dispatch('fetchCategories')
    this.transporters = await this.$store.dispatch('fetchTransporters')
    this.utilizators = await this.$store.dispatch('fetchUtilizators')
    this.loading = false

    if (this.sites.length) {
      this.site = this.sites[0].id
    }

    if (this.categories.length) {
      this.category = this.categories[0].id
    }

    if (this.transporters.length) {
      this.transporter = this.transporters[0].id
    }

    if (this.utilizators.length) {
      this.utilizator = this.utilizators[0].id
    }

    setTimeout(() => {
      this.selectSite = M.FormSelect.init(this.$refs.selectSite)
      this.select = M.FormSelect.init(this.$refs.select)
      this.select2 = M.FormSelect.init(this.$refs.select2)
      this.select3 = M.FormSelect.init(this.$refs.select3)
      M.updateTextFields()
    }, 0)
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true
      }

      return this.info.bill >= this.amount
    },
    unitAmount() {
      unitAmount = limitKZT / limit
    }
  },
  methods: {
    async handleSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            siteId: this.site,
            categoryId: this.category,
            transporterId: this.transporter,
            utilizatorId: this.utilizator,
            utilizationWay: this.utilizationWay,
            amount: this.amount,
            removalDate: this.removalDate.toJSON(),
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })
          const bill =
            this.type === 'income' ?
            this.info.bill + this.amount :
            this.info.bill - this.amount

          await this.$store.dispatch('updateInfo', {
            bill
          })
          this.$message(localizeFilter('RecordHasBeenCreated'))
          this.$v.$reset()
          this.amount = 0.001
          this.description = ''
        } catch (e) {}
      } else {
        this.$message(
          `${localizeFilter('NotEnoughLimit')} (${this.amount -
            this.info.bill})`
        )
      }
    },
    handleOpened() {
      this.opened = true
    },
    handleClosed() {
      this.opened = false
    }
  },
  destroyed() {
    if (
      this.selectSite &&
      this.select &&
      this.select2 &&
      this.select3 &&
      this.select.destroy
    ) {
      this.selectSite.destroy()
      this.select.destroy()
      this.select2.destroy()
      this.select3.destroy()
    }
  }
}
</script>
