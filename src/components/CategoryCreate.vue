<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'Create'|localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="from-group">
          <label for="name">{{'Title'|localize}}</label>
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
            class="form-control"
          />
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >{{'Message_CategoryTitle'|localize}}</span>
        </div>

        <!-- Код отхода -->
        <div class="from-group">
          <label for="waste-code">{{'Waste_Code'|localize}}</label>
          <input id="waste-code" type="text" v-model="wasteCode" class="form-control" />
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
                    <input
                      type="text"
                      v-model="waste.processName"
                    />
                  </label>
                </td>
                <td>
                  <label>
                    {{'Waste_Hazard_Property' | localize}}
                    <input
                      type="text"
                      v-model="waste.hazardProperty"
                    />
                  </label>
                </td>
                <td class="text-right">
                  <button
                    class="btn btn-danger waves-effect waves-light"
                    @click.prevent="deleteItem(index)"
                  >
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

        <div class="input-field">
          <h5>{{'Waste_Chemical_Composition' | localize }}</h5>
          <table class="meta-table">
            <!-- <thead>
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
            </thead>-->
            <tbody>
              <tr class="item" v-for="(w, idx) in wastesComposition" :key="idx">
                <td>
                  <label class="small-font">
                    {{'Waste_Component_Name' | localize }}
                    <input
                      type="text"
                      v-model="w.wasteComponentName"
                    />
                  </label>
                </td>
                <td>
                  <label class="small-font">
                    {{'Waste_Component_Concentration' | localize }}
                    <input type="number" v-model.number="w.wasteComponentConcentration" />
                  </label>
                </td>
                <td>
                  <label class="small-font">
                    {{'Waste_Index_Source_Name' | localize }}
                    <input type="text" v-model="w.wasteIndexSourceName" />
                  </label>
                </td>
                <td>
                  <label class="small-font">
                    {{'Value_Label' | localize }}
                    <input
                      type="text"
                      v-model="w.wasteIndexSourceValue"
                    />
                  </label>
                </td>
                <td>
                  <label class="small-font">
                    {{'Waste_Level_Label' | localize }}
                    <select
                      v-model="w.hazWasteLevel"
                      class="browser-default"
                    >
                      <option value disabled selected>{{ 'Please_Select' | localize }}</option>
                      <option value="amber">A</option>
                      <option value="red">R</option>
                      <option value="green">G</option>
                    </select>
                  </label>
                </td>

                <td>
                  <label class="small-font">
                    {{'Waste_Haz_Waste_Level_Value' | localize }}
                    <input
                      type="number"
                      v-model.number="w.hazWasteLevelValue"
                    />
                  </label>
                </td>
                <td>
                  <label class="small-font">
                    {{'Waste_Index_Source_Document' | localize }}
                    <input
                      type="text"
                      v-model="w.wasteIndexSourceDocument"
                    />
                  </label>
                </td>
                <td class="text-right small-font">
                  <button
                    class="btn btn-danger waves-effect waves-light"
                    @click.prevent="deleteWasteComposition(idx)"
                  >
                    <i class="material-icons">delete</i>
                  </button>
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <button
                    class="waves-effect waves-light btn-small"
                    @click.prevent="addWasteComposition"
                  >
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
          <textarea
            id="recycling-type"
            type="text"
            v-model="recyclingType"
            :class="{invalid: $v.recyclingType.$dirty && !$v.recyclingType.required}"
            class="form-control"
          ></textarea>
          <span
            v-if="$v.recyclingType.$dirty && !$v.recyclingType.required"
            class="helper-text invalid"
          >{{'Message_Recycling_Type_Title'|localize}}</span>
        </div>

        <!-- необходимые меры предосторожности при обращении с отходами -->
        <div class="form-group">
          <label for="precaution-type">{{'Precaution_Title'|localize}}</label>
          <textarea
            id="precaution-type"
            type="textarea"
            v-model="precaution"
            :class="{invalid: $v.precaution.$dirty && !$v.precaution.required}"
            class="form-control"
          ></textarea>
          <span
            v-if="$v.precaution.$dirty && !$v.precaution.required"
            class="helper-text invalid"
          >{{'Message_Precaution_Title'|localize}}</span>
        </div>
        <!-- END необходимые меры предосторожности при обращении с отходами -->

        <!-- Требование к транспортировке отходов и проведение погрузо-разгрузочных
        работ-->
        <div class="form-group">
          <label for="transportation-requirements">{{'Transportation_Requirements_Title'|localize}}</label>
          <textarea
            id="transportation-requirements"
            type="textarea"
            v-model="transportationRequirements"
            class="form-control"
          ></textarea>
        </div>
        <!-- END Требование к транспортировке отходов и проведение погрузо-разгрузочных
        работ-->

        <!-- Меры по предупреждению и ликвидации чрезвычайных ситуаций природного и техногенного
        характера и их последствий-->
        <div class="form-group">
          <label for="emergency-requirements">{{'Emergency_Requirements_Title'|localize}}</label>
          <textarea
            id="emergency-requirements"
            type="textarea"
            v-model="emergency"
            class="form-control"
          ></textarea>
        </div>

        <!-- Дополнительная информация -->
        <div class="form-group">
          <label for="additional-info">{{'Additional_Information'|localize}}</label>
          <textarea
            id="additional-info"
            type="textarea"
            v-model="additionalInfo"
            class="form-control"
          ></textarea>
        </div>

        <!-- waste color -->
        <label>{{'Waste_Color' | localize}}</label>
        <p>
          <label for="one">
            <input name="group1" type="radio" id="one" value="red" v-model="wasteColor" />
            <span>{{'Red' | localize}}</span>
          </label>
          <br />
          <label for="two">
            <input name="group1" type="radio" id="two" value="amber" v-model="wasteColor" />
            <span>{{'Amber' | localize}}</span>
          </label>
          <br />
          <label for="three">
            <input name="group1" type="radio" id="three" value="green" v-model="wasteColor" />
            <span>{{'Green' | localize}}</span>
          </label>
          <br />
          <label for="four">
            <input name="group1" type="radio" id="four" value="na" v-model="wasteColor" />
            <span>{{'Not_Applicable' | localize}}</span>
          </label>
          <br />

          <!-- индекс отхода  -->
        </p>
        <div class="form-group">
          <label for="waste-index">{{'Waste_Index'|localize}}</label>
          <input id="waste-index" type="text" v-model="wasteIndex" class="form-control" />
        </div>

        <!-- END -->

        <!-- Limit waste -->

        <div class="form-group">
          <label for="limit">{{'Limit'|localize}}</label>
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
            class="form-control"
          />

          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
          >{{'Message_MinLength'|localize}} {{$v.limit.$params.minValue.min}}</span>
        </div>

        <!-- Limit KZT -->

        <div class="form-group">
          <label for="limitKZT">{{'Limit_KZT'|localize}}</label>
          <input
            id="limitKZT"
            type="number"
            v-model.number="limitKZT"
            :class="{invalid: $v.limitKZT.$dirty && !$v.limitKZT.minValue}"
            class="form-control"
          />

          <span
            v-if="$v.limitKZT.$dirty && !$v.limitKZT.minValue"
            class="helper-text invalid"
          >{{'Message_MinLength'|localize}} {{$v.limit.$params.minValue.min}}</span>
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
import { required, minValue } from 'vuelidate/lib/validators'
import localizeFilter from '@/filters/localize.filter'

