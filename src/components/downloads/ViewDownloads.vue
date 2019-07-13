<template>
	<b-container fluid>
		<!-- User Interface controls -->
		<div v-if="items.length == 0">
			<b-spinner class="mt-5 mb-4" variant="dark" type="grow" label="Loading..."></b-spinner>
		</div>
		<div v-else>
			<b-row class="mb-5">
				<b-col md="6" class="my-1">
					<b-form-group label-cols-sm="3" label="Filter" class="mb-0">
						<b-input-group>
							<b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
							<b-input-group-append>
								<b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
							</b-input-group-append>
						</b-input-group>
					</b-form-group>
				</b-col>

				<b-col md="6" class="my-1">
					<b-form-group label-cols-sm="3" label="Sort" class="mb-0">
						<b-input-group>
							<b-form-select v-model="sortBy" :options="sortOptions">
								<option slot="first" :value="null">none</option>
							</b-form-select>

							<b-form-select v-model="sortDesc" :disabled="!sortBy" slot="append">
								<option :value="false">Asc</option> <option :value="true">Desc</option>
							</b-form-select>
						</b-input-group>
					</b-form-group>
				</b-col>

				<b-col md="6" class="my-1">
					<b-form-group label-cols-sm="3" label="Sort direction" class="mb-0">
						<b-form-select v-model="sortDirection">
							<option value="asc">Asc</option>
							<option value="desc">Desc</option>
							<option value="last">Last</option>
						</b-form-select>
					</b-form-group>
				</b-col>

				<b-col md="6" class="my-1">
					<b-form-group label-cols-sm="3" label="Per page" class="mb-0">
						<b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
					</b-form-group>
				</b-col>
			</b-row>

			<!-- Main table element -->
			<b-table
			show-empty
			stacked="md	"
			:items="items"
			:fields="fields"
			:current-page="currentPage"
			:per-page="perPage"
			:filter="filter"
			:sort-by.sync="sortBy"
			:sort-desc.sync="sortDesc"
			:sort-direction="sortDirection"
			@filtered="onFiltered"
			id="files"
			>
				<template slot="name" slot-scope="data"> <p class="text-left"> {{ data.item.name }}{{ data.item.type }} </p> </template>
				<template slot="size" slot-scope="data"> {{ getFileSize(data.item.size) }} </template>

				<template slot="actions" slot-scope="data">
					<div class="re-size">
						<b-button size="sm" class="mr-1 btn-purple" @click="showLink(data.item.encodedName)" v-b-tooltip.hover title="link"><font-awesome-icon :icon="['fas','link']" /></b-button>
						<b-button size="sm" id="copyPop" class="mr-1" @click="showCopy(data.item.hash)" variant="primary" v-b-tooltip.hover title="copy hash"><font-awesome-icon :icon="['far','clipboard']" /></b-button>
						<b-button size="sm" class="mr-1" @click="download(data.item.encodedName)" variant="success" v-b-tooltip.hover title="Download"><font-awesome-icon :icon="['fas','arrow-down']" /></b-button>
						<b-button size="sm" @click="showDelete(data.item.encodedName, data.index)" variant="danger" v-b-tooltip.hover title="Delete"><font-awesome-icon :icon="['far','trash-alt']" /></b-button>
					</div>
				</template>
			</b-table>

			<b-row>
				<b-col md="6" class="my-1">
					<b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" class="my-0" ></b-pagination>
				</b-col>
			</b-row>
			<div id="cheeky-downloads"></div>
			<b-modal ref="delete" hide-footer centered title="Confirmation">
				<div class="d-block text-center">
					<h3>Are you sure?</h3>
				</div>
				<b-button class="mr-1" variant="outline-primary" block @click="confirmed">yes</b-button>
				<b-button class="" variant="outline-danger" block @click="toggleModal">No</b-button>
			</b-modal>
			<b-modal ref="copy" centered title="Copy 256-Sha Hash">
				<div class="input-group mb-3 col mt-3">
					<input type="text" id="hashs" class="form-control bg-light rounded-left" v-model="hash" readonly>
					<div class="input-group-append">
						<button class="btn btn-outline-primary" id="popunder" v-b-popover.top="displayPop" type="button"  @click="doCopy">Copy <font-awesome-icon :icon="['far','clipboard']" /></button>
					</div>
				</div>
				<template slot="modal-footer">
					<b-button variant="primary" @click="hideCopy()">
						OK
					</b-button>
				</template>
			</b-modal>
			<b-modal ref="link" centered title="Copy Link">
				<div class="input-group mb-3 col mt-3">
					<input type="text" id="hashs" class="form-control bg-light rounded-left" v-model="link" readonly>
					<div class="input-group-append">
						<button class="btn btn-outline-primary" id="popunder" v-b-popover.top="displayPop" type="button"  @click="copyLink">Copy <font-awesome-icon :icon="['far','clipboard']" /></button>
					</div>
				</div>
				<template slot="modal-footer">
					<b-button variant="primary" @click="hideLink()">
						OK
					</b-button>
				</template>
			</b-modal>
		</div>
	</b-container>
</template>

