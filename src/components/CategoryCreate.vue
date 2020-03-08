<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'Create'|localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="from-group">
          <label for="name">{{'Title'|localize}}</label>
          <input id="name" type="text" v-model="title" :class="{invalid: $v.title.$dirty && !$v.title.required}" class="form-control">
          <span v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid">{{'Message_CategoryTitle'|localize}}</span>
        </div>

        <div class="form-group">
          <label for="name">{{'Recycling_Type'|localize}}</label>
          <input id="recycling-type" type="text" v-model="recyclingType"
            :class="{invalid: $v.recyclingType.$dirty && !$v.recyclingType.required}" class="form-control">
          <span v-if="$v.recyclingType.$dirty && !$v.recyclingType.required"
            class="helper-text invalid">{{'Message_Recycling_Type_Title'|localize}}</span>
        </div>

        <!-- необходимые меры предосторожности при обращении с отходами -->
        <div class="form-group">
          <label for="precaution-type">{{'Precaution_Title'|localize}}</label>
          <textarea id="precaution-type" type="textarea" v-model="precaution"
            :class="{invalid: $v.precaution.$dirty && !$v.precaution.required}" class="form-control">
          </textarea>
          <span v-if="$v.precaution.$dirty && !$v.precaution.required"
            class="helper-text invalid">{{'Message_Precaution_Title'|localize}}</span>
        </div>
        <!-- END необходимые меры предосторожности при обращении с отходами -->

        <!-- Требование к транспортировке отходов и проведение погрузо-разгрузочных
работ -->
        <div class="form-group">
          <label for="transportation-requirements">{{'Transportation_Requirements_Title'|localize}}</label>
          <textarea id="transportation-requirements" type="textarea" v-model="transportationRequirements"
            class="form-control">
          </textarea>
        </div>
        <!-- END Требование к транспортировке отходов и проведение погрузо-разгрузочных
работ -->

        <!-- Меры по предупреждению и ликвидации чрезвычайных ситуаций природного и техногенного
характера и их последствий -->
        <div class="form-group">
          <label for="emergency-requirements">{{'Emergency_Requirements_Title'|localize}}</label>
          <textarea id="emergency-requirements" type="textarea" v-model="emergency" class="form-control">
                  </textarea>
        </div>

        <!-- END -->

        <div class="form-group">
          <label for="limit">{{'Limit'|localize}}</label>
          <input id="limit" type="number" v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}" class="form-control">
          
          <span v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid">{{'Message_MinLength'|localize}} {{$v.limit.$params.minValue.min}}</span>
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
import { required, minValue } from 'vuelidate/lib/validators'
import localizeFilter from '@/filters/localize.filter'

export default {
  data: () => ({
    title: '',
    recyclingType: '',
    precaution: '',
    transportationRequirements: '',
    emergency: '',
    limit: 100
  }),
  validations: {
    title: { required },
    recyclingType: { required },
    precaution: { required },
    limit: { minValue: minValue(100) }
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
          recyclingType: this.recyclingType,
          precaution: this.precaution,
          transportationRequirements: this.transportationRequirements,
          emergency: this.emergency,
          limit: this.limit
        })
        this.title = ''
        this.recyclingType = ''
        this.precaution = ''
        this.transportationRequirements = '',
        this.emergency = '',
        this.limit = 100
        this.$v.$reset()
        this.$message(localizeFilter('Category_HasBeenCreated'))
        this.$emit('created', category)
      } catch (e) {}
    }
  }
}
</script>
