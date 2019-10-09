<template>
	<div>
		<base-button class="create-news-btn" design="primary" @click="$router.push({ name: 'news-new' })">
			Artikel anlegen
		</base-button>

		<div class="view-toggles">
			<!-- TODO: Find correct Icons! and show correct one on active -->
			<base-button design="primary icon text" @click="toDisplayStyle('grid')">
				<base-icon source="material" icon="view_column" fill="gray" />
			</base-button>
			<base-button design="primary icon text" @click="toDisplayStyle('list')">
				<!-- TODO: Change for correct icons -->
				<base-icon
					v-if="isList"
					source="material"
					icon="view_list"
					fill="gray"
				/>
				<base-icon v-else source="material" icon="list" fill="gray" />
			</base-button>
		</div>
		<section :class="{ 'grid-container': !isList, 'list': isList }">
			<news-card
				v-for="article of news"
				:id="article._id"
				:key="article._id"
				:category="article.category"
				:title="article.title"
				:created-at="article.createdAt"
				:created-by="article.creator.firstName + ' ' + article.creator.lastName"
				:picture="article.picture"
				:event-date="article.eventDate"
				:is-landscape="isList"
				>{{ article.content }}</news-card
			>
		</section>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import NewsCard from "@components/NewsCard";

export default {
	head() {
		return {
			title: "News",
		};
	},
	components: {
		NewsCard,
	},
	data: function() {
		return {
			isList: false,
		};
	},
	computed: {
		...mapGetters("news", {
			news: "list",
		}),
		testNews: function() {
			var article1 = {
				_id: "1",
				category: "Schulcloud Info",
				title: "Test daten News",
				createdAt: "2019-02-03",
				createdBy: "Chris Weissmann",
				picture: "https://source.unsplash.com/random",
				eventDate: "",
				content:
					"Ersten 3 sind TEST Daten. Nicht vergessen, Copmuted Property testNews zu löschen! :)",
			};
			var article2 = {
				_id: "2",
				category: "Umwelt AG",
				title: "Artensterben",
				createdAt: "2019-07-03",
				createdBy: "Chris Weissmann",
				picture: "https://source.unsplash.com/D0xQQsZovws/",
				eventDate: "",
				content:
					"Freitag ist Streiktag! Umwelt umwelt umwelt Rettet die Bienen",
			};

			var article3 = {
				_id: "3",
				category: "Handwerken",
				title: "3D drucker da!",
				createdAt: "2019-02-03",
				createdBy: "Chris Weissmann",
				picture: "https://source.unsplash.com/nHRfTeqAxjs",
				eventDate: "",
				content:
					"NEWS news NEWS news NEWS news NEWS news NEWS news NEWS news NEWS news NEWS NEWS news NEWS news NEWS news NEWS news NEWS news NEWS news NEWS news NEWS ",
			};

			var newsArticles = [article1, article2, article3];

			return newsArticles;
		},
	},
	created(ctx) {
		this.find();
	},
	methods: {
		find() {
			this.$store.dispatch("news/find", {
				query: {
					$sort: {
						createdAt: -1,
					},
				},
			});
		},
		toDisplayStyle(newStyle) {
			if (newStyle == "list") {
				this.isList = true;
			}
			if (newStyle == "grid") {
				this.isList = false;
			}
		},
	},
};
</script>
<style lang="scss" scoped>
@import "@styles";

.grid-container {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	grid-gap: var(--space-lg);
	align-items: flex-start;
	justify-items: center;
	width: 100%;
	padding:var(--space-md);
}

.view-toggles {
	display: none;

	@include breakpoint(tablet) {
		display: inline;
		float: right;
	}
}

.list {
	display: grid;
	grid-template-rows: auto;
	grid-template-columns: 1fr;
	grid-gap: var(--space-md);
	width: 100%;
	padding: var(--space-md);
}

.create-news-btn {
	margin-left: var(--space-md);
}
</style>
