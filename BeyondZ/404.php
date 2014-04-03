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
<div id="page" class="e404" style="text-align:center;">
    <!-- Container-->
	<div class="container clearfix">
	<h1 class="error" style=" font-size:200px; line-height:150px;"><?php _e('404','clapat');?></h1>
	<h1 class="errortext" style="padding:40px;"><?php _e('page not found','clapat');?></h1>
<a href="<?php echo home_url(); ?>" class="backhome" style="display:inline-block; padding:10px;"><?php _e('Back To Home','clapat');?></a>
</div>
<div class="twitter e404" style="padding:80px 0;">
<h3 style="font-size:24px;"><?php _e('You may want to return home and start again. Sorry :(','clapat');?></h3>
</div>
<!--/Container-->
</div>
<?php get_footer(); ?>