import firebase from 'firebase/app'

export default {
  actions: {
    async fetchConverters({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const converters =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/converters`)
              .once('value')
          ).val() || {}
        return Object.keys(converters).map(key => ({
          ...converters[key],
          id: key
        }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchConverterById({ commit, dispatch }, id) {
      try {
        const uid = await dispatch('getUid')
        const converter =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/converters`)
              .child(id)
              .once('value')
          ).val() || {}
        return {
          ...converter,
          id
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateConverter({ commit, dispatch }, { unitOfMeasurements, id }) {
      try {
        const uid = await dispatch('getUid')
        await firebase
          .database()
          .ref(`/users/${uid}/converters`)
          .child(id)
          .update({
            unitOfMeasurements
          })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createConverter({ commit, dispatch }, { unitOfMeasurements }) {
      try {
        const uid = await dispatch('getUid')
        const converter = await firebase
          .database()
          .ref(`/users/${uid}/converters`)
          .push({
            unitOfMeasurements
          })
        return {
          unitOfMeasurements,
          id: converter.key
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
