<template>
  <div class="ssh">
    <h1>This is an SSH page</h1>
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
