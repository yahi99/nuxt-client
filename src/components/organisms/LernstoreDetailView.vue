<!-- eslint-disable max-lines -->

<template>
	<div class="resource">
		<div ref="icons" class="icons">
			<base-button
				v-if="!closeButtonStyleSelector"
				class="close-icon"
				design="icon"
				@click="goBack"
			>
				<base-icon source="material" icon="close" />
			</base-button>
			<base-button
				v-if="closeButtonStyleSelector"
				class="close-transparent"
				design="icon"
				@click="goBack"
			>
				<base-icon source="material" icon="close" />
			</base-button>
			<!--
				<base-button design="icon" @click="bookmarkHandler">
					<base-icon
						class="resource__img-container--icon"
						source="material"
						:icon="bookmarkIconSelector"
					/>
				</base-button>
				--></div>
		<div class="content">
			<div class="preview">
				<div class="preview-background-color" />
				<div
					class="preview-background"
					:style="{
						backgroundImage: `url(${resource.preview.url})`,
					}"
				/>
				<img :src="resource.preview.url" class="preview-img" alt="content preview image" />
			</div>
		</div>
		<div ref="sidebar" class="sidebar">
			<div class="content-container">
				<div class="actions">
					<!-- <base-button v-if="!isMobile" design="text icon">
						<base-icon source="material" icon="more_vert" />
					</base-button> -->
				</div>
				<div class="title">
					<span>
						{{ resource.title || resource.name }}
					</span>
					<!-- <base-button v-if="isMobile" design="text icon">
						<base-icon source="material" icon="more_vert" />
					</base-button> -->
				</div>
				<div class="author-provider">
					<span v-if="author">
						{{ author }} ({{ $t("pages.content._id.metadata.author") }}),
					</span>
					<span v-if="provider">
						{{ provider }} ({{ $t("pages.content._id.metadata.provider") }})
					</span>
				</div>
				<div class="description" v-html="description"></div>
				<div class="metadata">
					<div v-if="createdAt || updatedAt" class="meta-container">
						<div class="meta-icon">
							<base-icon source="custom" icon="calender" />
						</div>

						<div class="meta-text">
							<div v-if="createdAt">
								{{ $t("pages.content._id.metadata.createdAt") }}
								{{ createdAt }}
							</div>
							<div v-if="updatedAt">
								{{ $t("pages.content._id.metadata.updatedAt") }}
								{{ updatedAt }}
							</div>
						</div>
					</div>
					<div v-if="resource.downloadUrl" class="meta-container">
						<div class="meta-icon">
							<base-icon
									:source="getTypeIcon(resource.mimetype).iconSource"
									:icon="getTypeIcon(resource.mimetype).icon"
							/>
						</div>
						<div class="meta-text">
							<a :href="resource.downloadUrl"> {{ resource.downloadUrl }} </a>
						</div>
					</div>
					<div class="meta-container">
						<div class="meta-icon">
							<base-icon source="fa" icon="tag" />
						</div>
						<span class="meta-text">
							{{ tags }}
						</span>
					</div>
				</div>
			</div>
			<base-button
				design="hero-cta"
				class="floating-button"
				size="large"
				@click="handleCopy"
			>
				<base-icon source="material" icon="add" />
				{{ $t("pages.content._id.addToTopic") }}
			</base-button>
		</div>
		<add-content-modal
			:show-copy-modal.sync="copyModalActive"
			:updatedid="resource.ref.id"
			:url="resource.content.url"
			:title="resource.title"
		/>
	</div>
</template>

<script>
import dayjs from "dayjs";
import AddContentModal from "@components/molecules/AddContentModal";

import contentMeta from "@mixins/contentMeta";
import elementIsInTop from "@mixins/elementIsInTop";

const getMetadataAttribute = (properties, key) => {
	if (Array.isArray(properties[key])) {
		return properties[key][0];
	}
	return null;
};

