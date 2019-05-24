<template>
    <div class="outline-temp    ">
        <div class="card">
            <div class="card-header shadow rounded-top">
                <h4 class="text-primary title d-inline-block">OutLine</h4>
            </div>
            <div class="card-body shadow bg-white rounded-bottom">
                <div class="">
                    <div class="row">
                        <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                            <h5 class="header-5">Downloads</h5>
                            <div class="row">
                                <div class="col-3 d-data">
                                    <div class="d-icon">
                                        <a href="https://play.google.com/store/apps/details?id=org.outline.android.client" target="blank" class="d-inline-block text-secondary">
                                            <span class="d-none d-block">
                                                <font-awesome-icon class="outline" :icon="['fab', 'android']" />
                                            </span>
                                        </a>
                                    </div>
                                    <div class="d-text text-secondary">
                                        <p>Android</p>
                                    </div>
                                </div>
                                <div class="col-3 d-data">
                                    <div class="d-icon">
                                        <a href="https://itunes.apple.com/us/app/outline-app/id1356177741" target="blank" class="d-inline-block text-secondary">
                                            <span class="d-none d-block">
                                                <font-awesome-icon class="outline" :icon="['fab', 'apple']" />
                                            </span>
                                        </a>
                                    </div>
                                    <div class="d-text text-secondary">
                                        <p>IOS</p>
                                    </div>
                                </div>
                                <div class="col-3 d-data">
                                    <div class="d-icon">
                                        <a href="https://raw.githubusercontent.com/Jigsaw-Code/outline-releases/master/client/Outline-Client.exe" target="blank" class="d-inline-block text-secondary">
                                        <span class="d-none d-block">
                                            <font-awesome-icon class="outline" :icon="['fab', 'windows']" />
                                        </span>
                                    </a>
                                    </div>
                                    <div class="d-text text-secondary">
                                        <p>Windows</p>
                                    </div>
                                </div>
                                <div class="col-3 d-data">
                                    <div class="d-icon">
                                        <a href="https://play.google.com/store/apps/details?id=org.outline.android.client" target="blank" class="d-inline-block text-secondary">
                                            <span class="d-none d-block">
                                                <font-awesome-icon class="outline" :icon="['fab', 'chrome']" />
                                            </span> 
                                        </a>
                                    </div>
                                    <div class="d-text text-secondary">
                                        <p>Chrome OS</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6">
          
                            <h3 class="header-5">Install Instructions</h3>
                            <p class="list-item">After downloading Outline copy the link or click the copy button.</p>
                            <p class="list-item">The open the app, Outline should auto detect the link, if it doesn't then paste the link into the  add access key box</p>
          
                            <form>
                                <div class="input-group mb-3">
                                    <input type="text" id="outline-server-auth" class="form-control bg-light" v-bind:value="message" aria-label="VPN access key" aria-describedby="basic-addon2">
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-primary" id="popunder" v-b-popover.bottom="displayPop" type="button" @click="doCopy">Copy <font-awesome-icon :icon="['far','clipboard']" /></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
data () {
    return {
      message: 'ss://YWVzLTI1Ni1jZmI6M0QyQTYwOUNGOTI3N0NCMzlGMTdCNUYxQjkyMUVGRTFGM0ZBNDU2REBheGlvbXMuZGRucy5uZXQ6NTAwMA#AxiomProxy',
      popoverMessage: null
     };
  },
  methods: {
    doCopy: function () {
      this.$copyText(this.message).then(() => {
        this.popoverMessage = true;
      },() => {
        this.popoverMessage = false;
			}).then (() => {
				this.$root.$emit('bv::show::popover', 'popunder');
			});
			
    }
  },
  computed : {
    displayPop() {
      if (this.popoverMessage) {
        
        return {
          html: true,
          content: () => {
            return '<p style="color:#0da346; font-size:1.3em">Success!</p>'
          }
        }
      }
      else {
        return {
          html: true,
          content: () => {
            return '<p style="color:#8c0808; font-size:1.3em">Failed!</p>'
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .outline:hover {
        color: #007bff;
    }
</style>
