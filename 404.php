<!doctype html>
<html <?php language_attributes(); ?> >
	<head>
		<meta charset="<?php bloginfo('charset'); ?>">
		<title><?php wp_title(''); ?><?php if(wp_title('', false)) { echo ' &mdash; '; } ?><?php bloginfo('description'); ?></title>

		<link href="<?php echo get_template_directory_uri(); ?>/img/icons/favicon.ico" rel="shortcut icon">
		<link href="<?php echo get_template_directory_uri(); ?>/img/icons/touch.png" rel="apple-touch-icon-precomposed">

		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width,initial-scale=1.0">
		
        <?php wp_head(); ?>

</head>

<body <?php body_class(); ?>>

	<a class="404-logo"  href="<?php echo site_url(); ?>">
		<img src="<?php bloginfo('template_url'); ?>/img/logo.png" alt="Powered by Pen">
	</a>

	<main role="main">
		<div class="wrap">
			<article class="lost-page">
				<h1><?php _e( 'Sorry,', 'html5blank' ); ?></h1>
				<p>The page you are looking for does not exist. <br>It may have been moved, or removed altogether. <br>You may return to the <a href="<?php echo home_url(); ?>"><?php _e( 'home page.', 'html5blank' ); ?></a></p>
			</article>
			<!-- /article -->
		</div>
	</main>

<?php wp_footer(); ?>
