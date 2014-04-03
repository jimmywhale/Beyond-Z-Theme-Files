<?php
/**************************
*
*	Clapat Studio Framework
*	By Ionut Stoica (http://ionutstoica.info)
*	Created: March 2013
*	Updated: August 2013
*	Version: 1.3
*
***************************/

global $SiteSections;
global $themeRoot;
$SiteSections 	= new stdClass;
$themeRoot = dirname(dirname(__FILE__));

/* ---------- Define scripts loaded by system ----------- */
$SiteScripts 	= array(
	'jquery.easing.1.3.js',
	'jquery.carouFredSel-6.1.0-packed.js',
	'jquery.touchSwipe.min.js',
	'jquery.sticky.js',
	'jquery.parallax-1.1.3.js',
	'jquery.localscroll-1.2.7-min.js',
	'jquery.scrollTo-1.4.3.1-min.js',
	'jquery.cycle.all.js',
	'jquery.maximage.js',
	'jquery.colorbox.js',    
	'isotope.js',	
	'jquery.flexslider.js',
	'jquery.jigowatt.js',
	'jquery.metadata.js',
	'jquery.mb.YTPlayer.js',
	'jquery.nicescroll.js',
	// 'jquery.fitvids.js',
	'SmoothScroll.js',
	// 'jquery.prettyPhoto.js',
	'jquery.magnific-popup.js',
	'main.js',
);
$SiteHeadScripts 	= array(
	// 'royal_preloader.min.js',
);

function combineScripts(){
	global $SiteScripts;
	$ROOT = dirname(dirname(__FILE__));
	$outputFile = $ROOT.'/dynamic/combined.js';
	$f = fopen($outputFile,'w');
	foreach($SiteScripts as $src){
		$content = '
/*
File: '.$src.'
*/
';
		$content .= file_get_contents($ROOT.'/js/'.$src);
		fwrite($f, $content);
		unset($content);
	}
	fclose($f);
}

function siteLogo($data){	
	global $clapat_settings;
		$title = get_bloginfo('name');
		$description = get_bloginfo('description');
		$Logo = '<a href="'.get_home_url().'">'.$title.'<span class="color dot">'.$description.'</span></a>';
		$Style = '';
		$LogoPosition = '';
		if(strlen($data['logo']['src']) > 5){
			if($clapat_settings->clapat_logo_y != '') { $LogoPosition .= ' margin-top:'.$clapat_settings->clapat_logo_y.'px;'; }
			if($clapat_settings->clapat_logo_x != '') { $LogoPosition .= ' margin-left:'.$clapat_settings->clapat_logo_x.'px;'; }
			$Logo = '<a href="'.$data['logo']['url'].'"><img src="'.$data['logo']['src'].'" alt="'.$title.'"></a>';
			$Style .=' class="with-image-logo" ';
		}

		if(isset($data['nav']['bg']) && !empty($data['nav']['bg'])){
			$Style .= 'style="background-image:url(\''.$data['nav']['bg'].'\');"';
		}
		$LogoCode = '<h2 id="logo" style="'.$LogoPosition.'">'.$Logo.'</h2>';
	return array($LogoCode, $Style);
}	

function is_login_page() {
    return in_array($GLOBALS['pagenow'], array('wp-login.php', 'wp-register.php'));
}

function my_mce_buttons_2($buttons) {	
	/**
	 * Add in a core button that's disabled by default
	 */
	$buttons[] = 'sup';
	$buttons[] = 'sub';
	return $buttons;
}


/* ------ Register features for theme --------- */
add_theme_support('post-thumbnails');

add_image_size( 'our-team-thumb', 225, 9999 ); // 225px wide and unlimited height for our team member image
add_image_size( 'portfolio-thumb', 420, 420, true ); // Portfolio 420x420 image (cropped if larger)
//add_image_size( 'homepage-thumb', 220, 180, true ); //(cropped)

/* ------ Define and register hooks to WordPress actions --------*/


/* ------ INIT Hooks --------*/
function clapat_load_styles(){
	$currentPage = (isset($_GET['page']))? $_GET['page'] : '';
	
	/* Load frontend CSS file into page editor to have same look & feel as output when editing content */
	add_editor_style('css/style.css');


	/* Enqueue required scripts for sections editing */
	if($currentPage == 'sections' || $currentPage == 'theme-options'|| $currentPage == 'portfolio-reorder-menu' || substr_count($_SERVER['PHP_SELF'], 'widgets.php') == '1'){
		wp_enqueue_style('thickbox');
		wp_enqueue_style('admin-style', get_template_directory_uri().'/css/admin.css');
		wp_enqueue_style('picker-style', get_template_directory_uri().'/css/colorpicker.css');
	}
	/* Include custom CSS and scripts only on frontend */
	if(!is_admin() && !is_login_page()){
		wp_enqueue_style('main-style'		, get_template_directory_uri().'/css/style.css');
		wp_enqueue_style('colorbox-style'	, get_template_directory_uri().'/css/colorbox.css');
		wp_enqueue_style('magnific-popup-style'		, get_template_directory_uri().'/css/magnific-popup.css');
		wp_enqueue_style('flexslider-style'	, get_template_directory_uri().'/css/flexslider.css');
		wp_enqueue_style('skin-style'	, get_template_directory_uri().'/dynamic/skin.css');
		wp_enqueue_style('custom-fonts'	, get_template_directory_uri().'/dynamic/custom-fonts.css');
		wp_enqueue_style('font-awesome'	, get_template_directory_uri().'/css/font-awesome.min.css');
		// wp_enqueue_style('prettyPhoto'	, get_template_directory_uri().'/css/prettyPhoto.css');
		// wp_enqueue_style('royalLoader'	, get_template_directory_uri().'/css/royal_preloader.css');
		$theme  = wp_get_theme();
		wp_register_style( 'font-awesome-ie7', get_stylesheet_directory_uri() . '/css/ie.css', false, $theme['Version'] );
		$GLOBALS['wp_styles']->add_data( 'font-awesome-ie7', 'conditional', 'IE 7' );
		wp_enqueue_style( 'font-awesome-ie7' );
		
		$file = dirname(dirname(__FILE__)).'/dynamic/override.css';
		if(file_exists($file)){
			wp_enqueue_style('override-css'	, get_template_directory_uri().'/dynamic/override.css', 'skin-style');
		}
	}
}



