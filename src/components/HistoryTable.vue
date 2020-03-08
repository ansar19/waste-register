<template>
  <table class="meta-table">
    <thead>
      <tr>
        <th>#</th>
        <th>{{'Amount'|localize}}</th>
        <th>{{'Date'|localize}}</th>
        <th>{{'Removal_Date'|localize}}</th>
        <th>{{'Category'|localize}}</th>
        <th>{{'Title_Transporter'|localize}}</th>
        <th>{{'Title_Utilizator'|localize}}</th>
        <th>{{'Type'|localize}}</th>
        <th>{{'Open'|localize}}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, idx) of records" :key="record.id">
        <td>{{ idx + 1 }}</td>
        <td data-label="Объем">{{ record.amount | currency('TON') }}</td>
        <td data-label="Дата">{{ record.date | date('datetime') }}</td>
        <td data-label="Дата вывоза">{{ record.removalDate | date('date') }}</td>
        <td data-label="Название">{{ record.categoryName }}</td>
        <td data-label="Название перевозчика">{{ record.transpoterName }}</td>
        <td data-label="Название места утилизации">{{ record.utilizatorName.title }}</td>

        <td>
          <span :class="[record.typeClass]" class="white-text badge">{{ record.typeText }}</span>
        </td>
        
        <td>
          <button
            v-tooltip="'OpenRecord'"
            class="btn-sm btn-info"
            @click="$router.push('/detail/' + record.id)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    records: {
      required: true,
      type: Array
    }
  }
}
</script>
