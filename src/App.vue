<template lang="">
  <div>
    <RouterView></RouterView>
  </div>
</template>
<script lang="ts">
export default {
  name: 'App',
  components: {
    Cover
  }
}
</script>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Cover from '@/pages/Cover.vue'
</script>
