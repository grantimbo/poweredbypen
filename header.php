<!doctype html>
<html <?php language_attributes(); ?> >
	<head>
		<meta charset="<?php bloginfo('charset'); ?>">
		<title> <?php bloginfo('wp_title'); ?> &mdash; <?php bloginfo('description'); ?></title>

		<link href="<?php echo get_template_directory_uri(); ?>/img/icons/favicon.ico" rel="shortcut icon">
		<link href="<?php echo get_template_directory_uri(); ?>/img/icons/touch.png" rel="apple-touch-icon-precomposed">

		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width,initial-scale=1.0">
		
        <?php wp_head(); ?>

</head>

<body data-post="<?php echo the_ID(); ?>" <?php body_class(); ?>>

    <?php echo get_template_part('sidebar'); ?>