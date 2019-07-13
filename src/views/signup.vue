<template>
    <div class="signup">
        <b-container class="test">
            <b-card bg-variant="light" class="border">
                <h5 class="text-dark pad-down">Sign up</h5>
                <b-row>
                    <b-col cols="3"></b-col>
                    <b-col>
                        <b-form @submit.prevent="register">
                            <b-form-group>
                                <b-form-input id="input-1" v-model="signup.email" type="email" required placeholder="Email"></b-form-input>
                            </b-form-group>

                            <b-form-group>
                                <b-form-input id="input-2" v-model="signup.username" type="text" required placeholder="Username"></b-form-input>
                            </b-form-group>

                            <b-form-group>
                                <b-form-input id="input 3" v-model="signup.password" type="password" required placeholder="Password"></b-form-input>
                            </b-form-group>

                            <b-form-group>
                                <b-form-input id="input 4" v-model="signup.passwordVar" type="password" required placeholder="Password Again"></b-form-input>
                            </b-form-group>

                            <b-button type="submit" variant="outline-primary">Submit</b-button>
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
export default {
    data() {
        return {
            signup: {
                email: '',
                username: '',
                password: '',
                passwordVar: ''
            },  
            apiErr: null,
            dismissSecs: 10,
            dismissCountDown: 0
        };
    },
    methods: {
           async register() {
                if(this.signup.password == this.signup.passwordVar) {console.log({
                        'email' : this.signup.email,
                        'username' : this.signup.username,
                        'password' : this.signup.password
                    });
                    this.$axios.post(process.env.VUE_APP_API_ADD + '/auth/register.php', {
                        'email' : this.signup.email,
                        'username' : this.signup.username,
                        'password' : this.signup.password
                    })
                    .then((response) => {
                        this.$store.commit('setJWT', response.data.token);
                        this.$router.push({ name: 'home', query: { redirect: '/' } });
                    })
                    .catch((error) => {
                        this.apiErr = error.response.data.message;
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
</style>
