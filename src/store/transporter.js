import firebase from 'firebase/app'

export default {
  actions: {
    async fetchTransporters({
      commit,
      dispatch
    }) {
      try {
        const uid = await dispatch('getUid')
        const transporters = (await firebase.database().ref(`/users/${uid}/transporters`).once('value')).val() || {}
        return Object.keys(transporters).map(key => ({
          ...transporters[key],
          id: key
        }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchTransporterById({
      commit,
      dispatch
    }, id) {
      try {
        const uid = await dispatch('getUid')
        const transporter = (await firebase.database().ref(`/users/${uid}/transporters`).child(id).once('value')).val() || {}
        return {
          ...transporter,
          id
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateTransporter({
      commit,
      dispatch
    }, {
      title,
      transporterPhone,
      transporterBankDetail,
      id
    }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/transporters`).child(id).update({
          title,
          transporterPhone,
          transporterBankDetail
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createTransporter({
      commit,
      dispatch
    }, {
      title,
      transporterPhone,
      transporterBankDetail
    }) {
      try {
        const uid = await dispatch('getUid')
        const transporter = await firebase.database().ref(`/users/${uid}/transporters`).push({
          title,
          transporterPhone,
          transporterBankDetail
        })
        return {
          title,
          transporterPhone,
          transporterBankDetail,
          id: transporter.key
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
