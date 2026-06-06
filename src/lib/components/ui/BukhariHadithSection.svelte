

<script>
	import { onMount, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import { writable } from 'svelte/store';
	import { BukhariHadiths } from '$lib';

	const hadiths = Array.isArray(BukhariHadiths) ? BukhariHadiths : [];
	const currentIndex = writable(0);
	let intervalId;

	onMount(() => {
		if (!hadiths.length) return;

		intervalId = setInterval(() => {
			currentIndex.update((n) => (n + 1) % hadiths.length);
		}, 5000);

		return () => clearInterval(intervalId);
	});

	onDestroy(() => {
		if (intervalId) clearInterval(intervalId);
	});
</script>

<section class="section bukhari-hadith-section">
	<div class="section-inner">
		<div class="bg-text">
			<p>حديث</p>
		</div>

		<div class="hadith-single">
			{#if hadiths.length}
				{#key $currentIndex}
					<article class="hadith-item" transition:fade={{ duration: 400 }}>
						<p class="hadith-text">{hadiths[$currentIndex].arabic}</p>
						<h3 class="hadith-title">
							{hadiths[$currentIndex].source} — {hadiths[$currentIndex].book_name} [{hadiths[
								$currentIndex
							].hadith_number}]
						</h3>
						<p class="hadith-translation">{hadiths[$currentIndex].turkish}</p>
					</article>
				{/key}
			{:else}
				<p>No hadiths available.</p>
			{/if}
		</div>

		<noscript>
			<ul class="hadith-list">
				{#each hadiths as hadith (hadith.id)}
					<li class="hadith-item">
						<p class="hadith-text">{hadith.arabic}</p>
						<h3 class="hadith-title">
							{hadith.source} — {hadith.book_name} [{hadith.hadith_number}]
						</h3>
						<p class="hadith-translation">{hadith.turkish}</p>
					</li>
				{/each}
			</ul>
		</noscript>
	</div>
</section>

