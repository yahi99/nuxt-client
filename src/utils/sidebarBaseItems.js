export default [
	{
		title: "Übersicht",
		href: "/dashboard",
		icon: "th-large",
	},
	{
		title: "Kurse",
		href: "/courses",
		icon: "graduation-cap",
	},
	{
		title: "Teams",
		href: "/teams",
		icon: "users",
		permission: "TEAMS_ENABLED",
	},
	{
		title: "Aufgaben",
		href: "/homework",
		icon: "tasks",
		children: [
			{
				title: "Gestellte Aufgaben",
				icon: "bullhorn",
				href: "/homework/asked/",
			},
			{
				title: "Meine ToDos",
				icon: "lock",
				href: "/homework/private/",
			},
			{
				href: "Archiv",
				icon: "archive",
				href: "/homework/archive/",
			},
		],
	},
	{
		title: "Meine Dateien",
		href: "/files",
		icon: "folder-open",
		children: [
			{
				href: "persönliche Dateien",
				icon: "folder-open-o",
				href: "/files/my/",
			},
			{
				href: "Kurse",
				icon: "folder-open-o",
				href: "/files/courses/",
			},
			{
				href: "/files/teams/",
				icon: "folder-open-o",
				title: "Teams",
				permission: "TEAMS_ENABLED",
			},
			{
				href: "geteilte Dateien",
				icon: "folder-open-o",
				href: "/files/shared/",
			},
		],
	},
	{
		title: "Neuigkeiten",
		href: "/news",
		icon: "newspaper-o",
	},
	{ title: "Termine", href: "/calendar", icon: "table" },
	{ title: "Lern-store", href: "/content", icon: "search" },
	{
		title: "Add-Ons",
		href: "/addons",
		icon: "puzzle-piece",
		permission: "ADDONS_ENABLED",
	},
	{
		title: "Verwaltung",
		href: "/administration",
		icon: "cogs",
		permission: "STUDENT_LIST",
		excludedPermission: "ADMIN_VIEW",
		children: [
			{
				title: "Schüler",
				icon: "odnoklassniki",
				href: "/administration/students/",
			},
			{
				title: "Lehrer",
				icon: "user",
				href: "/administration/teachers/",
			},
			{
				title: "Klassen",
				icon: "users",
				href: "/administration/classes/",
			},
		],
	},
	{
		title: "Helpdesk",
		href: "/helpdesk/",
		icon: "ticket",
		permission: "HELPDESK_VIEW",
	},
	{
		title: "Verwaltung",
		href: "/administration/",
		icon: "cogs",
		permission: "ADMIN_VIEW",
		children: [
			{
				title: "Schüler",
				icon: "odnoklassniki",
				href: "/administration/students/",
			},
			{
				title: "Lehrer",
				icon: "user",
				href: "/administration/teachers/",
			},
			{
				title: "Kurse",
				icon: "graduation-cap",
				href: "/administration/courses/",
			},
			{
				title: "Klassen",
				icon: "users",
				href: "/administration/classes/",
			},
			{
				title: "Teams",
				icon: "users",
				href: "/administration/teams/",
			},
			{
				title: "Schule",
				icon: "building",
				href: "/administration/school/",
			},
			// {
			// 	title: "Datenquellen",
			// 	icon: "database",
			// 	permission: "DATASOURCES_VIEW",
			// 	href: "/administration/datasources/",
			// },
		],
	},
	{
		title: "Meine Materialien",
		href: "/my-material/",
		icon: "book",
		permission: "BETA_FEATURES",
	},
];
