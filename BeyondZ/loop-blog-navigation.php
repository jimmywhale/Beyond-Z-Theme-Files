<?php
$html_id = 'post_navigation';
	if ( $wp_query->max_num_pages > 1 ) : ?>
		<nav id="<?php echo $html_id; ?>" class="navigation group" role="navigation">
		<?php if($paged > 1): ?>
			<div class="postnav nav-next"><?php previous_posts_link( '<span class="postnav fa fa-chevron-left"></span>'); ?></div>
		<?php endif; ?>
			<div class="postnav nav-previous"><?php next_posts_link( '<span class="postnav fa fa-chevron-right"></span>' ); ?></div>
		</nav><!-- #<?php echo $html_id; ?> .navigation -->
	<?php endif;
?>