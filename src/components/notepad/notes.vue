<template>
	<div class="notes">
		<div class="card">

			<div class="card-header shadow rounded-top">
				<h4 class="text-primary title d-inline-block">Notes</h4>
			</div>

			<div class="card-body shadow bg-white rounded-bottom">
				<b-form @submit.prevent="addNote" class="mb-5">
					<b-form-input v-model="note" size="lg" required placeholder="Write down a note!" ></b-form-input>
				</b-form>
				
				<div class="card pb-4" v-for="(data, index) in notes" :key='index' >
					<div class="card-body shadow bg-white rounded item">
						<p class="text"> 
							{{ data.note }} 
							<span class="delete" v-on:click="remove(index)">
								<font-awesome-icon class="test-right" :icon="['far','trash-alt']" /> 
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			note: '',
			notes: [],
			tempNote: '',
			tempid: null
		}
	},
	methods: {
		addNote() {
			if(this.update("Could not save note. Unable to connect to server", "add")) {
				this.notes.unshift({note: this.note});
				this.note = '';
			}
			else {
				this.notes.unshift({note: this.note});
				this.note = '';
			}
		},
		remove(id) {
			this.tempid = id;
			this.tempNote = this.notes[id];
			this.notes.splice(id,1);
			this.update("Could not delete note. Unable to connect to server", "delete");
		},
		update(errormsg, type) {
			if(this.$store.state.jwt != '') {
				this.$axios.defaults.headers.common['Authorization'] = 'Bearer' + ' ' + this.$store.getters.jwt;
				this.$axios.post(process.env.VUE_APP_API + '/notepad/update', {"notes": this.notes})
				.then(() => {
				})
				.catch((error) => {
					if (error.response.data.message == "Invalid Token") {
						this.$root.$bvToast.toast("User has been logged out", {
							title: "Error!",
							toaster: 'b-toaster-top-left',
							autoHideDelay: 5000,
							variant: "danger",
							solid: false,
							appendToast: false
						});
						this.$store.commit('setJWT', "");
						this.$router.push("/?loggedout=true");
					}
					else {
						this.$bvToast.toast(errormsg, {
							title: "Error!",
							toaster: 'b-toaster-top-left',
							autoHideDelay: 5000,
							variant: "danger",
							solid: false,
							appendToast: false
						});
					}
					if(type == "delete") {
						this.notes.splice(this.tempidid,0, this.tempNote);
						this.tempNote = '';
						this.tempid = null;
					}
				});
			}
		}
	},
	created: function () {
		if (this.$store.state.jwt != '') {
			this.$axios.defaults.headers.common['Authorization'] = 'Bearer' + ' ' + this.$store.getters.jwt;

			this.$axios.post(process.env.VUE_APP_API + '/notepad/read', {})
			.then((response) => {
				if(response.data.message != "No notes found.") {
					this.notes = JSON.parse(response.data.message.notes);
				}
			})
			.catch((error) => {
				if (error.response.data.message == "Invalid Token") {
					this.$root.$bvToast.toast("User has been logged out", {
						title: "Error!",
						toaster: 'b-toaster-top-left',
						autoHideDelay: 5000,
						variant: "danger",
						solid: false,
						appendToast: false
					});
					this.$store.commit('setJWT', "");
					this.$router.push("/?loggedout=true");
				}
				else {
					this.$bvToast.toast("Error communicating with the server", {
						title: "Error!",
						toaster: 'b-toaster-top-left',
						autoHideDelay: 5000,
						variant: "danger",
						solid: false,
						appendToast: false
					});
				}
			});
		}
	}
}
</script>

<style scoped>
	ul {
		margin: 0;
		padding: 0;
		list-style-type: none;
	}
  
	.item {
		font-size: 1.3em;	
		background-color: #E0EDF4 !important;
		border-left: 5px solid #3EB3F6 !important;
		color: #3E5252 !important;
	}

	.itemNotSynced {
		font-size: 1.3em;	
		background-color: #f8dddd !important;
		border-left: 5px solid #ff6768 !important;
		color: #3E5252 !important;
	}

	.text {
		margin: 0rem;
		text-align: left;
	}

	.delete {
		float:right;
		cursor:pointer;
	}

	p {
		font-size: 1.3em;
	}
</style>