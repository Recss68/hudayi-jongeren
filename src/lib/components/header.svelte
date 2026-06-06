<script>
	import hamburgerIcon from '$lib/assets/hamburger.svg';
	import crossIcon from '$lib/assets/cross.svg';
	import heartIcon from '$lib/assets/heart.svg';
	import turkiyeFlag from '$lib/assets/turkiye.svg';
	import netherlandsFlag from '$lib/assets/netherlands.svg';
	import ukFlag from '$lib/assets/unitedkingdom.svg';
	import chevronIcon from '$lib/assets/vector.svg';
	import { page } from '$app/state';
	import * as m from '$lib/paraglide/messages';

	const currentLanguage = $derived.by(() => {
		if (page.url.pathname.startsWith('/nl')) {
			return {
				name: 'Nederlands',
				flag: netherlandsFlag
			};
		}

		if (page.url.pathname.startsWith('/en')) {
			return {
				name: 'English',
				flag: ukFlag
			};
		}

		return {
			name: 'Türkçe',
			flag: turkiyeFlag
		};
	});

	let isLangPickerOpen = $state(false);

	function closeLanguagePicker() {
		isLangPickerOpen = false;
	}
</script>

<header class="site-header">
	<nav class="header-nav">
		<div class="menu-wrapper">
			<input type="checkbox" id="menu-toggle-checkbox" class="sr-only menu-checkbox" />

			<label for="menu-toggle-checkbox" class="menu-toggle-btn">
				<span class="sr-only">Menu openen of sluiten</span>
				<img src={hamburgerIcon} alt="" class="menu-icon menu-icon--hamburger" />
				<img src={crossIcon} alt="" class="menu-icon menu-icon--cross" />
			</label>

			<label for="menu-toggle-checkbox" class="menu-overlay">
				<span class="sr-only">Menu sluiten</span>
			</label>

			<div class="menu-panel">
				<ul class="menu-list">
					<li><a href="/">{m.header_home()}</a></li>
					<li>
						<details class="mobile-blog-dropdown">
							<summary class="mobile-blog-summary">
								<span>{m.header_blog()}</span>
								<img src={chevronIcon} alt="" class="mobile-blog-chevron-icon" />
							</summary>

							<ul class="mobile-blog-list">
								<li><a href="/blog">{m.header_all_blogs()}</a></li>
								<li><a href="/activiteiten">{m.header_events()}</a></li>
								<li><a href="/lezingen">{m.header_talks()}</a></li>
							</ul>
						</details>
					</li>
					<li><a href="/contact">{m.header_contact()}</a></li>
					<li><a href="/doneren">{m.header_donate()}</a></li>
				</ul>
			</div>
		</div>

		<a href="/" class="brand-link">Hüdayi Gençlik</a>

		<ul class="desktop-nav-list">
			<li><a href="/">{m.header_home()}</a></li>
			<li class="desktop-blog-item">
				<details class="desktop-blog-dropdown">
					<summary class="desktop-blog-summary">
						<span>{m.header_blog()}</span>
						<img src={chevronIcon} alt="" class="desktop-chevron-icon" />
					</summary>

					<ul class="desktop-blog-list">
						<li><a href="/blog"><span>{m.header_all_blogs()}</span></a></li>
						<li><a href="/activiteiten"><span>{m.header_events()}</span></a></li>
						<li><a href="/lezingen"><span>{m.header_talks()}</span></a></li>
					</ul>
				</details>
			</li>
			<li><a href="/contact">{m.header_contact()}</a></li>
		</ul>

		<div class="header-actions">
			<a href="/doneren" class="donation-link">
				<span>{m.header_donate()}</span>
				<img src={heartIcon} alt="" class="heart-icon" />
			</a>

			<details class="language-picker" bind:open={isLangPickerOpen}>
				<summary class="language-summary">
					<img src={currentLanguage.flag} alt="" class="flag-icon" />
					<span class="sr-only">Dil seç: {currentLanguage.name}</span>
					<img src={chevronIcon} alt="" class="chevron-icon" />
				</summary>

				<ul class="language-list">
					<li>
						<a href="/tr" onclick={closeLanguagePicker}>
							<img src={turkiyeFlag} alt="" class="flag-icon" />
							<span>Türkçe</span>
						</a>
					</li>
					<li>
						<a href="/nl" onclick={closeLanguagePicker}>
							<img src={netherlandsFlag} alt="" class="flag-icon" />
							<span>Nederlands</span>
						</a>
					</li>
					<li>
						<a href="/en" onclick={closeLanguagePicker}>
							<img src={ukFlag} alt="" class="flag-icon" />
							<span>English</span>
						</a>
					</li>
				</ul>
			</details>
		</div>
	</nav>
