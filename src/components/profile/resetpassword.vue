<template>
    <div class="2fa">
        <div class="card"> 
			<div class="card-header shadow rounded-top">
				<h4 class="text-primary title d-inline-block">Update Password</h4>
			</div>
			<div class="card-body shadow bg-white rounded-bottom">
				<div class="col-12">
                    <div v-if='this.$store.state.usedOTP || this.$store.state.username == ""'>
                        <h3 class="display-4">Update Your Password!</h3>

                        <b-row>
                            <b-col cols="4"></b-col>
                            <b-col>
                                <b-form v-on:submit.stop.prevent="updatePassword">
                                    <div v-if="this.$store.state.username == ''">
                                        <b-form-group class="form" :state="$v.resetPassword.username.$dirty ? !$v.resetPassword.username.$error : null" invalid-feedback="Username must be atleast 4 characters long">
                                            <b-form-input id="input-1" :state="$v.resetPassword.username.$dirty ? !$v.resetPassword.username.$error : null" v-model="$v.resetPassword.username.$model" type="text" required placeholder="Username"></b-form-input>
                                        </b-form-group>
                                    </div>
                                    <b-form-group class="form" :state="$v.resetPassword.password.$dirty ? !$v.resetPassword.password.$error : null" invalid-feedback="Password must be atleast 8 characters long">
                                        <b-form-input id="input 3" :state="$v.resetPassword.password.$dirty ? !$v.resetPassword.password.$error : null" v-model="$v.resetPassword.password.$model" type="password" required placeholder="New Password"></b-form-input>
                                    </b-form-group>

                                    <b-form-group class="form" :state="$v.resetPassword.passwordVar.$dirty ? !$v.resetPassword.passwordVar.$error : null" invalid-feedback="Does not match the password">
                                        <b-form-input id="input 4" :state="$v.resetPassword.passwordVar.$dirty ? !$v.resetPassword.passwordVar.$error : null" v-model="$v.resetPassword.passwordVar.$model" type="password" required placeholder="New Password Again"></b-form-input>
                                    </b-form-group>

                                    <b-form-group class="form" :state="$v.resetPassword.otp.$dirty ? !$v.resetPassword.otp.$error : null" invalid-feedback="otp must be at least 6 characters long">
                                        <b-form-input id="input-2" :state="$v.resetPassword.otp.$dirty ? !$v.resetPassword.otp.$error : null" v-model="$v.resetPassword.otp.$model" type="text" required placeholder="One TIme Password"></b-form-input>
                                    </b-form-group>

                                    <b-button type="submit" :disabled="$v.resetPassword.$invalid" id="btn-sub" variant="outline-primary">Submit</b-button>
                                </b-form>
                            </b-col>
                            <b-col cols="4"></b-col>
                        </b-row>
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

                    <div v-else>
                        <h3 class="display-4">Aww Snap!</h3>
                        <p class="center">Two Factor Auth is required to change your password</p>
                    </div>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, minLength, sameAs, maxLength } from 'vuelidate/lib/validators';
export default {
    mixins: [validationMixin],
    data() {
        return {
            resetPassword: {
                otp: '',
                password: '',
                passwordVar: '',
                username: ''
            },  
            apiErr: null,
            dismissSecs: 10,
            dismissCountDown: 0
        };
    },
    validations: {
        resetPassword: {
            username: {
                required,
                minLenght: minLength(4),
                maxLength: maxLength(27)
            },
            otp: {
                required,
                minLength: minLength(6)
            },
            password: {
                required,
                minLength: minLength(8),
                maxLength: maxLength(27)
            },
            passwordVar: {
                required,
                sameAsPassword: sameAs('password')
            }
        }
    },
    methods: {
        async updatePassword() {
            let loginInfo = this.$store.state.username + ":" + this.resetPassword.password;
            let config = {
                headers: {
                    'X-Axiom-Identity-Token': btoa(loginInfo).replace(/=+$/,""),
                    'X-Axiom-Signed-Otp': btoa(this.resetPassword.otp).replace(/=+$/,""),
                }
            };

            this.$axios.post(process.env.VUE_APP_API + '/auth/resetPassword', {}, config)
            .then(() => {
                this.resetPassword.password = '';
                this.resetPassword.passwordVar = '';
                this.$bvToast.toast("Successfully Changed Password!", {
					title: "Success!",
					toaster: 'b-toaster-top-left',
					autoHideDelay: 1000,
					variant: "success",
					solid: false,
					appendToast: false
                })
                if(this.$store.state.username == '') {
                    this.$router.push({ name: 'login'});
                }
            })
            .catch((error) => {
                this.apiErr = error.response.data.message;
                if(this.apiErr == undefined) {
                    this.apiErr = "Could not communicate with the server.";
                }
                this.showAlert();
            })
            .finally(() => {
                this.resetPassword.otp = '';
            });
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown;
        },
        showAlert() {
            this.dismissCountDown = this.dismissSecs;
        }
    },
    created() {
        this.resetPassword.username = this.$store.state.username;
    }
}
</script>

<style lang="scss" scoped>

</style>
