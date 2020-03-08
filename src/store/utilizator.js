import firebase from 'firebase/app'

export default {
  actions: {
    async fetchUtilizators({
      commit,
      dispatch
    }) {
      try {
        const uid = await dispatch('getUid')
        const utilizators = (await firebase.database().ref(`/users/${uid}/utilizators`).once('value')).val() || {}
        return Object.keys(utilizators).map(key => ({
          ...utilizators[key],
          id: key
        }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchUtilizatorById({
      commit,
      dispatch
    }, id) {
      try {
        const uid = await dispatch('getUid')
        const utilizator = (await firebase.database().ref(`/users/${uid}/utilizators`).child(id).once('value')).val() || {}
        return {
          ...utilizator,
          id
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateUtilizator({
      commit,
      dispatch
    }, {
      title,
      utilizatorPhone,
      utilizatorBankDetail,
      id
    }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/utilizators`).child(id).update({
          title,
          utilizatorPhone,
          utilizatorBankDetail
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createUtilizator({
      commit,
      dispatch
    }, {
      title,
      utilizatorPhone,
      utilizatorBankDetail
    }) {
      try {
        const uid = await dispatch('getUid')
        const utilizator = await firebase.database().ref(`/users/${uid}/utilizators`).push({
          title,
          utilizatorPhone,
          utilizatorBankDetail
        })
        return {
          title,
          utilizatorPhone,
          utilizatorBankDetail,
          id: utilizator.key
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
