<?php get_header(); ?>

<body data-post="<?php echo the_ID(); ?>" <?php body_class(); ?>>

    <aside class="sidebar">
        <a data-nav="home" class="logo"  href="<?php echo site_url(); ?>">
            <img src="<?php bloginfo('template_url'); ?>/img/logo.png" alt="Powered by Pen">
        </a>
        <p class="tagline">Ash <span>X</span> Grant</p>

        <div class="menu-button"><i class="icon-dehaze"></i></div>
        <div class="mobile-menu">
            <div class="menu-button-close"><i class="icon-close"></i></div>
            <nav class="nav">
                <ul>
                    <li><a data-nav="portfolio" href="/portfolio">Portfolio</a></li>
                    <li><a data-nav="about" href="/about">About</a></li>
                    <li><a data-nav="contact" href="/contact">Contact</a></li>
                </ul>
            </nav>
            <nav class="social-links clear">
                <a class="social-facebook" href="//facebook.com/poweredbypen" target="_blank"><i class="icon-facebook"></i></a>
                <a class="social-artstation" href="//artstation.com/poweredbypen" target="_blank"><i class="icon-artstation"></i></a>
                <a class="social-instagram" href="//instagram.com/poweredbypen" target="_blank"><i class="icon-instagram"></i></a>
                <a class="social-youtube" href="//www.youtube.com/channel/UC8ZqJKbN0diXtBKCRakcxAw/" target="_blank"><i class="icon-youtube"></i></a>
                <a class="social-behance" href="//behance.net/poweredbypen" target="_blank"><i class="icon-behance"></i></a>
            </nav>
        </div>
    </aside>

    <main class="wrap" role="main">
        <section class="home-wrap home">
            <div class="home-content">
                <div class="slide-controls">
                    <a class="prev-slide"><i class="icon-navigate_before"></i></a>
                    <a class="next-slide"><i class="icon-navigate_next"></i></a>
                </div>
                <div class="slides"></div>
            </div>
        </section>
        <section class="portfolio portfolio-wrap">
            <div class="portfolio-contents"></div>
            <div class="portfolio-loading">
                <div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        </section>
        <section class="about about-wrap">
            <div class="ash"></div>
            <div class="grntx"></div>
            <div class="about-content"></div>
        </section>
        <section class="contact contact-wrap">
            <div class="contact-content"></div>
            <div class="pbyplogo"></div>
        </section>
    </main>

    <div id="modal">
		<article class="project-container" data-name="" >
		    <header class="project-details">
				<a class="close-modal" title="Back to project"><i class="icon-close"></i></a>
		        <div class="project-title"></div>
		        <div class="project-desc"></div>
		    </header>
		    <section class="project-content"></section>
		</article>
	</div>
	
	<div class="loading">
		<div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><img src="<?php bloginfo('template_url'); ?>/img/pbyp-logo-small.png"></div>
	</div>

	<?php wp_footer(); ?>
</body>
</html>