function clapat_load_scripts(){
	global $SiteScripts, $SiteHeadScripts; 
	
	$currentPage = (isset($_GET['page']))? $_GET['page'] : '';
	
	/* Load jQuery in any case */
	wp_enqueue_script('jquery');
	
	/* Load frontend CSS file into page editor to have same look & feel as output when editing content */
	add_editor_style('css/style.css');
	
	wp_enqueue_script('jquery-ui-tabs');
	wp_enqueue_script('jquery-ui-accordion');
	
	if(is_admin()){
		wp_enqueue_script('clapat-adm', get_template_directory_uri().'/js/admin.js', 'jquery-ui-tabs');
		wp_localize_script( 'clapat-adm', 'MyAjax', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ),'clapat_settings_nonce' => wp_create_nonce( 'myajax-clapat' ) ) );
		wp_localize_script( 'clapat-adm', 'ionutShortcodes', array('plugin_folder' => get_template_directory_uri() .'/') );
	}
	/* Enqueue required scripts for sections editing */
	if($currentPage == 'sections' || $currentPage == 'theme-options' || $currentPage == 'portfolio-reorder-menu' || substr_count($_SERVER['PHP_SELF'], 'widgets.php') == '1'){
		wp_enqueue_script('media-upload');
		wp_enqueue_script('thickbox');
		wp_enqueue_script('jquery-ui-core');
		wp_enqueue_script('jquery-ui-dropable');
		wp_enqueue_script('jquery-ui-dragable');
		wp_enqueue_script('jquery-ui-selectable');
		wp_enqueue_script('jquery-ui-sortable','jquery');
		wp_enqueue_script(
			'colorPicker',
			get_template_directory_uri() . '/js/colorpicker.js',
			array('jquery')
		);
	}
	/* Include custom CSS and scripts only on frontend */
	if(!is_admin() && !is_login_page()){
		$theme  = wp_get_theme();
		$Index = 0;
		$baseJSUrl = get_template_directory_uri().'/js/';
		
		/*
		Get general settings
		*/
		$clapat_settings 			= @json_decode(get_option('clapat_general_settings'));
		if(!isset($clapat_settings)) $clapat_settings = new stdClass();
		if(isset($clapat_settings->clapat_use_combine) && $clapat_settings->clapat_use_combine == '1'){
			$baseJSUrl = get_template_directory_uri().'/dynamic/';
			$SiteScripts 	= array('combined.js');
		}
		foreach($SiteScripts as $scriptURL){
			wp_enqueue_script('clapat-'.$Index, $baseJSUrl.$scriptURL, 'jquery', '1.0.0', true); 
			$Index++;
		}
		foreach($SiteHeadScripts as $scriptURL){
			wp_enqueue_script('clapat-'.$Index, $baseJSUrl.$scriptURL, 'jquery', '1.0.0', false); 
			$Index++;
		}
		
		
		wp_localize_script( 'jquery', 'MyAjax', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ),'clapat_settings_nonce' => wp_create_nonce( 'myajax-clapat' ) ) );
		
		wp_enqueue_script('google-maps', 'http://maps.google.com/maps/api/js?sensor=false', 'jquery', true);
	}
	
	if ( is_singular() ) wp_enqueue_script( "comment-reply" );
}
// Load scripts & styles into frontend
add_action('wp_enqueue_scripts', 'clapat_load_styles');
add_action('wp_enqueue_scripts', 'clapat_load_scripts');
// Load scripts & styles into admin
add_action('admin_enqueue_scripts', 'clapat_load_styles');
add_action('admin_enqueue_scripts', 'clapat_load_scripts');


