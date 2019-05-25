<?php
/*
 *  Author: Grant Imbo (grantimbo.com)
 *  Description: Site functions for poweredbypen.com
 */

/*------------------------------------*\
	Functions
\*------------------------------------*/

// register REST API
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
        $img = wp_get_attachment_image_src( $object['featured_media'], 'thumbnail' );
        return $img[0];
    }
    return false;
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
// Change Post sub labels
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


// the handles of the enqueued scripts we want to async
function async_scripts( $tag, $handle, $src ) {
    
    $defer_scripts = array( 'pbypScripts' );
    
    if ( in_array( $handle, $defer_scripts ) ) {
       return '<script type="text/javascript" src="' . $src . '" defer ></script>' . "\n";
    }

    return $tag;
}



// Load scripts (header.php)
function header_scripts() {
    if ($GLOBALS['pagenow'] != 'wp-login.php' && !is_admin()) {

    	wp_deregister_script('jquery'); // Deregister WordPress jQuery

        wp_register_script('pbypScripts', get_template_directory_uri() . '/scripts.js', array(), '1.1.4'); // Site Functionalities
        wp_enqueue_script('pbypScripts'); // Enqueue it!

    }

}


// Load styles
function header_styles() {
    wp_register_style('normalize', get_template_directory_uri() . '/css/normalize.min.css', '2.1.3', 'all');
    wp_enqueue_style('normalize'); // Enqueue it!

    wp_register_style('pbypStyles', get_template_directory_uri() . '/style.css', array(), '1.1.14', 'all');
    wp_enqueue_style('pbypStyles'); // Enqueue it!

    // wp_dequeue_style( 'wp-block-library' ); // Remove Gutenberg css

    wp_localize_script('pbypScripts', 'pbypData', array(
        'siteUrl' => get_site_url(),
        // 'nonce' => wp_create_nonce('wp_rest')
    ));

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
    echo '<link rel="stylesheet" type="text/css" href="'.get_stylesheet_directory_uri().'/css/login-styles.css" />';
}


// change logo link on login form
function custom_login_header_url($url) {
    return 'http://poweredbypen.com/';
}

// remove wp-admin menus
function remove_menus() {
    if ( current_user_can('administrator') ) {
        remove_menu_page( 'admin.php' );
        remove_menu_page( 'index.php' );
        // remove_menu_page( 'upload.php' );
        remove_menu_page( 'edit-comments.php' );
        remove_menu_page( 'themes.php' );
        remove_menu_page( 'plugins.php' );
        remove_menu_page( 'users.php' );
        remove_menu_page( 'tools.php' );
        // remove_menu_page( 'options-general.php' );
    }

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
add_filter('style_loader_tag', 'remove_style_tag'); // Remove 'text/css' from enqueued stylesheet
add_filter('post_thumbnail_html', 'remove_thumbnail_dimensions', 10); // Remove width and height dynamic attributes to thumbnails
add_filter('image_send_to_editor', 'remove_thumbnail_dimensions', 10); // Remove width and height dynamic attributes to post images
add_filter( 'login_headerurl', 'custom_login_header_url' );