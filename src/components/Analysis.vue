<template>
  <div
    class="mx-0 mb-3 px-3 py-3 bg-white rounded-lg"
    v-if="sharedState.analysis"
  >
    {{ sharedState.analysis }}
  </div>
</template>

<script>
import { store } from '../store.js'

export default {
  name: 'analysis',
  data() {
    return {
      sharedState: store.state,
    }
  },
}
</script>

<style></style>
