<template>
  <div class="meta-table">
    <vue-good-table :columns="columns" :rows="records"
      :search-options="{ enabled: true, placeholder: 'Введите текст для поиска' }"
      :pagination-options="paginationOptions">
      <div slot="emptystate">No data yet</div>
      <template slot="table-row" slot-scope="props">
        <span>{{props.formattedRow[props.column.field]}}</span>
      </template>
      <div slot="table-actions">
        <!-- download excel -->
        <download-excel :data="records" :fields="json_fields" class="btn-sm float-left btn-info mt-2 mb-2 ml-2 mr-4"
          worksheet="Wastes" name="wastes.xls" v-tooltip="'Download_Data_XLSX'">
          <span class="material-icons">cloud_download</span>
        </download-excel>

        <!-- download doc -->
        <div v-tooltip="'Download_Data_DOCX'" class="float-right">
          <button class="btn-sm btn-primary mt-2 mb-2 ml-2 mr-4" @click.prevent="exportWord">
            <span class="material-icons">cloud_download</span>
          </button>
        </div>
        <!-- END download doc -->
      </div>
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'action'">
          <button class="btn-sm btn-info" @click="$router.push('/detail/' + props.row.id)">
            <i class="material-icons">open_in_new</i>
          </button>
        </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import 'vue-good-table/dist/vue-good-table.css'
import {
  VueGoodTable
} from 'vue-good-table'

import flatPickr from "flatpickr";

import "flatpickr/dist/flatpickr.css";
import "flatpickr/dist/themes/material_blue.css";

import JSZip from 'jszip'
import { saveAs } from 'file-saver'

