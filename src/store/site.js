import firebase from 'firebase/app'

export default {
  actions: {
    async fetchSites({
      commit,
      dispatch
    }) {
      try {
        const uid = await dispatch('getUid')
        const sites = (await firebase.database().ref(`/users/${uid}/sites`).once('value')).val() || {}
        return Object.keys(sites).map(key => ({
          ...sites[key],
          id: key
        }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchSiteById({
      commit,
      dispatch
    }, id) {
      try {
        const uid = await dispatch('getUid')
        const site = (await firebase.database().ref(`/users/${uid}/sites`).child(id).once('value')).val() || {}
        return {
          ...site,
          id
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateSite({
      commit,
      dispatch
    }, {
      siteName,
      siteComments,
      id
    }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/sites`).child(id).update({
          siteName,
          siteComments
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createSite({
      commit,
      dispatch
    }, {
      siteName,
      siteComments
    }) {
      try {
        const uid = await dispatch('getUid')
        const site = await firebase.database().ref(`/users/${uid}/sites`).push({
          siteName,
          siteComments
        })
        return {
          siteName,
          siteComments,
          id: site.key
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
