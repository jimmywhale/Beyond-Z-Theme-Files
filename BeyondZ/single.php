<?php
if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || $_SERVER['HTTP_X_REQUESTED_WITH'] != 'XMLHttpRequest'){
get_header();
$isModal = false;

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
}
the_post();
$date_format = get_option('date_format');
?>
<div class="container clearfix blog single">
	<div class="posthead">
		<?php if(get_post_format() != 'quote') { ?>
		<h4 class="black mb"><?php the_title(); ?></h4>
		
		<div class="meta clearfix">
			<a href="<?php the_author_meta('user_url', $post->post_author); ?>"><p class="post-admin">Posted by <?php the_author(); ?></p></a>
			<a href="javascript:void(0)"><p class="post-calendar"><?php echo date($date_format, strtotime($post->post_date)); ?></p></a>
			<a href="javascript:void(0)"><p class="post-tagss"><?php $tags = get_the_tag_list('',', ',''); echo (!empty($tags))? strip_tags($tags) : __('No Tags','ionuts');?></p></a>
			<a href="#comments"><p class="post-commentss "><?php echo get_comments_number(); ?> <?php _e('Comments');?></p></a>
		</div> 
		<?php } else { echo '<h4 class="black mb">&nbsp;</h4><div class="meta clearfix"></div>';} ?>
		<div class="social">
			<a href="" class="fb-social-data"><i class="fa fa-facebook"></i> <span>0</span></a> | 
			<a href="" class="gp-social-data"><i class="fa fa-google-plus"></i> <span>0</span></a> | 
			<a href="" class="tw-social-data"><i class="fa fa-twitter"></i> <span>0</span></a> | 
			<a href="" class="pi-social-data"><i class="fa fa-pinterest"></i> <span>0</span></a>
		</div>
	</div>
	<div class="content left <?php echo ($isModal == false)? 'singleblog' : '';?>">
		<div class="news-details clearfix">  
		<!-- Begin -->
		<?php
			get_template_part( 'loop-blog', get_post_format() );
			if(get_post_format() != 'quote'){
		?>
			<div class="pcontent clearfix"><?php the_content(); ?></div>
			<?php } ?>
			<div class="blog_comments">
				<?php comments_template( '', true ); ?>
			</div>
		</div>
	</div>
	<div class="sidebar right">
		<?php get_sidebar();?>
	</div>
</div>
   
<?php
if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || $_SERVER['HTTP_X_REQUESTED_WITH'] != 'XMLHttpRequest'){
$clapat 	= get_post_meta($post->ID,'clapat_advanced', true);
$details 	= array();
if($clapat != null){
	$details = (array) json_decode($clapat);
}
if(isset($details['parallaxactive']) && $details['parallaxactive'] == '1'){
	echo do_shortcode('[parallax image="'.$details['parallaximg'].'" speed="'.$details['parallaxspd'].'" height="'.$details['parallaxh'].'"]'.$details['parallaxtxt'].'[/parallax]');
}
get_footer();
}
?>