export default {
	components: {
		AddContentModal,
	},
	layout: "loggedInFull",
	mixins: [contentMeta, elementIsInTop],
	props: {
		resource: {
			type: Object,
			default: () => {},
		},
	},
	data() {
		return {
			dayjs,
			isBookmarked: false,
			menuActive: false,
			copyModalActive: false,
			actions: [
				{
					event: "copy",
					text: this.$t("components.molecules.ContentCardMenu.action.copy"),
					icon: "file_copy",
				},
				{
					event: "share",
					text: this.$t("components.molecules.ContentCardMenu.action.share"),
					icon: "share",
				},
				{
					event: "delete",
					text: this.$t("components.molecules.ContentCardMenu.action.delete"),
					icon: "delete_outline",
				},
				{
					event: "report",
					text: this.$t("components.molecules.ContentCardMenu.action.report"),
					icon: "report",
				},
			],
		};
	},
	computed: {
		bookmarkIconSelector() {
			return this.isBookmarked ? "bookmark" : "bookmark_border";
		},
		provider() {
			return getMetadataAttribute(
				this.resource.properties,
				"ccm:metadatacontributer_provider"
			);
		},
		author() {
			return getMetadataAttribute(this.resource.properties, "cm:creator");
		},
		createdAt() {
			return dayjs(
				getMetadataAttribute(this.resource.properties, "cm:created")
			);
		},
		updatedAt() {
			return dayjs(
				getMetadataAttribute(this.resource.properties, "cm:modified")
			);
		},
		type() {
			return this.getTypeI18nName(this.resource.mimetype);
		},
		description() {
			return this.resource.description || getMetadataAttribute(this.resource.properties, "cclom:general_description");
		},
		tags(){
			const tags = getMetadataAttribute(this.resource.properties, "ccm:taxonentry");
			return tags ? tags.split("; ").filter(w => w !== "").map(w => "#" + w).join(" ") : "Keine Tags";
		},
		filename() {
			return this.resource.filename;
		},
		closeButtonStyleSelector() {
			return (
				this.elIsTop && (this.$mq === "tabletPortrait" || this.$mq === "mobile")
			);
		},
	},
	mounted() {
		this.assignElements("sidebar", "icons");
	},
	methods: {
		bookmarkHandler() {
			this.isBookmarked = !this.isBookmarked;
		},
		goBack() {
			this.$router.back();
		},
		handleCopy() {
			this.copyModalActive = true;
			this.$store.dispatch("courses/find");
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
.resource {
	display: grid;
	grid-template-areas: "content meta";
	grid-template-rows: auto;
	grid-template-columns: auto 30%;
	min-width: 100vw;
	min-height: 100vh;
	box-shadow: var(--shadow-md);

	@media (max-width: 768px) {
		grid-template-areas:
			"content"
			"meta";
		grid-template-columns: auto;
	}

	@media (min-width: 1025px) {
		grid-template-columns: auto 40%;
	}

	.icons {
		position: fixed;
		top: 0;
		z-index: var(--layer-modal);
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: var(--space-md);

		.close-icon {
			padding: var(--space-xs-4);
			font-size: var(--heading-4);
			color: var(--color-white);
			/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
			background-color: rgba(68, 68, 68, 0.6);
			border-radius: var(--radius-round);
			box-shadow: var(--shadow-sm);
		}

		.close-transparent {
			padding: var(--space-xs-4);
			font-size: var(--heading-4);
			color: var(--color-black);
			/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
			background-color: rgba(255, 255, 255, 0);
			border-radius: var(--radius-round);
		}
	}
	.content {
		position: relative;
		grid-area: content;

		@media (max-width: 768px) {
			position: sticky;
			top: 0;
		}

		.preview {
			position: relative;
			height: 100%;

			@media (max-width: 768px) {
				height: 80vh;
			}

			.preview-background-color {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				z-index: var(--layer-behind);
				width: 100%;
				height: 100%;
				background-color: var(--color-tertiary);
			}

			.preview-background {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				z-index: var(--layer-page);
				filter: blur(0.7rem);
				background-repeat: no-repeat;
				background-position: center;
				background-size: cover;
				opacity: 0.3;
			}

			img {
				position: absolute;
				z-index: var(--layer-page);
				object-position: center;
				object-fit: contain;
				width: 100%;
				height: 100%;

				@include breakpoint(tablet) {
					min-height: auto;
				}
			}
		}
	}

	.sidebar {
		position: relative;
		z-index: var(--layer-dropdown);
		display: flex;
		flex-direction: column;
		grid-area: meta;
		align-items: center;
		justify-content: space-between;
		min-height: 100vh;
		padding-bottom: var(--space-xl);
		overflow-y: scroll;
		background-color: var(--color-white);
		box-shadow: -8px 0 17px -7px rgba(0, 0, 0, 0.75);

		@media (max-width: 768px) {
			max-height: none;
			overflow: inherit;
		}

		.content-container {
			width: 80%;
			margin-top: 30px;
		}

		.actions {
			display: flex;
			justify-content: flex-end;
		}

		.title {
			display: flex;
			justify-content: space-between;
			margin: var(--space-xl-2) 0 var(--space-sm) 0;
			font-size: var(--heading-5);
			font-weight: var(--font-weight-bold);
			line-height: var(--line-height-md);
		}

		.author-provider {
			font-size: var(--text-xs);
			font-weight: var(--font-weight-bold);
		}

		.description {
			margin: var(--space-xl-2) 0;
			font-size: var(--text-md);
		}

		.metadata {
			display: flex;
			flex-direction: column;
			font-size: var(--text-xs);

			.meta-container {
				display: flex;
				align-items: flex-start;
				margin-bottom: var(--space-lg);
				.meta-icon {
					margin-right: var(--space-md);
					font-size: var(--text-lg);
					.icon {
						max-height: var(--text-lg);
					}
				}
			}
		}

		.floating-button {
			position: sticky;
			bottom: 0;
			z-index: var(--layer-fab);
			border-radius: var(--radius-md);

			@media (max-width: 768px) {
				bottom: 12px;
			}
		}
	}
}
</style>