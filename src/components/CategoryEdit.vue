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

        <!-- Перечень и наименование исходных материалов, из которых образовались отходы -->
        <div class="from-group">
          <label for="source-materials">{{'Source_Materials'|localize}}</label>
          <input id="source-materials" type="text" v-model="sourceMaterials" class="form-control" />
        </div>

        <!-- Наименование технологического процесса -->
        <div class="from-group">
          <label for="process-name">{{'Process_Name'|localize}}</label>
          <input id="process-name" type="text" v-model="processName" class="form-control" />
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
            v-if="$v.title.$dirty && !$v.precaution.required"
            class="helper-text invalid"
          >{{'Message_Precaution_Title'|localize}}</span>
        </div>

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

        <!-- индекс отхода  -->
        <div class="form-group">
          <label for="waste-index">{{'Waste_Index'|localize}}</label>
          <input id="waste-index" type="text" v-model="wasteIndex" class="form-control" />
        </div>

        <!-- END -->

        <!-- Limit Mass -->

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
          <label for="limit-kzt">{{'Limit_KZT'|localize}}</label>
          <input
            id="limit-kzt"
            type="number"
            v-model.number="limitKZT"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
            class="form-control"
          />
          <span
            v-if="$v.limitKZT.$dirty && !$v.limitKZT.minValue"
            class="helper-text invalid"
          >{{'Message_MinLength'|localize}} {{$v.limitKZT.$params.minValue.min}}</span>
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
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select: null,
    title: '',
    wasteCode: '',
    sourceMaterials: '',
    processName: '',
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
    title: { required },
    recyclingType: { required },
    precaution: { required },
    limit: { minValue: minValue(1) },
    limitKZT: { minValue: minValue(1) }
  },
  watch: {
    current(catId) {
      const {
        title,
        wasteCode,
        sourceMaterials,
        processName,
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
      this.sourceMaterials = sourceMaterials
      this.processName = processName
      this.recyclingType = recyclingType
      this.precaution = precaution
      this.transportationRequirements = transportationRequirements
      this.emergency = emergency
      this.additionalInfo = additionalInfo
      this.wasteIndex = wasteIndex
      ;(this.limit = limit), (this.limitKZT = limitKZT)
    }
  },
  created() {
    const {
      id,
      title,
      wasteCode,
      processName,
      sourceMaterials,
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
    this.sourceMaterials = sourceMaterials
    this.processName = processName
    this.recyclingType = recyclingType
    this.precaution = precaution
    this.transportationRequirements = transportationRequirements
    this.emergency = emergency
    this.additionalInfo = additionalInfo
    this.wasteIndex = wasteIndex
    ;(this.limit = limit), (this.limitKZT = limitKZT)
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
          sourceMaterials: this.sourceMaterials,
          processName: this.processName,
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
