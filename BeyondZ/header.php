<?php
	global $page, $paged, $clapat_settings, $clapat_design, $siteLogo;
	
	$clapat_settings 		= @json_decode(get_option('clapat_general_settings'));
	$clapat_design 		= @json_decode(get_option('clapat_design'));
	$clapat_contact 		= @json_decode(get_option('clapat_contact'));
	
	if(!isset($clapat_settings)) 		$clapat_settings = new stdClass();

	if(!isset($clapat_settings->excerpt) || strlen($clapat_settings->excerpt) < 5){
		$clapat_settings->excerpt = 10;
	}
	
	if(!isset($clapat_contact)) 		$clapat_contact = new stdClass();
	if(!isset($clapat_contact->clapat_ct_map) || strlen($clapat_contact->clapat_ct_map) < 5){
		$clapat_contact->clapat_ct_map = '0,0';
	}
	
	if(!isset($clapat_contact->clapat_ct_zoom) || $clapat_contact->clapat_ct_zoom < 5){
		$clapat_contact->clapat_ct_zoom = '5';
	}
	
	if(!isset($clapat_contact->clapat_ct_marker_img) || strlen($clapat_contact->clapat_ct_marker_img) < 5){
		$clapat_contact->clapat_ct_marker_img = get_template_directory_uri().'/images/marker.png';
	}
	
	if(!isset($clapat_contact->clapat_ct_marker_ttl) || strlen($clapat_contact->clapat_ct_marker_ttl) < 2){
		$clapat_contact->clapat_ct_marker_ttl = '';
	}
	
	if(!isset($clapat_contact->clapat_ct_marker_ct) || strlen($clapat_contact->clapat_ct_marker_ct) < 2){
		$clapat_contact->clapat_ct_marker_ct = '';
	}
	
	if(!isset($clapat_contact->clapat_ct_marker)){
		$clapat_contact->clapat_ct_marker = 'false';
	}
	
	
	if(!isset($clapat_settings->clapat_logo) || strlen($clapat_settings->clapat_logo) < 10){
		$siteLogo = get_template_directory_uri().'/images/logo.png';
	}else {
		$siteLogo = $clapat_settings->clapat_logo;
	}
	
	if(!isset($clapat_settings->clapat_favicon) || strlen($clapat_settings->clapat_favicon) < 5){
		$siteFavIcon = get_template_directory_uri().'/images/favicon.ico';
	}else {
		$siteFavIcon = $clapat_settings->clapat_favicon;
	}

	if(!isset($clapat_settings->clapat_show_favicon )) $clapat_settings->clapat_show_favicon = 0;
	

	list($Lat, $Lng) = explode(',', $clapat_contact->clapat_ct_map);
	$mapStyle = (isset($clapat_contact->map_style) && $clapat_contact->map_style == '1')? 'greyscale':'normal';

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<!-- Page title -->
	<title><?php
	wp_title( '|', true, 'right' );
	bloginfo( 'name' );
	$site_description = get_bloginfo( 'description', 'display' );
	if ( $site_description && ( is_home() || is_front_page() ) )
		echo ' '.$site_description;
	if ( $paged >= 2 || $page >= 2 )
		echo ' | ' . sprintf( __( 'Page %s', 'clapat' ), max( $paged, $page ) );
	?></title>
	<?php
if(isset($clapat_settings->clapat_show_favicon) && $clapat_settings->clapat_show_favicon == 1):
?>
<link rel="shortcut icon" href="<?php echo $siteFavIcon; ?>" type="image/vnd.microsoft.icon"/>
<link rel="icon" href="<?php echo $siteFavIcon; ?>" type="image/x-ico"/>
<?php endif; ?>
<script>
var isSingleOrPage = <?php echo (is_page() || is_single())?'true':'false';?>;
var pagePermalink = '<?php the_permalink(); ?>';
var GmapMarkerImage = '<?php echo $clapat_contact->clapat_ct_marker_img; ?>';
var GmapMarkerTitle = '<?php echo addslashes($clapat_contact->clapat_ct_marker_ttl); ?>';
var GmapMarkerText 	= '<?php echo addslashes($clapat_contact->clapat_ct_marker_ct); ?>';
var gMap = {lat: '<?php echo $Lat; ?>', lng: '<?php echo $Lng; ?>', zoom: <?php echo $clapat_contact->clapat_ct_zoom; ?>, marker: <?php echo $clapat_contact->clapat_ct_marker; ?>, style: '<?php echo $mapStyle; ?>'};
var template_url = '<?php echo get_template_directory_uri();?>';
var menu_breakpoint = <?php echo (isset($clapat_settings->menu_bearkpoint)?$clapat_settings->menu_bearkpoint:'1024')?>;

</script>
<?php wp_head(); 
$extraclass = (isset($clapat_settings->clapat_nicescroll) && @$clapat_settings->clapat_nicescroll == 1)?' with-nice-scroll ':'';
$loadingIcon = (isset($clapat_settings->clapat_preloader_img) && !empty($clapat_settings->clapat_preloader_img))? $clapat_settings->clapat_preloader_img : get_template_directory_uri().'/images/loading.gif';
?>
</head>
<body <?php body_class( $extraclass ); ?>>
<?php if(isset($clapat_settings->clapat_preloader) && @$clapat_settings->clapat_preloader == 1): ?>
<div class="clapat-preloader">
	<div class="clapat-preloader-content">
		<img src="<?php echo $loadingIcon; ?>">
	</div>
</div>
<?php endif; ?>