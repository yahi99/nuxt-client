import { getNestedObjectValues } from "@utils/helpers";

export const supportedFilterTypes = [
	"date",
	"fulltextSearch",
	"number",
	"select",
	"text",
];

export const defaultMatchingTypes = {
	date: "equal",
	number: "equal",
	text: "contains",
};

export const supportedFilterMatchingTypes = {
	date: {
		equal: {
			value: "equal",
			label: "ist",
		},
		before: {
			value: "before",
			label: "vor dem",
		},
		after: {
			value: "after",
			label: "nach dem",
		},
	},
	number: {
		equal: {
			value: "equal",
			label: "=",
		},
		greater: {
			value: "greater",
			label: ">",
		},
		less: {
			value: "less",
			label: "<",
		},
		greaterEqual: {
			value: "greaterEqual",
			label: "≥",
		},
		lessEqual: {
			value: "lessEqual",
			label: "≤",
		},
	},
	text: {
		equals: {
			value: "equals",
			label: "ist gleich",
		},
		contains: {
			value: "contains",
			label: "enthält",
		},
	},
};

export const filterImplementations = {
	date: {
		equal: (value, targetValue) => {
			return new Date(value).getTime() === new Date(targetValue).getTime();
		},
		before: (value, targetValue) => {
			return new Date(value) <= new Date(targetValue);
		},
		after: (value, targetValue) => {
			return new Date(value) >= new Date(targetValue);
		},
	},
	fulltextSearch: (row, targetValue) => {
		return getNestedObjectValues(row).some((value) =>
			(value.toString() || "").includes(targetValue)
		);
	},
	number: {
		equal: (value, targetValue) => {
			return Number(value) === Number(targetValue);
		},
		greater: (value, targetValue) => {
			return Number(value) > Number(targetValue);
		},
		less: (value, targetValue) => {
			return Number(value) < Number(targetValue);
		},
		greaterEqual: (value, targetValue) => {
			return Number(value) >= Number(targetValue);
		},
		lessEqual: (value, targetValue) => {
			return Number(value) <= Number(targetValue);
		},
	},
	select: (value, targetValue) => {
		return targetValue.some((option) => {
			return (
				option.checked &&
				option.value &&
				option.value.toString() === (value || "").toString()
			);
		});
	},
	text: {
		contains: (value, targetValue) => {
			return (value || "")
				.toString()
				.toString()
				.toLowerCase()
				.includes(targetValue.toString().toLowerCase());
		},
		equals: (value, targetValue) => {
			return (
				(value || "").toString().toLowerCase() ===
				targetValue.toString().toLowerCase()
			);
		},
	},
};
