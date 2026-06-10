<script>
	import { onMount, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/state';
	import * as m from '$lib/paraglide/messages';
	import { Verses } from '$lib';

	const verses = Array.isArray(Verses) ? Verses : [];

	const activeLocale = $derived.by(() => {
		const locale = page.url.pathname.split('/')[1];

		if (locale === 'nl' || locale === 'en' || locale === 'tr') {
			return locale;
		}

		return 'tr';
	});

	function getVerseTranslation(verse) {
		return verse?.translations?.[activeLocale] ?? verse?.translations?.tr ?? verse?.turkish ?? '';
	}

	import { writable } from 'svelte/store';
	const currentIndex = writable(0);
	let intervalId;

	// rotate every minute (60000ms). Use progressive enhancement:
	// - if JS is disabled, the server-rendered first verse (index 0) remains visible
	// - if JS runs, we start the interval and swap verses with a fade
	onMount(() => {
		if (!verses.length) return;

		intervalId = setInterval(() => {
			currentIndex.update((n) => (n + 1) % verses.length);
		}, 5000);

		return () => clearInterval(intervalId);
	});

	onDestroy(() => {
		if (intervalId) clearInterval(intervalId);
	});
</script>

<section class="section quran-verses-section">
	<div class="section-inner">
		<div class="bg-text">
			<p>ٱلرَّحْمَٰنُ</p>
		</div>
		<!-- aria-live notifies screen readers when the verse updates -->
		<div aria-live="polite" class="verse-single" role="status">
			{#if verses.length}
				{#key $currentIndex}
					<article class="verse-item" transition:fade={{ duration: 400 }}>
						<p class="verse-text">{verses[$currentIndex].arabic}</p>
						<h3 class="verse-title">
							{verses[$currentIndex].chapter_name} [{verses[$currentIndex].chapter_number}:{verses[
								$currentIndex
							].verse_number}]
						</h3>
						<p class="verse-translation" lang={activeLocale}>{getVerseTranslation(verses[$currentIndex])}</p>
					</article>
				{/key}
			{:else}
				<p>{m.quran_empty()}</p>
			{/if}
		</div>
	</div>
</section>

<style>
	.quran-verses-section {
		background-color: var(--c-bg-main);
		height: 50vh;
		position: relative;
		.section-inner {
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
	}

	.bg-text {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 120px;
		p {
			color: var(--c-bg-text);
			opacity: 10%;
			-webkit-text-stroke: 1px black;
		}
	}

	/* single verse view */
	.verse-single {
		display: grid;
		overflow: hidden;
	}

.verse-item {
		grid-area: 1 / 1;
		width: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0.25rem 0;
		gap: 0.5rem;
	}

	.verse-text {
		font-size: 30px;
		text-align: right;
		margin: 0 0 0.5rem 0;
		direction: rtl;
		z-index: 1;
		@media (min-width: 768px) {
			font-size: 40px;
		}
		@media (min-width: 1024px) {
			font-size: 48px;
		}
	}

	.verse-title {
		font-size: 16px;
		text-align: center;
		margin: 0 0 0.5rem 0;
		z-index: 1;
	}

	.verse-translation {
		font-size: 16px;
		z-index: 1;
	}

	.verse-item > .verse-text,
	.verse-item > .verse-title,
	.verse-item > .verse-translation {
		width: min(90%, 700px);
	}
</style>
