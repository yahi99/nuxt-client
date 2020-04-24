<template>
	<div>
		<course-content-item
			v-for="courseItem in courseContent"
			:key="courseItem.id"
			class="course-item"
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
@import "@styles";

.course-item {
	margin-bottom: var(--space-lg);
}
</style>
