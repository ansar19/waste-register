<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'Create'|localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="from-group">
          <label for="name1">{{'Title'|localize}}</label>
          <input id="name1" type="text" v-model="title" :class="{invalid: $v.title.$dirty && !$v.title.required}"
            class="form-control" />
          <span v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid">{{'Message_CategoryTitle'|localize}}</span>
        </div>

        <!-- Код отхода -->
        <div class="from-group">
          <label for="waste-code1">{{'Waste_Code'|localize}}</label>
          <input id="waste-code1" type="text" v-model="wasteCode" class="form-control" />
        </div>

        <!-- Агрегатное состояние отходов -->
        <div class="from-group">
          <label>{{'Waste_Aggregate_State' | localize}}</label>
          <p>
            <label for="solid1">
              <input name="group2" type="radio" id="solid1" value="solid" v-model="wasteAggregateState" />
              <span>{{'Solid' | localize}}</span>
            </label>
            <br />
            <label for="liquid1">
              <input name="group2" type="radio" id="liquid1" value="liquid" v-model="wasteAggregateState" />
              <span>{{'Liquid' | localize}}</span>
            </label>
            <br />
            <label for="pasty1">
              <input name="group2" type="radio" id="pasty1" value="pasty" v-model="wasteAggregateState" />
              <span>{{'Pasty' | localize}}</span>
            </label>
            <br />
            <span v-if="$v.wasteAggregateState.$dirty && !$v.wasteAggregateState.required"
              class="helper-text invalid">{{'Message_Waste_Aggregate_State'|localize}}</span>
          </p>
        </div>

        <!-- Происхождение отходов -->

        <div class="input-field">
          <h5>{{ 'Waste_Origin' | localize }}</h5>
          <table class="meta-table">
            <!-- <thead>
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
            </thead>-->
            <tbody>
              <tr class="item" v-for="(waste, index) in wastesOrigin" :key="index">
                <td>
                  <label>
                    {{'Waste_Source' | localize}}
                    <input type="text" v-model="waste.wasteSource" />
                  </label>
                </td>
                <td>
                  <label>
                    {{'Waste_Process_Name' | localize}}
                    <input type="text" v-model="waste.processName" />
                  </label>
                </td>
                <td>
                  <label>
                    {{'Waste_Hazard_Property' | localize}}
                    <input type="text" v-model="waste.hazardProperty" />
                  </label>
                </td>
                <td class="text-right">
                  <button class="btn btn-danger waves-effect waves-light" @click.prevent="deleteItem(index)">
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
                <td class="text-right small-font">
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
          <label for="recycling-type1">{{'Recycling_Type'|localize}}</label>
          <textarea id="recycling-type1" type="text" v-model="recyclingType"
            :class="{invalid: $v.recyclingType.$dirty && !$v.recyclingType.required}" class="form-control"></textarea>
          <span v-if="$v.recyclingType.$dirty && !$v.recyclingType.required"
            class="helper-text invalid">{{'Message_Recycling_Type_Title'|localize}}</span>
        </div>

        <!-- необходимые меры предосторожности при обращении с отходами -->
        <div class="form-group">
          <label for="precaution-type1">{{'Precaution_Title'|localize}}</label>
          <textarea id="precaution-type1" type="textarea" v-model="precaution"
            :class="{invalid: $v.precaution.$dirty && !$v.precaution.required}" class="form-control"></textarea>
          <span v-if="$v.precaution.$dirty && !$v.precaution.required"
            class="helper-text invalid">{{'Message_Precaution_Title'|localize}}</span>
        </div>
        <!-- END необходимые меры предосторожности при обращении с отходами -->

        <!-- Требование к транспортировке отходов и проведение погрузо-разгрузочных
        работ-->
        <div class="form-group">
          <label for="transportation-requirements1">{{'Transportation_Requirements_Title'|localize}}</label>
          <textarea id="transportation-requirements1" type="textarea" v-model="transportationRequirements"
            class="form-control"></textarea>
        </div>
        <!-- END Требование к транспортировке отходов и проведение погрузо-разгрузочных
        работ-->

        <!-- Меры по предупреждению и ликвидации чрезвычайных ситуаций природного и техногенного
        характера и их последствий-->
        <div class="form-group">
          <label for="emergency-requirements1">{{'Emergency_Requirements_Title'|localize}}</label>
          <textarea id="emergency-requirements1" type="textarea" v-model="emergency" class="form-control"></textarea>
        </div>

        <!-- Дополнительная информация -->
        <div class="form-group">
          <label for="additional-info1">{{'Additional_Information'|localize}}</label>
          <textarea id="additional-info1" type="textarea" v-model="additionalInfo" class="form-control"></textarea>
        </div>

        <!-- waste color -->
        <label>{{'Waste_Color' | localize}}</label>
        <p>
          <label for="one">
            <input name="group1" type="radio" id="one" value="red" v-model="wasteColor.color" />
            <span>{{'Red' | localize}}</span>
          </label>
          <br />
          <label for="two">
            <input name="group1" type="radio" id="two" value="amber" v-model="wasteColor.color" />
            <span>{{'Amber' | localize}}</span>
          </label>
          <br />
          <label for="three">
            <input name="group1" type="radio" id="three" value="green" v-model="wasteColor.color" />
            <span>{{'Green' | localize}}</span>
          </label>
          <br />
          <label for="four">
            <input name="group1" type="radio" id="four" value="na" v-model="wasteColor.color" />
            <span>{{'Not_Applicable' | localize}}</span>
          </label>
          <br />
          <span v-if="$v.wasteColor.color.$dirty && !$v.wasteColor.color.required"
            class="helper-text invalid">{{'Message_Waste_Type_Title'|localize}}</span>
        </p>

        <!-- для отчета по инвентаризации отходов -->

        <div class="form-group">
          <label for="waste-types1">{{ 'Waste_Type' | localize}}</label>
          <select v-model="wasteColor.wasteType" v-if="wasteColor.color" class="browser-default">
            <option id="waste-types1" v-for="(option, id) in setOptions" v-bind:value="option" v-bind:key="id">
              {{option.text}}</option>
          </select>
          <br />
        </div>

        <!-- индекс отхода  -->

        <div class="form-group">
          <label for="waste-index1">{{'Waste_Index'|localize}}</label>
          <input id="waste-index1" type="text" v-model="wasteIndex" class="form-control" />
        </div>

        <!-- END -->

        <!-- Limit waste -->

        <div class="form-group">
          <label for="limit1">{{'Limit'|localize}}</label>
          <input id="limit1" type="number" v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}" class="form-control" />
          <span v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid">{{'Message_MinLength'|localize}} {{$v.limit.$params.minValue.min}}</span>
        </div>

        <!-- Limit KZT -->

        <div class="form-group">
          <label for="limitKZT1">{{'Limit_KZT'|localize}}</label>
          <input id="limitKZT1" type="number" v-model.number="limitKZT"
            :class="{invalid: $v.limitKZT.$dirty && !$v.limitKZT.minValue}" class="form-control" />
          <span v-if="$v.limitKZT.$dirty && !$v.limitKZT.minValue"
            class="helper-text invalid">{{'Message_MinLength'|localize}} {{$v.limit.$params.minValue.min}}</span>
        </div>

        <div class="mb-3">
          <label for="formFileMultiple" class="form-label">{{ 'Attach_Documents' | localize }}</label>
          <input class="form-control" type="file" id="formFileMultiple" multiple>
        </div>

        
        <button class="btn btn-success waves-effect waves-light mb-4" type="submit">
          {{'Create'|localize}}
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
  data: () => ({
    title: '',
    wasteCode: '',
    wasteColor: {
      color: undefined,
      wasteType: undefined
    },
    wasteAggregateState: '',
    wastesOrigin: [{
      wasteSource: '',
      processName: '',
      hazardProperty: '',
    }, ],
    wastesComposition: [{
      wasteComponentName: '',
      wasteComponentConcentration: '',
      wasteIndexSourceName: '',
      wasteIndexSourceValue: '',
      hazWasteLevel: '',
      hazWasteLevelValue: '',
      wasteIndexSourceDocument: '',
    }, ],
    recyclingType: '',
    precaution: '',
    transportationRequirements: '',
    emergency: '',
    additionalInfo: '',
    wasteIndex: '',
    limit: 100,
    limitKZT: 50000,
  }),
  validations: {
    title: {
      required
    },
    wasteAggregateState: { 
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
    },
  },
  mounted() {
    M.updateTextFields()
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
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          wasteCode: this.wasteCode,
          wasteAggregateState: this.wasteAggregateState,
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
          limitKZT: this.limitKZT,
        })
        this.title = ''
        this.wasteCode = ''
        this.wasteAggregateState = ''
        this.wasteColor = {}
        this.wastesOrigin = []
        this.wastesComposition = []
        this.recyclingType = ''
        this.precaution = ''
        this.additionalInfo = ''
        this.wasteIndex = '';
        (this.transportationRequirements = ''),
        (this.emergency = ''),
        (this.limit = 100),
        (this.limitKZT = 50000)
        this.$v.$reset()
        this.$message(localizeFilter('Category_HasBeenCreated'))
        this.$emit('created', category)
      } catch (e) {}
    },
    addRow() {
      this.wastesOrigin.push({
        wasteSource: '',
        processName: '',
        hazardProperty: '',
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
        wasteIndexSourceDocument: '',
      })
    },
    deleteWasteComposition(idx) {
      this.wastesComposition.splice(idx, 1)
    },
  },
}
</script>

<style scoped>
/* .small-font {
  font-size: 0.7rem;
} */
/* [data-foo]:after {
    content: attr(data-foo);
    background-color: black;
    color: white;
    white-space: pre;
    display: inline-block;
} */

/* td {padding: 2px 5px;}
td input{margin:0 !important;height:2em !important;}
td .select-wrapper input.select-dropdown{height:2em;line-height:2em;} */
</style>