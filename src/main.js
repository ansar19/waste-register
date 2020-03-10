import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import VueMeta from 'vue-meta'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'
import tooltipDirective from '@/directives/tooltip.directive'
import messagePlugin from '@/utils/message.plugin'
import titlePlugin from '@/utils/title.plugin'
import Loader from '@/components/app/Loader'
import './registerServiceWorker'
// import VTooltip from 'v-tooltip'


import 'materialize-css/dist/js/materialize.min'

import ShardsVue from 'shards-vue'

// Import base styles (Bootstrap and Shards)
import 'bootstrap/dist/css/bootstrap.css'
import 'shards-ui/dist/css/shards.css'
import '@/scss/shards-dashboards.scss'
import '@/assets/scss/meta-table.scss'

Vue.use(ShardsVue);

// Vue.use(VTooltip);


import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.filter('date', dateFilter)
Vue.filter('localize', localizeFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

firebase.initializeApp({
  apiKey: "AIzaSyBKloBTUJkM9r8e-oTsZRECWItVbzzCvXU",
  authDomain: "ecomarine-waste.firebaseapp.com",
  databaseURL: "https://ecomarine-waste.firebaseio.com",
  projectId: "ecomarine-waste",
  storageBucket: "ecomarine-waste.appspot.com",
  messagingSenderId: "953274739599",
  appId: "1:953274739599:web:e3c22eee681fcce63439fa"
})

// Not the best way but if you are frustrated by the console error just because you are using one of the external component (v-calendar for example).
// const ignoreWarnMessage = 'The .native modifier for v-on is only valid on components but it was used on <div>.';
// Vue.config.warnHandler = function (msg, vm, trace) {
//   // `trace` is the component hierarchy trace
//   if (msg === ignoreWarnMessage) {
//     msg = null;
//     vm = null;
//     trace = null;
//   }
// }


let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
