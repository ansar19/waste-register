<template>
  <div class="app-loader">
    <div class="spinner-border" :class="color" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    color() {
      const colors = ['text-danger', 'text-primary', 'text-success', 'text-info']
      return colors[Math.floor(Math.random() * 3)]
    }
  }
}
</script>
