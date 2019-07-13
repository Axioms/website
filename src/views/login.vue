<template>
    <div class="login">
        <b-container class="test">
            <b-card bg-variant="light" class="border">
                <h5 class="text-dark pad-down">Login</h5>
                <b-row>
                    <b-col cols="3"></b-col>
                    <b-col>
                        <b-form @submit.prevent="login()">
                            <b-form-group>
                                <b-form-input id="input-1" v-model="loginData.email" type="email" required placeholder="Email"></b-form-input>
                            </b-form-group>

                            <b-form-group>
                                <b-form-input id="input 2" v-model="loginData.password" type="password" required placeholder="Password"></b-form-input>
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
            loginData: {
                email: '',
                password: ''
            },
            apiErr: null,
            dismissSecs: 10,
            dismissCountDown: 0
        }
    },
    methods: {
        async login() {
            this.$axios.post(process.env.VUE_APP_API_ADD + '/auth/login.php', {
                'email' : this.loginData.email,
                'password' : this.loginData.password
            })
            .then((response) => {
                this.$store.commit('setJWT', response.data.token);
                if(this.$store.getters.jwtUser) {
                    this.$router.push({ name: 'home', query: { redirect: '/' } });
                } else {
                    this.$store.commit('setJWT', "");
                }
            })
            .catch((error) => {
                console.log(error);
                this.apiErr = error.response.data.message;
                this.showAlert();
            });
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown;
        },
        showAlert() {
            this.dismissCountDown = this.dismissSecs;
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