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
      recyclingType,
      precaution,
      transportationRequirements,
      emergency,
      limit,
      id
    }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({
          title,
          recyclingType,
          precaution,
          transportationRequirements,
          emergency,
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
      recyclingType,
      precaution,
      transportationRequirements,
      emergency,
      limit
    }) {
      try {
        const uid = await dispatch('getUid')
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({
          title,
          recyclingType,
          precaution,
          transportationRequirements,
          emergency,
          limit
        })
        return {
          title,
          limit,
          recyclingType,
          precaution,
          transportationRequirements,
          emergency,
          id: category.key
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
