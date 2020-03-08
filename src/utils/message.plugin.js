import localizeFilter from '@/filters/localize.filter'

export default {
  install(Vue, options) {
    Vue.prototype.$message = function(html) {
      M.toast({ html })
    }

    Vue.prototype.$error = function(html) {
      M.toast({ html: `[${localizeFilter('Error')}]: ${html}` })
    }
  }
}

// https://getbootstrap.com/docs/4.2/components/toasts/
// Things to know when using the toast plugin:

// If you’re building our JavaScript from source, it requires util.js.
// Toasts are opt-in for performance reasons, so you must initialize them yourself.
// Toasts will automatically hide if you do not specify autohide: false.

// https://stackoverflow.com/questions/52458430/bootstrap-4-snackbar-toast