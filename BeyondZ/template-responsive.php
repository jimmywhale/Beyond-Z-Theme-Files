<?php
/*
Template Name: Responsive
*/
get_header();

global $clapat_settings, $clapat_design;

do_action('alter_settings');

$data = array(
	'items'	=>	array(
		'id'	=> @$SiteSections->id,
		'name'	=> @$SiteSections->name,
		'type'	=> @$SiteSections->layout,
		'ct'	=> @$SiteSections->content,
		'spos'	=> @$SiteSections->sepposition,
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

if($data['home']['disabled'] == false){
	$class = '';

	if(isset($clapat_settings->clapat_home_auto) && $clapat_settings->clapat_home_auto == 1){ $class .= ' auto ';}
	if(isset($clapat_settings->clapat_menu_nomargin) && $clapat_settings->clapat_menu_nomargin == 1){ $class .= ' no_margin ';}
	if(isset($clapat_settings->clapat_home_nopattern) && $clapat_settings->clapat_home_nopattern == 1){ $class .= ' no_pattern ';}
	
	
	echo '<div id="home" class="'.$class.'">'.do_shortcode(stripslashes($data['home']['content'])).'</div>';
}
echo ClapatFrontend::makeNavMenu($data);

for($i=0;$i<count($SiteSections->id);$i++){
	if(!empty($SiteSections->id[$i])){
		$data = array(
			'id'		=> $SiteSections->id[$i],
			'content'	=> trim($SiteSections->content[$i]),
			'name'		=> $SiteSections->name[$i],
			'type'		=> $SiteSections->layout[$i],
			'c_bgi'		=> ((isset($SiteSections->sec_bg[$i]))?$SiteSections->sec_bg[$i]:false),
			'c_bgc'		=> ((isset($SiteSections->sec_col[$i]))?$SiteSections->sec_col[$i]:false),
		);
		if($data['type'] != 3){
		$SP = '';
			$CT = ClapatFrontend::sectionContent($data);
			
			if($SiteSections->sep[$i] != ''){
				$data = array(
						'id'		=> $SiteSections->id[$i],
						'content'	=> trim($SiteSections->sep[$i]),
						'img'		=> $SiteSections->sep_bg[$i],
						'height'	=> $SiteSections->sepheight[$i],
						'speed'		=> ((isset($SiteSections->prlx_spd[$i]))?$SiteSections->prlx_spd[$i]:'0'),
						'vid'		=> ((isset($SiteSections->sep_bg_vid[$i]))?$SiteSections->sep_bg_vid[$i]:''),
					);
				$SP = ClapatFrontend::sectionSeparator($data);
			}
			
			if(@$SiteSections->sepposition[$i] == '1'){		
				echo $SP;		
				echo $CT;
			}else {
				echo $CT;
				echo $SP;
			}
		}
	}else {
		echo '<br><small>clapat.modules.section.noid</small><br>';
	}
}



get_footer();