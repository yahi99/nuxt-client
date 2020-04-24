<template>
	<div v-if="course">
		<section class="section">
			<base-breadcrumb :inputs="breadcrumbs" />
			<h1 class="h2">{{ course.name }}</h1>
			<course-content-list
				:course-content="homeworksList"
			></course-content-list>
		</section>
	</div>
	<div v-else>
		No Course data
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import CourseContentList from "@components/molecules/CourseContentList";

export default {
	components: {
		CourseContentList,
	},
	async asyncData({ store, params }) {
		return {
			lessons: await store.dispatch("lessons/find", {
				query: {
					courseId: params.id,
				},
			}),
			homeworks: await store.dispatch("homeworks/find", {
				query: {
					courseId: params.id,
				},
			}),
			courseGroups: await store.dispatch("course-groups/find", {
				query: {
					courseId: params.id,
				},
			}),
		};
	},
	computed: {
		...mapGetters("courses", { course: "current" }),
		...mapGetters("lessons", { lessonsList: "list" }),
		...mapGetters("homeworks", { homeworksList: "list" }),
		breadcrumbs() {
			return [
				{ text: "Kurse", to: { name: "courses" } },
				{
					text: this.course.name,
					to: { name: "courses-id", params: { id: this.course._id } },
				},
			];
		},
	},
	created(ctx) {
		this.getCourse(this.$route.params.id);
	},
	created() {
		console.log("Course: ");
		console.log(this.course);
	},
	methods: {
		getCourse(id) {
			this.$store.dispatch("courses/get", id);
		},
	},
};
</script>
