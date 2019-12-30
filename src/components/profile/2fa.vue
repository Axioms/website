<template>
    <div class="2fa">
        <div class="card"> 
			<div class="card-header shadow rounded-top">
				<h4 class="text-primary title d-inline-block">Two Factor Auth</h4>
			</div>
			<div class="card-body shadow bg-white rounded-bottom">
				<div class="col-12">
                    <div v-if='this.$store.state.usedOTP' class="register">
                        <h3 class="display-4">Deleted Two Factor Auth</h3>
                        <p class="center">You have two factor auth enabled! if you ever need to disable it or remove it completely </p>
                        <p class="center">just put a recover code or a code from your Authenticator App in the text box below.</p>

                        <b-form @submit.prevent="removeOTP()">
                            <b-row>
                                <b-col cols="4"></b-col>
                                <b-col>
                                    <b-form-group class="form">
                                        <b-form-input id="input-6" v-model="otp" type="text" required placeholder="One Time Password"></b-form-input>
                                    </b-form-group>
                                </b-col>
                                <b-col cols="4"></b-col>
                            </b-row>
                            <b-button type="submit" :disabled="otp.length < 6" variant="outline-primary">Submit</b-button>
                        </b-form>
                    </div>

                    <div v-else class="register">
                        <h3 class="display-4">Enable Two Factor Auth</h3>
                        <p class="center">Scan the qr code with your authenticator app of choice and insert a code below</p>
                        <p><u @click="createOTP" style="cursor: pointer">if the qr code isn't showing click here</u></p>
                        <div v-if='qrcode != null'>
                            <img :src="qrcode"/>
                        </div>
                        <b-form @submit.prevent="registerOTP()">
                            <b-row>
                                <b-col cols="4"></b-col>
                                <b-col>
                                    <b-form-group class="form">
                                        <b-form-input id="input-1" v-model="otp" type="text" required placeholder="One Time Password"></b-form-input>
                                    </b-form-group>
                                </b-col>
                                <b-col cols="4"></b-col>
                            </b-row>
                            <b-button type="submit" :disabled="otp.length < 6" variant="outline-primary">Submit</b-button>
                        </b-form>
                    </div>
                    <div v-if="backupCodes != null">
                        <p>Each backup code can only be used once.</p>
                        <p>Back up codes are used to recover your account if you lose your authenticator app.</p>
                        <p>Please keep these codes in a safe place.</p>
                        <b-container>
                            <b-row>
                                <b-col cols="1"></b-col>
                                <b-col>
                                    <b-card bg-variant="light" class="border" ref="backupcodes" id="backupcodes">
                                        <h5 class="text-dark pad-down">Backup Codes</h5>
                                            <b-row v-for="(value) in backupCodes" :key="value" class="codeRow">
                                                <b-col cols="4"></b-col>
                                                <b-col>
                                                    {{value}}
                                                </b-col>
                                                <b-col cols="4"></b-col>
                                            </b-row>
                                        <div class="login-logo">
                                            <img src="@/assets/logo-dark.png" id="navbar-icon"/>
                                        </div>
                                    </b-card>
                                </b-col>
                                <b-col cols="1"></b-col>
                            </b-row>
                        </b-container>
                        <b-button type="button" variant="outline-primary" @click="downloadBackupCodes">Download Backup Codes</b-button>
                    </div>

                    <b-row>
                        <b-col></b-col>
                        <b-col cols="8">
                            <b-alert :show="dismissCountDown" fade dismissible variant="danger" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged" class="alert">
                            <p>{{ this.apiErr }}</p>
                            <b-progress variant="danger" :max="dismissSecs" :value="dismissCountDown" height="4px"></b-progress>
                        </b-alert>
                        </b-col>
                        <b-col></b-col>

                    </b-row>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