</header>

<style>
	.site-header {
		position: relative;
		width: 100%;
		background-color: var(--c-nachtgroen);

		.header-nav {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 0.75rem;
			min-height: 3rem;
			max-width: var(--container-max);
			margin: 0 auto;
			padding: var(--space-4) var(--container-pad);
		}
	}

	.brand-link {
		display: none;
		color: var(--c-creme);
		text-decoration: none;
		font-family: var(--font-primary);
		font-size: 1.125rem;
		font-weight: var(--fw-bold);
		letter-spacing: -0.02em;
		white-space: nowrap;
	}

	.header-actions {
		display: contents;
	}

	.desktop-nav-list {
		display: none;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	.menu-wrapper {
		position: static;
		display: flex;
		align-items: center;
		flex-shrink: 0;

		.menu-checkbox:checked {
			~ .menu-toggle-btn {
				.menu-icon--hamburger {
					opacity: 0;
					transform: scale(0.5) rotate(90deg);
				}

				.menu-icon--cross {
					opacity: 1;
					transform: scale(0.78) rotate(0deg);
				}
			}

			~ .menu-overlay {
				opacity: 1;
				visibility: visible;
				backdrop-filter: blur(3px);
				transition-delay: 0s;
			}

			~ .menu-panel {
				visibility: visible;
				opacity: 1;
				transform: translateX(0) scale(1);
				transition-delay: 0s;

				.menu-list li {
					opacity: 1;
					transform: translateX(0);
				}

				.menu-list li:nth-child(1) {
					transition-delay: 0.12s;
				}
				.menu-list li:nth-child(2) {
					transition-delay: 0.18s;
				}
				.menu-list li:nth-child(3) {
					transition-delay: 0.24s;
				}
				.menu-list li:nth-child(4) {
					transition-delay: 0.3s;
				}
			}
		}
	}

	.menu-toggle-btn {
		position: relative;
		z-index: 40;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		padding: 0;
		cursor: pointer;
		background: transparent;
		transition: transform 0.2s ease;
		-webkit-tap-highlight-color: transparent;

		&:active {
			transform: scale(0.92);
		}

		.menu-icon {
			position: absolute;
			inset: 0;
			display: block;
			width: 100%;
			height: 100%;
			object-fit: contain;
			object-position: center;
			transition:
				opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
				transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
			transform-origin: center;
		}

		.menu-icon--hamburger {
			opacity: 1;
			transform: scale(1) rotate(0deg);
		}

		.menu-icon--cross {
			opacity: 0;
			pointer-events: none;
			transform: scale(0.42) rotate(-90deg);
		}
	}

	.menu-overlay {
		position: fixed;
		inset: 0;
		z-index: 20;
		opacity: 0;
		visibility: hidden;
		background-color: rgb(0 0 0 / 36%);
		backdrop-filter: blur(0);
		cursor: default;
		transition:
			opacity 0.34s ease,
			backdrop-filter 0.34s ease,
			visibility 0s 0.34s;
	}

	.menu-panel {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 30;
		width: min(84vw, 21rem);
		height: 100vh;
		padding: 6rem 1rem 1rem;
		overflow-y: auto;
		visibility: hidden;
		opacity: 0;
		background-color: var(--c-creme);
		box-shadow: 0 18px 48px rgb(0 0 0 / 24%);
		transform: translateX(-105%) scale(0.96);
		transform-origin: left center;
		transition:
			transform 0.48s cubic-bezier(0.16, 1, 0.3, 1),
			opacity 0.28s ease,
			visibility 0s 0.48s;
		will-change: transform, opacity;

		.menu-list {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			margin: 0;
			padding: 0;
			list-style: none;

			li {
				opacity: 0;
				transform: translateX(-1.25rem);
				transition:
					opacity 0.36s ease,
					transform 0.46s cubic-bezier(0.16, 1, 0.3, 1);
			}

			a {
				display: block;
				padding: 1rem 1.25rem;
				border-radius: 0.75rem;
				color: var(--c-nachtgroen);
				text-decoration: none;
				font-family: var(--font-primary);
				font-size: 1.5rem;
				font-weight: var(--fw-semibold);
				transition:
					background-color 0.2s ease,
					transform 0.2s ease;

				&:hover,
				&:focus-visible {
					outline: none;
					background-color: rgb(0 0 0 / 6%);
				}

				&:active {
					transform: translateX(4px);
				}
			}

			.mobile-blog-summary {
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 0.75rem;
				padding: 1rem 1.25rem;
				border-radius: 0.75rem;
				color: var(--c-nachtgroen);
				font-family: var(--font-primary);
				font-size: 1.5rem;
				font-weight: var(--fw-semibold);
				cursor: pointer;
				list-style: none;
			}

			.mobile-blog-chevron-icon {
				width: auto;
				height: 0.625rem;
				transition: transform 0.2s ease;
			}

			.mobile-blog-dropdown[open] .mobile-blog-chevron-icon {
				transform: rotate(180deg);
			}

			.mobile-blog-list {
				display: grid;
				gap: 0.125rem;
				margin: 0.25rem 0 0;
				padding: 0 0 0 1rem;
				list-style: none;

				a {
					padding-block: 0.75rem;
					font-size: 1.125rem;
				}
			}
		}
	}

	.donation-link {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 8px 14px;
		border: none;
		border-radius: 9999px;
		background-color: var(--c-creme);
		color: var(--c-nachtgroen);
		text-decoration: none;
		font-family: var(--font-primary);
		font-size: 0.875rem;
		font-weight: var(--fw-bold);
		letter-spacing: -0.01em;
		white-space: nowrap;
		transition: transform 0.2s ease;

		&:active {
			transform: scale(0.95);
		}

		.heart-icon {
			width: auto;
			height: 20px;
			transition: transform 0.2s ease;
			transform-origin: center;
		}

		&:hover .heart-icon,
		&:focus-visible .heart-icon {
			transform: scale(1.35);
		}
	}

	.language-picker {
		position: relative;
		flex-shrink: 0;

		&[open] .language-summary .chevron-icon {
			transform: rotate(180deg);
		}
	}

	.language-summary {
		display: flex;
		align-items: center;
		gap: var(--space-1);
		padding: 4px 8px 4px 4px;
		border-radius: 9999px;
		background-color: var(--c-creme);
		cursor: pointer;
		list-style: none;
		transition: transform 0.2s ease;
		-webkit-tap-highlight-color: transparent;

		&:active {
			transform: scale(0.95);
		}

		.flag-icon {
			width: 24px;
			height: 24px;
			border-radius: 50%;
			object-fit: cover;
		}

		.chevron-icon {
			width: auto;
			height: 8px;
			margin-right: 4px;
			transition: transform 0.2s ease;
		}
	}

	.language-list {
		position: absolute;
		top: calc(100% + 1.25rem);
		right: 0;
		z-index: 50;
		display: grid;
		gap: 0.25rem;
		min-width: 11rem;
		margin: 0;
		padding: 0.5rem;
		border-radius: 1rem;
		background-color: var(--c-creme);
		box-shadow: 0 18px 48px rgb(0 0 0 / 20%);
		list-style: none;

		a {
			display: flex;
			align-items: center;
			gap: 0.625rem;
			padding: 0.625rem 0.75rem;
			border-radius: 0.75rem;
			color: var(--c-nachtgroen);
			text-decoration: none;
			font-family: var(--font-primary);
			font-size: 0.9375rem;
			font-weight: var(--fw-semibold);

			&:hover,
			&:focus-visible {
				outline: none;
				background-color: rgb(0 0 0 / 6%);
			}
		}

		.flag-icon {
			width: 1.5rem;
			height: 1.5rem;
			border-radius: 50%;
			object-fit: cover;
		}
	}

	@media (min-width: 48rem) {
		.site-header .header-nav {
			min-height: 4rem;
		}

		.brand-link {
			position: absolute;
			left: 50%;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			font-size: 1.25rem;
			transform: translateX(-50%);
		}

		.header-actions {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			gap: 0.5rem;
			flex-direction: row-reverse;
			margin-left: auto;
		}

		.menu-toggle-btn {
			width: 2.25rem;
			height: 2.25rem;
		}

		.menu-panel {
			width: min(24rem, 42vw);
			padding: 7rem 1.5rem 1.5rem;
		}

		.donation-link {
			padding: 0.625rem 1rem;
			font-size: 0.9375rem;
		}

		.language-summary {
			padding: 0.3125rem 0.625rem 0.3125rem 0.3125rem;
		}

		.language-list {
			right: auto;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	@media (min-width: 64rem) {
		.site-header .header-nav {
			display: grid;
			grid-template-columns: auto 1fr auto;
			min-height: 5.5rem;
			max-width: none;
			column-gap: clamp(2rem, 4vw, 4rem);
			padding: 1.5rem clamp(1rem, 2vw, 2rem);
		}

		.menu-wrapper {
			display: none;
		}

		.brand-link {
			position: static;
			left: auto;
			display: inline-flex;
			grid-column: 1;
			align-items: center;
			justify-self: start;
			font-size: clamp(1.125rem, 1.35vw, 1.375rem);
			font-weight: var(--fw-bold);
			letter-spacing: 0.08em;
			transform: none;
			transition: opacity 0.2s ease;

			&:hover,
			&:focus-visible {
				outline: none;
				opacity: 0.72;
			}
		}

		.desktop-nav-list {
			display: flex;
			grid-column: 2;
			align-items: center;
			justify-content: center;
			gap: clamp(2.5rem, 5vw, 4.5rem);

			a,
			.desktop-blog-summary {
				position: relative;
				display: inline-flex;
				align-items: center;
				gap: 0.375rem;
				color: var(--c-creme);
				text-decoration: none;
				font-family: var(--font-primary);
				font-size: clamp(0.9375rem, 1vw, 1.0625rem);
				font-weight: var(--fw-medium);
				white-space: nowrap;
			}
		}

		.desktop-blog-summary {
			cursor: pointer;
			list-style: none;
		}

		.desktop-nav-list > li > a::after,
		.desktop-blog-summary::after {
			content: '';
			position: absolute;
			left: 0;
			bottom: -0.375rem;
			width: 100%;
			height: 0.125rem;
			border-radius: 9999px;
			background-color: var(--c-creme);
			transform: scaleX(0);
			transform-origin: center;
			transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
		}

		.desktop-nav-list > li > a:hover::after,
		.desktop-nav-list > li > a:focus-visible::after,
		.desktop-blog-summary:hover::after,
		.desktop-blog-summary:focus-visible::after,
		.desktop-blog-dropdown[open] .desktop-blog-summary::after {
			transform: scaleX(1);
		}

		.desktop-nav-link-with-icon {
			gap: 0.5rem;
		}

		.desktop-blog-item {
			position: relative;
		}

		.desktop-blog-dropdown[open] .desktop-chevron-icon {
			transform: rotate(180deg);
		}

		.desktop-blog-list {
			position: absolute;
			top: calc(100% + 0.75rem);
			left: 50%;
			z-index: 50;
			display: grid;
			gap: 0.25rem;
			min-width: 11rem;
			margin: 0;
			padding: 0.5rem;
			border-radius: 1rem;
			background-color: var(--c-creme);
			box-shadow: 0 18px 48px rgb(0 0 0 / 20%);
			list-style: none;
			transform: translateX(-50%);

			a {
				display: flex;
				color: var(--c-nachtgroen);
				padding: 0.625rem 0.75rem;
				border-radius: 0.75rem;
				font-weight: var(--fw-semibold);

				&:hover,
				&:focus-visible {
					outline: none;
					background-color: rgb(0 0 0 / 6%);
				}

				&:hover span::after,
				&:focus-visible span::after {
					transform: scaleX(1);
				}
			}
		}

		.desktop-chevron-icon {
			width: auto;
			height: 0.5rem;
			filter: brightness(0) saturate(100%) invert(91%) sepia(13%) saturate(622%) hue-rotate(353deg)
				brightness(108%) contrast(91%);
			transition: transform 0.2s ease;
		}

		.header-actions {
			display: flex;
			grid-column: 3;
			align-items: center;
			justify-content: flex-end;
			gap: 0.75rem;
			flex-direction: row-reverse;
			margin-left: 0;
		}

		.donation-link {
			gap: 0.5rem;
			padding: 0.75rem 1.125rem;
			font-size: clamp(0.9375rem, 1vw, 1.0625rem);

			.heart-icon {
				height: 1.375rem;
			}
		}

		.language-summary {
			padding: 0.375rem 0.625rem 0.375rem 0.375rem;

			.flag-icon {
				width: 1.5rem;
				height: 1.5rem;
			}

			.chevron-icon {
				height: 0.5rem;
				margin-right: 0.1875rem;
			}
		}

		.language-list {
			top: calc(100% + 0.75rem);
			right: auto;
			left: 50%;
			transform: translateX(-50%);

			a:hover span::after,
			a:focus-visible span::after {
				transform: scaleX(1);
			}
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.menu-toggle-btn,
		.menu-icon,
		.menu-overlay,
		.menu-panel,
		.menu-list li {
			transition-duration: 0.01ms;
			transition-delay: 0s;
		}
	}
</style>
