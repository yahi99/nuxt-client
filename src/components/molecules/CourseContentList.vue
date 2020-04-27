<template>
	<div class="course-content-container">
		<course-content-item
			v-for="courseItem in courseContent"
			:key="courseItem.id"
			v-bind="$attrs.course"
			:course-item="courseItem"
		></course-content-item>
	</div>
</template>
<script>
import CourseContentItem from "@components/molecules/CourseContentItem";

export default {
	components: {
		CourseContentItem,
	},
	inheritAttrs: false,
	props: {
		courseContent: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {};
	},
};
</script>

<style lang="scss" scoped>
.course-content-container {
	display: flex;
	flex-flow: column;
	justify-content: space-between;
}
</style>