export default {
  data() {
    return {
      columns: [{
          label: 'Объем, т',
          field: 'amount',
          type: 'number',
          sortable: true
        },
        // {
          // label: "Лимит по данной категории",
          // field: "limit",
          // filterable: true,
          // formatFn: this.percentageFormatFn,
          // filterOptions: {
          //   enabled: true,
          //   placeholder: ""
          // }
        // },
        {
          label: "Дата вывоза",
          field: "removalDate",
          filterable: true,
          sortable: true,
          type: "date",
          dateInputFormat: "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
          dateOutputFormat: "dd-MM-yyyy",
          filterOptions: {
            enabled: true,
            placeholder: "выберите даты",
            filterFn: this.dateRangeFilter
          }
        },
        {
          label: 'Название',
          field: 'categoryName',
          sortable: true
        },
        {
          label: 'Уровень опасности',
          field: 'wasteColor.color',
          sortable: true,
          filterOptions: {
            enabled: true,
            filterDropdownItems: ['amber', 'green', 'red', 'na'],
            placeholder: 'Выберите уровень'
          },
          tdClass: 'text-center',
          formatFn: this.translateWasteColor
        },
        {
          label: 'Вид отхода',
          field: 'wasteColor.wasteType.text',
          sortable: true
        },
        {
          label: 'Место вывоза',
          field: 'siteName',
          sortable: true
        },
        {
          label: 'Название перевозчика',
          field: 'transpoterName',
          sortable: true
        },
        {
          label: 'Название места утилизации',
          field: 'utilizatorName.title',
          sortable: true
        },
        {
          label: 'РОП?',
          field: 'isRop',
          formatFn: this.translateRop,
          sortable: true
        },
        {
          label: 'Тип',
          field: 'typeText',
          sortable: true,
          filterOptions: {
            enabled: true,
            filterDropdownItems: ['Вывезено', 'Принято'],
            placeholder: 'Выберите тип'
          }
        },
        {
          label: 'Действия',
          field: 'action',
          sortable: false
        }
      ],
      paginationOptions: {
        enabled: true,
        mode: 'records',
        perPage: 5,
        position: 'bottom',
        dropdownAllowAll: false,
        setCurrentPage: 1,
        nextLabel: '>',
        prevLabel: '<',
        rowsPerPageLabel: 'Строк на странице',
        ofLabel: '/',
        pageLabel: 'стр.', // for 'pages' mode
        allLabel: 'Все'
      },
      // related to excel export
      json_fields: {
        Объем: 'amount',
        'Дата вывоза': {
          field: 'removalDate',
          callback: value => {
            return value.substring(0, 10)
          }
        },
        'Место вывоза': 'siteName',
        'Название перевозчика': 'transpoterName',
        Тип: 'typeText',
        Название: 'categoryName',
        'Уровень опасности': {
          field: 'wasteColor.color',
          callback: value => {
            const map = {
              amber: 'Янтарный',
              green: 'Зеленый',
              red: 'Красный',
              'na': 'Не применимо'
            };
            return `${map[value]}`;
          }
        },
        'Вид отхода': {
          field: 'wasteColor.wasteType.text',
        },
        'Название места утилизации': {
          field: 'utilizatorName.title'
        },
        'Контактный телефон места утилизации': {
          field: 'utilizatorName.utilizatorPhone'
          // callback: value => {
          //   return `Landline Phone - ${value}`
          // }
        }
      },
      json_meta: [
        [{
          key: 'charset',
          value: 'utf-8'
        }]
      ]
    }
  },
  props: {
    records: {
      required: true,
      type: Array
    }
  },
  mounted() {
    // related to range select - flatpkr
    let inputs = [
      'input[placeholder="выберите даты"]',
      'input[placeholder="Filter Start Date"]',
      'input[placeholder="Filter Need By Date"]'
    ];
    inputs.forEach(function (input) {
      flatPickr(input, {
        mode: "range",
        dateFormat: 'n/j/Y',
        mode: "range",
        showMonths: 2,
        allowInput: true,
        onOpen: function (selectedDates, dateStr, instance) {
          instance.setDate(instance.input.value, false);
        }
      });
    });
  },
  computed: {
    companyName() {
      return this.$store.getters.info.companyName
    },
    companyType() {
      return this.$store.getters.info.companyType
    },
    companyBin() {
      return this.$store.getters.info.companyBin
    },
    companyHead() {
      return this.$store.getters.info.companyHead
    },
  },
  methods: {
    // percentageFormatFn: function (value) {
    //   value = Math.trunc(value * 100 )
    //   if (value == 0) {
    //     return '< 1%'
    //   }
    //   return value + '%'
    // },
    translateWasteColor(value) {
      const map = {
        amber: 'Янтарный',
        green: 'Зеленый',
        red: 'Красный',
        na: 'Не применимо'
      };
      return `${map[value]}`;
    },
    translateRop(value) {
      const map = {
        true: 'Да',
        false: 'Нет'
      };
      return `${map[value]}`;
    },
    // related to range select - flatpkr
    dateRangeFilter(data, filterString) {
      let dateRange = filterString.split("to");
      let startDate = Date.parse(dateRange[0]);
      let endDate = Date.parse(dateRange[1]);
      return (data =
        Date.parse(data) >= startDate && Date.parse(data) <= endDate);
    },
    // Click export word
    exportWord() {
      let _this = this
      // Read and get the binary content of the template file
      // Note: The
      // template file is recommended to be placed under the static directory file.
      // When using vue-cli2, put it in the static directory. When using vue-cli3, put it in the public directory.
      // Because when I use it, I put it in the same directory of the .vue file, and I can't read the template.

    

      JSZipUtils.getBinaryContent('../templates/waste_inventory.docx', function(
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
        // handle undefined values in docXTemplater
        doc.setOptions({nullGetter: function() {
          return ""; 
        }});
        // Set the value of the template variable
        doc.setData({
          ..._this.records,
          wasteRecords: _this.records,
          companyName: _this.companyName,
          companyType: _this.companyType.nameRu,
          companyBin: _this.companyBin,
          companyHead: _this.companyHead
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
        saveAs(out, 'waste_inventory.docx')
      })
    }
  },
  components: {
    VueGoodTable,
    flatPickr
  }
}
</script>
