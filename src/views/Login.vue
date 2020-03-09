<template>
  <main class="main-content col mt-4">
    <div class="main-content-container container-fluid px-4 my-auto h-100">
      <div class="row no-gutters h-100">
        <div class="col-lg-3 col-md-5 auth-form mx-auto my-auto">
          <form class="card" @submit.prevent="submitHandler">
            <div class="card-content">
              <span class="card-title">{{'CRM_Title'|localize}}</span>
              <div class="form-group">
                <label for="email">Email</label>
                <input id="email" type="text" v-model.trim="email"
                  :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
                  class="form-control">
                <small class="helper-text invalid"
                  v-if="$v.email.$dirty && !$v.email.required">{{'Message_EmailRequired'|localize}}</small>
                <small class="helper-text invalid"
                  v-else-if="$v.email.$dirty && !$v.email.email">{{'Message_EmailValid'|localize}}</small>
              </div>
              <div class="form-group">
                <label for="password">{{'Password'|localize}}</label>
                <input id="password" type="password" v-model.trim="password"
                  :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
                  class="form-control">
                <small class="helper-text invalid"
                  v-if="$v.password.$dirty && !$v.password.required">{{'Message_EnterPassword'|localize}}</small>
                <small class="helper-text invalid"
                  v-else-if="$v.password.$dirty && !$v.password.minLength">{{'Message_MinLength'|localize}}
                  {{$v.password.$params.minLength.min}}</small>
              </div>
            </div>
            <div class="card-action">
              <div>
                <button class="btn btn-primary waves-effect waves-light auth-submit" type="submit">
                  {{'Login'|localize}}
                  <i class="material-icons right">send</i>
                </button>
              </div>

              <!-- <p class="center">
                {{'NoAccount'|localize}}
                <router-link to="/register">{{'Register'|localize}}</router-link>
              </p> -->
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
import messages from '@/utils/messages'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'login',
  metaInfo() {
    return {
      title: this.$title('Login')
    }
  },
  data: () => ({
    email: '',
    password: ''
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) }
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(localizeFilter(messages[this.$route.query.message]))
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (e) {}
    }
  }
}
</script>
