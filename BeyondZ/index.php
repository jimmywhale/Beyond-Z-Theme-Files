<?php
get_header();

global $clapat_settings, $clapat_design;

do_action('alter_settings');

$data = array(
	'items'	=>	array(
		'id'	=> $SiteSections->id,
		'name'	=> $SiteSections->name,
		'type'	=> $SiteSections->layout,
		'ct'	=> $SiteSections->content,
	),
	'logo' =>	array(
		'src' 	=>	((isset($clapat_settings->clapat_logo) && strlen($clapat_settings->clapat_logo) > 5)? $clapat_settings->clapat_logo : ''),
		'text'	=>	'',
		'url'	=>	home_url(),
	),
	'nav' => array(
		'bg' 	=> @$clapat_design->bg->nav,
	),
	'home' => array(
		'disabled' 	=> ((isset($clapat_settings->clapat_disable_home) && $clapat_settings->clapat_disable_home == 1)? true : false),
		'content'	=> $clapat_settings->site_slider,
		'id'	=> 'home',
		'name'	=> __('Home','clapat'),
	),
);

echo ClapatFrontend::makeNavMenu($data, 1);
?>	
	<div id="page">
    <!-- Container-->
	<div class="container clearfix">
<?php
the_post();

the_content();

?>
</div>
<!--/Container-->
</div>
<?php 

$clapat 	= get_post_meta($post->ID,'clapat_advanced', true);
$details 	= array();
if($clapat != null){
	$details = (array) json_decode($clapat);
}
if(isset($details['parallaxactive']) && $details['parallaxactive'] == '1'){
	echo do_shortcode('[parallax image="'.$details['parallaximg'].'" speed="'.$details['parallaxspd'].'" height="'.$details['parallaxh'].'"]'.$details['parallaxtxt'].'[/parallax]');
}
get_footer(); ?>