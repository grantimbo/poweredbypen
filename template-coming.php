<?php /* Template Name: Coming Soon */ ?>

<!doctype html>
<html <?php language_attributes(); ?> >
<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<title>Coming Soon &mdash; <?php bloginfo('description'); ?></title>

	<link href="<?php echo get_template_directory_uri(); ?>/img/icons/favicon.ico" rel="shortcut icon">
	<link href="<?php echo get_template_directory_uri(); ?>/img/icons/touch.png" rel="apple-touch-icon-precomposed">

	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
	
	<?php wp_head(); ?>
</head>
<body style="display: flex; align-items: center; height: 100vh;">

	<main style="text-align: center; margin: 0 auto; width: 340px;">
        <img style="display: inline-block; width: 60px;" src="<?php bloginfo('template_url'); ?>/img/pbyp-logo-small.png" alt="Powered by Pen">
		<h3 style="color: #545454;">Coming Soon</h3>
	</main>

	<?php wp_footer(); ?>
</body>
</html>

