<?php
/*
 *  Author: Grant Imbo
 *  URL: grantimbo.com
 *  Site functions for grantimbo.com
 */

/*------------------------------------*\
	External Modules/Files
\*------------------------------------*/

// Load any external files you have here

/*------------------------------------*\
	Theme Support
\*------------------------------------*/

if (function_exists('add_theme_support')) {
    // Add Menu Support
    add_theme_support('menus');

    // Add Thumbnail Theme Support
    add_theme_support('post-thumbnails');
    add_image_size('portfolio-thumb', 300, 188, true); // Custom Thumbnail Size call using the_post_thumbnail('custom-size');

    // Enables post and comment RSS feed links to head
    add_theme_support('automatic-feed-links');

    add_theme_support( 'post-formats', array( 'aside', 'gallery' ) );

}

/*------------------------------------*\
	Functions
\*------------------------------------*/

add_action('rest_api_init', 'register_rest_images' );
function register_rest_images(){
    register_rest_field( array('post'),
        'fimg_url',
        array(
            'get_callback'    => 'get_rest_featured_image',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}
function get_rest_featured_image( $object, $field_name, $request ) {
    if( $object['featured_media'] ){
        $img = wp_get_attachment_image_src( $object['featured_media'], 'portfolio-thumb' );
        return $img[0];
    }
    return false;
}





// Remove Injected classes, ID's and Page ID's from Navigation <li> items
function custom_wp_nav_menu($args) {
    return is_array($args) ? array_intersect($args, array(
        // List of useful classes to keep
        'current_page_item',
        'current_page_parent',
        'current_page_ancestor',
        'typebg',
        'motionbg',
        'webbg',
        'visualbg',
        'expbg'
        )
    ) : '';
}

function async_scripts( $tag, $handle, $src ) {
    // the handles of the enqueued scripts we want to async
    $async_scripts = array( 'hammer', 'ajax-load-more');
    $defer_scripts = array( 'grantimboscripts' );

    if ( in_array( $handle, $async_scripts ) ) {
        return '<script type="text/javascript" src="' . $src . '" async ></script>' . "\n";
    } else if ( in_array( $handle, $defer_scripts ) ) {
       return '<script type="text/javascript" src="' . $src . '" defer ></script>' . "\n";
    }

    return $tag;
}



// Load HTML5 Blank scripts (header.php)
function header_scripts() {
    if ($GLOBALS['pagenow'] != 'wp-login.php' && !is_admin()) {

    	wp_deregister_script('jquery'); // Deregister WordPress jQuery
    	// wp_register_script('jquery', '//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js', array(), '3.3.1'); // Google CDN jQuery
    	// wp_enqueue_script('jquery'); // Enqueue it!

        // wp_register_script('conditionizr', '//cdnjs.cloudflare.com/ajax/libs/conditionizr.js/4.0.0/conditionizr.js', array(), '4.0.0'); // Conditionizr
        // wp_enqueue_script('conditionizr'); // Enqueue it!

        // wp_register_script('modernizr', '//cdnjs.cloudflare.com/ajax/libs/modernizr/2.7.1/modernizr.min.js', array(), '2.7.1'); // Modernizr
        // wp_enqueue_script('modernizr'); // Enqueue it!

        wp_register_script('grantimboscripts', get_template_directory_uri() . '/js/scripts.js', array(), '4.8'); // Site Functionalities
        wp_enqueue_script('grantimboscripts'); // Enqueue it!

    }

}


// Load HTML5 Blank styles
function header_styles() {
    wp_register_style('normalize', get_template_directory_uri() . '/css/normalize.min.css', '2.1.3', 'all');
    wp_enqueue_style('normalize'); // Enqueue it!

    wp_register_style('grantimbo', get_template_directory_uri() . '/style.css', array(), '4.1', 'all');
    wp_enqueue_style('grantimbo'); // Enqueue it!

    wp_localize_script('grantimboscripts', 'pbypData', array(
        'siteUrl' => get_site_url(),
        // 'nonce' => wp_create_nonce('wp_rest')
    ));

}

// Register HTML5 Blank Navigation
function register_menus() {
    register_nav_menus(array( // Using array to specify more menus if needed
        'sidebar-menu' => __('Sidebar Menu', 'grantimbo'), // Sidebar Navigation
    ));
}

// HTML5 Blank navigation
function side_nav() {
    wp_nav_menu(
        array(
           'items_wrap' => '<nav class="nav"><ul>%3$s</ul></nav>',
           'theme_location' => 'sidebar-menu',
           )
        );
}

// Remove the <div> surrounding the dynamic navigation to cleanup markup
function my_wp_nav_menu_args($args = '') {
    $args['container'] = false;
    return $args;
}


// REPLACE "current_page_" WITH CLASS "active"
function current_to_active($text) {
    $replace = array(
        // List of classes to replace with "active"
        'current_page_item' => 'active',
        'current_page_parent' => 'active',
        'current_page_ancestor' => 'active',
    );
    $text = str_replace(array_keys($replace), $replace, $text);
        return $text;
}



// Add page slug to body class, love this - Credit: Starkers Wordpress Theme
function add_slug_to_body_class($classes) {
    global $post;
    if (is_home()) {
        $key = array_search('blog', $classes);
        if ($key > -1) {
            unset($classes[$key]);
        }
    } elseif (is_page()) {
        $classes[] = sanitize_html_class($post->post_name);
    } elseif (is_singular()) {
        $classes[] = sanitize_html_class($post->post_name);
    }

    return $classes;
}

// Remove wp_head() injected Recent Comment styles
function remove_recent_comments_style() {
    global $wp_widget_factory;
    remove_action('wp_head', array(
        $wp_widget_factory->widgets['WP_Widget_Recent_Comments'],
        'recent_comments_style'
    ));
}

// Remove 'text/css' from our enqueued stylesheet
function remove_style_tag($tag) {
    return preg_replace('~\s+type=["\'][^"\']++["\']~', '', $tag);
}

// Remove thumbnail width and height dimensions that prevent fluid images in the_thumbnail
function remove_thumbnail_dimensions( $html ) {
    $html = preg_replace('/(width|height)=\"\d*\"\s/', "", $html);
    return $html;
}


// change the login form
function custom_login_styles() {
    echo '<link rel="stylesheet" type="text/css" href="'.get_stylesheet_directory_uri().'/login/login-styles.css" />';
}

// change logo link on login form
function custom_login_header_url($url) {
    return 'http://grantimbo.com/';
}

// remove wp-admin menus
function remove_menus() {
    if ( current_user_can('administrator') ) {
        // remove_menu_page( 'edit.php' );                                //Tools
        // remove_menu_page( 'tools.php' );                                //Tools
        // remove_menu_page( 'edit-comments.php' );                        //Comments
    }

}

// remove wordpress logo
function activated_adminbar() {
    global $wp_admin_bar;

    $wp_admin_bar->remove_menu('wp-logo');
}


// change the 'Post' label to 'Projects'
function change_post_label() {
    global $menu;
    global $submenu;
    $menu[5][0] = 'Projects';
    $submenu['edit.php'][5][0] = 'Projects';
    $submenu['edit.php'][10][0] = 'Add Project';
    $submenu['edit.php'][16][0] = 'Tags';
}
function change_post_object() {
    global $wp_post_types;

    $labels = &$wp_post_types['post']->labels;
    $icon = &$wp_post_types['post']->menu_icon;

    $labels->name = 'Projects';
    $labels->singular_name = 'Project';
    $labels->add_new = 'Add Project';
    $labels->add_new_item = 'Add Project';
    $labels->edit_item = 'Edit Project';
    $labels->new_item = 'Project';
    $labels->view_item = 'View Project';
    $labels->search_items = 'Search Projects';
    $labels->not_found = 'No Project found';
    $labels->not_found_in_trash = 'No Project found in Trash';
    $labels->all_items = 'All Projects';
    $labels->menu_name = 'Project';
    $labels->name_admin_bar = 'Project';

    $icon = 'dashicons-portfolio';


}


/*------------------------------------*\
    Custom Post Types
\*------------------------------------*/


// Rename Post Formats
function rename_post_formats( $translation, $text, $context, $domain ) {
    $names = array(
        'Aside'  => 'Wide',
        'Gallery' => 'Full',
    );
    if ( $context == 'Post format' ) {
        $translation = str_replace( array_keys( $names ), array_values( $names ), $text );
    }
    return $translation;
}


/*------------------------------------*\
    Actions + Filters + ShortCodes
\*------------------------------------*/

// Add Actions
add_action('init', 'change_post_object' );
add_action('init', 'header_scripts'); // Add Custom Scripts to wp_head
add_action('admin_init','remove_menus');
add_action('admin_menu', 'change_post_label' );
add_action('wp_enqueue_scripts', 'header_styles'); // Add Theme Stylesheet
add_action('init', 'register_menus'); // Add HTML5 Blank Menu
add_action('widgets_init', 'remove_recent_comments_style'); // Remove inline Recent Comment Styles from wp_head()
add_action('login_head', 'custom_login_styles');

// Remove Actions
remove_action('wp_head', 'feed_links_extra', 3); // Display the links to the extra feeds such as category feeds
remove_action('wp_head', 'feed_links', 2); // Display the links to the general feeds: Post and Comment Feed
remove_action('wp_head', 'rsd_link'); // Display the link to the Really Simple Discovery service endpoint, EditURI link
remove_action('wp_head', 'wlwmanifest_link'); // Display the link to the Windows Live Writer manifest file.
remove_action('wp_head', 'index_rel_link'); // Index link
remove_action('wp_head', 'parent_post_rel_link', 10, 0); // Prev link
remove_action('wp_head', 'start_post_rel_link', 10, 0); // Start link
remove_action('wp_head', 'adjacent_posts_rel_link', 10, 0); // Display relational links for the posts adjacent to the current post.
remove_action('wp_head', 'wp_generator'); // Display the XHTML generator that is generated on the wp_head hook, WP version
remove_action('wp_head', 'start_post_rel_link', 10, 0);
remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
remove_action('wp_head', 'rel_canonical');
remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0);

// Add Filters
add_filter( 'script_loader_tag', 'async_scripts', 10, 3 );
add_filter('body_class', 'add_slug_to_body_class'); // Add slug to body class (Starkers build)
add_filter('wp_nav_menu_args', 'my_wp_nav_menu_args'); // Remove surrounding <div> from WP Navigation
add_filter ('wp_nav_menu','current_to_active');
add_filter('nav_menu_css_class', 'custom_wp_nav_menu'); // Remove Navigation <li> injected classes (Commented out by default)
add_filter('nav_menu_item_id', 'custom_wp_nav_menu'); // Remove Navigation <li> injected ID (Commented out by default)
add_filter('page_css_class', 'custom_wp_nav_menu'); // Remove Navigation <li> Page ID's (Commented out by default)
add_filter('the_category', 'remove_category_rel_from_category_list'); // Remove invalid rel attribute
add_filter('style_loader_tag', 'remove_style_tag'); // Remove 'text/css' from enqueued stylesheet
add_filter('post_thumbnail_html', 'remove_thumbnail_dimensions', 10); // Remove width and height dynamic attributes to thumbnails
add_filter('image_send_to_editor', 'remove_thumbnail_dimensions', 10); // Remove width and height dynamic attributes to post images
add_filter( 'login_headerurl', 'custom_login_header_url' );
add_filter( 'gettext_with_context', 'rename_post_formats', 10, 4 );