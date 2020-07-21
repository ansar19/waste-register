<template>
  <div>
    <div class="page-title">
      <h5>{{'Utilizators'|localize}}</h5>
    </div>
    <section>
      <Loader v-if="loading"/>
      <div class="row" v-else>
        <UtilizatorCreate @created="addNewUtilizator"/>

        <UtilizatorEdit
          v-if="utilizators.length"
          :utilizators="utilizators"
          :key="utilizators.length + updateCount"
          @updated="updateUtilizators"
        />
        <p v-else class="center">{{'NoUtilizators'|localize}}</p>
      </div>
    </section>
  </div>
</template>

<script>
import UtilizatorCreate from '@/components/UtilizatorCreate'
import UtilizatorEdit from '@/components/UtilizatorEdit'

export default {
  name: 'utilizators',
  metaInfo() {
    return {
      title: this.$title('Menu_Utilizators')
    }
  },
  data: () => ({
    utilizators: [],
    loading: true,
    updateCount: 0
  }),
  async mounted() {
    this.utilizators = await this.$store.dispatch('fetchUtilizators')
    this.loading = false
  },
  components: {
    UtilizatorCreate,
    UtilizatorEdit
  },
  methods: {
    addNewUtilizator(utilizator) {
      this.utilizators.push(utilizator)
    },
    updateUtilizators(utilizator) {
      const idx = this.utilizators.findIndex(u => u.id === utilizator.id)
      this.utilizators[idx].title = utilizator.title
      this.updateCount++
    }
  }
}
</script>
