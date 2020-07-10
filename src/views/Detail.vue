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
                {{'Company_Name'|localize}}:
                <small>{{companyName}}</small>
              </p>
              <p>
                {{'Category'|localize}}:
                <small>{{record.categoryName}}</small>
              </p>
              <p>
                {{'Waste_Code'|localize}}:
                <small>{{record.wasteCode}}</small>
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

              <div>
                <strong>Происхождение отходов:</strong>
                <table>
                  <thead>
                    <tr>
                      <th class="#fafafa grey lighten-5" style="width: 30%;">
                        <label>Перечень и наименование исходных материалов, из которых образовались отходы</label>
                      </th>
                      <th class="#fafafa grey lighten-5" style="width: 30%;">
                        <label>Наименование технологического процесса</label>
                      </th>
                      <th class="#fafafa grey lighten-5" style="width: 40%;">
                        <label>Перечень опасных свойств отходов</label>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="item" v-for="(waste, index) in record.wastesOrigin" :key="index">
                      <td>{{waste.wasteSource}}</td>
                      <td>{{waste.processName}}</td>
                      <td>{{waste.hazardProperty}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-2">
          <div class="card">
            <div class="card-body dark-grey-text">
              <div class="d-flex justify-center">
                <qr-code :text="record.id" v-bind:size="116" color="#17c671" error-level="H"></qr-code>
              </div>
              <div title=".docx" class="align-center">
                <button
                  class="btn btn-sm btn-primary position-center mt-2"
                  @click.prevent="exportWord"
                >
                  <span class="material-icons">cloud_download</span>
                </button>
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

import JSZip from 'jszip'
import { saveAs } from 'file-saver'

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

    const utilizator = await this.$store.dispatch(
      'fetchUtilizatorById',
      record.utilizatorId
    )

    this.record = {
      ...record,
      categoryName: category.title,
      companyName: this.companyName,
      companyHead: this.companyHead,
      wasteCode: category.wasteCode,
      wasteIndex: category.wasteIndex,
      wastesOrigin: category.wastesOrigin,
      recyclingType: category.recyclingType,
      precaution: category.precaution,
      transportationRequirements: category.transportationRequirements,
      emergency: category.emergency,
      utilizatorName: utilizator.title
    }

    this.loading = false
  },
  methods: {
    // Click export word
    exportWord() {
      let _this = this
      // Read and get the binary content of the template file
      // Note: The
      // template file is recommended to be placed under the static directory file.
      // When using vue-cli2, put it in the static directory. When using vue-cli3, put it in the public directory.
      // Because when I use it, I put it in the same directory of the .vue file, and I can't read the template.

      JSZipUtils.getBinaryContent('../templates/wtn.docx', function(
        error,
        content
      ) {
        // input.docx Is a template. When we export, we will export the corresponding data according to this template
        // Throw an exception
        if (error) {
          throw error
        }

        // Create a JSZip instance with the content of the template
        let zip = new JSZip(content)
        // Create and load docxtemplater instance object
        let doc = new window.docxtemplater().loadZip(zip)
        // Set the value of the template variable
        doc.setData({
          ..._this.record,
          categoryName: _this.record.categoryName,
          companyName: _this.record.companyName,
          companyHead: _this.record.companyHead,
          wasteCode: _this.record.wasteCode,
          wasteIndex: _this.record.wasteIndex,
          wastesOrigin: _this.record.wastesOrigin,
          amount: _this.record.amount,
          categoryName: _this.record.categoryName,
          description: _this.record.description
        })

        try {
          // Replace all template variables with the values of template variables
          doc.render()
        } catch (error) {
          // Throw an exception
          let e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties
          }
          console.log(JSON.stringify({ error: e }))
          throw error
        }

        // Generate a zip file representing the docxtemplater object (not a real file, but a representation in memory)
        let out = doc.getZip().generate({
          type: 'blob',
          mimeType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        })
        // Save the target file object as a file of the target type and name it
        saveAs(out, 'wtn.docx')
      })
    }
  },
  computed: {
    companyName() {
      return this.$store.getters.info.companyName
    },
    companyHead() {
      return this.$store.getters.info.companyHead
    }
  },
  components: {
    'qr-code': VueQRCodeComponent
  }
}
</script>
