<?php if(!empty($post)):	$clapat 	= get_post_meta($post->ID,'clapat_advanced', true);	$details 	= array();	if($clapat != null){		$details = (array) json_decode($clapat);	}		$image 		= (isset($details['image']))? $details['image'] : '';?>		<?php		if($image != ''):		?>		<a href="<?php the_permalink();?>" class="post-thumbnail">		<img src="<?php echo $image;?>">		</a>		<?php endif; ?>		<?php endif; ?>