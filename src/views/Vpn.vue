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
</style>
