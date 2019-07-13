<template>
  <div class="ssh">
    <b-container>
    <PortForwarding></PortForwarding>
    </b-container>
  </div>
</template>

<script>
import PortForwarding from '@/components/sshTools/portforwarding.vue'
export default {
  data() {
    return {

    }
  },
  components: {
    PortForwarding
  }
}
</script>

<style lang="scss">
</style>
