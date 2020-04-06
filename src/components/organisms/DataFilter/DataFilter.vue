<template>
	<div>
		<vue-filter-ui
			:filter="filters"
			:parser="parser"
			:query="activeFiltersProxy"
			:component-modal="DataFilterModal"
			:component-chips="DataFilterChips"
			:component-select="DataFilterSelect"
			@newQuery="setActiveFilters"
		/>
	</div>
</template>

<script>
import VueFilterUi, { parser } from "vue-filter-ui";
import feathersQueryGenerator from "./feathersQueryGenerator";
import {
	defaultFilters,
	supportedFilterTypes,
	supportedOperators,
} from "./defaultFilters";
import { unescape } from "lodash";
import DataFilterModal from "./DataFilterModal";
import DataFilterChips from "./DataFilterChips";
import DataFilterSelect from "./DataFilterSelect";

export default {
	components: {
		VueFilterUi,
	},
	props: {
		data: {
			type: Array,
			default: () => [],
		},
		backendFiltering: {
			type: Boolean,
		},
		filters: {
			type: Array,
			required: true,
		},
		activeFilters: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			DataFilterModal,
			DataFilterChips,
			DataFilterSelect,
			parser: parser.Default,
			localQuery: undefined,
			localActiveFilters: undefined,
		};
	},
	computed: {
		filteredData() {
			// ToDo implement filtering for other data types than strings
			if (!this.backendFiltering) {
				return this.data.filter((row) =>
					this.activeFiltersProxy.every((filter) => {
						if (!filter.type || !supportedFilterTypes.includes(filter.type)) {
							// comment in this line when different filter types are supported
							// return true;
						}
						if (
							filter.operator &&
							// replace this line when other filter types than text are supported
							// !supportedOperators[filter.type].includes(filter.operator)
							!supportedOperators["text"].includes(filter.operator)
						) {
							return true;
						}
						if (filter.applyNegated) {
							return !defaultFilters["text"][
								unescape(filter.operator) || "default"
							](row[filter.attribute].toString(), filter.value.toString());
						}
						return defaultFilters["text"][
							unescape(filter.operator) || "default"
						](row[filter.attribute].toString(), filter.value.toString());
					})
				);
			}
			return this.data;
		},
		activeFiltersProxy: {
			get() {
				return this.localActiveFilters || this.activeFilters;
			},
			set(to) {
				this.localActiveFilters = to;
				this.$emit("update:active-filters", to);
				if (!this.backendFiltering) {
					this.$emit("update:filtered-data", this.filteredData);
				} else {
					const feathersQuery = feathersQueryGenerator.generator(
						this.activeFilters
					);
					this.$emit("update:filter-query", feathersQuery);
				}
			},
		},
	},
	watch: {
		activeFilters(to) {
			this.activeFiltersProxy = to;
		},
	},
	methods: {
		setActiveFilters(newQuery) {
			this.activeFiltersProxy = newQuery;
		},
	},
};
</script>