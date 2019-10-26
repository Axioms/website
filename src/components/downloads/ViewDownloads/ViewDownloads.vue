<template>
	<b-container fluid>
		<!-- User Interface controls -->
		<div v-if="items.length == 0">
			<b-spinner v-if="!hideLoading" class="mt-5 mb-4" variant="dark" type="grow" label="Loading..."></b-spinner>
			<div v-else>
				<p class="text-center">Unable to reach the server</p>
			</div>
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
			<b-table show-empty stacked="md" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection" @filtered="onFiltered" ref="files" id="files">
				<template v-slot:cell(name)="data">
					<div v-if="data.item.protected == 1" class="displayTable" v-b-tooltip.hover.top title="This file is protected">
						<p class="text-left"> {{ data.item.name }}{{ data.item.type }} <font-awesome-icon class="text-secondary" :icon="['fas','lock']" /></p> 
					</div>
					<div v-else>
						<p class="text-left"> {{ data.item.name }}{{ data.item.type }} </p> 
					</div>
				</template>

				<template v-slot:cell(size)="data"> {{ getFileSize(data.item.size) }} </template>
				
				<template v-slot:cell(actions)="data">
					<div class="re-size">
						<!-- protected file-->
						<div v-if="data.item.protected == 1">
							<b-button size="sm disabled" class="mr-1 btn-purple progress-bar-striped" v-b-tooltip.hover title="Shareable Link"><font-awesome-icon :icon="['fas','link']" /></b-button>
							<b-button size="sm" id="copyPop" class="mr-1 progress-bar-striped" @click="showCopy(data.item.hash)" variant="primary" v-b-tooltip.hover title="copy hash"><font-awesome-icon :icon="['far','clipboard']" /></b-button>
							<b-button size="sm" class="mr-1 progress-bar-striped" @click="showSecureDownload(data.item.encodedName, data.item.name, data.item.type)" variant="success" v-b-tooltip.hover title="Download"><font-awesome-icon :icon="['fas','arrow-down']" /></b-button>
							<b-button size="sm" class="progress-bar-striped	" @click="showDelete(data.item.encodedName, data.index)" variant="danger" v-b-tooltip.hover title="Download"><font-awesome-icon :icon="['far','trash-alt']" /></b-button>
						</div>
						<!-- Normal file-->
						<div v-else>
							<b-button size="sm" class="mr-1 btn-purple" @click="showLink(data.item.encodedName)" v-b-tooltip.hover title="Shareable Link"><font-awesome-icon :icon="['fas','link']" /></b-button>
							<b-button size="sm" id="copyPop" class="mr-1" @click="showCopy(data.item.hash)" variant="primary" v-b-tooltip.hover title="copy hash"><font-awesome-icon :icon="['far','clipboard']" /></b-button>
							<b-button size="sm" class="mr-1" @click="download(data.item.encodedName)" variant="success" v-b-tooltip.hover title="Download"><font-awesome-icon :icon="['fas','arrow-down']" /></b-button>
							<b-button size="sm" @click="showDelete(data.item.encodedName, data.index)" variant="danger" v-b-tooltip.hover title="Delete"><font-awesome-icon :icon="['far','trash-alt']" /></b-button>
						</div>
					</div>
				</template>
			</b-table>

			<b-row>
				<b-col md="6" class="my-1">
					<b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" class="my-0" ></b-pagination>
				</b-col>
			</b-row>
			<div id="cheeky-downloads"></div>
			<b-modal ref="secureDownload" centered title="Confirmation">
				<div class="mb-4 d-block text-center">
					<h3>Are you sure?</h3>
				</div>
				<div class="d-block text-center">
					<p> You are about to download a protected file. These files <b>MUST</b> securely deleted off of any computer it is downloaded on.  use <a href="https://www.bleachbit.org/download" target="_blank">this</a> tool to deleted it once done.  Protected files do not uses the browsers download function and therefor you will not be able to see the download progress. you will be notified when the file is done downloading. </p>
				</div>
				<div slot="modal-footer" class="w-100">
					<b-button class="mr-1" variant="outline-primary" block @click="startSecureDownload">I understand and wish to continue</b-button>
					<b-button class="" variant="outline-danger" block @click="closeSecureDownload">No</b-button>
				</div>
			</b-modal>
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

<script src="./ViewDownloads.js">
</script>


<style src="./ViewDownloads.scss" lang="scss" scoped>
</style>
