<template>
	<div class="profile">
		<b-container>
			<Twofa></Twofa>
            <Resetcodes></Resetcodes>
			<Restpsswrd></Restpsswrd>
		</b-container>
	</div>
</template>

<script>
import Twofa from '@/components/profile/2fa.vue'
import Resetcodes from '@/components/profile/resetbackupcodes.vue'
import Restpsswrd from '@/components/profile/resetpassword.vue'
export default {
	
	data() {
		return {

		}
	},
	components: {
        Twofa,
        Resetcodes,
		Restpsswrd
	}
}
</script>

<style lang="scss">
</style>
