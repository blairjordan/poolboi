<template>
  <div class="pools">
      <PoolList />
  </div>
</template>

<script>
import PoolList from '@/components/PoolList.vue'

export default {
  name: 'Pools',
  components: {
    PoolList
  }
}
</script>
