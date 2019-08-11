<template>
  <div class="addpool">
      <PoolList />
  </div>
</template>

<script>
import PoolList from '@/components/AddPoolForm.vue'

export default {
  name: 'AddPool',
  components: {
    PoolList
  }
}
</script>
