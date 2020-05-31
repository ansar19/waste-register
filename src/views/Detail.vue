<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <nav aria-label="breadcrumb">
        <div class>
          <router-link to="/history" class="breadcrumb-item ml-2">{{'Menu_History'|localize}}</router-link>
          <a
            @click.prevent
            class="breadcrumb-item"
          >{{ record.type === 'income' ? 'Income' : 'Outcome' | localize }}</a>
        </div>
      </nav>

      <div class="row">
        

        <div class="col-sm-10">
          <div
            class="card"
            :class="{
            'yellow': record.type === 'outcome',
            'alert-info': record.type === 'income'
          }"
          >
            <div class="card-body dark-grey-text">
              <small>{{record.date | date('datetime')}}</small>
              <p>
                {{'Category'|localize}}:
                <small>{{record.categoryName}}</small>
              </p>
              <p>
                {{'Amount'|localize}}:
                <small>{{record.amount | currency}}</small>
              </p>
              <p>
                {{'Description'|localize}}:
                <small>{{record.description}}</small>
              </p>
              <p>
                {{'Recycling_Type'|localize}}:
                <small>{{record.recyclingType}}</small>
              </p>
              <p>
                {{'Precaution_Title'|localize}}:
                <small>{{record.precaution}}</small>
              </p>
            </div>
          </div>
        </div>

        <div class="col-sm-2">
          <div class="card">
            <div class="card-body dark-grey-text">
              <div class="d-flex justify-center">
                <qr-code :text="record.id" v-bind:size="116" color="#17c671" error-level="H"></qr-code>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <p class="center" v-else>Запись с id={{$route.params.id}} не найдена</p>
  </div>
</template>

<script>
import VueQRCodeComponent from 'vue-qrcode-component'

export default {
  name: 'detail',
  metaInfo() {
    return {
      title: this.$title('Detail_Title')
    }
  },
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch(
      'fetchCategoryById',
      record.categoryId
    )

    this.record = {
      ...record,
      categoryName: category.title,
      recyclingType: category.recyclingType,
      precaution: category.precaution,
      transportationRequirements: category.transportationRequirements,
      emergency: category.emergency
    }

    this.loading = false
  },
  methods: {},
  computed: {},
  components: {
    'qr-code': VueQRCodeComponent
  }
}
</script>