export default {
    data() {
      return {
          otp: '',
            apiErr: null,
            dismissSecs: 10,
            dismissCountDown: 0,
            qrcode: null,
            backupCodes: null
      }
    },
    methods: {
        async createOTP() {
            this.$axios.defaults.headers.common["Authorization"] ="Bearer" + " " + this.$store.getters.jwt;
            this.$axios.post(process.env.VUE_APP_API + "/otp/create", {})
                .then((response) => {
                    this.qrcode = "data:image/svg+xml;base64, " + response.data.qr;
                })
                .catch((error) => {
                    this.apiErr = error.response.data.message;
                    if(this.apiErr == undefined) {
                        this.apiErr = "Could not communicate with the server.";
                    }
                    this.showAlert();
                });
        },
        async removeOTP() {
            this.$axios.defaults.headers.common["Authorization"] ="Bearer" + " " + this.$store.getters.jwt;
            let config = {
                headers: {
                    'X-Axiom-Signed-Otp': btoa(this.otp).replace(/=+$/,""),
                }
            };
            this.$axios.post(process.env.VUE_APP_API + "/otp/remove", {}, config)
            .then(() => {
                this.$store.commit("setUsedOTP", false);
                this.createOTP();
                this.$bvToast.toast("Successfully removed 2nd factor auth!", {
					title: "Success!",
					toaster: 'b-toaster-top-left',
					autoHideDelay: 1000,
					variant: "success",
					solid: false,
					appendToast: false
				})
            })
            .catch((error) => {
                this.apiErr = error.response.data.message;
                if(this.apiErr == undefined) {
                  this.apiErr = "Could not communicate with the server.";
                }
                this.showAlert();
            }).
            finally(() => {
                this.otp ='';
            });
        },

        async registerOTP() {
            this.$axios.defaults.headers.common["Authorization"] ="Bearer" + " " + this.$store.getters.jwt;
            let config = {
                headers: {
                    'X-Axiom-Signed-Otp': btoa(this.otp).replace(/=+$/,""),
                }
            };
            this.$axios.post(process.env.VUE_APP_API + "/otp/register", {}, config)
                .then((response) => {
                    this.backupCodes = response.data['backup codes'];
                    this.qrcode = null;
                    this.$store.commit("setUsedOTP", true);
                    this.$bvToast.toast("Successfully added 2nd factor auth!", {
					title: "Success!",
					toaster: 'b-toaster-top-left',
					autoHideDelay: 1000,
					variant: "success",
					solid: false,
					appendToast: false
				})
                })
                .catch((error) => {
                    this.apiErr = error.response.data.message;
                    if(this.apiErr == undefined) {
                        this.apiErr = "Could not communicate with the server.";
                    }
                    this.showAlert();
                })
                .finally(() => {
                    this.otp ='';
                });
        },
        async downloadBackupCodes() {
            const el = this.$refs.backupcodes;
            // add option type to get the image version
            // if not provided the promise will return 
            // the canvas.
            const options = {
                type: 'dataURL'
            }
            let output = await this.$html2canvas(el, options);
            var a = document.createElement("a"); //Create <a>
            a.href = output; //Image Base64 Goes here
            a.download = "Image.png"; //File name Here
            a.click(); //Downloaded file

        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown;
        },
        showAlert() {
            this.dismissCountDown = this.dismissSecs;
        }
    },
    computed: {
    },
    created() {
        if(!this.$store.state.usedOTP) {
            this.createOTP();
        }
    }
  }
</script>

<style lang="scss" scoped>
    @media only screen and (max-width: 768px) {
        .container {
            padding: 0px !important;
        }
    }
    .test {
        padding: 30px;
    }
    .container {
        padding: 0rem 11rem;
    }
    .alert {
        margin: 1rem 0rem;
    }
    .form {
        text-align: left;
    }
    #backupcodes {
        margin-top: 5%;
        margin-bottom: 2%;
        padding-bottom: 0em;
    }
    .codeRow {
        padding-bottom: 2%;
    }
    .register {
        padding-bottom: 2%;
    }
</style>
