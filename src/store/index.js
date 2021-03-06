import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import site from './site'
import category from './category'
import transporter from './transporter'
import utilizator from './utilizator'
import record from './record'
import converter from './converter'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER
      // const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`)
      return await res.json()
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth, info, site, category, transporter, utilizator, record, converter
  }
})
