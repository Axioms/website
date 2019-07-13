<template>
    <div class="upload">
        <b-form @submit.prevent="submitFile()" enctype="multipart/form-data">
            <p class="header mt-2">Upload your file(s)</p>
            <b-form-file class="mt-2" v-model="files" multiple>
                <template slot="file-name" slot-scope="{ names }">
                    <b-badge variant="secondary">{{ names[0] }}</b-badge>
                    <b-badge v-if="names.length > 1" variant="secondary" class="ml-1"> + {{ names.length - 1 }} More files </b-badge>
                </template>
            </b-form-file>
            <b-button id="Submit" class="mt-4" v-on:click="showPorgress = !showPorgress" name="submit" type="submit" variant="outline-primary">Upload</b-button>
            <div v-if="showPorgress">
                <b-progress class="mt-4 mb-4" :value="uploadPercentage" :max="100" show-progress animated></b-progress>
            </div>
        </b-form>
        <b-row>
        <b-col class="alert">
          <b-alert :show="hasFailed == true" variant="danger" dismissible fade> Failed to upload file(s) </b-alert>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="alert">
          <b-alert :show="hasFailed == false" variant="success" dismissible fade> Success </b-alert>
        </b-col>
      </b-row>
    </div>    
</template>

<script>
export default {
    data() {
        return {
            files: '',
            uploadPercentage: 0,
            showPorgress: false,
            hasFailed: null
        }
    },
    methods: {
        async submitFile(){
            let formData = new FormData();

            for( var i = 0; i < this.files.length; i++ ){
                let file = this.files[i];
                formData.append('upload[' + i + ']', file);
            }
            this.$axios.defaults.headers.common['Authorization'] = 'Bearer' + ' ' + this.$store.getters.jwt;
            this.$axios.post( process.env.VUE_APP_API_ADD + '/files/upload.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: function( progressEvent ) {
                    this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) );
                }.bind(this)
            }
            ).then(() => {
                this.hasFailed = false;
                this.showPorgress = false;
                this.uploadPercentage = 0;
            })
            .catch((error) => {
                this.hasFailed = true;
                this.showPorgress = false;
                this.uploadPercentage = 0;
                if(error.response.data.message == "Invalid Response") {
                    this.$store.commit('setJWT', "");
                    this.$router.push("/?loggedout=true");
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .header {
        text-align: center;
        font-size: 1.5em;
    }
    .upload {
        text-align: left;
    }
</style>
