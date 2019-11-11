import { storiesOf } from "@storybook/vue";

import BaseGrid from "@components/base/BaseGrid";

storiesOf("Base|BaseGrid", module)
	.add("Default Grid", () => ({
		components: { BaseGrid },
		template: `
		<BaseGrid>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
		</BaseGrid>`,
	}))
	.add("Custom Column Width", () => ({
		components: { BaseGrid },
		template: `
		<BaseGrid column-width-rem="8">
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
		</BaseGrid>`,
	}));
