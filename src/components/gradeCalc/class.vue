<template>
	<div class="class">
		<div class="pb-4 pt-4">
			<p class="display-5 text-center"> {{ getLetterGrade }} </p>
		</div>

		<div v-for="(grade, index) in classObj.grades" :key="grade.id">
			<Grade :gradeObj="grade" :index="index" :type="classObj.type" @addGrade="addGrade" @deleteGrade="deleteGrade" @updateGrades="updateGrades"></Grade>
		</div>
		
		<div class="float-left settings" v-on:click="addToEnd">
			<p class="mb-0"><font-awesome-icon :icon="['fas','plus']" size="lg"/></p>
		</div>
		
		<div class="float-right settings" v-on:click="openSettings(classObj)">
			<p class="mb-0"><font-awesome-icon :icon="['fas','cog']" size="lg"/></p>
		</div>

		<!-- Settings -->
		<b-modal id="settings" ref="settings" title="Settings" @show="resetForm" @hidden="resetModal" centered @ok="handleOk" >
			<b-form >
				<!-- Name Change -->
				<b-row class="pb-2 pt-2">
					<b-col>
						<p class="display-5 border-bottom pb-2 text-center">Change Name</p>
					</b-col>
				</b-row>
				<b-row>
					<b-col>
						<b-form-group :state="$v.settings.name.$dirty ? !$v.settings.name.$error : null" invalid-feedback="A valid class name is required">
							<b-form-input id="name-input" placeholder="Class name" :state="$v.settings.name.$dirty ? !$v.settings.name.$error : null" v-model="$v.settings.name.$model" required></b-form-input>
						</b-form-group>
					</b-col>
				</b-row>
				<!-- Name Change End -->
				<!-- Grade Scale Name -->
				<b-row class="pb-2 pt-2">
					<b-col>
						<p class="display-5 border-bottom pb-2 text-center">Grading Scale</p>
					</b-col>
				</b-row>
				<!-- Grade Scale -->
				<b-row v-for="(v, index) in $v.settings.scale.$each.$iter" :key="index">
					<!-- A,B,C,D -->
					<b-col cols="2"></b-col>
					<b-col v-if="classObj.scale[index].letterGrade != 'F'">
						<b-form-group :label="classObj.scale[index].letterGrade" label-cols="1" invalid-feedback="A valid Name is required" :state="v.min.$dirty ? !v.min.$error : null">								
							<b-input-group :append="settings.type ? '' : '%'">
								<b-input-group-text slot="prepend"><span class="text-primary"><font-awesome-icon :icon="['fas','greater-than-equal']" /></span></b-input-group-text>
								<b-form-input class="d-inline" type="number" :placeholder="settings.type ? 'Points' : 'Percentage'" :state="v.min.$dirty ? !v.min.$error : null" v-model.number="v.min.$model" required></b-form-input>
							</b-input-group>
						</b-form-group>
					</b-col>
					<b-col cols="2" v-if="classObj.scale[index].letterGrade != 'F'"></b-col>
					<!-- F-->
					<b-col v-if="classObj.scale[index].letterGrade == 'F'">
						<b-form-group invalid-feedback="A valid number is required" :label="classObj.scale[index].letterGrade" label-cols="1" :state="v.max.$dirty ? !v.max.$error : null">
							<b-input-group :append="settings.type ? '' : '%'">
								<b-input-group-text slot="prepend"><span class="text-primary"><font-awesome-icon :icon="['fas','less-than']" /></span></b-input-group-text>
								<b-form-input class="d-inline" type="number" :placeholder="settings.type ? 'Points' : 'Percentage'" :state="v.max.$dirty ? !v.max.$error : null" v-model.number="v.max.$model" required></b-form-input>
							</b-input-group>
						</b-form-group>
					</b-col>
					<b-col cols="2" v-if="classObj.scale[index].letterGrade == 'F'"></b-col>
				</b-row>
				<!-- Grade Scale END -->
				<!-- Grading System -->
				<!-- Grade System name -->
				<b-row class="pb-2 pt-2">
					<b-col>
						<p class="display-5 border-bottom pb-2 text-center">Grading System</p>
					</b-col>
				</b-row>
				<b-row>
					<b-col>
						<b-form-group>
							<b-form-checkbox name="check-button" v-model.number="settings.type" class="user-select-none" size="md" switch>
								Grading System <b>({{ settings.type ? "Point Based Grading" : "Percentage Grading" }})</b>
							</b-form-checkbox>
						</b-form-group>
					</b-col>
				</b-row>
				<!-- Grading System END -->
				<!-- Delete -->
				<b-row class="pb-2 pt-2">
					<b-col>
						<p class="display-5 border-bottom pb-2 text-center">Delete Class</p>
					</b-col>
				</b-row>
				<b-row>
					<b-col class="text-center">
						<b-button :pressed.sync="showDeleteConf" variant="outline-danger">Delete</b-button>
					</b-col>
				</b-row>
				<b-row v-if="showDeleteConf" class="pt-3">
					<b-col class="text-center">
						<b-button v-on:click="$emit('delete', {'name':classObj.name, 'index': index})" variant="outline-danger">Are you Sure?</b-button>
					</b-col>
				</b-row>
				<!-- Delete End -->
			</b-form>
		</b-modal>
	</div>
