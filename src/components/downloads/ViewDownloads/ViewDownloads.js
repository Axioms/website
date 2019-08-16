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
			fileName: '',
			fileType: '',
			id: '',
			hash: '',
			popoverMessage: false,
			link: '',
			hideLoading: false
		}
	},
	methods: {
		doCopy() {
			this.$copyText(this.hash).then(() => {
				this.popoverMessage = true;
			}, () => {
				this.popoverMessage = false;
			}).then(() => {
				this.$root.$emit('bv::show::popover', 'popunder');
			});

		},
		copyLink() {
			this.$copyText(this.link).then(() => {
				this.popoverMessage = true;
			}, () => {
				this.popoverMessage = false;
			}).then(() => {
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
		async secureDownload(file, fileName, fileType) {
			this.$axios.defaults.headers.common['Authorization'] = 'Bearer' + ' ' + this.$store.getters.jwt;
			this.makeToast("Info", "The File is being downloaded. You may leave this page", 4, "info");
			this.$axios({
				url: process.env.VUE_APP_API_ADD + '/files/secureDownload.php?file=' + file,
				method: 'GET',
				responseType: 'blob', // important
			}).then((response) => {
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', fileName + fileType); //or any other extension
				document.body.appendChild(link);
				link.click();
				this.makeToast("Success!", "File successfully download!", 2, "success");
			}).catch((error) => {
				if (error.response.data.message == "Invalid Response") {
					this.signoutNotification();
					this.$store.commit('setJWT', "");
					this.$router.push("/?loggedout=true");
				}
				else {
					this.makeToast("Error!", "Failed to download file", 5, "danger");
				}

			}).finally(() => {
				this.file = '';
				this.fileName = '';
				this.fileType = '';
			});
		},
		async deleteFile(file) {
			this.$axios.defaults.headers.common['Authorization'] = 'Bearer' + ' ' + this.$store.getters.jwt;
			
			this.$axios.get(process.env.VUE_APP_API_ADD + '/files/delete.php?file=' + file + '&confirmation=true')
				.then(() => {
					this.makeToast("Success!", "The file was successfully deleted!", 4, "success");
				})
				.catch((error) => {
					if (error.response.data.message == "Invalid Response") {
						this.signoutNotification();
						this.$store.commit('setJWT', "");
						this.$router.push("/?loggedout=true");
					} 
					else if (error.response.data.message == "You atempted to delete a protected file. This action is not allowed. The file has been unlisted for it's protection.") {
						this.makeToast("Error!", error.response.data.message, 5, "danger")
					}
					else {
						this.makeToast("Error!", "Failed to delete file", 4, "danger");
					}
				})
				.finally(() => {
					this.file = '';
					this.id = '';
					this.$axios.defaults.headers.common['Authorization'] = 'Bearer' + ' ' + this.$store.getters.jwt;

					this.$axios.post(process.env.VUE_APP_API_ADD + '/files/read.php', {}).then(response => {
						this.items = response.data.files;
						this.totalRows = this.items.length;
					}).catch(error => {
						if (error.response.data.message == "Invalid Token") {
							this.signoutNotification();
							this.$store.commit('setJWT', "");
							this.$router.push("/?loggedout=true");
						}
						else {
							this.makeToast("Error!", "Error communicating with the server", 5, "danger")
						}
					});
					this.currentPage = 1;
					this.$refs.files.refresh();
				});
		},
		showSecureDownload(file, fileName, fileType) {
			this.$refs['secureDownload'].show();
			this.file = file;
			this.fileName = fileName;
			this.fileType = fileType;
		},
		closeSecureDownload() {
			this.$refs['secureDownload'].hide();
		},
		startSecureDownload() {
			this.$refs['secureDownload'].hide();
			this.secureDownload(this.file, this.fileName, this.fileType);
		},
		showDelete(file, id) {
			this.$refs['delete'].show();
			this.file = file;
			this.id = id;
		},
		confirmed() {
			this.$refs['delete'].hide();
			this.deleteFile(this.file);
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
			if (bytes >= 1000000000) {
				return '' + (Math.floor((bytes / 1000000000) * 100) / 100) + ' ' + 'GB';
			}
			else if (bytes >= 1000000) {
				return '' + (Math.floor((bytes / 1000000) * 100) / 100) + ' ' + 'MB';
			}
			else if (bytes >= 1000) {
				return '' + (Math.floor((bytes / 1000) * 100) / 100) + ' ' + 'KB';
			}
			else {
				return '' + bytes + ' ' + 'bytes'
			}
		},
		makeToast(header, data, deration, variant) {
			this.toastCount++
			this.$bvToast.toast(data, {
				title: header,
				toaster: 'b-toaster-top-left',
				autoHideDelay: deration * 1000,
				variant: variant,
				solid: false,
				appendToast: false
			})
		},
		signoutNotification() {
			this.$root.$bvToast.toast("User has been logged out", {
				title: "Error!",
				toaster: 'b-toaster-top-left',
				autoHideDelay: 5000,
				variant: "danger",
				solid: false,
				appendToast: false
			});
		}
	},
	created: function () {
		this.$axios.defaults.headers.common['Authorization'] = 'Bearer' + ' ' + this.$store.getters.jwt;

		this.$axios.post(process.env.VUE_APP_API_ADD + '/files/read.php', {})
			.then(response => {
				this.items = response.data.files;
				this.totalRows = this.items.length;
				this.$bvToast.toast("connected to the server!", {
					title: "connected!",
					toaster: 'b-toaster-top-left',
					autoHideDelay: 1000,
					variant: "success",
					solid: false,
					appendToast: false
				})
			})
			.catch(error => {
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
					this.hideLoading = true;
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