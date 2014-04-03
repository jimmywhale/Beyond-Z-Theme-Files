<?php
$isModal = false;
	$clapat 	= get_post_meta($post->ID,'clapat_portfolio', true);
	$details 	= array();
	if($clapat != null){
		$details = (array) json_decode($clapat);
	}
	$photos = (isset($details['photos']))? $details['photos'] : array();
	$Wedid 	= (isset($details['wedid']))? $details['wedid'] : array();
	$video 	= (isset($details['videourl']))? $details['videourl'] : '';
	$URL 	= (isset($details['url']))? $details['url'] : '';
	$gallery = '';
	$wedid 	= '';
	if(count($photos) > 0){
		foreach($photos as $photo){
			if(trim($photo) == '') continue;
			$gallery .= '<li> <img src="'.trim($photo).'" /> </li>';
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
?>
<div>
<div class="clearfix"></div>
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
	<div class="project_page new clearfix <?php echo ($isModal == false)? 'single' : '';?>">        

			<?php
			if($video != ''){
				echo '<div class="leftside project-video"><iframe width="100%" data-ratio="4:3" src="'.str_replace('/watch?v=','/embed/', $video).'" frameborder="0" allowfullscreen></iframe></div>';
			}else{
			?>
			<div class="leftside flexslider clearfix">
				<ul class="slides">
					<?php echo $gallery; ?>
				</ul>  
			</div>
			<?php } ?>
      
        <div class="project_content clearfix">
		<?php
			if($WWDDisabled == false):
			?>
        <div class="top">
        	<h4 class="black mb"><?php _e('What we did', 'clapat');?></h4>
            <ul class="categories">
               <?php echo $wedid; ?>        
            </ul>
		</div>
		<?php endif;
		?>
        <div class="bottom">
        	<?php
			the_content();
			if($URL != ''):
			?>
            <a class="btn-small" href="<?php echo $URL; ?>" target="_blank"><?php _e('Launch website', 'clapat');?></a>
			<?php
			endif;
		 ?>
		</div>        
		</div>        
	</div>    
	</div>    