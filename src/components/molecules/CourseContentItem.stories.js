import { storiesOf } from "@storybook/vue";

import notes from "./CourseContentItem.md";
import CourseContentItem from "./CourseContentItem";

storiesOf("Molecules/CourseContentItem", module)
	.addParameters({
		notes,
	})
	.add("default", () => ({
		components: { CourseContentItem },
		template: `<CourseContentItem />`,
		data: () => ({}),
	}));