export default {
  data: () => ({
    title: '',
    wasteCode: '',
    wasteColor: '',
    wastesOrigin: [
      {
        wasteSource: '',
        processName: '',
        hazardProperty: ''
      }
    ],
    wastesComposition: [
      {
        wasteComponentName: '',
        wasteComponentConcentration: '',
        wasteIndexSourceName: '',
        wasteIndexSourceValue: '',
        hazWasteLevel: '',
        hazWasteLevelValue: '',
        wasteIndexSourceDocument: ''
      }
    ],
    recyclingType: '',
    precaution: '',
    transportationRequirements: '',
    emergency: '',
    additionalInfo: '',
    wasteIndex: '',
    limit: 100,
    limitKZT: 50000
  }),
  validations: {
    title: { required },
    recyclingType: { required },
    precaution: { required },
    limit: { minValue: minValue(1) },
    limitKZT: { minValue: minValue(1) }
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
        const category = await this.$store.dispatch('createCategory', {
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
        })
        this.title = ''
        this.wasteCode = ''
        this.wasteColor = ''
        this.wastesOrigin = []
        this.wastesComposition = []
        this.recyclingType = ''
        this.precaution = ''
        this.additionalInfo = ''
        this.wasteIndex = ''
        ;(this.transportationRequirements = ''),
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
  }
}
</script>

<style scoped>
.small-font {
  font-size: 0.7rem;
}
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