<template>
    <div class="meta-table">
      <vue-good-table
        :columns="columns"
        :rows="records"
        :search-options="{ enabled: true, placeholder: 'Введите текст для поиска' }"
        :pagination-options="paginationOptions"
      >
        <div slot="emptystate">No data yet</div>
        <template slot="table-row" slot-scope="props">
          <span>{{props.formattedRow[props.column.field]}}</span>
        </template>
        <div slot="table-actions">
          <download-excel
            :data="records"
            :fields="json_fields"
            class="btn-sm btn-info mt-2 mb-2 ml-2 mr-4"
            worksheet="Wastes"
            name="wastes.xls"
            v-tooltip="'Download_Data'"
          >
            <span class="material-icons">cloud_download</span>
            <!-- {{'Download_Data' | localize}} -->
          </download-excel>
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
import { VueGoodTable } from 'vue-good-table'

export default {
  data() {
    return {
      columns: [
        {
          label: 'Объем, т',
          field: 'amount',
          type: 'number',
          sortable: true
        },
        {
          label: 'Дата вывоза',
          field: 'removalDate',
          type: 'date',
          dateInputFormat: "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
          dateOutputFormat: 'dd-MM-yyyy',
          sortable: true,
          filterable: true
          // filterOptions: {
          //   enabled: true,
          //   placeholder: 'Дата вывоза',
          //   filterFn: this.dateRangeFilter
          // }
        },
        {
          label: 'Название',
          field: 'categoryName',
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
          label: 'Тип',
          field: 'typeText',
          sortable: true,
          filterOptions: {
            enabled: true,
            filterDropdownItems: ['Вывезено', 'Принято'],
            placeholder: 'Выберите тип'
          }
        },
        // {
        //   label: "Percent",
        //   field: "amount",
        //   filterable: true,
        //   formatFn: this.percentageFormatFn,
        //   filterOptions: {
        //     enabled: true,
        //     placeholder: ""
        //   }
        // },
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
        'Название места утилизации': {
          field: 'utilizatorName.title'
          // callback: value => {
          //   return `Landline Phone - ${value}`
          // }
        }
      },
      json_meta: [
        [
          {
            key: 'charset',
            value: 'utf-8'
          }
        ]
      ]
    }
  },
  props: {
    records: {
      required: true,
      type: Array
    }
  },
  methods: {
    percentageFormatFn: function(value) {
      value = Math.trunc(value * 100)
      if (value == 0) {
        return '< 1%'
      }
      return value + '%'
    }
  },
  components: {
    VueGoodTable
  }
}
</script>
