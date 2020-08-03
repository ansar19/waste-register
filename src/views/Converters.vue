<template>
  <div>
    <div class="page-title">
      <h5>{{'Converter'|localize}}</h5>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <ConverterShow />
        <ConverterEdit
          v-if="converters.length"
          :converters="converters"
          :key="converters.length + updateCount"
          @updated="updateConverter"
        />
        <p v-else class="center">{{'No_Converter'|localize}}</p>
      </div>
    </section>
  </div>
</template>

<script>
import ConverterShow from '@/components/ConverterShow'
import ConverterEdit from '@/components/ConverterEdit'

export default {
  name: 'converter',
  metaInfo() {
    return {
      title: this.$title('Menu_Converter'),
    }
  },
  data: () => ({
    converters: [],
    loading: true,
    updateCount: 0,
  }),
  async mounted() {
    this.converters = await this.$store.dispatch('fetchConverters')
    this.loading = false
  },
  components: {
    ConverterShow,
    ConverterEdit,
  },
  methods: {
    addNewConverter(converter) {
      this.converters.push(converter)
    },
    updateConverter(converter) {
      const idx = this.converters.findIndex((c) => c.id === converter.id)
      // this.converters[idx].id = id
      this.updateCount++
    },
  },
}
</script>
