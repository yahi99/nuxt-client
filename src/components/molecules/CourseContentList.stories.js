import { storiesOf } from "@storybook/vue";

import CourseContentList from "./CourseContentList";

storiesOf("Molecules/CourseContentList", module).add("default", () => ({
	components: { CourseContentList },
	template: `<CourseContentList />`,
	data: () => ({}),
}));
