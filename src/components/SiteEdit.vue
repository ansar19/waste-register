<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'Edit'|localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="form-group">
          <label>{{'SelectSite'|localize}}</label>
          <select ref="siteSelect" v-model="current" class="form-control-custom">
            <option v-for="s of sites" :key="s.id" :value="s.id">{{s.siteName}}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="name">{{'Title_Site'|localize}}</label>
          <input id="name" type="text" v-model="siteName" :class="{invalid: $v.siteName.$dirty && !$v.siteName.required}"
            class="form-control">
          <span v-if="$v.siteName.$dirty && !$v.siteName.required"
            class="helper-text invalid">{{'Message_SiteTitle'|localize}}</span>
        </div>

        <div class="form-group">
          <label for="site-comments">{{'Site_Comments'|localize}}</label>
          <textarea id="site-comments" type="textarea" v-model="siteComments"
            class="form-control">
          </textarea>
        </div>


        <button class="btn btn-success waves-effect waves-light" type="submit">
          {{'Update'|localize}}
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
  props: {
    sites: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    siteSelect: null,
    siteName: '',
    siteComments: '',
    current: null
  }),
  validations: {
    siteName: { required }
  },
  watch: {
    current(siteId) {
      const { siteName, siteComments } = this.sites.find(s => s.id === siteId)
      this.siteName = siteName,
      this.siteComments = siteComments
    }
  },
  created() {
    const { id, siteName, siteComments } = this.sites[0]
    this.current = id
    this.siteName = siteName
    this.siteComments
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const siteData = {
          id: this.current,
          siteName: this.siteName,
          siteComments: this.siteComments
        }
        await this.$store.dispatch('updateSite', siteData)
        this.$message(localizeFilter('Site_HasBeenUpdated'))
        this.$emit('updated', siteData)
      } catch (e) {}
    }
  },
  mounted() {
    this.siteSelect = M.FormSelect.init(this.$refs.siteSelect)
    M.updateTextFields()
  },
  destroyed() {
    if (this.siteSelect && this.siteSelect.destroy) {
      this.siteSelect.destroy()
    }
  }
}
</script>
