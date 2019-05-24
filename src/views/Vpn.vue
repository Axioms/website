<template>
	<div class="vpn">
		<b-container>
			<Outline></Outline>
			<Ovpn></Ovpn>
			<SshTunnel></SshTunnel>
		</b-container>
	</div>
</template>

<script>
import Outline from '@/components/vpn/outline.vue'
import Ovpn from '@/components/vpn/ovpn.vue'
import SshTunnel from '@/components/vpn/sshTunnel.vue'
export default {
	
	data() {
		return {

		}
	},
	components: {
		Outline,
		Ovpn,
		SshTunnel
	}
}
</script>

<style lang="scss">
	.card {
		width: 100%;
		padding-bottom: 5%;
		border: none;
}
  .card-header {
    text-align: left;
  }
  .vpn {
    padding-top: 4%;
  }
  .header-5 {
    font-size: 2em;
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
  }
  .d-icon {
    font-size: 2em;
    text-align: center;
    padding-top: 1.0em;
  }
</style>
