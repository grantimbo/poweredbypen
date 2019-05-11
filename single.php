<?php get_header(); ?>
<main class="wrap" role="main">

    <section class="portfolio-wrap clear">
        <?php if(have_posts() ) : while (have_posts() ) : the_post(); ?>
            <?php the_content(); ?>


        <?php endwhile; endif; ?>
    </section>

</main>
<?php get_footer(); ?>
