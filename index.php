<?php get_header(); ?>
<main class="wrap" role="main">
	<?php /*<section class="home-wrap">
        <img src="<?php bloginfo('template_url'); ?>/img/ashxgrntx.png" alt="">
    </section>
    */ ?>
    <section class="portfolio-wrap clear">
        <?php if(have_posts() ) : while (have_posts() ) : the_post(); ?>
            <article class="project-thumb">
                
            </article>


        <?php endwhile; endif; ?>
    </section>
    <section class="about-wrap"></section>
    <section class="contact-wrap"></section>
</main>
<?php get_footer(); ?>
