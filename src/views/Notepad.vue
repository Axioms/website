<template>
	<div class="notepad">
		<b-container>
			<Notes></Notes>
			<div v-if="this.$store.state.JWT == ''">
				<b-row>
					<b-col class="alert">
						<b-alert :show="$store.state.showNotSignedInErrors.notepad" @dismissed="$store.state.showNotSignedInErrors.notepad = false" variant="danger" dismissible fade> You need to be signed in to save notes </b-alert>
					</b-col>
				</b-row>
			</div>
		</b-container>
	</div>
</template>

<script>
	import Notes from '@/components/notepad/notes.vue'
	export default {
		components: {
			Notes
		}
	}
</script>

<style lang="scss" scoped>

</style>
