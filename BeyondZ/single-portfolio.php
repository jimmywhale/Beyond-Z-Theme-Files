<?php
$isModal = true;
$newLayout = false;

if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || $_SERVER['HTTP_X_REQUESTED_WITH'] != 'XMLHttpRequest'){
get_header();
// $newLayout = true;

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
	$isModal = false;
	
	if($newLayout == true){
	//	get_template_part('single-new','portfolio');
	}
}

if($newLayout == false){
	$clapat 	= get_post_meta($post->ID,'clapat_portfolio', true);
	$details 	= array();
	if($clapat != null){
		$details = (array) json_decode($clapat);
	}
	$photos = (isset($details['photos']))? $details['photos'] : array();
	$captions = (isset($details['photodesc']))? $details['photodesc'] : array();
	$Wedid 	= (isset($details['wedid']))? $details['wedid'] : array();
	$video 	= (isset($details['videourl']))? $details['videourl'] : '';
	$URL 	= (isset($details['url']))? $details['url'] : '';
	$gallery = '';
	$wedid 	= '';
	if(count($photos) > 0){
		$i=0;
		foreach($photos as $photo){
			if(trim($photo) == '') continue;
			$gallery .= '<li> <img src="'.trim($photo).'" /> '.((isset($captions[$i]) && !empty($captions[$i]))?'<p class="flex-caption">'.@$captions[$i].'</p>':'').' </li>';
			$i++;
		}
	}
	$WWDDisabled = false;
	if(count($Wedid) > 0 && $Wedid[0] != ''){
		foreach($Wedid as $item){
			if(trim($item) == '') continue;
			$wedid .= '<li> <a>'.trim($item).'</a> </li>';
		}
	}else{
		$WWDDisabled = true;
	}
	
	the_post();
	if($isModal == false):
?>
    <div class="posthead project">
		<h4 class="black mb"><?php the_title(); ?></h4>
		<div class="meta clearfix">
			<a href="javascript:void(0)"><p class=""><?php echo date('F d, Y', strtotime($post->post_date)); ?></p></a>
		</div> 
		<div class="social">
			<a href="" class="fb-social-data"><i class="fa fa-facebook"></i> <span>0</span></a> | 
			<a href="" class="gp-social-data"><i class="fa fa-google-plus"></i> <span>0</span></a> | 
			<a href="" class="tw-social-data"><i class="fa fa-twitter"></i> <span>0</span></a> | 
			<a href="" class="pi-social-data"><i class="fa fa-pinterest"></i> <span>0</span></a>
		</div>
	</div>
	<?php endif; ?>
	<div class="project_page clearfix <?php echo ($isModal == false)? 'single' : '';?>">        
       
			<?php
			if($video != ''){
				echo '<div class="project-video"><iframe width="100%" data-ratio="4:3" src="'.str_replace('/watch?v=','/embed/', $video).'" frameborder="0" allowfullscreen></iframe></div>';
			}else{
			?>
			<div class="flexslider clearfix">
				<ul class="slides">
					<?php echo $gallery; ?>
				</ul>  
			</div>
			<?php } ?>
      
        <div class="project_content clearfix">
		<?php if($WWDDisabled == false):?>
        <div class="three_fourth">
        	<?php
			endif;
			the_content();
			if($URL != ''):
			?>
            <a class="btn-small" href="<?php echo $URL; ?>" target="_blank"><?php _e('Launch website', 'clapat');?></a>
			<?php
			endif;
			if($WWDDisabled == false):
			?>
		</div>
        <div class="one_fourth last">
        	<h4 class="black mb"><?php _e('What we did', 'clapat');?></h4>
            <ul class="categories">
               <?php echo $wedid; ?>        
            </ul>
		</div>
		<?php endif; ?>
		</div>        
	</div>    
<?php
}else {
	get_template_part('single-new','portfolio');
}
if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || $_SERVER['HTTP_X_REQUESTED_WITH'] != 'XMLHttpRequest'){
get_footer();
}
?>