function clapat_init(){
	global $SiteSections;


	$SiteSections = @json_decode(get_option('clapat_sections'));
	
	/* --------- Register custom taxonomy ---------- */
  $labels = array(
    'name'                => _x( 'Category', 'taxonomy general name','clapat' ),
    'singular_name'       => _x( 'Category', 'taxonomy singular name','clapat' ),
    'search_items'        => __( 'Search Categories','clapat' ),
    'all_items'           => __( 'All Categories','clapat' ),
    'parent_item'         => __( 'Parent Category','clapat' ),
    'parent_item_colon'   => __( 'Parent Category:','clapat' ),
    'edit_item'           => __( 'Edit Category','clapat' ), 
    'update_item'         => __( 'Update Category','clapat' ),
    'add_new_item'        => __( 'Add New Category','clapat' ),
    'new_item_name'       => __( 'New Category','clapat' ),
    'menu_name'           => __( 'Categories','clapat' )
  ); 	

  $args = array(
    'hierarchical'        => true,
    'labels'              => $labels,
    'show_ui'             => true,
    'show_admin_column'   => true,
    'query_var'           => true,
    'rewrite'             => array( 'slug' => 'portfolio-category' )
  );

  register_taxonomy( 'portfolio-category', 'portfolio', $args );
  
	
	
	/* --------- Register custom post type --------- */
		// Slides labels: Defines what labels are shown on administrator panel when managing Slides
	  $labels = array(
		'name' 				=> _x('News', 'post type general name', 'clapat'),
		'singular_name' 	=> _x('News', 'post type singular name', 'clapat'),
		'add_new' 			=> _x('Add New', 'book', 'clapat'),
		'add_new_item' 		=> __('Add New story', 'clapat'),
		'edit_item' 		=> __('Edit story', 'clapat'),
		'new_item' 			=> __('New story', 'clapat'),
		'all_items' 		=> __('All news', 'clapat'),
		'view_item' 		=> __('View news', 'clapat'),
		'search_items'	 	=> __('Search news', 'clapat'),
		'not_found' 		=> __('No story found', 'clapat'),
		'not_found_in_trash' => __('No story found in Trash', 'clapat'), 
		'parent_item_colon' => '',
		'menu_name' 		=> __('News', 'clapat'),
	  );
	  // Arguments
	  $args = array(
		'labels' 			=> $labels,
		'public'			=> true,
		'publicly_queryable'=> true,
		'show_ui' 			=> true,
		'show_in_menu'		=> true,
		'query_var' 		=> true,
		'rewrite' 			=> array( 'slug' => _x( 'news-item', 'URL slug', 'clapat' ) ),
		'capability_type' 	=> 'post',
		'has_archive' 		=> true,
		'hierarchical' 		=> false,
		'menu_position' 	=> null,
		'supports' 			=> array( 'title', 'editor', 'thumbnail' )
	  ); 
	  register_post_type('news-item', $args);
	  /*
	  Update database before loading new theme:
	  UPDATE `wp_posts` SET `post_type` = 'news-item' WHERE `post_type` = 'post'
	  */
	  
	  
		  // Slides labels: Defines what labels are shown on administrator panel when managing Slides
	  $labels = array(
		'name' 				=> _x('Home Slider', 'post type general name', 'clapat'),
		'singular_name' 	=> _x('Home Slider', 'post type singular name', 'clapat'),
		'add_new' 			=> _x('Add New', 'book', 'clapat'),
		'add_new_item' 		=> __('Add New Slide', 'clapat'),
		'edit_item' 		=> __('Edit Slide', 'clapat'),
		'new_item' 			=> __('New Slide', 'clapat'),
		'all_items' 		=> __('All Slides', 'clapat'),
		'view_item' 		=> __('View Slides', 'clapat'),
		'search_items'	 	=> __('Search Slides', 'clapat'),
		'not_found' 		=> __('No Slide found', 'clapat'),
		'not_found_in_trash' => __('No Slide found in Trash', 'clapat'), 
		'parent_item_colon' => '',
		'menu_name' 		=> __('Home slider', 'clapat'),
	  );
	  // Arguments
	  $args = array(
		'labels' 			=> $labels,
		'public'			=> true,
		'publicly_queryable'=> true,
		'show_ui' 			=> true,
		'show_in_menu'		=> true,
		'query_var' 		=> true,
		'rewrite' 			=> array( 'slug' => _x( 'full-slider', 'URL slug', 'clapat' ) ),
		'capability_type' 	=> 'page',
		'has_archive' 		=> true,
		'hierarchical' 		=> false,
		'menu_position' 	=> null,
		'supports' 			=> array( 'title', 'editor', 'thumbnail', 'page-attributes' )
	  ); 
	  register_post_type('full-slider', $args);
	  
	  // team members labels: Defines what labels are shown on administrator panel when managing team members
	  $labels = array(
		'name' 				=> _x('Our Team', 'post type general name', 'clapat'),
		'singular_name' 	=> _x('Our Team', 'post type singular name', 'clapat'),
		'add_new' 			=> _x('Add New', 'book', 'clapat'),
		'add_new_item' 		=> __('Add New Team Member', 'clapat'),
		'edit_item' 		=> __('Edit Team Member', 'clapat'),
		'new_item' 			=> __('New Team Member', 'clapat'),
		'all_items' 		=> __('All Team Members', 'clapat'),
		'view_item' 		=> __('View Team Members', 'clapat'),
		'search_items'	 	=> __('Search Team Members', 'clapat'),
		'not_found' 		=> __('No team Member found', 'clapat'),
		'not_found_in_trash' => __('No team Member found in Trash', 'clapat'), 
		'parent_item_colon' => '',
		'menu_name' 		=> __('Our team', 'clapat'),
	  );
	  // Arguments
	  $args = array(
		'labels' 			=> $labels,
		'public'			=> true,
		'publicly_queryable'=> true,
		'show_ui' 			=> true,
		'show_in_menu'		=> true,
		'query_var' 		=> true,
		'rewrite' 			=> array( 'slug' => _x( 'our-team', 'URL slug', 'clapat' ) ),
		'capability_type' 	=> 'page',
		'has_archive' 		=> true,
		'hierarchical' 		=> false,
		'menu_position' 	=> null,
		'supports' 			=> array( 'title', 'editor', 'thumbnail', 'page-attributes' )
	  ); 
	  register_post_type('our-team', $args);
	  
	  
	// Testimonials labels: Defines what labels are shown on administrator panel when managing Testimonials
	$labels = array(
		'name' 				=> _x('Testimonials', 'post type general name', 'clapat'),
		'singular_name' 	=> _x('Testimonials', 'post type singular name', 'clapat'),
		'add_new' 			=> _x('Add New', 'testimonial', 'clapat'),
		'add_new_item' 		=> __('Add Testimonial', 'clapat'),
		'edit_item' 		=> __('Edit Testimonial', 'clapat'),
		'new_item' 			=> __('New Testimonial', 'clapat'),
		'all_items' 		=> __('All Testimonials', 'clapat'),
		'view_item' 		=> __('View Testimonials', 'clapat'),
		'search_items'	 	=> __('Search Testimonials', 'clapat'),
		'not_found' 		=> __('No Testimonial found', 'clapat'),
		'not_found_in_trash' => __('No Testimonial found in Trash', 'clapat'), 
		'parent_item_colon' => '',
		'menu_name' 		=> __('Testimonials', 'clapat'),
	);
	// Arguments
	$args = array(
		'labels' 			=> $labels,
		'public'			=> true,
		'publicly_queryable'=> true,
		'show_ui' 			=> true,
		'show_in_menu'		=> true,
		'query_var' 		=> true,
		'rewrite' 			=> array( 'slug' => _x( 'testimonial', 'URL slug', 'clapat' ) ),
		'capability_type' 	=> 'page',
		'has_archive' 		=> false,
		'hierarchical' 		=> false,
		'menu_position' 	=> null,
		'supports' 			=> array( 'title', 'editor')
	); 
	register_post_type('testimonial', $args);
	
	// Clients labels: Defines what labels are shown on administrator panel when managing Clients
	$labels = array(
		'name' 				=> _x('Clients', 'post type general name', 'clapat'),
		'singular_name' 	=> _x('Clients', 'post type singular name', 'clapat'),
		'add_new' 			=> _x('Add New', 'client', 'clapat'),
		'add_new_item' 		=> __('Add New Client', 'clapat'),
		'edit_item' 		=> __('Edit Client', 'clapat'),
		'new_item' 			=> __('New Client', 'clapat'),
		'all_items' 		=> __('All Clients', 'clapat'),
		'view_item' 		=> __('View Clients', 'clapat'),
		'search_items'	 	=> __('Search Clients', 'clapat'),
		'not_found' 		=> __('No Client found', 'clapat'),
		'not_found_in_trash' => __('No Client found in Trash', 'clapat'), 
		'parent_item_colon' => '',
		'menu_name' 		=> __('Clients', 'clapat'),
	);
	// Arguments
	$args = array(
		'labels' 			=> $labels,
		'public'			=> true,
		'publicly_queryable'=> true,
		'show_ui' 			=> true,
		'show_in_menu'		=> true,
		'query_var' 		=> true,
		'rewrite' 			=> array( 'slug' => _x( 'client', 'URL slug', 'clapat' ) ),
		'capability_type' 	=> 'page',
		'has_archive' 		=> false,
		'hierarchical' 		=> false,
		'menu_position' 	=> null,
		'supports' 			=> array( 'title', 'thumbnail')
	); 
	register_post_type('client', $args);
	   
	  // Portfolio labels: Defines what labels are shown on administrator panel when managing Portfolio 
	  $labels = array(
		'name' 				=> _x('Portfolio', 'post type general name', 'clapat'),
		'singular_name' 	=> _x('Portfolio', 'post type singular name', 'clapat'),
		'add_new' 			=> _x('Add New', 'book', 'clapat'),
		'add_new_item' 		=> __('Add New Portfolio Item', 'clapat'),
		'edit_item' 		=> __('Edit Portfolio Item', 'clapat'),
		'new_item' 			=> __('New Portfolio Item', 'clapat'),
		'all_items' 		=> __('All Portfolio', 'clapat'),
		'view_item' 		=> __('View Portfolio', 'clapat'),
		'search_items'	 	=> __('Search Portfolio', 'clapat'),
		'not_found' 		=> __('No Portfolio Item found', 'clapat'),
		'not_found_in_trash' => __('No Portfolio Item found in Trash', 'clapat'), 
		'parent_item_colon' => '',
		'menu_name' 		=> __('Portfolio', 'clapat'),
	  );
	  // Arguments
	  $args = array(
		'labels' 			=> $labels,
		'public'			=> true,
		'publicly_queryable'=> true,
		'show_ui' 			=> true,
		'show_in_menu'		=> true,
		'query_var' 		=> true,
		'rewrite' 			=> array( 'slug' => _x( 'portfolio', 'URL slug', 'clapat' ) ),
		'capability_type' 	=> 'page',
		'has_archive' 		=> true,
		'hierarchical' 		=> false,
		'menu_position' 	=> null,
		'supports' 			=> array( 'title', 'editor', 'thumbnail', 'page-attributes', 'portfolio-category' ),
		'taxonomies' 		=> array('portfolio-category','tags'),
	  ); 
	  register_post_type('portfolio', $args);
	  
	  
	  
	  
	  
	/* Tiny MCE setup */
	add_filter( 'mce_external_plugins', 'add_rich_plugins' );
	add_filter( 'mce_buttons', 'register_rich_buttons' );
	add_filter('mce_buttons', 'my_mce_buttons_2');

}
add_action('init', 'clapat_init');

function clapat_widget_init(){
	$args = array(
		'name'          => __( 'Default sidebar', 'clapat' ),
		'id'            => 'sidebar-0',
		'description'   => '',
		'class'         => '',
		'before_widget' => '<li id="%1$s" class="widget %2$s">',
		'after_widget'  => '</li>',
		'before_title'  => '<h2 class="widgettitle">',
		'after_title'   => '</h2>' );
	register_sidebar( $args );
}
add_action('widgets_init', 'clapat_widget_init');



	function add_rich_plugins( $plugin_array ){
		$plugin_array['ionutShortcodes'] = get_template_directory_uri().'/js/mce_plugin.js';
		return $plugin_array;
	}

	function register_rich_buttons( $buttons ){
		array_push( $buttons, "|", 'ionut_button' );
		return $buttons;
	}




function clapat_setup(){
    load_theme_textdomain('clapat', get_template_directory() . '/lang');
	// This theme supports a variety of post formats.
	add_theme_support( 'post-formats', array( 'quote', 'video', 'image', 'audio','gallery' ) );

}
add_action('after_setup_theme', 'clapat_setup');

/* ---- Admin Hooks ---- */

