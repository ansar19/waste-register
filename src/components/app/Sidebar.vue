<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
      class="nav--no-borders flex-column nav"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
    </router-link>
  </ul>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'
export default {
  props: ['value'],
  data: () => ({
    links: [
      { title: localizeFilter('Main_Panel'), url: '/', exact: true },
      { title: localizeFilter('Menu_History'), url: '/history' },
      { title: localizeFilter('Menu_Planning'), url: '/limits' },
      { title: localizeFilter('Menu_NewRecord'), url: '/record' },
      { title: localizeFilter('Menu_Sites'), url: '/sites' },
      { title: localizeFilter('Menu_Categories'), url: '/categories' },
      { title: localizeFilter('Menu_Transporters'), url: '/transporters' },
      { title: localizeFilter('Menu_Utilizators'), url: '/utilizators' },
      { title: localizeFilter('Menu_Converter'), url: '/converters' }
    ]
  })
}
</script>
