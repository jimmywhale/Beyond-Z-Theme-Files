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
<div class="container clearfix blog">
	<div class="content left">
			
			<?php if ( have_posts() ) : ?>

				<header class="page-header">
					<h1 class="page-title">
						<?php printf( __( 'Search results for: %s', 'clapat' ), '<span>' . get_search_query() . '</span>' ); ?>
					</h1>
				</header>

				<?php while ( have_posts() ) : 
					the_post(); 
					if(get_post_format() != 'quote'){
						get_template_part( 'loop-blog-post-header');
					}
					get_template_part( 'loop-blog', get_post_format() );
					if(get_post_format() != 'quote'){
					?>
					<div class="pcontent"><?php the_excerpt(); ?></div>
					<a href="<?php the_permalink();?>" class="clapat-button"><?php _e('Read more','clapat'); ?></a>
					</div>
				</div>
				<?php
					}
				endwhile; 
				get_template_part( 'loop-blog', 'navigation' ); ?>

				<?php //clapat_content_nav( 'nav-below' ); ?>

			<?php else : ?>

				<article id="post-0" class="post no-results not-found">
					<header class="entry-header">
						<h1 class="entry-title"><?php _e( 'Nothing Found', 'clapat' ); ?></h1>
					</header><!-- .entry-header -->

					<div class="entry-content">
						<p><?php _e( 'Apologies, but no results were found for the requested archive. Perhaps searching will help find a related post.', 'clapat' ); ?></p>
						<?php get_search_form(); ?>
					</div><!-- .entry-content -->
				</article><!-- #post-0 -->

			<?php endif; ?>
	</div>
	<div class="sidebar right">
		<?php get_sidebar();?>
	</div>
</div>
<?php get_footer(); ?>