function clapat_addmenu() {
	add_theme_page(__('Site Sections', 'clapat'),  __('Site Sections', 'clapat'), 'manage_options', 'sections', array('ClapatAdmin', 'sections')); 
	add_theme_page(__('Theme options', 'clapat'),  __('Theme options', 'clapat'), 'manage_options', 'theme-options', array('ClapatAdmin', 'admin'));
}
add_action('admin_menu', 'clapat_addmenu');

/* ---- Post & metabox hooks -------- */
function add_clapat_meta_box() {
	add_meta_box( 
        'team-member-info',
        'Member information',
        'teamMemberOptions',
        'our-team',
        'side',
        'high'
    );
	
	add_meta_box( 
        'portfolio-settings',
        'Item advanced settings',
        'portfolioOptions',
        'portfolio',
        'advanced',
        'high'
    );
	
	add_meta_box( 
        'gallery-item',
        'News gallery',
        'newsOptions',
        'news-item',
        'advanced',
        'high'
    );
	
	add_meta_box( 
        'client-item',
        'Client URL',
        'clientOptions',
        'client',
        'advanced',
        'high'
    );
	
	
	add_meta_box( 
        'post',
        'Advanced options',
        'postOptions',
        'post',
        'advanced',
        'high'
    );
	
	
		add_meta_box( 
        'page',
        'Advanced options',
        'parallaxOptions',
        'page',
        'advanced',
        'high'
    );
	
	
	

}
add_action( 'add_meta_boxes', 'add_clapat_meta_box' );

