<script>
	import { page } from '$app/state';
	import * as m from '$lib/paraglide/messages';

	const activeLocale = $derived.by(() => {
		const locale = page.url.pathname.split('/')[1];

		if (locale === 'nl' || locale === 'en' || locale === 'tr') {
			return locale;
		}

		return 'tr';
	});
</script>

<svelte:head>
	<!-- Elfsight Instagram Feed | Untitled Instagram Feed -->
	<script src="https://elfsightcdn.com/platform.js" async></script>
</svelte:head>

<section class="section instagram-widget">
	<h2>{m.instagram_heading({}, { locale: activeLocale })}</h2>
	<div class="widget-container">
		<div class="elfsight-app-7e2d56d4-05e4-4bee-b528-aa040cea4e02" data-elfsight-app-lazy></div>
		<!-- Fallback if the script cant load the widget from elfsight -->
		<noscript>
			<div class="instagram-feed-fallback">
				<p>{m.instagram_fallback_text({}, { locale: activeLocale })}</p>
				<a href="https://www.instagram.com/hudayi.genclik" target="_blank">@hudayi.genclik</a>
			</div>
		</noscript>
	</div>
</section>

<style>
	.instagram-widget {
		background: var(--c-creme);
		text-align: center;

		h2 {
			font-size: 40px;
			color: var(--c-nachtgroen);
		}

		.widget-container {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.instagram-feed-fallback {
			max-width: 600px;

			p,
			a {
				color: var(--c-nachtgroen);
			}
		}
	}
</style>
