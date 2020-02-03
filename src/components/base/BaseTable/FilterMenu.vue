<template>
	<div class="filter-menu">
		<base-icon icon="filter_list" source="material" class="ml--md mr--md" />
		<base-select
			close-on-select
			label="Filter hinzufügen"
			:multiple="true"
			placeholder="Filter hinzufügen"
			:options="filterOptions"
			option-label="label"
			:taggable="true"
			:tag-placeholder="`Volltextsuche`"
			track-by="label"
			:value="selectedFilters"
			@remove="removeFilter"
			@select="openFilterModal"
			@tag="setSearch"
		>
			<template v-slot:tag="slotProps">
				<span class="multiselect__tag">
					<span @mousedown.prevent="openFilterModal(slotProps.option)">
						{{ slotProps.option.tagLabel }}
					</span>
					<i
						aria-hidden="true"
						tabindex="0"
						class="multiselect__tag-icon"
						@keypress.enter.prevent="removeFilter(slotProps.option)"
						@mousedown.prevent="removeFilter(slotProps.option)"
					></i>
				</span>
			</template>
		</base-select>

		<filter-modal
			:active.sync="filterModalActive"
			:filter-opened="filterOpened"
			@set-filter="setFilter"
		/>
	</div>
</template>

<script>
import FilterModal from "./FilterModal.vue";
import { supportedFilterMatchingTypes, defaultMatchingTypes, filterImplementations } from "./defaultFilters";

export default {
	components: {
		FilterModal,
	},
	props: {
		columns: {
			type: Array,
			required: true
		},
	},
	data() {
		return {
			filterModalActive: false,
			filterOpened: {},
			selectedFilters: [],
		};
	},
	computed: {
		filterOptions: function(){
			const filters = [];
			const filterableColumns = this.columns.filter(column => column.filterable);
			filterableColumns.forEach(column => {
				const defaultMatchingType = defaultMatchingTypes[column.type];
				filters.push({
					label: column.label,
					type: column.type,
					property: column.field,
					matchingType: defaultMatchingType? supportedFilterMatchingTypes[column.type][defaultMatchingType] : {},
				})
			})
			return filters;
		},
		filterMethod: function() {
			const activeFilters = this.selectedFilters;

			return (row) => {
				return activeFilters.every(filter => {
					if (filter.type === "fulltextSearch") {
						return filterImplementations["fulltextSearch"](row, filter.value);
					}
					if (filter.type === "select") {
						return filterImplementations["select"](row[filter.property], filter.value);
					}
					const filterImplementation = filterImplementations[filter.type][filter.matchingType.value];
					return filterImplementation(row[filter.property], filter.value);
				})
			};
		}
	},
	watch: {
		selectedFilters() {
			this.$emit("set-filter", this.filterMethod);
		}
	},
	methods: {
		openFilterModal(filter) {
			this.filterModalActive = true;
			this.filterOpened = filter;
		},
		setSearch(searchString) {
			const fulltextSearchQuery = this.selectedFilters.find(
				(filter) => filter.label === "Volltextsuche"
			);
			if (fulltextSearchQuery) {
				fulltextSearchQuery.value = searchString;
				fulltextSearchQuery.tagLabel = `Volltextsuche nach: ${searchString}`;
			} else {
				this.setFilter({
					label: "Volltextsuche",
					tagLabel: `Volltextsuche nach: ${searchString}`,
					type: "fulltextSearch",
					value: searchString,
				});
			}
		},
		removeFilter(filter) {
			this.selectedFilters.splice(this.selectedFilters.indexOf(filter), 1);
		},
		setTagLabel(filter) {
			if (["number", "text"].includes(filter.type)) {
				filter.tagLabel = `${filter.label} ${filter.matchingType.label} ${filter.value}`;
			} else if (filter.type === "date") {
				const dateString = new Date(filter.value).toLocaleDateString("de-DE", {
					day: "2-digit",
					month: "2-digit",
					year: "numeric",
				});
				filter.tagLabel = `${filter.label} ${filter.matchingType.label} ${dateString}`;
			} else if (filter.type === "fulltextSearch") {
				filter.tagLabel = `${filter.label} nach: ${filter.value}`;
			} else if (filter.type === "select") {
				filter.tagLabel = filter.label + ": ";
				let activeOptions = filter.value.filter((f) => f.checked);
				activeOptions = activeOptions.map((f) => f.label);
				filter.tagLabel += activeOptions.join(", ");
			}
		},
		setFilter(filterData) {
			const isNewFilter = !this.selectedFilters.some(
				(f) => f.label === filterData.label
			);
			const filter = isNewFilter
				? JSON.parse(JSON.stringify(filterData))
				: filterData;

			this.setTagLabel(filter);

			if (isNewFilter) {
				this.selectedFilters.push(filter);
			} else {
				this.selectedFilters = this.selectedFilters.map((f) => {
					if (f.label === filter.label) {
						f.value = filter.value;
					}
					return f;
				});
			}
			this.filterOpened = {};
			this.filterModalActive = false;
		},
	},
};
</script>

<style lang="scss" scoped>
.filter-menu {
	display: flex;
	flex-flow: row;
	align-items: center;
	.wrapper {
		margin-bottom: 0;
	}
}
</style>
