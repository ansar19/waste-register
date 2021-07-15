<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <nav aria-label="breadcrumb">
        <div class>
          <router-link to="/history" class="breadcrumb-item ml-2">{{'Menu_History'|localize}}</router-link>
          <a @click.prevent class="breadcrumb-item">{{ record.type === 'income' ? 'Income' : 'Outcome' | localize }}</a>
        </div>
      </nav>

      <div class="row">
        <div class="col-sm-10">
          <div class="card" :class="{
            'card-bg-light-yellow': record.type === 'outcome',
            'card-bg-light-light-blue': record.type === 'income'
          }">
            <div class="card-body dark-grey-text">
              <div class="vertical-table">
                <table>
                  <tr>
                    <th>{{'Removal_Date' | localize}}:</th>
                    <td>{{record.date | date('datetime')}}</td>
                  </tr>
                  <tr>
                    <th>{{'Category'|localize}}:</th>
                    <td>{{record.categoryName}}</td>
                  </tr>
                  <!-- <tr>
                  <th>{{'Waste_Code'|localize}}:</th>
                  <td>{{record.wasteCode}}</td>
                  </tr>-->
                  <tr>
                    <th>{{'Amount'|localize}}:</th>
                    <td>{{record.amount}}</td>
                  </tr>
                  <tr>
                    <th>{{'Is_ROP'|localize}}:</th>
                    <td>{{translateRop(record.isRop)}}</td>
                  </tr>
                  <tr>
                    <template v-if="record.isRop === true">
                      <th>{{'ROP_Category'|localize}}:</th>
                      <td>{{record.selectedRop.codeTNVED}} {{record.selectedRop.productType}}</td>
                    </template>
                    <template v-else>
                      <td></td>
                    </template>
                  </tr>
                  <tr>
                    <th>{{'Description'|localize}}:</th>
                    <td>{{record.description}}</td>
                  </tr>
                  <tr>
                    <th>{{'Company_Name'|localize}}:</th>
                    <td>{{record.companyInfo.companyType.nameRu}} {{record.companyInfo.companyName}}</td>
                  </tr>
                  <tr>
                    <th>{{'Title_Transporter' | localize}}:</th>
                    <td>{{record.transporterName}}</td>
                  </tr>
                  <tr>
                    <th>{{'Title_Utilizator' | localize}}:</th>
                    <td>{{record.utilizatorName}}</td>
                  </tr>
                  <tr>
                    <th>{{'Utilization_Way' | localize }}</th>
                    <td>{{translateUtilizationWay(record.utilizationWay)}}</td>
                  </tr>
                </table>
              </div>

              <blockquote class="mt-3">{{'Details_Comment' | localize }}</blockquote>
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
                <button class="btn btn-sm btn-primary position-center mt-2" @click.prevent="exportWord">
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
import {
  saveAs
} from 'file-saver'

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

    const transporter = await this.$store.dispatch(
      'fetchTransporterById',
      record.transporterId
    )

    const utilizator = await this.$store.dispatch(
      'fetchUtilizatorById',
      record.utilizatorId
    )

    this.record = {
      ...record,
      categoryName: category.title,
      companyInfo: this.companyInfo,
      wasteCode: category.wasteCode,
      wasteColor: category.wasteColor.color,
      wasteIndex: category.wasteIndex,
      wastesOrigin: category.wastesOrigin,
      wastesComposition: category.wastesComposition,
      recyclingType: category.recyclingType,
      precaution: category.precaution,
      transportationRequirements: category.transportationRequirements,
      emergency: category.emergency,
      transporterName: transporter.title,
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

      JSZipUtils.getBinaryContent('../templates/wtn.docx', function (
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
          companyInfo: _this.record.companyInfo,
          companyType: _this.record.companyInfo.companyType.nameRu,
          companyHead: _this.record.companyInfo.companyHead,
          replaceHazardList: _this.replaceHazardList,
          wasteCode: _this.record.wasteCode,
          wasteColor: _this.record.wasteColor.color,
          wasteIndex: _this.record.wasteIndex,
          wastesOrigin: _this.record.wastesOrigin,
          wastesComposition: _this.record.wastesComposition,
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
          console.log(JSON.stringify({
            error: e
          }))
          throw error
        }

        // Generate a zip file representing the docxtemplater object (not a real file, but a representation in memory)
        let out = doc.getZip().generate({
          type: 'blob',
          mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        })
        // Save the target file object as a file of the target type and name it
        saveAs(out, 'wtn.docx')
      })
    },

    translateRop(value) {
      const map = {
        true: 'Да',
        false: 'Нет'
      };
      return `${map[value]}`;
    },
    translateUtilizationWay(value) {
      const map = {
        transferredTo3rdParties: 'Передано сторонним организациям, предприятиям',
        recyclingReuse: 'Переработка, повторное использование для получения продукции',
        incinerationWithEnergyRecovery: 'Инсинерация (сжигание) с извлечением энергии на предприятии',
        incinerationWithOutEnergyRecovery: 'Инсинерация (сжигание) без извлечения энергии на предприятии',
        fullNeutralizationAtCompany: 'Полное обезвреживание на предприятии',
        partialNeutralizationAtCompany: 'Частичное обезвреживание на предприятии',
        storageAtOwnWasteFacilities: 'Хранение на собственных объектах размещения отходов',
        dumpingAtOwnWasteFacilities: 'Захоронение на собственных объектах размещения отходов',
        disposalAtOwnSolidDomesticLlandfill: 'Размещение на собственном полигоне ТБО'
      };
      return `${map[value]}`;
    },
  },
  computed: {
    companyInfo() {
      return this.$store.getters.info
    },
    replaceHazardList() {
      if (this.record.wasteColor == 'amber') {
        return 'A'
      } else if (this.record.wasteColor == 'red') {
        return 'R'
      } else if (this.record.wasteColor == 'green') {
        return 'G'
      } else {
        return '-'
      }
    }
  },

  components: {
    'qr-code': VueQRCodeComponent
  }
}
</script>

<style scoped>
.card-bg-light-yellow {
  background-color: #fff9c4;
}
.card-bg-light-light-blue {
  background-color: #b3e5fc;
}
</style>
