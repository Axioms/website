<template>
	<div class="grade">
		<b-form @change="updateRecord">
			<b-row>
				<b-col :cols="type ? 3:1">
				</b-col>
				<b-col>
					<b-form-group description="Assignment Name" invalid-feedback="A valid Name is required" :state="$v.gradeObj.name.$dirty ? !$v.gradeObj.name.$error : null">
						<b-form-input v-model="$v.gradeObj.name.$model" :state="$v.gradeObj.name.$dirty ? !$v.gradeObj.name.$error : null" placeholder="name"></b-form-input>
					</b-form-group>
				</b-col>
				<b-col v-if="type == 1">
					<b-form-group description="Points" :state="$v.gradeObj.points.$dirty ? !$v.gradeObj.points.$error : null" invalid-feedback="A valid number is required">
						<b-form-input v-model.number="$v.gradeObj.points.$model" type="number" placeholder="points" :state="$v.gradeObj.points.$dirty ? !$v.gradeObj.points.$error : null"></b-form-input>
					</b-form-group>
				</b-col>
				<b-col v-else>
					<b-form-group description="Score" :state="$v.gradeObj.grade.$dirty ? !$v.gradeObj.grade.$error : null" invalid-feedback="A valid number is required">
						<b-input-group append="%">
							<b-form-input v-model.number="$v.gradeObj.grade.$model" type="number" placeholder="grade" :state="$v.gradeObj.grade.$dirty ? !$v.gradeObj.grade.$error : null"></b-form-input>
						</b-input-group>
					</b-form-group>
				</b-col>
				<b-col v-if="type == 0">
					<b-form-group description="Weight" :state="$v.gradeObj.weight.$dirty ? !$v.gradeObj.weight.$error : null" invalid-feedback="A valid number is required">
						<b-input-group append="%">
							<b-form-input v-model.number="$v.gradeObj.weight.$model" type="number" placeholder="grade weight" :state="$v.gradeObj.weight.$dirty ? !$v.gradeObj.weight.$error : null"></b-form-input>
						</b-input-group>
					</b-form-group>
				</b-col>
				<b-col cols="1">
					<div class="addDrop m-1" @click="$emit('addGrade', index)">
						<p class="mb-0">
							<font-awesome-icon :icon="['fas','plus']" />
						</p>
					</div>
					<div class="addDrop m-1" @click="$emit('deleteGrade', index)">
						<p class="mb-0">
							<font-awesome-icon :icon="['fas','minus']" />
						</p>
					</div>
				</b-col>
			</b-row>
		</b-form>
	</div>
</template>

<script>
	import { validationMixin } from 'vuelidate';
	import { required, minLength, numeric, minValue, maxValue } from 'vuelidate/lib/validators';
	export default {
		name: 'Grade',
		mixins: [validationMixin],
		props: {
			gradeObj: {
				type: Object,
				required: true
			},
			index: {
				type: Number,
				required: true
			},
			type: {
				type: Number,
				required: true
			}
		},
		data() {
			return {

			}
		},
		methods: {
			updateRecord() {
				if(!this.$v.$invalid) {
					this.$emit("updateGrades");
				}
			}
		},
		validations: {
			gradeObj: {
				name: {
					required,
					minLength: minLength(1)
				},
				grade: {
					required,
					numeric,
					minValue: minValue(0)
				},
				points: {
					required,
					numeric,
					minValue: minValue(0)
				},
				weight: {
					required,
					numeric,
					minValue: minValue(0),
					maxValue: maxValue(100)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.addDrop {
		color: #cacdd1;
	}
	.addDrop:hover {
		color: #007bff;
		cursor: pointer;
	}
	.input-group-text {
		background-color: rgba(0,0,0,0) !important;
	}
</style>