import firebase from 'firebase/app'

export default {
  actions: {
    async fetchCategories({
      commit,
      dispatch
    }) {
      try {
        const uid = await dispatch('getUid')
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
        return Object.keys(categories).map(key => ({
          ...categories[key],
          id: key
        }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategoryById({
      commit,
      dispatch
    }, id) {
      try {
        const uid = await dispatch('getUid')
        const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || {}
        return {
          ...category,
          id
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateCategory({
      commit,
      dispatch
    }, {
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
      id
    }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({
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
          limit
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createCategory({
      commit,
      dispatch
    }, {
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
      limit
    }) {
      try {
        const uid = await dispatch('getUid')
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({
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
          limit
        })
        return {
          title,
          wasteCode,
          sourceMaterials,
          processName,
          limit,
          recyclingType,
          precaution,
          transportationRequirements,
          emergency,
          additionalInfo,
          wasteIndex,
          id: category.key
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