function postOptions ( $post, $metabox ) {
	$clapat 	= get_post_meta($post->ID,'clapat_advanced', true);
	$details 	= array();
	if($clapat != null){
		$details = (array) json_decode($clapat);
	}
	$audio 		= (isset($details['audio']))? $details['audio'] : '';
	$video 		= (isset($details['video']))? $details['video'] : '';
	$image 		= (isset($details['image']))? $details['image'] : '';
	$parallax  	= (isset($details['parallaxactive']))? $details['parallaxactive'] : '0';
	$parallaximg= (isset($details['parallaximg']))? $details['parallaximg'] : '';
	$parallaxspd= (isset($details['parallaxspd']))? $details['parallaxspd'] : '0.3';
	$parallaxh	= (isset($details['parallaxh']))? $details['parallaxh'] : '200';
	$parallaxtxt= (isset($details['parallaxtxt']))? $details['parallaxtxt'] : '';
	
	$ThemeRoot = get_template_directory_uri();
	$pf = get_post_format($post->ID);
	
	
	echo '
<style>
.clapat_metabox span.grid { margin-top:10px; display:block; }
.clapat_metabox input[type="text"] { width:100%; }
.clapat_metabox .nosort li { position:relative; background:#fff; display:inline-block; *diplay:inline; zoom:1; margin:5px; padding:5px 20px; }
.clapat_metabox .nosort li img { vertical-align: text-bottom; }
.clapat_metabox .nosort li img:hover { cursor:pointer; }
.clapat_metabox .nosort .dragable { cursor:pointer; width:15px; height:100%; position:absolute; left:0; top:0; }
.clapat_metabox .nosort .ui-sortable-helper { background:#ff9;  }
.clapat_metabox .close { display:none; width:16px; height:16px; text-decoration:none; font-size:14px; font-weight:bold; color:#000; position:absolute; top:2px; right:0; }
.clapat_metabox li:hover .close { display:block; }
.clapat_metabox li.photo { width: 150px; height:120px; }
.clapat_metabox li.photo .photopreview { cursor:pointer;  width: 150px; height:78px; overflow:hidden; margin-bottom:10px; background:#fcfcfc; border:1px solid #ddd;}
.clapat_metabox li.photo input { width: 120px; }
.clapat_metabox .oneof4,
.clapat_metabox .threeof4 { float:left;}
.clapat_metabox .oneof4 { width:300px;  }
.clapat_metabox .oneof4 input[type=text] { width:250px; }
.clapat_metabox .threeof4 textarea { min-height:100px; }
</style>

<script>
function addImage(container, append){
	var $ = jQuery;
	var temp = \'<li class="photo"><div class="photopreview upload_image_prev"></div><input type="text" name="clapat[photos][]" class="upload_image" value=""> 	<img class="upload_image_button" src="'.$ThemeRoot.'/images/admin/eye.png"><a href="#" class="close">X</a><div class="dragable"> </div></li>\';
	if($(container).length > 0){
		if(typeof append == "undefined"){
			$(container).prepend(temp);
		}else {
			$(container).append(temp);
		}
	}
}
jQuery(function($){

	$("#post-formats-select input[type=radio]").click(function(e){
		val = $(this).attr("value");
		$(".clapat_metabox .pformat").hide();
		$(".clapat_metabox .pformat#postf-"+val).show()
	});

	$(".clapat_metabox .sortable").sortable();
	$(".clapat_metabox .close").live("click", function(e){
		e.preventDefault();
		e.stopPropagation();
		$(this).parent().fadeOut(function(){ $(this).remove()});
	});


			var lastOpenedObject = false;
			jQuery(".upload_image_button, .upload_image_prev").live("click", function(e) {
				e.preventDefault();
				if($(this).hasClass("upload_image_prev")){
					lastOpenedObject = jQuery(this).next(".upload_image");
				}else {
					lastOpenedObject = jQuery(this).prev(".upload_image");
				}
			 formfield = lastOpenedObject.attr("name");
			 tb_show("", "media-upload.php?type=image&amp;TB_iframe=true");
			 return false;
			});

			
	window.original_send_to_editor = window.send_to_editor;
    window.send_to_editor = function( html ) {
        imgurl = jQuery("img",html).attr("src");
		if(lastOpenedObject != false){
			lastOpenedObject.val(imgurl);
			lastOpenedObject.prev().html(\'<img src="\'+imgurl+\'" width="100%">\');
			lastOpenedObject = false;
		} else {
            window.original_send_to_editor(html);
        }
		 tb_remove();
    };			
})

</script>
';
	echo '
		<div class="clapat_metabox">
		<input type="hidden" name="clapat_action" value="post">';
		
	echo '<div id="postf-0" class="pformat" style="'.(($pf != '')? 'display:none':'').'">';
//	echo __('No advanced option available for this post format','clapat');
	
	echo '</div><div id="postf-quote" class="pformat" style="'.(($pf != 'quote')? 'display:none':'').'">';
	
	echo __('Tip','clapat') . ': ' . __('Post title is quote name and post content is quote content','clapat');
	echo '</div><div id="postf-audio" class="pformat" style="'.(($pf != 'audio')? 'display:none':'').'">';
	
	echo '<h4>'.__('Soundcloud URL','clapat').'</h4>
		<input type="text" name="clapat[audio]" value="'.$audio.'"><br style="clear:both">
	';
	
	echo '</div><div id="postf-video" class="pformat" style="'.(($pf != 'video')? 'display:none':'').'">';
	echo '<h4>'.__('Youtube/Vimeo URL','clapat').'</h4>
		<input type="text" name="clapat[video]" value="'.$video.'"><br style="clear:both">
	';
	
	echo '</div><div id="postf-image" class="pformat" style="'.(($pf != 'image')? 'display:none':'').'">';
	echo '<h4>'.__('Post image','clapat').'</h4>
	<ul class="nosort">
		<li class="photo">
					<div class="photopreview upload_image_prev"><img src="'.$image.'" width="100%"></div>
					<input type="text" name="clapat[image]" class="upload_image" value="'.$image.'"> 	
					<img class="upload_image_button" src="'.$ThemeRoot.'/images/admin/eye.png">		
		</li></ul>
	';
	
	
	echo '</div><div id="postf-gallery" class="pformat" style="'.(($pf != 'gallery')? 'display:none':'').'">';	
	/* Gallery */
	echo '<h4>'.__('Image gallery','clapat').'</h4>
	<small>'.__('Tip','clapat').': '.__('You can drag & drop fields to change order displayed into project page.','clapat').'</small><br>
	<a href="#" onClick="addImage(\'#portfolio_gallery\', true); return false;">Add image</a>
	<ul class="nosort sortable" id="portfolio_gallery">';
		if(isset($details['photos']) && count($details['photos']) > 0){
			foreach($details['photos'] as $photo){
				echo '
			<li class="photo">
					<div class="photopreview upload_image_prev"><img src="'.$photo.'" width="100%"></div>
					<input type="text" name="clapat[photos][]" class="upload_image" value="'.$photo.'"> 	
					<img class="upload_image_button" src="'.$ThemeRoot.'/images/admin/eye.png">		
					<a href="#" class="close">X</a>
					<div class="dragable"> </div>	
				</li>';
			}
		}else {
			echo '
	<li class="photo">
		<div class="photopreview upload_image_prev"></div>
		<input type="text" name="clapat[photos][]" class="upload_image" value=""> 	
		<img class="upload_image_button" src="'.$ThemeRoot.'/images/admin/eye.png">		
		<a href="#" class="close">X</a>
		<div class="dragable"> </div>	
	</li>
	';
		
		}
	echo '</ul>';
	echo '</div>';
			
	echo '<h4>'.__('Parallax','clapat').'</h4>
	<div class="oneof4">
		Attach parallax section at the end of the post:<br>
		<input type="radio" name="clapat[parallaxactive]" value="0" '.(($parallax != '1')?' checked="checked"':'').'> No
		<input type="radio" name="clapat[parallaxactive]" value="1" '.(($parallax == '1')?' checked="checked"':'').'> Yes
		<br>
		
		Parallax Image:<br>
		<div class="photopreview upload_image_prev" style="display:none;"><img src="'.$parallaximg.'"/></div>
		
		
		<input type="text" name="clapat[parallaximg]" class="upload_image" value="'.$parallaximg.'"> 	
		<img class="upload_image_button" src="'.$ThemeRoot.'/images/admin/eye.png">		
		
		Parallax Speed:<br>
		<input type="text" name="clapat[parallaxspd]" class="upload_image" value="'.$parallaxspd.'"> 	<br>
		Parallax Height:<br>
		<input type="text" name="clapat[parallaxh]" class="upload_image" value="'.$parallaxh.'"> 	<br>
		
		</div>
		<div class="threeof4">
		Parallax content:<br>'; 
		
		wp_editor( $parallaxtxt, 'parallax', array('textarea_name'=>'clapat[parallaxtxt]') );
		
		echo '
		</div>
		<br style="clear:both;">
	</div>
	';
	
	
	 

}

function parallaxOptions( $post, $metabox){
$clapat 	= get_post_meta($post->ID,'clapat_advanced', true);
	$details 	= array();
	if($clapat != null){
		$details = (array) json_decode($clapat);
	}
	// $audio 		= (isset($details['audio']))? $details['audio'] : '';
	// $video 		= (isset($details['video']))? $details['video'] : '';
	// $image 		= (isset($details['image']))? $details['image'] : '';
	$parallax  	= (isset($details['parallaxactive']))? $details['parallaxactive'] : '0';
	$parallaximg= (isset($details['parallaximg']))? $details['parallaximg'] : '';
	$parallaxspd= (isset($details['parallaxspd']))? $details['parallaxspd'] : '0.3';
	$parallaxh	= (isset($details['parallaxh']))? $details['parallaxh'] : '200';
	$parallaxtxt= (isset($details['parallaxtxt']))? $details['parallaxtxt'] : '';
	$ThemeRoot = get_template_directory_uri();
	echo '


<style>
.clapat_metabox span.grid { margin-top:10px; display:block; }
.clapat_metabox input[type="text"] { width:100%; }
.clapat_metabox .nosort li { position:relative; background:#fff; display:inline-block; *diplay:inline; zoom:1; margin:5px; padding:5px 20px; }
.clapat_metabox .nosort li img { vertical-align: text-bottom; }
.clapat_metabox .nosort li img:hover { cursor:pointer; }
.clapat_metabox .nosort .dragable { cursor:pointer; width:15px; height:100%; position:absolute; left:0; top:0; }
.clapat_metabox .nosort .ui-sortable-helper { background:#ff9;  }
.clapat_metabox .close { display:none; width:16px; height:16px; text-decoration:none; font-size:14px; font-weight:bold; color:#000; position:absolute; top:2px; right:0; }
.clapat_metabox li:hover .close { display:block; }
.clapat_metabox li.photo { width: 150px; height:120px; }
.clapat_metabox li.photo .photopreview { cursor:pointer;  width: 150px; height:78px; overflow:hidden; margin-bottom:10px; background:#fcfcfc; border:1px solid #ddd;}
.clapat_metabox li.photo input { width: 120px; }
.clapat_metabox .oneof4,
.clapat_metabox .threeof4 { float:left;}
.clapat_metabox .oneof4 { width:300px;  }
.clapat_metabox .oneof4 input[type=text] { width:250px; }
.clapat_metabox .threeof4 textarea { min-height:100px; }
</style>

<script>
function addImage(container, append){
	var $ = jQuery;
	var temp = \'<li class="photo"><div class="photopreview upload_image_prev"></div><input type="text" name="clapat[photos][]" class="upload_image" value=""> 	<img class="upload_image_button" src="'.$ThemeRoot.'/images/admin/eye.png"><a href="#" class="close">X</a><div class="dragable"> </div></li>\';
	if($(container).length > 0){
		if(typeof append == "undefined"){
			$(container).prepend(temp);
		}else {
			$(container).append(temp);
		}
	}
}
jQuery(function($){

	$("#post-formats-select input[type=radio]").click(function(e){
		val = $(this).attr("value");
		$(".clapat_metabox .pformat").hide();
		$(".clapat_metabox .pformat#postf-"+val).show()
	});

	$(".clapat_metabox .sortable").sortable();
	$(".clapat_metabox .close").live("click", function(e){
		e.preventDefault();
		e.stopPropagation();
		$(this).parent().fadeOut(function(){ $(this).remove()});
	});


			var lastOpenedObject = false;
			jQuery(".upload_image_button, .upload_image_prev").live("click", function(e) {
				e.preventDefault();
				if($(this).hasClass("upload_image_prev")){
					lastOpenedObject = jQuery(this).next(".upload_image");
				}else {
					lastOpenedObject = jQuery(this).prev(".upload_image");
				}
			 formfield = lastOpenedObject.attr("name");
			 tb_show("", "media-upload.php?type=image&amp;TB_iframe=true");
			 return false;
			});

			
	window.original_send_to_editor = window.send_to_editor;
    window.send_to_editor = function( html ) {
        imgurl = jQuery("img",html).attr("src");
		if(lastOpenedObject != false){
			lastOpenedObject.val(imgurl);
			lastOpenedObject.prev().html(\'<img src="\'+imgurl+\'" width="100%">\');
			lastOpenedObject = false;
		} else {
            window.original_send_to_editor(html);
        }
		 tb_remove();
    };			
})

</script>	
	<h4>'.__('Parallax','clapat').'</h4>
	<input type="hidden" name="clapat_action" value="page">
	<div class="oneof4">
		Attach parallax section at the end of the page <small>(Only for individual pages. For one page set parallax in section manager)</small>:<br>
		<input type="radio" name="clapat[parallaxactive]" value="0" '.(($parallax != '1')?' checked="checked"':'').'> No
		<input type="radio" name="clapat[parallaxactive]" value="1" '.(($parallax == '1')?' checked="checked"':'').'> Yes
		<br>
		
		Parallax Image:<br>
		<div class="photopreview upload_image_prev" style="display:none;"><img src="'.$parallaximg.'"/></div>
		
		
		<input type="text" name="clapat[parallaximg]" class="upload_image" value="'.$parallaximg.'"> 	
		<img class="upload_image_button" src="'.$ThemeRoot.'/images/admin/eye.png">		<br>
		
		Parallax Speed:<br>
		<input type="text" name="clapat[parallaxspd]" class="upload_image" value="'.$parallaxspd.'"> 	<br>
		Parallax Height:<br>
		<input type="text" name="clapat[parallaxh]" class="upload_image" value="'.$parallaxh.'"> 	<br>
		
		</div>
		<div class="threeof4">
		Parallax content:<br>'; 
		
		wp_editor( $parallaxtxt, 'parallax', array('textarea_name'=>'clapat[parallaxtxt]') );
		
		echo '
		</div>

	';

}

function clientOptions ( $post, $metabox ) {
	$clapat 	= get_post_meta($post->ID,'clapat_client', true);
	$details 	= array();
	if($clapat != null){
		$details = (array) json_decode($clapat);
	}
	$url 		= (isset($details['url']))? $details['url'] : '';

	echo '
	<style>
	.clapat_metabox span.grid { margin-top:10px; display:block; }
	.clapat_metabox input[type="text"] { width:100%; }
	</style>
	<div class="clapat_metabox">
		<input type="hidden" name="clapat_action" value="client">
		<span class="grid">Client URL:</span> 
		<input type="text" name="clapat[url]" value="'.$url.'"><br style="clear:both">
	</div>
	';

}

function teamMemberOptions ( $post, $metabox ) {
	$clapat 	= get_post_meta($post->ID,'clapat_memberinfo', true);
	$details 	= array();
	if($clapat != null){
		$details = (array) json_decode($clapat);
	}
	$title 		= (isset($details['title']))? $details['title'] : '';
	$facebook 	= (isset($details['facebook']))? $details['facebook'] : '';
	$twitter 	= (isset($details['twitter']))? $details['twitter'] : '';
	$google 	= (isset($details['google']))? $details['google'] : '';
	$linkedin 	= (isset($details['linkedin']))? $details['linkedin'] : '';
	echo '
	<style>
	.clapat_metabox span.grid { margin-top:10px; display:block; }
	.clapat_metabox input[type="text"] { width:100%; }
	</style>
	<div class="clapat_metabox">
		<input type="hidden" name="clapat_action" value="member-info">

		<span class="grid">Member Title:</span> 
		<input type="text" name="clapat[title]" value="'.$title.'"><br style="clear:both">
		<span class="grid">Facebook URL:</span> 
		<input type="text" name="clapat[facebook]" value="'.$facebook.'"><br style="clear:both">
		<span class="grid">Twitter URL:</span> 
		<input type="text" name="clapat[twitter]" value="'.$twitter.'"><br style="clear:both">
		<span class="grid">Google URL:</span> 
		<input type="text" name="clapat[google]" value="'.$google.'"><br style="clear:both">
		<span class="grid">Linked In URL:</span> 
		<input type="text" name="clapat[linkedin]" value="'.$linkedin.'"><br style="clear:both">
	</div>
	';

}

function portfolioOptions ( $post, $metabox ) {
	$clapat 	= get_post_meta($post->ID,'clapat_portfolio', true);
	$details 	= array();
	if($clapat != null){
		$details = (array) json_decode($clapat);
	}
	$title 		= (isset($details['title']))? $details['title'] : '';
	$videourl 		= (isset($details['videourl']))? $details['videourl'] : '';
	$ThemeRoot = get_template_directory_uri();
echo '
<style>
.clapat_metabox span.grid { margin-top:10px; display:block; }
.clapat_metabox input[type="text"] { width:100%; }
.clapat_metabox .sortable li { position:relative; background:#fff; display:inline-block; *diplay:inline; zoom:1; margin:5px; padding:5px 20px; }
.clapat_metabox .sortable li img { vertical-align: text-bottom; }
.clapat_metabox .sortable li img:hover { cursor:pointer; }
.clapat_metabox .sortable .dragable { cursor:pointer; width:15px; height:100%; position:absolute; left:0; top:0; }
.clapat_metabox .sortable .ui-sortable-helper { background:#ff9;  }
.clapat_metabox .close { display:none; width:16px; height:16px; text-decoration:none; font-size:14px; font-weight:bold; color:#000; position:absolute; top:2px; right:0; }
.clapat_metabox li:hover .close { display:block; }
.clapat_metabox li.photo { width: 300px; height:120px; }
.clapat_metabox li.photo .photopreview { cursor:pointer;  width: 150px; height:78px; overflow:hidden; margin-bottom:10px; background:#fcfcfc; border:1px solid #ddd;}
.clapat_metabox li.photo input { width: 120px; }
.clapat_metabox li.photo .right { position:absolute; right:20px; top:5px; }
.clapat_metabox li.photo .right textarea { width:135px; height:110px; resize:none;}
</style>

<script>
function addImage(container, append){
	var $ = jQuery;
	var temp = \'<li class="photo"><div class="photopreview upload_image_prev"></div><input type="text" name="clapat[photos][]" class="upload_image" value=""> 	<img class="upload_image_button" src="'.$ThemeRoot.'/images/admin/eye.png"><a href="#" class="close">X</a><div class="dragable"> </div></li>\';
	if($(container).length > 0){
		if(typeof append == "undefined"){
			$(container).prepend(temp);
		}else {
			$(container).append(temp);
		}
	}
}
jQuery(function($){
	$(".clapat_metabox .sortable").sortable();
	$(".clapat_metabox .close").live("click", function(e){
		e.preventDefault();
		e.stopPropagation();
		$(this).parent().fadeOut(function(){ $(this).remove()});
	});


			var lastOpenedObject = false;
			jQuery(".upload_image_button, .upload_image_prev").live("click", function(e) {
				e.preventDefault();
				if($(this).hasClass("upload_image_prev")){
					lastOpenedObject = jQuery(this).next(".upload_image");
				}else {
					lastOpenedObject = jQuery(this).prev(".upload_image");
				}
			 formfield = lastOpenedObject.attr("name");
			 tb_show("", "media-upload.php?type=image&amp;TB_iframe=true");
			 return false;
			});

	window.original_send_to_editor = window.send_to_editor;
    window.send_to_editor = function( html ) {
        imgurl = jQuery("img",html).attr("src");
		if(lastOpenedObject != false){
			lastOpenedObject.val(imgurl);
			lastOpenedObject.prev().html(\'<img src="\'+imgurl+\'" width="100%">\');
			lastOpenedObject = false;
		} else {
            window.original_send_to_editor(html);
        }
		 tb_remove();
    };	

})


function addWWD(){
	jQuery(\'#WWDWrap\').append(\'<li><input type="text" name="clapat[wedid][]"> <a href="#" class="close">X</a>	<div class="dragable"> </div>		</li>\');

}
</script>
<div class="clapat_metabox">
	<input type="hidden" name="clapat_action" value="portfolio">
	<h4>'.__('Project URL','clapat').'</h4>
	<small>'.__('Tip','clapat').': '.__('Leave this empty if you don`t want to display "Launch website" button','clapat').'</small><br>
	<input type="text" name="clapat[url]" value="'.((isset($details['url']))?$details['url']:'').'">
	<h4>'.__('What we did?','clapat').'</h4>
	<small>'.__('Tip','clapat').': '.__('You can drag & drop fields to change order displayed into project page.','clapat').'</small><br>
	<a href="#" onClick="addWWD(); return false;">'.__('Add "What we did"','clapat').'</a>
	<ul class="sortable" id="WWDWrap">';
		if(count($details['wedid']) > 0){
			foreach($details['wedid'] as $wwd){
				echo '
				<li>
					<input type="text" name="clapat[wedid][]" value="'.$wwd.'"> 
					<a href="#" class="close">X</a>	
					<div class="dragable"> </div>		
				</li>';
			}
		}else {
			echo '
			<li>
				<input type="text" name="clapat[wedid][]"> 
				<a href="#" class="close">X</a>	
				<div class="dragable"> </div>		
			</li>';
		}
	echo '</ul>
	<a href="#" onClick="addWWD(); return false;">'.__('Add "What we did"','clapat').'</a>
	<h4>'.__('Image gallery','clapat').'</h4>
	<small>'.__('Tip','clapat').': '.__('You can drag & drop fields to change order displayed into project page.','clapat').'</small><br>
	
	<a href="#" onClick="addImage(\'#portfolio_gallery\', true); return false;">Add image</a>
	<ul class="sortable" id="portfolio_gallery">';
		if(isset($details['photos']) && count($details['photos']) > 0){
			$i=0;
			foreach($details['photos'] as $photo){
				echo '
			<li class="photo">
					<div class="left">
						<div class="photopreview upload_image_prev"><img src="'.$photo.'" width="100%"></div>
						<input type="text" name="clapat[photos][]" class="upload_image" value="'.$photo.'"> 	
						<img class="upload_image_button" src="'.$ThemeRoot.'/images/admin/eye.png">	
					</div>
					<div class="right">
						<textarea name="clapat[photodesc][]">'.@$details['photodesc'][$i].'</textarea>
					</div>
					<a href="#" class="close">X</a>
					<div class="dragable"> </div>	
				</li>';
				$i++;
			}
		}else {
			echo '
	<li class="photo">
		<div class="photopreview upload_image_prev"></div>
		<input type="text" name="clapat[photos][]" class="upload_image" value=""> 	
		<img class="upload_image_button" src="'.$ThemeRoot.'/images/admin/eye.png">		
		<a href="#" class="close">X</a>
		<div class="dragable"> </div>	
	</li>
	';
		
		}
	echo '</ul>
	<h4>Portfolio detail type</h4>
	<input id="pdt_0" type="radio" name="clapat[popup_type]" value="0" '.(((isset($details['popup_type']) && $details['popup_type'] == '0') || empty($details['popup_type'] ))? ' checked="checked"':'').'> <label for="pdt_0">'.__('Default (colorbox)','clapat').'</label><br>
	<input id="pdt_1" type="radio" name="clapat[popup_type]" value="1" '.((isset($details['popup_type']) && $details['popup_type'] == '1')? ' checked="checked"':'').'> <label for="pdt_1">'.__('FancyBox (Only first photo)','clapat').'</label><br>
	<input id="pdt_2" type="radio" name="clapat[popup_type]" value="2" '.((isset($details['popup_type']) && $details['popup_type'] == '2')? ' checked="checked"':'').'> <label for="pdt_2">'.__('In place (Expander)','clapat').'</label><br>
	
	
	
	<h4>'.__('Youtube video','clapat').'</h4>
	<small>'.__('Tip','clapat').': '.__('You can add a video to play on top of page instead of image gallery','clapat').'</small><br>
	'.__('Video URL','clapat').':<br>
	<input type="text" name="clapat[videourl]" value="'.$videourl.'"> 	
</div>
';

}

function newsOptions ( $post, $metabox ) {
	$clapat 	= get_post_meta($post->ID,'clapat_gallery', true);
	$details 	= array();
	if($clapat != null){
		$details = (array) json_decode($clapat);
	}
	$ThemeRoot = get_template_directory_uri();
echo '
<style>
.clapat_metabox span.grid { margin-top:10px; display:block; }
.clapat_metabox input[type="text"] { width:100%; }
.clapat_metabox .sortable li { position:relative; background:#fff; display:inline-block; *diplay:inline; zoom:1; margin:5px; padding:5px 20px; }
.clapat_metabox .sortable li img { vertical-align: text-bottom; }
.clapat_metabox .sortable li img:hover { cursor:pointer; }
.clapat_metabox .sortable .dragable { cursor:pointer; width:15px; height:100%; position:absolute; left:0; top:0; }
.clapat_metabox .sortable .ui-sortable-helper { background:#ff9;  }
.clapat_metabox .close { display:none; width:16px; height:16px; text-decoration:none; font-size:14px; font-weight:bold; color:#000; position:absolute; top:2px; right:0; }
.clapat_metabox li:hover .close { display:block; }
.clapat_metabox li.photo { width: 150px; height:120px; }
.clapat_metabox li.photo .photopreview { cursor:pointer;  width: 150px; height:78px; overflow:hidden; margin-bottom:10px; background:#fcfcfc; border:1px solid #ddd;}
.clapat_metabox li.photo input { width: 120px; }
</style>

<script>
function addImage(container, append){
	var $ = jQuery;
	var temp = \'<li class="photo"><div class="photopreview upload_image_prev"></div><input type="text" name="clapat[photos][]" class="upload_image" value=""> 	<img class="upload_image_button" src="'.$ThemeRoot.'/images/admin/eye.png"><a href="#" class="close">X</a><div class="dragable"> </div></li>\';
	if($(container).length > 0){
		if(typeof append == "undefined"){
			$(container).prepend(temp);
		}else {
			$(container).append(temp);
		}
	}
}
jQuery(function($){
	$(".clapat_metabox .sortable").sortable();
	$(".clapat_metabox .close").live("click", function(e){
		e.preventDefault();
		e.stopPropagation();
		$(this).parent().fadeOut(function(){ $(this).remove()});
	});


			var lastOpenedObject = false;
			jQuery(".upload_image_button, .upload_image_prev").live("click", function(e) {
				e.preventDefault();
				if($(this).hasClass("upload_image_prev")){
					lastOpenedObject = jQuery(this).next(".upload_image");
				}else {
					lastOpenedObject = jQuery(this).prev(".upload_image");
				}
			 formfield = lastOpenedObject.attr("name");
			 tb_show("", "media-upload.php?type=image&amp;TB_iframe=true");
			 return false;
			});

	window.original_send_to_editor = window.send_to_editor;
    window.send_to_editor = function( html ) {
        imgurl = jQuery("img",html).attr("src");
		if(lastOpenedObject != false){
			lastOpenedObject.val(imgurl);
			lastOpenedObject.prev().html(\'<img src="\'+imgurl+\'" width="100%">\');
			lastOpenedObject = false;
		} else {
            window.original_send_to_editor(html);
        }
		 tb_remove();
    };	

})
</script>
<div class="clapat_metabox">
	<input type="hidden" name="clapat_action" value="gallery">
	<h4>'.__('Image gallery','clapat').'</h4>
	<small>'.__('Tip','clapat').': '.__('You can drag & drop fields to change order displayed into slider.').'</small><br>
	<a href="#" onClick="addImage(\'#post_gallery\', true); return false;">Add image</a>
	<ul class="sortable" id="post_gallery">';
		if(count($details['photos']) > 0){
			foreach($details['photos'] as $photo){
				echo '
			<li class="photo">
					<div class="photopreview upload_image_prev"><img src="'.$photo.'" width="100%"></div>
					<input type="text" name="clapat[photos][]" class="upload_image" value="'.$photo.'"> 	
					<img class="upload_image_button" src="'.$ThemeRoot.'/images/admin/eye.png">		
					<a href="#" class="close">X</a>
					<div class="dragable"> </div>	
				</li>';
			}
		}else {
			echo '
	<li class="photo">
		<div class="photopreview upload_image_prev"></div>
		<input type="text" name="clapat[photos][]" class="upload_image" value=""> 	
		<img class="upload_image_button" src="'.$ThemeRoot.'/images/admin/eye.png">		
		<a href="#" class="close">X</a>
		<div class="dragable"> </div>	
	</li>';
		
		}
	echo '</ul>
</div>
';

}

function clapat_save_postdata($post_id){
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) 
      return;
	if ('page' == @$_POST['post_type'] ) {
		if ( !current_user_can( 'edit_page', $post_id ) )
			return;
	} else {
		if ( !current_user_can( 'edit_post', $post_id ) )
			return;
	}
	
	if(isset($_POST['clapat_action'])){
		switch($_POST['clapat_action']){
			case 'member-info':
				update_post_meta($post_id,'clapat_memberinfo', json_encode($_POST['clapat']));
			break;
			case 'portfolio':
				update_post_meta($post_id,'clapat_portfolio', json_encode($_POST['clapat']));
			break;
			case 'gallery':
				update_post_meta($post_id,'clapat_gallery', json_encode($_POST['clapat']));
			break;
			case 'client':
				update_post_meta($post_id,'clapat_client', json_encode($_POST['clapat']));
			break;
			case 'post':
				update_post_meta($post_id,'clapat_advanced', json_encode($_POST['clapat']));
			break;
			case 'page':
				update_post_meta($post_id,'clapat_advanced', json_encode($_POST['clapat']));
			break;
			
		}
	
	} else return;
}
add_action( 'save_post', 'clapat_save_postdata' );
/* TODO: Move to shortcodes */


function makeGoogleFontSelector($selected = ''){
	global $themeRoot;
	$FontsFile = $themeRoot . '/clapat/Library/google-web-fonts/list.txt';
	if(file_exists($FontsFile)){
		$FontList = explode("\n", @file_get_contents($FontsFile));
		$HTML = '<option value="">'.__('Default','clapat').'</option>';
		if(count($FontList) > 0){
			foreach($FontList as $font){
		//	echo trim($font) .'=='. trim($selected)."<br>\n";
				$HTML .= '<option value="'.trim($font).'" '.((trim($font) == trim($selected))?' selected="selected"':'').'>'.$font.'</option>';
			}
		}
		return $HTML;
	}
		return '<option>No font available</option>';
}
function makeFontSizeSelector($min = '10', $max = '40', $selected = ''){
	$HTML = '';
	$HTML .= '<option value="">'.__('Default','clapat').'</option>';
	for($i=$min;$i<=$max;$i++){
		$HTML .= '<option value="'.$i.'" '.(($i == $selected)?' selected="selected"':'').'>'.$i.'</option>';
	}
	return $HTML;
}


if ( ! function_exists( 'clapat_comment' ) ) :

function clapat_comment( $comment, $args, $depth ) {
	$GLOBALS['comment'] = $comment;
	switch ( $comment->comment_type ) :
		case 'pingback' :
		case 'trackback' :
		// Display trackbacks differently than normal comments.
	?>
	<li <?php comment_class(); ?> id="comment-<?php comment_ID(); ?>">
		<p><?php _e( 'Pingback:', 'clapat' ); ?> <?php comment_author_link(); ?> <?php edit_comment_link( __( '(Edit)', 'clapat' ), '<span class="edit-link">', '</span>' ); ?></p>
	<?php
			break;
		default :
		// Proceed with normal comments.
		global $post;
	?>
	<li <?php comment_class(); ?> id="li-comment-<?php comment_ID(); ?>">
		<article id="comment-<?php comment_ID(); ?>" class="comment">
	
			<header class="comment-meta comment-author vcard">
				<?php
					printf( '<p class="black"><strong>%1$s</strong> %2$s says:</p>',
						get_comment_author_link(),
						// If current post author is also comment author, make it known visually.
						( $comment->user_id === $post->post_author ) ? '<span> ' . __( 'author', 'clapat' ) . '</span>' : ''
					);
					
				?><p class="comment-date"><?php echo get_comment_date('d/m/Y'); ?></p>
				<div class="comm-tools group">
				<?php edit_comment_link( __( 'Edit', 'clapat' ), '<p class="edit-link">', '</p>' ); ?>
				<div class="reply">
					<?php comment_reply_link( array_merge( $args, array( 'reply_text' => __( 'Reply', 'clapat' ), 'after' => '', 'depth' => $depth, 'max_depth' => $args['max_depth'] ) ) ); ?>
				</div>
				</div><!-- .reply -->
			</header><!-- .comment-meta -->

			<?php if ( '0' == $comment->comment_approved ) : ?>
				<p class="comment-awaiting-moderation"><?php _e( 'Your comment is awaiting moderation.', 'clapat' ); ?></p>
			<?php endif; ?>

			<section class="comment-content comment clearfix">
				<?php comment_text(); ?>
				
			</section><!-- .comment-content -->
		</article><!-- #comment-## -->
	<?php
		break;
	endswitch; // end comment_type check
}
endif;

function cut_content_by_length($content, $length){
	if(strlen($content) <= $length) return $content;
	$String = substr($content,0,$length);
	$LastSpace = strrpos($String, ' ');
	return substr($content, 0, $LastSpace);
}

function hex2rgb($hex) {
   $hex = str_replace("#", "", $hex);

   if(strlen($hex) == 3) {
      $r = hexdec(substr($hex,0,1).substr($hex,0,1));
      $g = hexdec(substr($hex,1,1).substr($hex,1,1));
      $b = hexdec(substr($hex,2,1).substr($hex,2,1));
   } else {
      $r = hexdec(substr($hex,0,2));
      $g = hexdec(substr($hex,2,2));
      $b = hexdec(substr($hex,4,2));
   }
   $rgb = array($r, $g, $b);
   return $rgb;
}

function clapatSwitch($name, $selected = '0', $folds = ''){
	$in = array('[',']');
	$id = str_replace($in, '_', $name);
	return '
		<p class="switch-options">
	<label class="cb-enable '.(($selected == '1')?'selected':'').'" data-id="'.$id.'">
	<span>On</span>
	</label>
	<label class="cb-disable '.(($selected != '1')?'selected':'').'"data-id="'.$id.'">
	<span>Off</span>
	</label>
	<input class="checkbox of-input" id="'.$id.'" name="'.$name.'" type="hidden" value="'.$selected.'" data-fold="'.$folds.'">
	</p>
	';
}

add_action('wp_ajax_nopriv_getgpluscount', 'getgpluscount');
function getgpluscount(){

// $nonce = $_POST['security'];
// if ( ! wp_verify_nonce( $nonce, 'myajax-clapat' ) )
	// die ( 'No, no, no !!!!');
	wp_parse_str(stripslashes($_POST['data']), $data);
		unset($data['security']);
	//	var_dump($data);
	$data = @file_get_contents('https://plusone.google.com/_/+1/fastbutton?url='.$data['url']);
@preg_match('|<div(.*?)id="aggregateCount"(.*?)>(.*?)</div>|ims', $data, $out);
echo (int) @$out[3];
exit;
}