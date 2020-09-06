<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'Edit'|localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="form-group">
          <label>{{'SelectCategory'|localize}}</label>
          <select ref="select" v-model="current" class="form-control-custom">
            <option v-for="c of categories" :key="c.id" :value="c.id">{{c.title}}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="name">{{'Title'|localize}}</label>
          <input id="name" type="text" v-model="title" :class="{invalid: $v.title.$dirty && !$v.title.required}"
            class="form-control" />

          <span v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid">{{'Message_CategoryTitle'|localize}}</span>
        </div>

        <!-- Код отхода -->
        <div class="from-group">
          <label for="waste-code">{{'Waste_Code'|localize}}</label>
          <input id="waste-code" type="text" v-model="wasteCode" class="form-control" />
        </div>

        <!-- Происхождение отходов -->

        <div class="input-field">
          <h5>{{ 'Waste_Origin' | localize }}</h5>
          <table class="table">
            <thead>
              <tr>
                <th>
                  <label>{{'Waste_Source' | localize}}</label>
                </th>
                <th>
                  <label>{{'Waste_Process_Name' | localize}}</label>
                </th>
                <th>
                  <label>{{'Waste_Hazard_Property' | localize}}</label>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr class="item" v-for="(waste, index) in wastesOrigin" :key="index">
                <td>
                  <input type="text" v-model="waste.wasteSource" />
                </td>
                <td>
                  <input type="text" v-model="waste.processName" />
                </td>
                <td>
                  <input type="text" v-model="waste.hazardProperty" />
                </td>
                <td class="text-right">
                  <button class="btn btn-danger waves-effect waves-light" v-on:click="deleteItem(index)">
                    <i class="material-icons">delete</i>
                  </button>
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <button class="waves-effect waves-light btn-small" @click.prevent="addRow">
                    <i class="material-icons">exposure_plus_1</i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Химический состав отходов и описание опасных свойств их компонентов: -->

        <div class="input-field table-responsive">
          <h5>{{'Waste_Chemical_Composition' | localize }}</h5>
          <table class="table">
            <thead>
              <tr>
                <th>
                  <label>{{'Waste_Component_Name' | localize }}</label>
                </th>
                <th>
                  <label>{{'Waste_Component_Concentration' | localize }}</label>
                </th>
                <th>
                  <label>{{'Waste_Index_Source_Name' | localize }}</label>
                </th>
                <th>
                  <label>{{'Value_Label' | localize }}</label>
                </th>
                <th>
                  <label>{{'Waste_Level_Label' | localize }}</label>
                </th>
                <th>
                  <label>{{'Waste_Haz_Waste_Level_Value' | localize }}</label>
                </th>
                <th>
                  <label>{{'Waste_Index_Source_Document' | localize }}</label>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr class="item" v-for="(w, idx) in wastesComposition" :key="idx">
                <td>
                  <input type="text" v-model="w.wasteComponentName" />
                </td>
                <td>
                  <input type="number" v-model.number="w.wasteComponentConcentration" />
                </td>
                <td>
                  <input type="text" v-model="w.wasteIndexSourceName" />
                </td>
                <td>
                  <input type="text" v-model="w.wasteIndexSourceValue" />
                </td>
                <td>
                  <select v-model="w.hazWasteLevel" class="browser-default">
                    <option value disabled selected>{{ 'Please_Select' | localize }}</option>
                    <option value="amber">A</option>
                    <option value="red">R</option>
                    <option value="green">G</option>
                    <option value="na">{{'Not_Applicable'| localize}}</option>
                  </select>
                </td>
                <td>
                  <input type="number" v-model.number="w.hazWasteLevelValue" />
                </td>
                <td>
                  <input type="text" v-model="w.wasteIndexSourceDocument" />
                </td>
                <td class="text-right">
                  <button class="btn btn-danger waves-effect waves-light" @click.prevent="deleteWasteComposition(idx)">
                    <i class="material-icons">delete</i>
                  </button>
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <button class="waves-effect waves-light btn-small" @click.prevent="addWasteComposition">
                    <i class="material-icons">exposure_plus_1</i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Рекомендуемый способ переработки отходов -->

        <div class="form-group">
          <label for="name">{{'Recycling_Type'|localize}}</label>
          <textarea id="recycling-type" type="text" v-model="recyclingType"
            :class="{invalid: $v.recyclingType.$dirty && !$v.recyclingType.required}" class="form-control"></textarea>

          <span v-if="$v.recyclingType.$dirty && !$v.recyclingType.required"
            class="helper-text invalid">{{'Message_Recycling_Type_Title'|localize}}</span>
        </div>

        <div class="form-group">
          <label for="precaution-type">{{'Precaution_Title'|localize}}</label>
          <textarea id="precaution-type" type="textarea" v-model="precaution"
            :class="{invalid: $v.precaution.$dirty && !$v.precaution.required}" class="form-control"></textarea>
          <span v-if="$v.title.$dirty && !$v.precaution.required"
            class="helper-text invalid">{{'Message_Precaution_Title'|localize}}</span>
        </div>

        <!-- Требование к транспортировке отходов и проведение погрузо-разгрузочных
        работ-->
        <div class="form-group">
          <label for="transportation-requirements">{{'Transportation_Requirements_Title'|localize}}</label>
          <textarea id="transportation-requirements" type="textarea" v-model="transportationRequirements"
            class="form-control"></textarea>
        </div>
        <!-- END Требование к транспортировке отходов и проведение погрузо-разгрузочных
        работ-->

        <!-- Меры по предупреждению и ликвидации чрезвычайных ситуаций природного и техногенного
        характера и их последствий-->
        <div class="form-group">
          <label for="emergency-requirements">{{'Emergency_Requirements_Title'|localize}}</label>
          <textarea id="emergency-requirements" type="textarea" v-model="emergency" class="form-control"></textarea>
        </div>

        <!-- Дополнительная информация -->
        <div class="form-group">
          <label for="additional-info">{{'Additional_Information'|localize}}</label>
          <textarea id="additional-info" type="textarea" v-model="additionalInfo" class="form-control"></textarea>
        </div>

        <!-- waste color -->
        <label>{{'Waste_Color' | localize}}</label>
        <p>
          <label for="red">
            <input name="group1" type="radio" id="red" value="red" v-model="wasteColor.color" />
            <span>{{'Red' | localize}}</span>
          </label>
          <br />
          <label for="amber">
            <input name="group1" type="radio" id="amber" value="amber" v-model="wasteColor.color" />
            <span>{{'Amber' | localize}}</span>
          </label>
          <br />
          <label for="green">
            <input name="group1" type="radio" id="green" value="green" v-model="wasteColor.color" />
            <span>{{'Green' | localize}}</span>
          </label>
          <br />
          <label for="na">
            <input name="group1" type="radio" id="na" value="na" v-model="wasteColor.color" />
            <span>{{'Not_Applicable' | localize}}</span>
          </label>
          <br />
          <span v-if="$v.wasteColor.color.$dirty && !$v.wasteColor.color.required"
            class="helper-text invalid">{{'Message_Waste_Type_Title'|localize}}</span>
        </p>

        <!-- для отчета по инвентаризации отходов -->

        <div class="form-group">
          <label for="waste-types">{{ 'Waste_Type' | localize}}</label>
          <select v-model="wasteColor.wasteType" v-if="wasteColor.color" class="browser-default">
            <option id="waste-types" v-for="(option, id) in setOptions" v-bind:value="option.val" v-bind:key="id">
              {{option.text}}</option>
          </select>

          <br />

        </div>

        <!-- индекс отхода  -->

        <div class="form-group">
          <label for="waste-index">{{'Waste_Index'|localize}}</label>
          <input id="waste-index" type="text" v-model="wasteIndex" class="form-control" />
        </div>

        <!-- END -->

        <!-- Limit Mass -->

        <div class="form-group">
          <label for="limit">{{'Limit'|localize}}</label>
          <input id="limit" type="number" v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}" class="form-control" />
          <span v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid">{{'Message_MinLength'|localize}} {{$v.limit.$params.minValue.min}}</span>
        </div>

        <!-- Limit KZT -->

        <div class="form-group">
          <label for="limit-kzt">{{'Limit_KZT'|localize}}</label>
          <input id="limit-kzt" type="number" v-model.number="limitKZT"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}" class="form-control" />
          <span v-if="$v.limitKZT.$dirty && !$v.limitKZT.minValue"
            class="helper-text invalid">{{'Message_MinLength'|localize}} {{$v.limitKZT.$params.minValue.min}}</span>
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
import {
  required,
  minValue
} from 'vuelidate/lib/validators'
import localizeFilter from '@/filters/localize.filter'
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select: null,
    title: '',
    wasteCode: '',
    wasteColor: {
      color: undefined,
      wasteType: undefined
    },
    wastesOrigin: [{
      wasteSource: '',
      processName: '',
      hazardProperty: ''
    }],
    wastesComposition: [{
      wasteComponentName: '',
      wasteComponentConcentration: '',
      wasteIndexSourceName: '',
      wasteIndexSourceValue: '',
      hazWasteLevel: '',
      hazWasteLevelValue: '',
      wasteIndexSourceDocument: ''
    }],
    recyclingType: '',
    precaution: '',
    transportationRequirements: '',
    emergency: '',
    additionalInfo: '',
    wasteIndex: '',
    limit: 100,
    limitKZT: 50000,
    current: null
  }),
  validations: {
    title: {
      required
    },
    wasteColor: {
      color: {
        required
      }
    },
    recyclingType: {
      required
    },
    precaution: {
      required
    },
    limit: {
      minValue: minValue(1)
    },
    limitKZT: {
      minValue: minValue(1)
    }
  },
  watch: {
    current(catId) {
      const {
        title,
        wasteCode,
        wasteColor,
        wastesOrigin,
        wastesComposition,
        recyclingType,
        precaution,
        transportationRequirements,
        emergency,
        additionalInfo,
        wasteIndex,
        limit,
        limitKZT
      } = this.categories.find(c => c.id === catId)
      this.title = title
      this.wasteCode = wasteCode
      this.wasteColor = wasteColor
      this.wastesOrigin = wastesOrigin
      this.wastesComposition = wastesComposition
      this.recyclingType = recyclingType
      this.precaution = precaution
      this.transportationRequirements = transportationRequirements
      this.emergency = emergency
      this.additionalInfo = additionalInfo
      this.wasteIndex = wasteIndex;
      (this.limit = limit), (this.limitKZT = limitKZT)
    }
  },
  created() {
    const {
      id,
      title,
      wasteCode,
      wasteColor,
      wastesOrigin,
      wastesComposition,
      recyclingType,
      precaution,
      transportationRequirements,
      emergency,
      additionalInfo,
      wasteIndex,
      limit,
      limitKZT
    } = this.categories[0]
    this.current = id
    this.title = title
    this.wasteCode = wasteCode
    this.wasteColor = wasteColor
    this.wastesOrigin = wastesOrigin
    this.wastesComposition = wastesComposition
    this.recyclingType = recyclingType
    this.precaution = precaution
    this.transportationRequirements = transportationRequirements
    this.emergency = emergency
    this.additionalInfo = additionalInfo
    this.wasteIndex = wasteIndex;
    (this.limit = limit), (this.limitKZT = limitKZT)
  },
  computed: {
    setOptions() {
      if (this.wasteColor.color === 'red') {
        var options = [{
            val: 'otherRedWaste',
            text: 'прочие опасные отходы красного уровня',
          },
          {
            val: 'polychlorinated',
            text: 'отходы, содержащие полихлорированный дифенил, полихлорированный терфинил, полибромированный дифенил (а также любые полибромированные аналоги этих соединений)',
          },
          {
            val: 'asbest',
            text: 'асбест и любые отходы со схожими с асбестом характеристиками',
          },
          {
            val: 'dibenzofuran',
            text: 'любое соединение, родственное полихлорированному дибензофурану',
          },
          {
            val: 'dibenzodioxin',
            text: 'любое соединение, родственное полихлорированному дибензодиоксину',
          },
          {
            val: 'antiDenotationAdditivesAddedLead',
            text: 'шламы антиденотационных присадок с добавлением свинца',
          },

          {
            val: 'peroxide',
            text: 'перекиси (кроме перекиси водорода)',
          },
        ]
      } else if (this.wasteColor.color === 'amber') {
        var options = [{
            val: 'mercuryWaste',
            text: 'отходы, содержащие ртуть'
          },
          {
            val: 'mercuryLamps',
            text: 'включая ртутьсодержащие лампы'
          }, // TO-DO: 3rd level dropdown
          {
            val: 'arsenicWaste',
            text: 'отходы, содержащие мышьяк'
          },
          {
            val: 'hexavalentChromium',
            text: 'отходы, содержащие хром шестивалентный',
          },
          {
            val: 'leadWaste',
            text: 'отходы, содержащие свинец'
          },
          {
            val: 'zincWaste',
            text: 'отходы, содержащие цинк'
          },
          {
            val: 'usedBatteries',
            text: 'отработанные аккумуляторы, целые или разломанные',
          },
          {
            val: 'cyanideWaste',
            text: 'отходы, содержащие цианиды'
          },
          {
            val: 'industrialSludge',
            text: 'иловый осадок промышленных предприятий',
          },
          {
            val: 'bottomResidues',
            text: 'кубовые остатки'
          },
          {
            val: 'galvanicWaste',
            text: 'отходы гальванических производств'
          },
          {
            val: 'phosphoricSlags',
            text: 'шлаки фосфорные'
          },
          {
            val: 'pesticidesToxicChemicals',
            text: 'пестициды, ядохимикаты'
          },
          {
            val: 'usedOil',
            text: 'отработанные масла'
          },
          {
            val: 'paintWaste',
            text: 'отходы лаков и красок'
          },
          {
            val: 'cuttingOilsAndCoolants',
            text: 'смазочно-охлаждающие жидкости',
          },
          {
            val: 'crudeOilAndOilProductsWaste',
            text: 'отходы сырой нефти, нефтепродуктов',
          },
          {
            val: 'oilAndChemicalsContaminatedSoil',
            text: 'грунты, пропитанные нефтью, мазутом, химикатами',
          },
          {
            val: 'oilSludge',
            text: 'нефтешламы'
          },
          {
            val: 'drillCuttings',
            text: 'отработанный буровой шлам'
          },
          {
            val: 'porkSlurry',
            text: 'свиная жижа'
          },
          {
            val: 'otherAmberWaste',
            text: 'прочие опасные отходы янтарного уровня',
          },
        ]
      } else if (this.wasteColor.color === 'green') {
        var options = [{
            val: 'chromiumScrap',
            text: 'отходы и лом хрома'
          },
          {
            val: 'cadmiumScrap',
            text: 'отходы и лом кадмия'
          },
          {
            val: 'aluminumScrap',
            text: 'отходы и лом алюминия'
          },
          {
            val: 'copperScrap',
            text: 'отходы и лом меди'
          },
          {
            val: 'leadScrap',
            text: 'отходы и лом свинца'
          },
          {
            val: 'zincScrap',
            text: 'отходы и лом цинка'
          },
          {
            val: 'manganeseScrap',
            text: 'отходы и лом марганца'
          },
          {
            val: 'plasticAndPolyethyleneWaste',
            text: 'отходы пластмассы, полиэтилена',
          },
          {
            val: 'abrasiveWaste',
            text: 'отходы абразива'
          },
          {
            val: 'usedTiresAndRubberWaste',
            text: 'использованные шины и другие резиновые отходы',
          },
          {
            val: 'ashesAndSlags',
            text: 'зола и золошлаковые отходы'
          },
          {
            val: 'birdDung',
            text: 'птичий помет (навоз)'
          },
          {
            val: 'otherGreenWaste',
            text: 'прочие опасные отходы зеленого уровня',
          },
        ]
      } else if (this.wasteColor.color === 'na') {
        var options = [{ val: "paperAndCardboardPackaging", text: "бумажная и картонная упаковка" },// to-do: 3rd level
          { val: "plasticPackaging", text: "пластиковая и пластмассовая упаковка" },
          { val: "glass", text: "стеклотара (стеклобой)" },
          { val: "woodenPackage", text: "деревянная упаковка" },
          { val: "metalPackaging", text: "металлическая упаковка" },
          { val: "otherPackaging", text: "прочие упаковочные материалы" },
          { val: "paper", text: "бумага" },
          { val: "cardboard", text: "картон" },
          { val: "paperAndCardboardCompound", text: "комбинированный (бумага и картон)" },
          { val: "hardPlastic", text: "твердый пластик" },
          { val: "softPlastic", text: "мягкий пластик" },
          { val: "pdpe", text: "полиэтилен низкого давления (ПНД)" },
          { val: "hpe", text: "полиэтилен высокого давления (ПВД)" },
          { val: "otherPlasticWaste", text: "прочие отходы пластика" },
          { val: "bulkyHouseholdEquipment", text: "крупногабаритные бытовое оборудование" },
          { val: "smallHouseholdEquipment", text: "мелкогабаритные бытовое оборудование" },
          { val: "iTAndTelecomEquipment", text: "оборудование информационных технологий и телекоммуникаций" },
          { val: "consumerEquipment", text: "потребительское оборудование" },
          { val: "lightingEquipment", text: "осветительное оборудование" },
          { val: "electricalAndElectronicDevices", text: "электрические и электронные приборы" },
          { val: "otherElectronicAndElectricalWaste", text: "прочие отходы электронного и электрического оборудования" },
          { val: "largeSizeFurniture", text: "крупногабаритные отходы - мебель" },
          { val: "largeSizeCeramics ", text: "крупногабаритные отходы - керамика (раковины, унитазы)" },
          { val: "otherBulkyWaste", text: "прочие крупногабаритные отходы" },
          { val: "constructionWasteWood", text: "древесные отходы строительства" },
          { val: "concreteWaste", text: "бой бетонных изделий" },
          { val: "reinforcedConcreteWaste", text: "бой железобетонных изделий" },
          { val: "wasteCeramicPipes", text: "бой труб керамических" },
          { val: "brickWaste", text: "бой кирпича" },
          { val: "mixedDemolitionWaste", text: "смешанные отходы строительства, сноса зданий и сооружений" },
          { val: "otherConstructionWaste", text: "прочие строительные отходы" },
          { val: "disassembledVehicles", text: "автотранспорт, вышедший из эксплуатации - после разборки (корпус)" },
          { val: "decommissionedVehicle", text: "автотранспорт, вышедший из эксплуатации - не разобранный" },
          { val: "otherNonHazWaste", text: "другие неопасные отходы" }]
      }
      return options
    },
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          wasteCode: this.wasteCode,
          wasteColor: this.wasteColor,
          wastesOrigin: this.wastesOrigin,
          wastesComposition: this.wastesComposition,
          recyclingType: this.recyclingType,
          precaution: this.precaution,
          transportationRequirements: this.transportationRequirements,
          emergency: this.emergency,
          additionalInfo: this.additionalInfo,
          wasteIndex: this.wasteIndex,
          limit: this.limit,
          limitKZT: this.limitKZT
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message(localizeFilter('Category_HasBeenUpdated'))
        this.$emit('updated', categoryData)
      } catch (e) {}
    },
    addRow() {
      this.wastesOrigin.push({
        wasteSource: '',
        processName: '',
        hazardProperty: ''
      })
    },
    deleteItem(index) {
      this.wastesOrigin.splice(index, 1)
    },
    addWasteComposition() {
      this.wastesComposition.push({
        wasteComponentName: '',
        wasteComponentConcentration: '',
        wasteIndexSourceName: '',
        wasteIndexSourceValue: '',
        hazWasteLevel: '',
        hazWasteLevelValue: '',
        wasteIndexSourceDocument: ''
      })
    },
    deleteWasteComposition(idx) {
      this.wastesComposition.splice(idx, 1)
    }
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  // updated() {
  // 	this.select = (this.$refs.select).selectpicker('refresh')
  // },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
