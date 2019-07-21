module.exports = {
	title: 'easyset',
	description: 'easySet for Echarts',
	head: [
		['script', {
			async: true,
			src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
		}],
		['script', {}, `(adsbygoogle = window.adsbygoogle || []).push({
			google_ad_client: "ca-pub-2747362703566068",
			enable_page_level_ads: true
		});`]
	],
	themeConfig: {
		nav: [
			{ text: '文档', link: '/' },
		],
		// sidebar: 'auto'
		sidebar: [
			["/", "介绍"],
			["/tutorial", "教程"],
			["/charts/pie", "饼图"],
			["/charts/bar", "柱状图"],
			["/charts/line", "线图"],
			["/charts/map", "地图"],
			["/charts/boxplot", "盒须图"],
		]
	}
}