<template>
  <div class="download">
    <b-container>
      <div class="card">

        <div class="card-header shadow rounded-top">
          <div>
            <b-nav fill tabs>
              <b-nav-item v-on:click="setDownloadPage(0)" :active="currentPage == 0">Upload</b-nav-item>
              <b-nav-item v-on:click="setDownloadPage(1)" :active="currentPage == 1">View</b-nav-item>
            </b-nav>
          </div>
        </div>
        <div class="card-body shadow bg-white rounded-bottom">
          <div class="col-12">
            <div v-if="currentPage == 0">
              <UploadFiles></UploadFiles>
            </div>
            <div v-else-if="currentPage == 1">
              <ViewDownloads></ViewDownloads>
            </div>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
  import ViewDownloads from '@/components/downloads/ViewDownloads/ViewDownloads.vue'
  import UploadFiles from '@/components/downloads/upload.vue'

  export default {
    data() {
      return {
        currentPage : 0
      }
    },
    methods: {
      setDownloadPage(page) {
        this.currentPage = page;
      }
    },
    components: {
      ViewDownloads,
      UploadFiles
    }
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
