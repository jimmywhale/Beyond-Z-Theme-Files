<?php
if ( ! isset( $content_width ) ) $content_width = 960;
add_theme_support( 'automatic-feed-links' );
/* ------ Change wpautop priority from 10 to 11 to process shortcodes before adding editor formatting. ------------ */
remove_filter( 'the_content', 'wpautop' );
add_filter( 'the_content', 'wpautop' , 15);
/* Fix for missing mbstring php extension*/
if(!function_exists('mb_detect_encoding')){
	function mb_detect_encoding($content){
		return 'UTF-8';
	}
}

/* ------ Custom settings admin panel ---------------- */
//require_once ('admin/index.php');

/* ------ General functions for clapat themes -------- */
require_once ('clapat/functions.clapat.php');

/* ------ Admin class for clapat themes -------------- */
require_once ('clapat/class.admin.php');

/* ------ Frontend class for clapat themes -------------- */
require_once ('clapat/class.frontend.php');

/* ------ Shortcode class for clapat themes -------------- */
require_once ('clapat/class.shortcode.php');

/* ------ Widgets class for clapat themes -------------- */
require_once ('clapat/class.widgets.php');

