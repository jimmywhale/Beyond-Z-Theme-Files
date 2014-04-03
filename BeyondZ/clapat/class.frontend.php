<?php
$pattern_enabled_on_separators = (@json_decode(get_option('clapat_separator_pattern', true)) == 1)? true : false;

class ClapatFrontend {
	function makeNavMenu($data = false, $prefix = 0){
		global $clapat_settings;
		if($data == false) return;
		$Elements = '';

		$is_first = true;
		if($data['home']['disabled'] == false){
			$href =  'href="#'.$data['home']['id'].'"';
			if($prefix == '1'){
				$href .= ' onClick="window.location.href=\''.home_url().'\'"';
			}else {
				$href = 'href="#'.$data['home']['id'].'"';
			}
			$Elements .= '<li class="current"><a '.$href.'>'.$data['home']['name'].'</a></li>';
			$is_first = false;
		}
		if(!is_front_page()){
			$is_first = false;
		}
		if(isset($data['items']) && count($data['items']) > 0){
			
			for($i=0; $i<count($data['items']['id']);$i++){
				$k = $data['items']['id'][$i];
				$t = $data['items']['type'][$i];
				$c = trim($data['items']['ct'][$i]);
				$p = trim(@$data['items']['spos'][$i]);
				$v = stripslashes(urldecode($data['items']['name'][$i]));
				$pref = '#c-';
				if($p == '1'){ $pref = '#s-';}
				if(empty($k)) continue;
				$href = '';
				// $href =  'href="#c-'.$k.'"';
				// $href =  'href="javascript:void(0)"';
				if($prefix == '1'){
					$href .= ' onClick="window.location.href=\''.home_url().'/'.$pref.$k.'\'" data-href="#c-'.$k.'"';
				}else {
					$href = 'href="'.$pref.$k.'"';
				}
				if($t == 3){
					$Elements .= '<li id="nav-menu-'.$k.'" '.(($is_first == true)? 'class="current"':'').'><a onClick="window.location.href=\''.$c.'\'; return false;" data-url="'.$c.'">'.__($v).'</a></li>';
				}else{
					$Elements .= '<li id="nav-menu-'.$k.'" '.(($is_first == true)? 'class="current"':'').'><a '.$href.'>'.__($v).'</a></li>';
				}
				$is_first = false;
				unset($k); unset($v);
			}
		}

		list($LogoCode, $Style) = siteLogo($data);
		$menuID = 'menu';
		$menuID = 'menu-new-style';
		$extra = '';
		if($menuID != 'menu'){
			$extra = '<div class="toggler"><i class="fa fa-bars fa-3x"></i></div>';
		}
		return '
	<!-- Navigation-->
	<nav id="navigation" '.$Style.'>
    	'.$LogoCode.$extra.'
		<ul id="'.$menuID.'" class="main-menu">
			'.$Elements.'
		</ul>
	</nav>
    <!--/Navigation-->
		';
	}
	
	function sectionContent($data = false){
		if($data == false) return;
		$cleanID 		= stripslashes(htmlentities($data['id']));
		$cleanName 		= stripslashes(htmlentities($data['name']));
		$cleanContent 	= trim(stripslashes($data['content']));
		$style = '';
		if(!empty($data['c_bgi']) || !empty($data['c_bgc'])){
			$style = 'background:'.((!empty($data['c_bgc']))?$data['c_bgc'] : ''). ' '.((!empty($data['c_bgi']))? 'url('.$data['c_bgi'].')' : '');
		}
		if($data['type'] == '2'){
			$HTML = '
			<div id="c-'.$cleanID.'" '.(($style != '')? 'style="'.$style.'"':'').'>
					'.apply_filters('the_content', do_shortcode($cleanContent)).'
			</div>
			';
		}else {
			$HTML = '
			<div id="c-'.$cleanID.'" '.(($style != '')? 'style="'.$style.'"':'').'>
				<!-- Container-->
				<div class="container clearfix">
					'.apply_filters('the_content', do_shortcode($cleanContent)).'
				</div>
			</div>
			';
		}
		return $HTML;
	}
	
