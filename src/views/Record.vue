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

      <!-- РОП -->
      <fieldset>
        <div class="form-check custom-control custom-radio d-block my-2">
          <input class="form-check-input custom-control-input" type="radio" v-bind:value="false" v-model="isRop"
            name="flexRadioDefault" id="flexRadioDefault1">
          <label class="form-check-label custom-control-label" for="flexRadioDefault1">
            Отход не относится к группе РОП
          </label>
        </div>


        <div class="form-check custom-control custom-radio d-block my-2">
          <input class="form-check-input custom-control-input" type="radio" v-bind:value="true" v-model="isRop"
            name="flexRadioDefault" id="flexRadioDefault2">
          <label class="form-check-label custom-control-label" for="flexRadioDefault2">
            РОП
          </label>
        </div>

        <template v-if="isRop == true">
          <div class="mb-3">
            <div>
              <label class="form-label">Выберите из перечня продукции (товаров), на которую (которые) распространяются
                расширенные обязательства производителей (импортеров)</label>
              <v-select :options="ropOptions" label="productType" v-model="selectedRop"
                :selectable="option => !option.hasOwnProperty('group')" class="style-chooser">
                <template #option="{ group, productType }">
                  <div v-if="group" class="group">
                    {{ group }}
                  </div>
                  {{ productType }}
                </template>
              </v-select>
              <span>{{selectedRop.codeTNVED}} - {{selectedRop.productType}}</span>
            </div>
          </div>
        </template>
        <template v-else>
          Отход не относится к группе РОП
        </template>
      </fieldset>


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

      <!-- Прикрепление документов к данной записи -->
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
    isRop: false,
    selectedRop: [],
    ropOptions: [
      {
        group:
          "Средства наземного транспорта, кроме железнодорожного или трамвайного подвижного состава, и их части и принадлежности",
        productType: null
      },
      {
        codeTNVED: "8701 20 101",
        productType:
          "новые седельные тягачи, за исключением транспортных средств полной массы свыше 50 тонн"
      },
      {
        codeTNVED: "8701 20 901",
        productType:
          "бывшие в эксплуатации седельные тягачи, за исключением транспортных средств полной массы свыше 50 тонн"
      },
      {
        codeTNVED: "8702",
        productType:
          "моторные транспортные средства, предназначенные для перевозки 10 человек или более, включая водителя"
      },
      {
        codeTNVED: "8703",
        productType:
          "автомобили легковые и прочие моторные транспортные средства, предназначенные главным образом для перевозки людей (кроме моторных транспортных средств товарной позиции 8702), включая грузопассажирские автомобили-фургоны и гоночные автомобили"
      },
      {
        codeTNVED: "8704",
        productType:
          "моторные транспортные средства для перевозки грузов, за исключением транспортных средств полной массы свыше 50 тонн"
      },
      {
        codeTNVED: "8705",
        productType:
          "моторные транспортные средства специального назначения (например, автомобили грузовые аварийные, автокраны, пожарные транспортные средства, автобетономешалки, автомобили для уборки дорог, поливомоечные автомобили, автомастерские, автомобили с рентгеновскими установками), кроме используемых для перевозки пассажиров или грузов, за исключением транспортных средств полной массы свыше 50 тонн"
      },
      {
        codeTNVED: "8706 00 910 9",
        productType: "прочие для транспортных средств товарной позиции 8703"
      },
      {
        group: "Каучук, резина и изделия из них",
        productType: null
      },
      {
        codeTNVED: "4011 10 000",
        productType:
          "шины и покрышки пневматические резиновые новые, для легковых автомобилей (включая грузопассажирские автомобили-фургоны и спортивные автомобили)"
      },
      {
        codeTNVED: "4011 20",
        productType:
          "шины и покрышки пневматические резиновые новые, для автобусов или моторных транспортных средств для перевозки грузов"
      },
      {
        codeTNVED: "4011 30 000 0",
        productType:
          "шины и покрышки пневматические резиновые новые, для использования на воздушных судах"
      },
      {
        codeTNVED: "4011 40 000 0",
        productType:
          "шины и покрышки пневматические резиновые новые, для мотоциклов"
      },
      {
        codeTNVED: "4011 50 000",
        productType:
          "шины и покрышки пневматические резиновые новые, для велосипедов"
      },
      {
        codeTNVED: "4011 70 000 0",
        productType:
          "шины и покрышки пневматические резиновые новые, для сельскохозяйственных или лесохозяйственных транспортных средств и машин"
      },
      {
        codeTNVED: "4011 80 000 0",
        productType:
          "шины и покрышки пневматические резиновые новые, для транспортных средств и машин, используемых в строительстве, горном деле или промышленности"
      },
      {
        codeTNVED: "4011 90 000 0",
        productType: "прочие шины и покрышки пневматические резиновые новые"
      },
      {
        codeTNVED: "4012 11 000 0",
        productType:
          "шины и покрышки пневматические резиновые, восстановленные или бывшие в употреблении; шины и покрышки массивные или полупневматические, шинные протекторы и ободные ленты, резиновые, шины и покрышки восстановленные, для легковых автомобилей (включая грузопассажирские автомобили-фургоны и спортивные автомобили)"
      },
      {
        codeTNVED: "4012 12 000 0",
        productType:
          "шины и покрышки пневматические резиновые, восстановленные или бывшие в употреблении; шины и покрышки массивные или полупневматические, шинные протекторы и ободные ленты, резиновые, шины и покрышки восстановленные, для автобусов или моторных транспортных средств для перевозки грузов"
      },
      {
        codeTNVED: "4012 13 000",
        productType:
          "шины и покрышки пневматические резиновые, восстановленные или бывшие в употреблении; шины и покрышки массивные или полупневматические, шинные протекторы и ободные ленты, резиновые, шины и покрышки восстановленные, для использования на воздушных судах"
      },
      {
        codeTNVED: "4012 19",
        productType:
          "шины и покрышки пневматические резиновые, восстановленные или бывшие в употреблении; шины и покрышки массивные или полупневматические, шинные протекторы и ободные ленты, резиновые, шины и покрышки восстановленные, прочие"
      },
      {
        codeTNVED: "4012 20 000",
        productType:
          "шины и покрышки пневматические резиновые, восстановленные или бывшие в употреблении; шины и покрышки массивные или полупневматические, шинные протекторы и ободные ленты, резиновые, шины и покрышки пневматические, бывшие в употреблении"
      },
      {
        group: "Аккумуляторы электрические, включая сепараторы для них",
        productType: null
      },
      {
        codeTNVED: "8507 10",
        productType:
          "аккумуляторы электрические, включая сепараторы для них, прямоугольной (в том числе квадратной) или иной формы, свинцовые, используемые для запуска поршневых двигателей"
      },
      {
        codeTNVED: "8507 20",
        productType:
          "аккумуляторы электрические, включая сепараторы для них, прямоугольной (в том числе квадратной) или иной формы, аккумуляторы свинцовые прочие"
      },
      {
        codeTNVED: "8507 30",
        productType:
          "аккумуляторы электрические, включая сепараторы для них, прямоугольной (в том числе квадратной) или иной формы, никель-кадмиевые"
      },
      {
        codeTNVED: "8507 40 000 0",
        productType:
          "аккумуляторы электрические, включая сепараторы для них, прямоугольной (в том числе квадратной) или иной формы, никель-железные"
      },
      {
        codeTNVED: "8507 50 000 0",
        productType:
          "аккумуляторы электрические, включая сепараторы для них, прямоугольной (в том числе квадратной) или иной формы, гидридно-никелевые"
      },
      {
        codeTNVED: "8507 60 000 0",
        productType:
          "аккумуляторы электрические, включая сепараторы для них, прямоугольной (в том числе квадратной) или иной формы, литий-ионные"
      },
      {
        codeTNVED: "8507 80 000 0",
        productType:
          "аккумуляторы электрические, включая сепараторы для них, прямоугольной (в том числе квадратной) или иной формы, аккумуляторы прочие"
      }
    ],
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
            isRop: this.isRop,
            selectedRop: this.selectedRop,
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

<style>
/* This fix the long text for closed vue-selects, fix long text in options during the search (they now break line). */
.vs__selected-options {
  flex-wrap: nowrap;
  max-width: calc(100% - 41px);
}

.vs__selected {
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
  overflow: hidden;
}

.vs__search {
  position: absolute;
}

.vs--open .vs__search {
  position: static;
}

.vs__dropdown-option {
  white-space: normal;
}

.vs__dropdown-option--disabled {
  background: #ededed;
  color: #3b3b3b;
}

/* This fix the long text for closed vue-selects, fix long text in options during the search (they now break line). */

/* .vs__dropdown-menu {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.vs__dropdown-option {
  min-width: 100%;
}
 */

  .style-chooser .vs__search::placeholder,
  .style-chooser .vs__dropdown-toggle,
  .style-chooser .vs__dropdown-menu {
    background: #dfe5fb;
    border: none;
    color: #394066;
    font-size: 12px;
/*     text-transform: lowercase; */
/*     font-variant: small-caps; */
  }

  .style-chooser .vs__clear,
  .style-chooser .vs__open-indicator {
    fill: #394066;
  }
</style>
