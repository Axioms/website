<template>
  <div class="gradeCalc">
    <b-container>
      <div class="card">

        <div class="card-header shadow rounded-top">
          <div>
            <b-nav fill tabs>
              <div class="holder-div" v-if="gradebook !== null || gradebook !== undefined || gradebook !== []">
                <b-nav-item v-for="(classes, index) in gradebook" v-bind:index="index" :key="classes.id" v-on:click="currentPage = index" :active="currentPage == index">
                  {{ classes.name }}
                  <span class="editIcon" v-on:dblclick="changeClassName(classes.id, index)" >
                    <font-awesome-icon :icon="['far','edit']" />
                  </span>
                </b-nav-item>
              </div>
              <b-nav-item v-on:click="createClass()" id="add-btn"><font-awesome-icon :icon="['fas','plus-circle']" /></b-nav-item>
            </b-nav>
          </div>
        </div>
        <div class="card-body shadow bg-white rounded-bottom">
          <div>
            <!-- Class View -->
            <div v-for="(classes, index) in gradebook" :key="classes.id">
              <div v-if="currentPage == index">
                <Class :classObj="classes" :index="index" :names="listNames" v-on:delete="classDelete" v-on:updateType="classChangeType" v-on:updateScale="classChangeScale" v-on:updateName="classUpdateName"></Class>
              </div>
            </div>
          </div>
        </div>
      </div>
     <div v-if="this.$store.state.JWT == ''">
				<b-row>
					<b-col class="alert">
						<b-alert show variant="danger" dismissible fade> You need to be signed in to save data </b-alert>
					</b-col>
				</b-row>
			</div>
    </b-container>
    <!-- change Class name -->
    <b-modal id="changeClassName" ref="changeClassName" title="Submit Your Name" @show="resetModal" centered @ok="handleOk" >
      <form ref="form" @submit.stop.prevent="SubmitName">
        <b-form-group :state="$v.className.$dirty ? !$v.className.$error : null" invalid-feedback="A valid class name is required">
          <b-form-input id="name-input" v-model="$v.className.$model" :state="$v.className.$dirty ? !$v.className.$error : null" placeholder="Class name" required ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
    <!-- Create Class -->
    <b-modal id="createClass" ref="createClass" title="Submit A Class" @show="resetModal()" centered @ok="newClassMethod" >
      <b-form ref="form" v-on:submit.stop.prevent="SubmitName">
        <b-form-group :state="$v.newClass.name.$dirty ? !$v.newClass.name.$error : null" invalid-feedback="A valid Name is required">
          <b-form-input id="name-input" :state="$v.newClass.name.$dirty ? !$v.newClass.name.$error : null" v-model="$v.newClass.name.$model" placeholder="Class name" required ></b-form-input>
        </b-form-group>
        <b-form-checkbox v-model="newClass.type" name="check-button" class="user-select-none" size="md" switch>
          Grading System <b>({{ newClass.type ? "Point Based Grading" : "Percentage Grading" }})</b>
        </b-form-checkbox>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate';
  import { required, minLength } from 'vuelidate/lib/validators';
  import Class from '@/components/gradeCalc/class.vue';

  function isNameAvalible() {
		for(var i=0; i < this.listNames.length; i++) {
			if(this.newClass.name == this.listNames[i]) {
				return false;
			}
		}
		return true;
	}
  export default {
    mixins: [validationMixin],
    data() {
      return {  
        currentPage: 0,
        id: null,
        index: null,
        className: '',
        classNameState: null,
        gradebook: [],
        newClass: {
          name: '',
          type: false
        },
        createClassError: false,
        nameAvailable: false
      }
    },
    methods: { 
      checkFormValidity() {
        var isValid = false;
        if(!this.$v.className.$invalid) {
          isValid = true;

          for(var  i=0; i < this.gradebook.length; i++) {
            if(this.gradebook[i].name == this.className)
              isValid = false;
          }
        }
        return isValid;
      },
      SubmitName() {
        if (!this.checkFormValidity()) {
          return
        }
        //this.submittedNames.push(this.name)
        this.$nextTick(() => {
          this.changeName();
          this.$refs.changeClassName.hide();
        })
      },
      resetModal() {
        this.className = '';
        this.classNameState = null;
        this.newClass.name = '',
        this.newClass.type = false;
        this.$nextTick(() => { this.$v.$reset(); });
      },
      handleOk(bvModalEvt) {
        bvModalEvt.preventDefault();
        this.SubmitName();
      },
      changeClassName(id, index) {
        this.id = id;
        this.index = index;
        this.$refs['changeClassName'].show();
      },
      classUpdateName(vars) {
        this.id = vars.id;
        this.className = vars.name;
        this.index = vars.index;
        this.changeName();
      },
      addClass() {
        if(!this.$store.state.JWT == '') {
          this.$axios.defaults.headers.common['Authorization'] = 'Bearer' + ' ' + this.$store.getters.jwt;

          this.$axios.post(process.env.VUE_APP_API_ADD + '/grades/create.php', {"name": this.newClass.name, "type": this.newClass.type ? 1:0})
          .then(() => {
            this.gradebook.push({"name": this.newClass.name, "type": this.newClass.type ? 1:0, "scale":[{"letterGrade": "A","min": 0,"max": 0},{"letterGrade": "B","min": 0,"max": 0},{"letterGrade": "C","min": 0,"max": 0},{"letterGrade": "D","min": 0,"max": 0},{"letterGrade": "F","min": 0,"max": 0}],"grades": [{"name": "", "grade": 0, "points": 0, "weight": 0}]});
            this.resetModal();
          })
          .catch((error) => {
            if (error.response.data.message == "Invalid Token") {
              this.$root.$bvToast.toast("User has been logged out", {
                title: "Error!",
                toaster: 'b-toaster-top-left',
                autoHideDelay: 5000,
                variant: "danger",
                solid: false,
                appendToast: false
              });
              this.$store.commit('setJWT', "");
              this.$router.push("/?loggedout=true");
            }
            else {
              this.$bvToast.toast("Error communicating with the server", {
                title: "Error!",
                toaster: 'b-toaster-top-left',
                autoHideDelay: 5000,
                variant: "danger",
                solid: false,
                appendToast: false
              });
            }
          });
        }
        else {
          this.gradebook.push({"name": this.newClass.name, "type": this.newClass.type ? 1:0, "scale":[{"letterGrade": "A","min": 0,"max": 0},{"letterGrade": "B","min": 0,"max": 0},{"letterGrade": "C","min": 0,"max": 0},{"letterGrade": "D","min": 0,"max": 0},{"letterGrade": "F","min": 0,"max": 0}],"grades": [{"name": "", "grade": 0, "points": 0, "weight": 0}]});
        }
      },
      changeName() {
        if(!this.$store.state.JWT == '') {
          this.$axios.defaults.headers.common['Authorization'] = 'Bearer' + ' ' + this.$store.getters.jwt;
          this.$axios.post(process.env.VUE_APP_API_ADD + '/grades/updateName.php', {"name": this.className, "id": this.id})
          .then(() => {
            this.gradebook[this.index].name = this.className;
            this.className = '';
            this.classNameState = null;
            this.id = null;
            this.index = null;
            this.resetModal();
          })
          .catch((error) => {
            if (error.response.data.message == "Invalid Token") {
              this.$root.$bvToast.toast("User has been logged out", {
                title: "Error!",
                toaster: 'b-toaster-top-left',
                autoHideDelay: 5000,
                variant: "danger",
                solid: false,
                appendToast: false
              });
              this.$store.commit('setJWT', "");
              this.$router.push("/?loggedout=true");
            }
            else {
              this.$bvToast.toast("Error communicating with the server", {
                title: "Error!",
                toaster: 'b-toaster-top-left',
                autoHideDelay: 5000,
                variant: "danger",
                solid: false,
                appendToast: false
              });
            }
          });
        }
        else {
          this.gradebook[this.index].name = this.className;
            this.className = '';
            this.classNameState = null;
            this.id = null;
            this.index = null;
            this.resetModal();
        }
      },
      createClass() {
        this.$refs['createClass'].show();
      },
      newClassMethod(bvModalEvt) {
        bvModalEvt.preventDefault();
        if(!this.$v.newClass.$invalid) {
          var isValid = true;
          for(var  i=0; i < this.gradebook.length; i++) {
            if(this.gradebook[i].name == this.newClass.name)
              isValid = false;
          }

          if(isValid) {
            this.$nextTick(() => {
              this.addClass();
              this.$refs.createClass.hide();
              this.createClassError = false;
            })
            
          }
          else {
            this.nameAvailable = true;
          }
        }
        else {
          this.createClassError = true;
        }
      },
      classChangeName(obj) {
        this.classNameState = obj.name;
        this.id = obj.id;
        this.index = obj.index;
        this.changeName();
      },
      classChangeScale(obj) {
        obj.scale = JSON.parse(JSON.stringify(obj.scale));
        if(!this.$store.state.JWT == '') {
          this.$axios.defaults.headers.common['Authorization'] = 'Bearer' + ' ' + this.$store.getters.jwt;

          this.$axios.post(process.env.VUE_APP_API_ADD + '/grades/updateScale.php', {"name": obj.name, "scale": obj.scale})
          .then(() => {
            this.gradebook[obj.index].scale = obj.scale;
          })
          .catch((error) => {
            if (error.response.data.message == "Invalid Token") {
              this.$root.$bvToast.toast("User has been logged out", {
                title: "Error!",
                toaster: 'b-toaster-top-left',
                autoHideDelay: 5000,
                variant: "danger",
                solid: false,
                appendToast: false
              });
              this.$store.commit('setJWT', "");
              this.$router.push("/?loggedout=true");
            }
          });
        }
        else {
          this.gradebook[obj.index].scale = obj.scale;
          this.resetModal();
        }
      },
      classChangeType(obj) {
        if(!this.$store.state.JWT == '') {
          this.$axios.defaults.headers.common['Authorization'] = 'Bearer' + ' ' + this.$store.getters.jwt;
          this.$axios.post(process.env.VUE_APP_API_ADD + '/grades/updateType.php', {"name": obj.name, "type": obj.type ? 1:0})
          .then(() => {
            this.gradebook[obj.index].type = obj.type ? 1:0;
          })
          .catch((error) => {
            if (error.response.data.message == "Invalid Token") {
              this.$root.$bvToast.toast("User has been logged out", {
                title: "Error!",
                toaster: 'b-toaster-top-left',
                autoHideDelay: 5000,
                variant: "danger",
                solid: false,
                appendToast: false
              });
              this.$store.commit('setJWT', "");
              this.$router.push("/?loggedout=true");
            }
            else {
              this.$bvToast.toast("Error communicating with the server", {
                title: "Error!",
                toaster: 'b-toaster-top-left',
                autoHideDelay: 5000,
                variant: "danger",
                solid: false,
                appendToast: false
              });
            }
          });
        }
        else {
          this.gradebook[obj.index].type = obj.type ? 1:0;
          this.resetModal();
        }
      },
      classDelete(obj) {
        if(!this.$store.state.JWT == '') {
          this.$axios.defaults.headers.common['Authorization'] = 'Bearer' + ' ' + this.$store.getters.jwt;
          this.$axios.post(process.env.VUE_APP_API_ADD + '/grades/delete.php', {"name": obj.name})
          .then(() => {
            this.gradebook.splice(obj.index,1);
            this.currentPage = -1;
          })
          .catch((error) => {
            if (error.response.data.message == "Invalid Token") {
              this.$root.$bvToast.toast("User has been logged out", {
                title: "Error!",
                toaster: 'b-toaster-top-left',
                autoHideDelay: 5000,
                variant: "danger",
                solid: false,
                appendToast: false
              });
              this.$store.commit('setJWT', "");
              this.$router.push("/?loggedout=true");
            }
            else {
              this.$bvToast.toast("Error communicating with the server", {
                title: "Error!",
                toaster: 'b-toaster-top-left',
                autoHideDelay: 5000,
                variant: "danger",
                solid: false,
                appendToast: false
              });
            }
          });
        }
        else {
          this.gradebook.splice(obj.index,1);
          this.currentPage = -1;
          this.resetModal();
        }
      }
    },
    validations: {
      className: {
        required,
        minLength: minLength(4)
      },
      newClass: {
        name: {
          required,
          minLength: minLength(4),
          isNameAvalible
        }
      }
    },
    components: {
      Class
    },
    created: function() {
      if (!this.$store.state.JWT == '') {
        this.$axios.defaults.headers.common['Authorization'] = 'Bearer' + ' ' + this.$store.getters.jwt;

        this.$axios.post(process.env.VUE_APP_API_ADD + '/grades/read.php', {})
        .then((response) => {
          this.gradebook = response.data.message.gradebook;
          this.$bvToast.toast("connected to the server!", {
            title: "connected!",
            toaster: 'b-toaster-top-left',
            autoHideDelay: 1000,
            variant: "success",
            solid: false,
            appendToast: false
          })})
        .catch((error) => {
          if (error.response.data.message == "Invalid Token") {
            this.$root.$bvToast.toast("User has been logged out", {
              title: "Error!",
              toaster: 'b-toaster-top-left',
              autoHideDelay: 5000,
              variant: "danger",
              solid: false,
              appendToast: false
            });
            this.$store.commit('setJWT', "");
            this.$router.push("/?loggedout=true");
          }
          else if(error.response.data.message == "No classes yet") {
            this.resetModal();
          }
          else {
            this.$bvToast.toast("Error communicating with the server", {
              title: "Error!",
              toaster: 'b-toaster-top-left',
              autoHideDelay: 5000,
              variant: "danger",
              solid: false,
              appendToast: false
            });
          }
        });
      }
    },
    computed: {
      listNames() {
        var names = [];
        for(var  i=0; i < this.gradebook.length; i++) {
          names.push(this.gradebook[i].name);
        }
        return names;
      }
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
  .holder-div {
    display: contents;
  }
  .editIcon {
    color: #cacdd1;
  }
  .editIcon:hover {
    color: #22365c;
  }
  .user-select-none { 
    user-select: none; 
  }
</style>