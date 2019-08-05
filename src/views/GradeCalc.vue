<template>
  <div class="gradeCalc">
    <b-container>
      <div class="card">

        <div class="card-header shadow rounded-top">
          <div>
            <b-nav fill tabs>
              <b-nav-item v-on:click="setDownloadPage(0)" :active="1 == 0">Upload</b-nav-item>
              <b-nav-item v-on:click="setDownloadPage(1)" :active="1 == 1">View</b-nav-item>
            </b-nav>
          </div>
        </div>
        <div class="card-body shadow bg-white rounded-bottom">
          <div class="col-12">
            <div v-if="1 == 0">
              <UploadFiles></UploadFiles>
            </div>
            <div v-else-if="1 == 1">
              <ViewDownloads></ViewDownloads>
            </div>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
	
}
</script>

<style lang="scss" scoped>
 .card-header {
   padding-bottom: 0px;
 }
 .nav-tabs {
   border-bottom: none;
 }
 .nav-link {
    display: block;
  }
</style>