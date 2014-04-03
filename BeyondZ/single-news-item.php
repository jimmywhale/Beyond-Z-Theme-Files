<?php
if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || $_SERVER['HTTP_X_REQUESTED_WITH'] != 'XMLHttpRequest'){
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
	$isModal = false;
}


the_post();
	$clapat 	= get_post_meta($post->ID,'clapat_gallery', true);
	$details 	= array();
	if($clapat != null){
		$details = (array) json_decode($clapat);
	}
	$photos = (isset($details['photos']))? $details['photos'] : array();
	$gallery = '';

	if(count($photos) > 0){
		foreach($photos as $photo){
			if(trim($photo) == '') continue;
			$gallery .= '<li> <img src="'.trim($photo).'" /> </li>';
		}
	}
?>
<div class="clearfix"></div>
<!--News Page-->
<div class="news_page clearfix <?php echo ($isModal == false)? 'single' : '';?>">        
        <!--Flex Slider-->
        <div class="flexslider clearfix">
        
            <ul class="slides">
            <?php echo $gallery; ?>
            </ul>
        </div>

        <div class="news_content clearfix">
        	<h4 class="black mb"><?php the_title(); ?></h4>
            	<div class="news-details clearfix">
                            
                    <a href="<?php /*the_author_meta('url');*/ ?>javascript:void(0)"><p class="post-admin"><?php the_author(); ?></p></a>
                    
                    <a href="javascript:void(0)"><p class="post-calendar"><?php the_date(); ?></p></a>
                    
                    <a href="javascript:void(0)"><p class="post-tagss"><?php $tags = get_the_tag_list('',' - ',''); echo (!empty($tags))? strip_tags($tags) : __('No Tags','clapat');?></p></a>
                    
                 <?php /*				 <a href="#comments"><p class="post-commentss"><?php echo get_comments_number(); ?> Comments</p></a>
                */ ?>
                </div>
                <!--News Details-->
		<?php the_content(); ?>
	</div>
    <!--/News Content-->
	<?php /*
    <!--News Comments-->
	<!--
    <div class="news_comments">
		<?php comments_template( '', true ); ?>
    </div>
	
    <!--/News Comments-->  */ ?>
</div>
<!--News page-->    
<?php
if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || $_SERVER['HTTP_X_REQUESTED_WITH'] != 'XMLHttpRequest'){
get_footer();
}
?>