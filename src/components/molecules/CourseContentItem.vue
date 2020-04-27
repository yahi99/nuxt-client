<template>
	<div class="course-content-item-container">
		<div class="course-content">
			<div class="icon-wrapper" :style="background_style">
				<base-icon
					source="custom"
					:icon="getContentType() === 'homework' ? 'tasks' : 'empty-sheet'"
					:style="{ fontSize: 'var(--icon-size)' }"
					:fill="'red'"
				></base-icon>
			</div>
			<p v-if="getContentType() === 'lesson'">
				{{ courseItem.name }}
			</p>
			<div v-else class="homework-content-container">
				<p class="text-sm homework-date">Aufgabe bis {{ formatDate }}</p>
				<p>{{ courseItem.name }}</p>
			</div>
		</div>
		<fab-icon
			class="action"
			expand-direction="top"
			label-position="left"
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
		color: {
			type: String,
			default: "var(--color-tertiary)",
		},
		colorGradient: {
			type: String,
			required: false,
			default: "",
		},
	},
	data() {
		return {};
	},
	computed: {
		background_style() {
			if (this.colorGradient) {
				return (
					"background-image: linear-gradient(-225deg, " +
					this.color +
					" 0%, " +
					this.colorGradient +
					" 100%);"
				);
			} else {
				return "background-color: " + this.color + ";";
			}
		},
		formatDate() {
			return new Date(this.courseItem.dueDate).toLocaleDateString();
		},
	},
	methods: {
		getContentType() {
			return this.courseItem.type;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.course-content-item-container {
	--icon-size: 2em;
	--icon-padding: 3px;

	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: var(--space-xs);
	border-bottom: var(--border-width) solid var(--color-gray);
}

.course-content {
	display: flex;
	align-items: center;
}

p {
	margin: 0;
	margin-left: var(--space-xs);
}

.icon-wrapper {
	padding: var(--icon-padding);
	border-radius: var(--radius-xs);
}

.homework-date {
	color: var(--color-gray-dark);
}
</style>
