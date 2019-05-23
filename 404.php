<?php get_header(); ?>

<body <?php body_class(); ?>>

	<main class="404">
		<a class="logo-404"  href="<?php echo site_url(); ?>">
			<img src="<?php bloginfo('template_url'); ?>/img/logo.png" alt="Powered by Pen">
		</a>
		<h1>Apologies</h1>
		<p>The page you are looking for does not exist. <br>It may have been moved, or removed altogether. <br>You may return to the <a color="#ccc" href="<?php echo home_url(); ?>"><?php _e( 'home page.', 'html5blank' ); ?></a></p>
	</main>

	<?php wp_footer(); ?>
</body>
</html>

