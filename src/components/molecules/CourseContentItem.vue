<template>
	<div class="course-content-item-container">
		<div class="course-content">
			<base-icon
				class="content-item"
				source="custom"
				icon="empty-sheet"
				style="font-size: 2em;"
			></base-icon>
			<div>{{ courseItem.name }}</div>
			<!-- <div>
				<h1 class="h6">{{ courseItem.name }}</h1>
			</div> -->
		</div>
		<fab-icon
			class="action"
			:expand-direction="expandDirection()"
			:label-position="labelPosition()"
		></fab-icon>
	</div>
</template>
<script>
import BaseIcon from "@components/base/BaseIcon";
import FabIcon from "@components/molecules/FabIcon";

export default {
	components: {
		BaseIcon,
		FabIcon,
	},
	props: {
		courseItem: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {};
	},
	mounted() {
		console.log(this.courseItem);
	},
	methods: {
		expandDirection() {
			return "top";
		},
		labelPosition() {
			return "left";
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.course-content-item-container {
	display: flex;
	align-items: center;
	justify-content: center;

	.course-content {
		display: flex;
		flex: 3;
		align-items: center;

		div {
			margin-left: var(--space-xs);
		}
	}

	.action {
		flex: 1;
	}
}
</style>
