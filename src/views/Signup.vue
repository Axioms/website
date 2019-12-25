<template>
    <div class="signup">
        <b-container class="test">
            <b-card bg-variant="light" class="border">
                <h5 class="text-dark pad-down">Sign up</h5>
                <b-row>
                    <b-col cols="3"></b-col>
                    <b-col>
                        <b-form v-on:submit.stop.prevent="register">
                            <b-form-group class="form" :state="$v.signup.username.$dirty ? !$v.signup.username.$error : null" invalid-feedback="Username must be atleast 4 characters long">
                                <b-form-input id="input-2" :state="$v.signup.username.$dirty ? !$v.signup.username.$error : null" v-model="$v.signup.username.$model" type="text" required placeholder="Username"></b-form-input>
                            </b-form-group>

                            <b-form-group class="form" :state="$v.signup.password.$dirty ? !$v.signup.password.$error : null" invalid-feedback="Password must be atleast 8 characters long">
                                <b-form-input id="input 3" :state="$v.signup.password.$dirty ? !$v.signup.password.$error : null" v-model="$v.signup.password.$model" type="password" required placeholder="Password"></b-form-input>
                            </b-form-group>

                            <b-form-group class="form" :state="$v.signup.passwordVar.$dirty ? !$v.signup.passwordVar.$error : null" invalid-feedback="Does not match the password">
                                <b-form-input id="input 4" :state="$v.signup.passwordVar.$dirty ? !$v.signup.passwordVar.$error : null" v-model="$v.signup.passwordVar.$model" type="password" required placeholder="Password Again"></b-form-input>
                            </b-form-group>

                            <b-button type="submit" :disabled="$v.signup.$invalid" id="btn-sub" variant="outline-primary">Submit</b-button>
                        </b-form>
                    </b-col>
                    <b-col cols="3"></b-col>
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
                <div class="login-logo">
                    <img src="@/assets/logo-dark.svg" id="navbar-icon"/>
                </div>
            </b-card>
        </b-container>
    </div>
</template>

<script>
    import { validationMixin } from 'vuelidate';
    import { required, minLength, sameAs, maxLength } from 'vuelidate/lib/validators';
    export default {
        mixins: [validationMixin],
        data() {
            return {
                signup: {
                    username: '',
                    password: '',
                    passwordVar: ''
                },  
                apiErr: null,
                dismissSecs: 10,
                dismissCountDown: 0
            };
        },
        validations: {
            signup: {
                username: {
                    required,
                    minLength: minLength(4),
                    maxLength: maxLength(27)
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
            async register() {
                    if(this.signup.password == this.signup.passwordVar) {
                        this.$axios.post(process.env.VUE_APP_API + '/auth/register.php', {
                            'username' : this.signup.username,
                            'password' : this.signup.password
                        })
                        .then((response) => {
                            if(response.data.message == "success") {
                                this.$router.push({ name: 'login'});
                            }
                            else {
                                1/0;    
                            }
                        })
                        .catch((error) => {
                            this.apiErr = error.response.data.message;
                            if(this.apiErr == undefined) {
                                this.apiErr = "Could not communicate with the server.";
                            }
                            this.showAlert();
                        });
                    } else {
                        this.apiErr = "The passwords do not match";
                        this.showAlert();
                    }
                },
                countDownChanged(dismissCountDown) {
                    this.dismissCountDown = dismissCountDown
                },
                showAlert() {
                    this.dismissCountDown = this.dismissSecs
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
    .login-con {
        border: 1px solid #000; 
    }
    .login-logo {
        padding-top: 1rem;
    }
    .card {
        padding-bottom: 0% !important;
    }
    .pad-down {
        padding-bottom: 2rem;
    }
    .alert {
        margin: 1rem 0rem;
    }
    .form {
        text-align: left;
    }
</style>
