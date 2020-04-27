<template>
	<div v-if="course">
		<section class="section">
			<base-breadcrumb :inputs="breadcrumbs" />
			<div class="course-header">
				<h1 class="h2">{{ course.name }}</h1>
				<fab-icon
					:actions="[
						{
							label: 'Dummy Label',
							icon: 'person_add',
							'icon-source': 'material',
							to: '/courses',
						},
					]"
				></fab-icon>
			</div>
			<course-content-list
				:course-content="mergeCourseContent"
				:course="course"
			></course-content-list>
		</section>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import CourseContentList from "@components/molecules/CourseContentList";
import FabIcon from "@components/molecules/FabIcon";

export default {
	components: {
		CourseContentList,
		FabIcon,
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
		mergeCourseContent() {
			this.lessonsList.forEach((lesson) => (lesson.type = "lesson"));
			this.homeworksList.forEach((homework) => (homework.type = "homework"));
			return [...this.lessonsList, ...this.homeworksList];
		},
	},
	created(ctx) {
		this.getCourse(this.$route.params.id);
	},
	methods: {
		getCourse(id) {
			this.$store.dispatch("courses/get", id);
		},
	},
};
</script>

<style lang="scss" scoped>
.course-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: var(--space-xl-2);
}

h1 {
	margin: 0;
}
</style>