<script>
	export default {
		data() {
			return {
				items: [],
				fields: [
					{ key: 'name', label: 'File Name', sortable: true, sortDirection: 'desc' },
					{ key: 'size', label: 'Size', sortable: true, class: 'text-center' },
					{ key: 'created', sortable: true, label: 'Date uploaded' },
					{ key: 'actions', label: 'Actions' }
				],
				totalRows: 1,
				currentPage: 1,
				perPage: 5,
				pageOptions: [5, 10, 25, 50, 100],
				sortBy: null,
				sortDesc: false,
				sortDirection: 'asc',
				filter: null,
				infoModal: {
					id: 'info-modal',
					title: '',
					content: ''
				},
				file: '',
				id: '',
				hash: '',
				popoverMessage: false,
				link: ''
			}
		},
		methods: {
			doCopy() {
				this.$copyText(this.hash).then(() => {
					this.popoverMessage = true;
				},() => {
					this.popoverMessage = false;
				}).then (() => {
					this.$root.$emit('bv::show::popover', 'popunder');
				});
					
			},
			copyLink() {
				this.$copyText(this.link).then(() => {
					this.popoverMessage = true;
				},() => {
					this.popoverMessage = false;
				}).then (() => {
					this.$root.$emit('bv::show::popover', 'popunder');
				});
			},
			download(file) {
				//delete iframes
				var iframes = document.querySelectorAll('iframe');

				for (var i = 0; i < iframes.length; i++) {
					iframes[i].parentNode.removeChild(iframes[i]);
				}

				var ifrm = document.createElement("iframe");
				let link = process.env.VUE_APP_DOWNLOAD_FILE + this.$store.getters.jwtUser + '&' + 'file=' + file;
				ifrm.setAttribute("src", link);
				ifrm.style.width = "0px";
				ifrm.style.height = "0px";
				ifrm.style.display = "none";
				document.getElementById("cheeky-downloads").appendChild(ifrm);
			},
			async deleteFile(file, id) {
				this.$axios.defaults.headers.common['Authorization'] = 'Bearer' + ' ' + this.$store.getters.jwt;
				
				this.$axios.get(process.env.VUE_APP_API_ADD + '/files/delete.php?file=' + file + '&confirmation=true')
				.then(() => {
					this.items.splice(id,1);
					this.totalRows = this.items.length;
					this.currentPage = 1;
					this.$root.$emit('bv::refresh::table', 'files');
				})
				.catch((error) => {
					console.log(error);
					if(error.response.data.message == "Invalid Response") {
						this.$store.commit('setJWT', "");
						this.$router.push("/?loggedout=true");
					}
				})
				.finally(() => {
					this.file = '';
					this.id = '';
				});
			},
			showDelete(file, id) {
				this.$refs['delete'].show();
				this.file = file;
				this.id = id;
			},
			confirmed() {
				this.$refs['delete'].hide();
				this.deleteFile(this.file, this.id);
			},
			toggleModal() {
				this.$refs['delete'].hide();
			},
			showCopy(hash) {
				this.$refs['copy'].show();
				this.hash = hash;
				this.$copyText(this.hash);
			},
			hideCopy() {
				this.$refs['copy'].hide();
				this.hash = '';
			},
			showLink(file) {
				this.createDownloadLink(file);
				this.$refs['link'].show();
				this.$copyText(this.link);
			},
			hideLink() {
				this.$refs['link'].hide();
				this.link = '';
			},
			createDownloadLink(file) {
				file = btoa(file);
				this.link = process.env.VUE_APP_API + '/files/guestDownload.php?file=' + file;
			},
			onFiltered(filteredItems) {
				// Trigger pagination to update the number of buttons/pages due to filtering
				this.totalRows = filteredItems.length
				this.currentPage = 1
			},
			getFileSize(bytes) {
				if(bytes >= 1000000000) {
					return '' + (Math.floor((bytes/1000000000) * 100) / 100) + ' ' + 'GB';
				}
				else if (bytes >= 1000000) {
					return '' + (Math.floor((bytes/1000000) * 100) / 100) + ' ' + 'MB';
				}
				else if(bytes >= 1000) {
					return '' + (Math.floor((bytes/1000) * 100) / 100) + ' ' + 'KB';
				}
				else {
					return '' + bytes + ' ' + 'bytes'
				}

				return "If you see thus, Karan fucked up";
			}
		},
			created: function () {
				this.$axios.defaults.headers.common['Authorization'] = 'Bearer' + ' ' + this.$store.getters.jwt;
				
				this.$axios.post(process.env.VUE_APP_API_ADD + '/files/read.php', {})
				.then(response => {
				this.items = response.data.files;
				this.totalRows = this.items.length;
				})
				.catch(error => {
				if(error.response.data.message == "Invalid Response") {
					this.$store.commit('setJWT', "");
					this.$router.push("/?loggedout=true");
			}
			});
		},
		computed: {
			sortOptions() {
				// Create an options list from our fields
				return this.fields.filter(f => f.sortable).map(f => {
					return { text: f.label, value: f.key }
				})
			},
			displayPop() {
				if (this.popoverMessage) {    
					return {
						html: true,
						content: () => {
							return '<p style="color:#0da346; font-size:1.3em; margin: 0px">Success!</p>'
						}
					}
				}
				else {
					return {
						html: true,
						content: () => {
							return '<p style="color:#8c0808; font-size:1.3em; margin: 0px">Failed!</p>'
						}
					}
				}
			}
		},
		mounted() {
			this.totalRows = this.items.length
		}
	}
</script>


<style lang="scss" scoped>
	@media (min-width: 768px) and (max-width: 991px){
		.re-size {
			display: flex;
		}
	}
	.btn-purple {
		background-color: #816ae2;
		border-block-color: #816ae2;
	}
	.btn-purple:hover {
		background-color: #816ae2;
		border-block-color: #816ae2;
	}
	.btn-purple:focus, .btn-purple.focus {
		-webkit-box-shadow: 0 0 0 0.2rem rgba(129, 106, 226, 0.5);
		box-shadow: 0 0 0 0.2rem rgba(129, 106, 226, 0.5);
	}
	#cheeky-downloads {
		display: none;
	}
</style>