	function sectionSeparator($data = false){
		global $pattern_enabled_on_separators;
		if($data == false) return;
		if(empty($data['content']) && empty($data['img'])) return;
		$style = '';
		if(!empty($data['img'])){
			$style .= "background-image:url('".$data['img']."');";
		}
		
		$height = (isset($data['height']))?$data['height']:'400';
		$pattern = ($pattern_enabled_on_separators != false)? '<div class="pattern"></div>':'';
		$extraClass = $datap = '';
		if(isset($data['vid']) && $data['vid'] != ''){
			$extraClass=' bg-video-enable';
			$datap = 'data-property="'."{showYTLogo:false, videoURL: '".$data['vid']."', showControls:false, containment: '.video-bg-".$data['id']."', optimizeDisplay:true, autoPlay:true, mute:true, quality:'default', realfullscreen:true}".'"';
		}
		
		return '
	<!-- Separator -->
	<div id="s-'.$data['id'].'" class="separator-ct '.$extraClass.'" style="min-height:'.$height.'px;height:'.$height.'px;" '.$datap.'>
		<div class="video-bg-container video-bg-'.$data['id'].'"></div>
		'.$pattern.'
		<div class="separator-bg" style="'.$style.'" stl="'.$style.'" data-speed="'.$data['speed'].'"></div>
		
		<div class="container">
			<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA" class="aligner">
			<div class="aligner">'.apply_filters('the_content', do_shortcode(stripslashes($data['content']))).'</div>
		</div>
	</div>
    <!--/ Separator -->';
	}

	
	function makeMasoneryItem($data = false, $type = false){
		if($data == false) return;
		setup_postdata($data);
		$date_format = get_option('date_format');
		$media = '';
		
		$clapat 	= get_post_meta($data->ID,'clapat_advanced', true);
		$details 	= array();
		if($clapat != null){
			$details = (array) json_decode($clapat);
		}

		switch($type){
			case 'video':
				$video 		= (isset($details['video']))? $details['video'] : '';
				if($video != ''):
					if(substr_count($video, 'vimeo.com') == 1){
						$videoURL = str_replace('http://vimeo.com/','http://player.vimeo.com/video/', $video);
					}else if(substr_count($video, 'youtu.be') == 1 ||substr_count($video, 'youtube.com') == 1){
						$videoURL = str_replace('/watch?v=','/embed/', $video);
					}
					$media = '<div class="video-wrapper"><div class="video-container"><iframe width="660" height="330" data-ratio="2" src="'.$videoURL.'" frameborder="0" allowfullscreen></iframe></div></div>';
				
				endif;
			break;
			case 'image':
				$image 		= (isset($details['image']))? $details['image'] : '';
				if($image != ''):
					$media = '<a href="'.get_permalink($data->ID).'" class="post-thumbnail"><img src="'.$image.'"></a>';
				endif; 
			break;
			case 'gallery':
				$photos = (isset($details['photos']))? $details['photos'] : array();
				$gallery = '';
				if(count($photos) > 0){
					foreach($photos as $photo){
						if(trim($photo) == '') continue;
						$gallery .= '<li> <img src="'.trim($photo).'" /> </li>';
					}
				}
				if($gallery != ''):
					$media .= '<div class="flexslider blog clearfix"><ul class="slides">'.$gallery.'</ul></div>';
				endif; 
			break;
			case 'audio':
				$audio 		= (isset($details['audio']))? $details['audio'] : '';
				if($audio != ''):
					$url = urlencode($audio);
					$media .= '<div class="audio-wrapper"><div class="audio-container"><iframe width="100%" height="166" scrolling="no" frameborder="no" src="//w.soundcloud.com/player/?url='.$url.'&amp;color=ff6600&amp;auto_play=false&amp;show_artwork=false"></iframe></div></div>';
				endif; 
			break;
			case 'quote':
				return '<div class="blog-post masonry-item post quote"><div class="post-content"><a href="'.get_permalink($data->ID).'" class="external"><div class="post-quote"><h3>'.$data->post_content.'</h3><p>- '.$data->post_title.'</p> </div></a></div></div>';
			break;
		}
		return '<div class="blog-post masonry-item"><div class="post-content">'.$media.'<h3 class="blog-title"><a href="'.get_permalink($data->ID).'" class="external">'.$data->post_title.'</a></h3><p class="blog-meta">Posted by <a>'.get_the_author().'</a> | '.date($date_format, strtotime($data->post_date)).' | <a href="'.get_permalink($data->ID).'#comments">'.get_comments_number($data->ID).' Comments</a></p><div class="blog-content"><p>'.get_the_excerpt().'</p></div><a href="'.get_permalink($data->ID).'" class="clapat-button small grey external">'.__('Read More','clapat').'</a></div></div>';
	}
}