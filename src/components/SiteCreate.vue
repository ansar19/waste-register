<template>
  <div class="col sm-12 md-6">
    <div>
      <div class="page-subtitle">
        <h4>{{'Create'|localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="from-group">
          <label for="name1">{{ 'Title_Site' | localize }}</label>
          <input id="name1" type="text" v-model="siteName"
            :class="{invalid: $v.siteName.$dirty && !$v.siteName.required}" class="form-control">
          <span v-if="$v.siteName.$dirty && !$v.siteName.required"
            class="helper-text invalid">{{'Message_SiteTitle'|localize}}</span>
        </div>

        <div class="form-group">
          <label for="site-comments1">{{ 'Site_Comments' | localize }}</label>
          <textarea id="site-comments1" type="textarea" v-model="siteComments" class="form-control">
          </textarea>
        </div>

        <!-- Прикрепление документов к данной записи -->
        <div class="mb-3">
          <label for="formFileMultiple" class="form-label">{{ 'Attach_Documents' | localize }}</label>
          <input class="form-control" type="file" id="formFileMultiple" multiple>
        </div>

        <button class="btn btn-success" type="submit">
          {{'Create'|localize}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import localizeFilter from '@/filters/localize.filter'

export default {
  data: () => ({
    siteName: '',
    siteComments: ''
  }),
  validations: {
    siteName: { required }
  },
  mounted() {
    M.updateTextFields()
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const site = await this.$store.dispatch('createSite', {
          siteName: this.siteName,
          siteComments: this.siteComments
        })
        this.siteName = ''
        this.siteComments = ''
        this.$v.$reset()
        this.$message(localizeFilter('Site_HasBeenCreated'))
        this.$emit('created', site)
      } catch (e) {}
    }
  }
}
</script>
