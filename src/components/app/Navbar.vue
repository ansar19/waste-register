<template>
  <d-navbar toggleable="md" type="dark" theme="primary"
    class="align-items-stretch flex-md-nowrap p-0 navbar navbar-light">
    <div class="navbar-left">
      <a href="#" class="nav-link" @click.prevent="$emit('click')">
        <i class="material-icons black-text">dehaze</i>
      </a>
      <d-navbar-brand>
        <span class="d-md-inline ml-1">{{'EcoMarine_Title'|localize}}:
          {{'Module_Title'|localize}}</span>
      </d-navbar-brand>
    </div>

    <d-collapse is-nav id="nav-collapse">
      <d-navbar-nav>
        <d-nav-item href="#" disabled>
          <div class="nav-link-icon__wrapper">
            <span class="black-text">{{date | date('datetime')}}</span>
          </div>
        </d-nav-item>
      </d-navbar-nav>



      <d-navbar-nav class="ml-auto">

        <d-dropdown text="Настройки" class="text-nowrap" is-nav right>
          <p class="text-center">{{name}}</p>
          <d-link to="/profile">
            {{'ProfileTitle'|localize}}
          </d-link>

          <d-dropdown-divider tabindex="-1" />
          <a href="#" class="black-text" @click.prevent="logout">
            <!-- <i class="material-icons">&#xE879;</i> -->
            {{'Exit'|localize}}
          </a>
        </d-dropdown>

      </d-navbar-nav>

    </d-collapse>
  </d-navbar>
</template>


<script>

export default {
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null
  }),
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    }
  },
  computed: {
    name() {
      return this.$store.getters.info.name
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false
    })
  },
  beforeDestroy() {
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  }
}
</script>

<style lang="scss">
// .header-navbar {
//   .item-icon-wrapper {
//     display: inline-block;
//   }
//   .dropdown-menu {
//     display: block;
//   }
// }
</style>
