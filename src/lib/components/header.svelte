<script>
	import heartIcon from '$lib/assets/heart.svg';
	import turkiyeFlag from '$lib/assets/turkiye-icon.svg';
    import heart from '$lib/assets/heart.svg';
</script>

<header>
	<nav>
		<a href="/">
			Hüdayi Gençlik
		</a>

		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/over-ons">Over Ons</a></li>
			<li><a href="/projecten">Projecten</a></li>
			<li><a href="/contact">Contact</a></li>
		</ul>

		<a href="/doneren">
			<span>Online bağış</span>
			<img src={heartIcon} alt="" />
		</a>

		<a href="/tr">
			<img src={turkiyeFlag} alt="" />
			<span>Türkçe</span>
		</a>
	</nav>
</header>