</template>

<script>
  import Grade from '@/components/gradeCalc/grade.vue';
	import { validationMixin } from 'vuelidate';
	import { required, minValue, integer, minLength } from 'vuelidate/lib/validators';
	var timeSinceLastUpdate = new Date();
	function hasBeenMoreThanASecond() {
		var now = new Date();
		if(Math.abs(timeSinceLastUpdate.getSeconds() - now.getSeconds()) >= 1) {
			timeSinceLastUpdate = new Date();
			
			return true;
		}
		return false;
	}
	
	export default {
		mixins: [validationMixin],
		name: 'Class',
		props: {
			classObj: {
				type: Object,
				required: true
			},
			index: {
				type: Number,
				required: true
			},
			names: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				settings: {
					scale: [],
					name: '',
					type: null,
					index: null
				},
				showDeleteConf: false
			}
		},
		methods: {
			openSettings(classStuff) {
				var classes = JSON.parse(JSON.stringify(classStuff));
				this.settings.scale = classes.scale;
				this.settings.name = classes.name;
				this.settings.type = this.getType();
				this.settings.index = this.index;
				this.$refs['settings'].show();
			},
			handleOk(bvModalEvt) {
				bvModalEvt.preventDefault();
				if(!this.$v.settings.$invalid) {
					if(!this.$v.settings.scale.$invalid && this.hasScaleChanged()) {
						this.$emit("updateScale", {"index": this.index, "name": this.classObj.name, "scale": this.settings.scale, "id": this.classObj.id});
					}
					
					if((this.settings.type ? 1:0) != (this.classObj.type ? 1:0)) {
						this.$emit("updateType", {"index": this.index, "type": this.settings.type ? 1:0, "id": this.classObj.id, "name": this.classObj.name});
					}
					
					if(!this.$v.settings.name.$invalid && this.settings.name != this.classObj.name) {
						this.$emit("updateName", {"index": this.index, "name": this.settings.name, "id": this.classObj.id});
					}
					this.$nextTick(() => {
						this.$refs.settings.hide();
						this.$v.settings.$reset();
						this.resetModal();
					})
				}
			},
			resetModal() {
				this.settings.scale = [];
				this.settings.name = '';
				this.settings.type = this.getType();
				this.settings.index = null;
				this.$nextTick(() => { this.$v.settings.$reset(); })
			},
			resetForm() {
				this.$nextTick(() => { this.$v.settings.$reset(); })
			},
			getType() {
				return !!+this.classObj.type;
			},
			hasScaleChanged() {
				return (this.classObj.scale[0].min != this.settings.scale[0].min || this.classObj.scale[0].max != this.settings.scale[0].max || this.classObj.scale[1].min != this.settings.scale[1].min || this.classObj.scale[1].max != this.settings.scale[1].max || this.classObj.scale[2].min != this.settings.scale[2].min || this.classObj.scale[2].max != this.settings.scale[2].max || this.classObj.scale[3].min != this.settings.scale[3].min || this.classObj.scale[3].max != this.settings.scale[3].max || this.classObj.scale[4].min != this.settings.scale[4].min || this.classObj.scale[4].max != this.settings.scale[4].max);
			},
			addGrade(index) {
				this.classObj.grades.splice(index,0,{"name": "","grade": 0,"points": 0,"weight": 0});
			},
			deleteGrade(index) {
				this.classObj.grades.splice(index,1);
			},
			addToEnd() {
				this.classObj.grades.push({"name": "","grade": 0,"points": 0,"weight": 0});
			},
			updateGrades() {
				if(!this.$store.state.jwt == '' && hasBeenMoreThanASecond()) {
					this.$axios.defaults.headers.common['Authorization'] = 'Bearer' + ' ' + this.$store.getters.jwt;

					this.$axios.post(process.env.VUE_APP_API + '/grades/updateGrades', {"name": this.classObj.name, "grades": this.classObj.grades})
					.then(() => {
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
			},
			percentageGrade() {
				var grade = 0;
				var weights = 0;
				for(var i=0; i < this.classObj.grades.length; i++) {
					let weight = this.classObj.grades[i].weight / 100;
					grade += this.classObj.grades[i].grade * weight;
					weights += weight;
				}
				return Math.round(100* grade / weights) / 100;
			},
			pointGrade() {
				var points = 0;
				for(var i=0; i < this.classObj.grades.length; i++) {
					points += this.classObj.grades[i].points;
				}
				
				return points;
			}
		},
		validations: {
			settings: {
				scale: {
					$each: {
						min: {
							integer,
							minValue: minValue(0)
						},
						max: {
							integer,
							minValue: minValue(0)
						}			
					}
				},
				name: {
					minLength: minLength(4),
					uniquename(value) {
						let isValid = true;
						for(var  i=0; i < this.names.length; i++) {
							if(this.names[i] == value)
							isValid = false;
						}
						return isValid;
					},
				},
				type: {
					required
				}
			}
		},
		computed: {
			getLetterGrade() {
				var grades = {"grade": '', "letter": ''};
				var grade;
				if(this.classObj.type == 0) {
					grade = this.percentageGrade();
				}
				else {
					grade = this.pointGrade();
				}
				if(this.classObj.scale[0].min <= grade) {
					grades = {"grade": grade, "letter": "A"};
				}
					
				else if(this.classObj.scale[1].min <= grade) {
					grades = {"grade": grade, "letter": "B"};
				}

				else if(this.classObj.scale[2].min <= grade) {
					grades = {"grade": grade, "letter": "C"};
				}

				else if(this.classObj.scale[3].min <= grade) {
					grades = {"grade": grade, "letter": "D"};
				}

				else if(this.classObj.scale[4].max > grade) {
					grades = {"grade": grade, "letter": "F"};
				}
					
				else {
					grades = {"grade": '', "letter": ''};
				}

				if(grades.letter == '' || grades.grade == 0) {
					return '';
				}
				else {
					if(this.classObj.type == 0){
						return grades.letter + " (" + grades.grade + "%) "; 
					}
					else {
						return grades.letter + " (" + grades.grade + " points) ";
					}
				}
			}
		},
		components: {
			Grade
		},
		created: function() {
			this.settings.type = !!+this.classObj.type;
		}
	}
</script>

<style lang="scss" scoped>
	.settings {
		color: #cacdd1;
	}
	.settings:hover {
		color: #007bff;
		cursor: pointer;
	}
	.input-group-text {
		background-color: rgba(0,0,0,0) !important;
	}
	.display-5 {
		font-size: 2rem;
		font-weight: 300;
		line-height: 1.2;
	}
	.user-select-none { 
		user-select: none; 
	}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		/* display: none; <- Crashes Chrome on hover */
		-webkit-appearance: none;
		margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
	}

	input[type=number] {
		-moz-appearance:textfield; /* Firefox */
	}
</style>
