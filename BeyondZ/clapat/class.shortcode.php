<?php	

class ClapatShortcode {
	
	function textSlider($atts, $content){
		extract(shortcode_atts(array(
			'slide_class' => '',
			'color' => false
		), $atts));	
		$style = '';
		if($color != false){
			$style = 'color:'.$color.';';
		}
		$rand = rand(0, time());
		return '<style>#slide'.$rand.' ul li { '.$style.' }</style><div class="flex-text" id="slide'.$rand.'"><ul class="slides '.$slide_class.'" style="'.$style.'">'.do_shortcode($content).'</ul></div>';
	}
	
	function textSliderSlide($atts, $content){
		extract(shortcode_atts(array(
			'color' => false
		), $atts));	
		$style = '';
		if($color != false){
			$style = 'color:'.$color.';';
		}
		return '<li style="'.$style.'">'.do_shortcode($content).'</li>';
	}
	
	function bigQuote($atts, $content){
		extract(shortcode_atts(array(
		  'author' => 'Anonimous',
		  'nobg' => false,
		  'background' => false,
		  'color' => false,
		  'quote_color' => '#ddd',
		  'center' => false
		), $atts));
		$style = '';
		$class = '';
		if($center != false){
			$class .= ' centertxt ';
		}
		if($background != false){
			$style .= 'background:'.$background.';';
		}
		if($color != false){
			$style .= 'color:'.$color.';';
		}
		
		return '<div class="'.(($nobg == false)?'post':'').' big-quote '.$class.'" style="'.$style.'">
			<h3 class="pcontent"><sup style="color:'.$quote_color.'"><i class="fa fa-quote-left"></i></sup> '.do_shortcode($content).' <sup style="color:'.$quote_color.'"><i class="fa fa-quote-right"></i></sup></h3>
			- <span>'.$author.'</span> - 
		</div>';
	}
	
	function blogMasonery($atts, $content){
		extract(shortcode_atts(array(
		  'title' => __('Latest Posts','clapat'),
		  'background' => false,
		  'limit' => 10,
		  'order' => 'new',
		), $atts));
		$style = '';
		$posts = get_posts('numberposts='.$limit);
		if($background != false){
			$style .= 'background:'.$background.';';
		}
		$HTML = '<div class="container clearfix blogm" style="'.$style.'">
					<h1 class="color mb left">'.$title.'</h1>
					<div class="masonry blog group">';
		if(!empty($posts) && count($posts)>0){	
			foreach($posts as $p){
				$HTML .= ClapatFrontend::makeMasoneryItem($p,get_post_format($p->ID));
			}
		}
		$HTML .= '</div></div>';
		return $HTML;
	}
	
	function dropcap($atts, $content){
		extract(shortcode_atts(array(
		  'style' => 'color',
		  'type' 	=> '',
		), $atts));
		$class = ($style == 'color')? 'dc-color ':'dc-black ';
		$class .= ($type == 'bg')? 'dc-background ':'';
		return '<div class="dropcap clearfix '.$class.'">'.$content.'</div>';
	}
	
	function getTweets($account, $use_cache = 'true'){
	

			$DyDir = dirname(dirname(__FILE__));
			$twitterCache = $DyDir.'/dynamic/twitterCache.json';
			if(!file_exists($twitterCache) || (filemtime($twitterCache) + 60) < time()){
			
			

	/* Edit this with your own keys */			
$token = "40743312-y3liCcAOihr7rUUtfQ3roaiYEVcCsM8tv7bpV21PO";
$token_secret = "6OL8O5LQJFIoHjcOml29L1TKyDhEkGGMTf78PxCE";
$consumer_key = "qMwvjfLy4NUbRIYo7flwUQ";
$consumer_secret = "DdqVDcmF9LbCqhYfLPPgvcWh54XVQpZnu5KqjcMg";
/* Stop editing */


$host = 'api.twitter.com';
$method = 'GET';
$path = '/1.1/statuses/user_timeline.json'; // api call path

$query = array( // query parameters
    'screen_name' => $account,
  //  'count' => '2'
);
$oauth = array(
    'oauth_consumer_key' => $consumer_key,
    'oauth_token' => $token,
    'oauth_nonce' => (string)mt_rand(), // a stronger nonce is recommended
    'oauth_timestamp' => time(),
    'oauth_signature_method' => 'HMAC-SHA1',
    'oauth_version' => '1.0'
);
$oauth = array_map("rawurlencode", $oauth); // must be encoded before sorting
$query = array_map("rawurlencode", $query);
$arr = array_merge($oauth, $query); // combine the values THEN sort
asort($arr); // secondary sort (value)
ksort($arr); // primary sort (key)
$querystring = urldecode(http_build_query($arr, '', '&'));
$url = "https://$host$path";
$base_string = $method."&".rawurlencode($url)."&".rawurlencode($querystring);
$key = rawurlencode($consumer_secret)."&".rawurlencode($token_secret);
$signature = rawurlencode(base64_encode(hash_hmac('sha1', $base_string, $key, true)));
$url .= "?".http_build_query($query);
$oauth['oauth_signature'] = $signature; 
ksort($oauth); 
function add_quotes($str) { return '"'.$str.'"'; }
$oauth = array_map("add_quotes", $oauth);
$auth = "OAuth " . urldecode(http_build_query($oauth, '', ', '));

$options = array( CURLOPT_HTTPHEADER => array("Authorization: $auth"),
                  //CURLOPT_POSTFIELDS => $postfields,
                  CURLOPT_HEADER => false,
                  CURLOPT_URL => $url,
                  CURLOPT_RETURNTRANSFER => true,
                  CURLOPT_SSL_VERIFYPEER => false);

$feed = curl_init();
curl_setopt_array($feed, $options);
$output = curl_exec($feed); 
curl_close($feed);

}else {
				$output = file_get_contents($twitterCache);
			}
		return @json_decode($output); unset($output);
	}
	
	function twitterFeed($atts, $content){
		extract(shortcode_atts(array(
		  'account' 	=> '',
		  'limit' 		=> '4',
		  'show_reply' 	=> '1',
		  'use_cache' 	=> 'true',
		  'nobackground'=> 'false',
		  'nopadding'	=> 'false',
		), $atts));
		if($account == '') return;
		$date_format = get_option('date_format');
		$content = self::getTweets($account, $use_cache);
		
		$out = '';
		if(isset($content->error)) return;

		$found = 0;
		if(count($content) > 0){
			foreach($content as $tweet){
				if($found < $limit){
					$srid = (int) $tweet->in_reply_to_user_id;
					if($srid == 0 || $show_reply == '1'){
						$date = date($date_format, strtotime($tweet->created_at));
						$author = $tweet->user->screen_name;
						$text = $tweet->text;
						$out .= '<li id="twt-'.$tweet->in_reply_to_status_id.'"><h2>"'.$text.'"</h2>
						<p class="white">@'.$author.' - '.$date.'</p></li>';
						$found++;
					}
				}
			}
		}
		return '<div class="twitter" style="'.(($nobackground == 'true')?'background:none !important;':'').'">
<div class="container clearfix '.(($nopadding == 'true')?'nopadding':'').'">
<div class="twitter-image"><a href="https://twitter.com/'.$account.'" target="_blank"><img alt="" src="'.get_template_directory_uri().'/images/twitter.png" /></a></div>
<ul class="fadeText">
'.$out.'</ul>
</div>
</div>';
	}

	function newsletterRegister($atts, $content){
		extract(shortcode_atts(array(
		  'action' 	=> '#',
		  'name' => 'your-address'
		), $atts));
	     return '   
        <div class="newsletter"><div class="container clearfix"><h3 class="white newsletter">'.__('Our newsletter','clapat').':</h3><form id="newsletter" action="'.$action.'"  method="post"><input type="text" onFocus="if(this.value == this.defaultValue) { this.value = \'\'; }" onBlur="if(this.value == \'\') { this.value = this.defaultValue; }" value="'.__('E-mail here','clapat').'" class="newsletter-email" name="'.$name.'"> <button type="submit" class="newsletter-sent">'.__('Submit','clapat').'</button></form> </div></div>';
	}
	
	function service($atts, $content){
		extract(shortcode_atts(array(
		  'url' 	=> '',
		  'icon' 	=> 'leaf',
		  'use_fa'	=> 'no',
		  'title' 	=> '',
		  'icon_color' 	=> '',
		), $atts));
		$HTML = '<div class="heading-and-icon">';
		 
		if($use_fa == 'yes'){
			$extra = '';
			if($icon_color != ''){
				$extra = 'color:#'.$icon_color;
			}
			$HTML .= '<span class="fa-3x fa fa-'.$icon.'" style="'.$extra.'"></span>';
		}else {
			$HTML .= '<img src="'.get_template_directory_uri().'/images/services/'.$icon.'.png" alt="" height="60" width="60">';
		}
		$HTML .= '<h3 class="black mb">'.$title.'</h3></div><p>'.do_shortcode($content).'</p>';
		if($url != ''){
			$HTML .= '<a class="btn-small" href="'.$url.'">View Details</a>';
		}
		$HTML = str_replace(array("\r","\n","\t"), array('','',''), $HTML);
		return $HTML;
	}
	
	function clients($atts, $content){
		extract(shortcode_atts(array(
		  'limit' 		=> '-1',
		  'items' 		=> '',
		), $atts));
		
		$clapat_query = array(
			'post_type' => 'client',
			'numberposts' => $limit,
		);
		if($items != ''){
			$clapat_query['include'] = $items;
		}

		$Items = get_posts($clapat_query);
		$HTML = '<ul class="our-clients">';

		if(count($Items) > 0){
			foreach($Items as $item){
				$thumb = wp_get_attachment_image_src( get_post_thumbnail_id($item->ID), 'thumbnail' );
				$img = $thumb['0'];
				$clapat 	= get_post_meta($item->ID,'clapat_client', true);
				$details 	= array();
				if($clapat != null){
					$details = (array) json_decode($clapat);
				}
				$url 		= (isset($details['url']))? $details['url'] : '';
				$HTML .= '<li class="client"><a href="'.$url.'"><img alt="" src="'.$img.'"></a></li>';
			}
		}
		$HTML .= '</ul>';
		$OUT = $HTML;
		return $OUT;
	}
		
	function news($atts, $content){
		global $clapat_settings;
		extract(shortcode_atts(array(
		  'category' 	=> '',
		  'limit' 		=> '-1',
		  'items' 		=> '',
		  'type' 		=> 'news-item',
		  'title' 		=> __('Stay tuned. Read our news','clapat'),
		), $atts));
		
		$clapat_query = array(
			'post_type' => $type,
			'numberposts' => $limit,
		);
		if($items != ''){
			$clapat_query['include'] = $items;
		}
		if($category != ''){
			$clapat_query['category'] = $category;
		}
		$date_format = get_option('date_format');
		$Items = get_posts($clapat_query);
		$HTML = '';
		$default = '<img src="'.get_template_directory_uri().'/images/news1.jpg"  alt=""  />';
		if(count($Items) > 0){
		$length = (isset($clapat_settings->excerpt_length))? $clapat_settings->excerpt_length : '20';
			foreach($Items as $item){
				$Content = cut_content_by_length( strip_tags($item->post_content,'<strong><em>'), $length);
				//$Content = wp_trim_words( $item->post_content, $length);
			
				$HTML .= '<li>
				<div class="news">
				<div class="image">'.get_the_post_thumbnail($item->ID, 'news-cover').'	</div>	
				<div class="mask"><a class="open1 icon zoom" href="'.get_permalink($item->ID).'" title="'.$item->post_title.'"> </a></div></div>
				<div class="news-intro">
				<a class="open2" href="'.get_permalink($item->ID).'" title="'.__('News').'"><h5>'.$item->post_title.'</h5></a>
				
				<p class="news-date">'.date($date_format,strtotime($item->post_date)).'</p> 
				<div>'.$Content.'</div>
				<a class="btn-small open3" href="'.get_permalink($item->ID).'" title="'.$item->post_title.'">'.__('View Details').'</a> 
				
				</div>
				</li>';
			}
		}
		
		$OUT = '<div class="container-news"><h1>'.$title.'</h1><div class="list_carousel"><ul id="news-carousel">'.$HTML.'</ul><div id="news-navigation"><a id="prev2" class="prev" href="#"></a><a id="next2" class="next" href="#"></a></div></div></div>';
		return $OUT;
	}
	
	function testimonialSlider($atts, $content){
		extract(shortcode_atts(array(
	      'title' => __('Testimonials','clapat'),
		  'show_title' => false,
		  'fixed' => 'off',
		  'limit' => '-1',
		  'items' => '',
		  'nobackground' => 'false',
		  'nopadding'=>'false',
		), $atts));
		$clapat_query = array(
			'post_type' => 'testimonial',
			'numberposts' => $limit,
		);
		if($items != ''){
			$clapat_query['include'] = $items;
		}
		
		$Items = get_posts($clapat_query);
		$HTML = '';
		if(count($Items) > 0){
			foreach($Items as $item){
				$HTML .= '<li><h1 class="black mb">'.$item->post_content.'</h1><h5>'.$item->post_title.'</h5></li>';
			}
		}
		
		return '
        <!-- Testimonials-->
        <div id="testimonials" style="'.(($nobackground == 'true')?'background:none !important;':'').'">
            <div class="container clearfix '.(($nopadding == 'true')?'nopadding':'').'">
            <div class="carousel_testimonials">
				<ul id="testimonials-carousel" class="'.(($fixed == 'on')?'maximizeHeight':'').'">'.$HTML.'</ul><a id="prev" class="t-prev" href="#"></a><a id="next" class="t-next" href="#"></a></div>
            </div></div>';
	}
	
	function portfolio($atts, $content){
		extract(shortcode_atts(array(
	      'title' => __('Portfolio','clapat'),
	      'orderby' => 'menu_order',
		), $atts));
		$htmlItems = '';
		$categories = get_terms( 
			'portfolio-category', 
			array(
				'orderby'    => 'count',
				'hide_empty' => 0
			) 
		);
		
		$SortMenu = '<li><a href="#" class="selected" data-filter="*">All Projects</a></li>';
		foreach($categories as $cat){
			$SortMenu .= '<li><a href="#'.$cat->slug.'" data-filter=".filter-'.$cat->slug.'">'.$cat->name.'</a></li>';
		}
		$base = get_template_directory_uri();
		$htmlSortMenu = '<!-- Portfolio Filters-->
        <div class="projects-filters">
            <!-- Container-->	
            <div class="container clearfix">
                <h1 class="white left">'.$title.'</h1>
                <!-- Filters-->
                <div id="filters">
                    <nav class="primary">
                        <ul>
						'.$SortMenu.'
                        </ul>
                    </nav>
                </div>
                <!--/Filters-->
            </div>
            <!--/Container-->
        </div>';

		$Items = get_posts('post_type=portfolio&numberposts=-1&order=ASC&orderby='.$orderby);
		foreach($Items as $item){
			$tl = wp_get_object_terms($item->ID, 'portfolio-category');
			$st = array();
			$cls = '';
			foreach($tl as $t){
				$st[] = $t->name;
				$cls .= ' filter-'.$t->slug;
			}
			$st = implode(' / ', $st);
			unset($tl);
			
			$thumb = wp_get_attachment_image_src( get_post_thumbnail_id($item->ID), 'portfolio-thumb' );
			$img = $thumb['0'];
			if(strlen($img) < 5){  continue; }
			$lclapat 	= get_post_meta($item->ID,'clapat_portfolio', true);
			$ldetails 	= array();
			if($lclapat != null){
				$ldetails = (array) json_decode($lclapat);
			}
			$lphotos = (isset($ldetails['photos']))? $ldetails['photos'] : array();
			//$lshow = (isset($ldetails['simplecolorbox']))? true : false;
			$lshow =  false;
			$lpopup_type = (isset($ldetails['popup_type']))? $ldetails['popup_type'] : 0;

			unset($ldetails);
			unset($lclapat);
			$colorClass = "groupX";
			$rel = '';
			if($lshow && count($lphotos) > 0){
				$href = $lphotos[0];
				$colorClass = 'singleimageopen';
				// $rel = 'prettyphoto';
				unset($lphotos);
			}else {
				$href = get_permalink($item->ID);
			}
			
			switch($lpopup_type){
				case '1':
					$href = $lphotos[0];
					$colorClass = 'singleimageopen';
					// $rel = 'prettyphoto';
					unset($lphotos);
				break;
				case '2':
					$colorClass = 'expander';
					$rel = 'expander';
					$href = get_permalink($item->ID);
				break;
				default:
					$href = get_permalink($item->ID);
				break;
			}
			
			
			
			$htmlItems .= '<li class="view '.$cls.'"><div class="view"> <a class="'.$colorClass.'" href="'.$href.'" rel="'.$rel.'" title="'.$item->post_title.'"><img src="'.$img.'"><div class="mask"><h5>'.$item->post_title.'</h5><p>'.$st.'</p></div></a></div></li>';
		}

		return $htmlSortMenu.' <ul class="portfolio">'.$htmlItems.'</ul>';
	}

	function accordion($atts, $content){
		// $content =do_shortcode($content);
		$temp = do_shortcode($content);
		if(substr($temp, 0, 6) == '<br />'){
			$temp = substr($temp, 6);
		}
		$content = '<div class="clapat-accordion">'.$temp.'</div>';
		$content = str_replace('<!-- Item --><br />','', $content);
		$content = str_replace('<p><!-- Item --></p>','', $content);
		return $content;
	}
	
	function accordion_item($atts, $content){
		extract(shortcode_atts(array(
	      'title' => '',
	      'style' => 'black',
		), $atts));
		// $content = '<div class="accordionButton '.$style.'"><h4>'.$title.'</h4></div><div class="accordionContent '.$style.'">'.$content.'</div><!-- Item -->';
		$content = '<div class="accordionButton '.$style.'"><h4>'.$title.'</h4></div><div class="accordionContent '.$style.'">'.do_shortcode($content).'</div>';
		return $content;
	}
	
	function tabs($atts, $content){
		$content = do_shortcode($content);
		$tabs = explode('<!-- newtab -->', $content);
		
		$TabID = rand(10,99);
		
		$Titles = $Content = array();
		$Index = 0;
		foreach($tabs as $tab){
			$Parts = @explode('|||', $tab);
			$title = (isset($Parts[0]))? $Parts[0] : '';
			$content = (isset($Parts[1]))? $Parts[1] : '';
			$title = strip_tags($title);
			if(empty($content)) continue; 
			$Titles[] = '<li><a href="#tabs-'.$TabID.$Index.'">'.$title.'</a></li>';
			$Content[] = '<div id="tabs-'.$TabID.$Index.'">'.$content.'</div>';
			$Index++;
		}
		$Output = '<div class="clapat-tabs"><ul>'.implode("\n", $Titles).'</ul><div class="list-wrap">'.implode("\n", $Content).'</div></div>';
		return $Output;
	}
	
	function tab($atts, $content){
		extract(shortcode_atts(array(
	      'title' => '',
		), $atts));
		return $title.'|||'. do_shortcode($content).'<!-- newtab -->';
	}
	
	function features_list($atts, $content){
	//	global $wp_query;
		$HTML = '<div class="gridcontainer">';
		$posts = get_posts('post_type=features&post_status=publish&orderby=menu_order&order=ASC&numberposts=-1');
		foreach($posts as $p){
			setup_postdata($p);
			ob_start();
			the_excerpt();
			$Ex = ob_get_clean();
			$ico = @json_decode(get_post_meta($p->ID,'clapat_featured', true));
			$HTML .= '
			<div class="floating3boxes">
				<a href="'.get_permalink($p->ID).'" class="h1 clearfix"><span class="ico ico-'.$ico.'"></span><label>'.$p->post_title.'</label></a>
				'.$Ex.'
				<a href="'.get_permalink($p->ID).'" class="readmore">Read more</a>
			</div>
			';
		}
		$HTML .= '</div>';
	//	$HTML .= pagination('Previous','Next');
		return $HTML;
	}
	
	function notify($atts, $content){
		extract(shortcode_atts(array(
	      'title' => '',
	      'url' => '',
		  'text' => __('Read more', 'clapat'),
		  'type' => 'light'
		), $atts));
		$HTML = '<div class="clapat-notify large-notice-'.$type.' clearfix">';
		if(!empty($title)){
			$HTML .= '<h2 class="clapat-notify-title">'.$title.'</h2>';
		}
		if(!empty($content)){
			$HTML .= '<div class="clapat-notify-content">'.$content.'</div>';
		}
		if(!empty($url)){
			$HTML .= '<a href="'.$url.'" class="btn-medium b-color clapat-notify-url button reverse">'.$text.'</a>';
		}
		
		
		$HTML .= '</div>';
		return $HTML;
	}
	
	function button($atts, $content){
		extract(shortcode_atts(array(
	      'type' => '',
	      'ico' => '',
	      'url' => '',
	      'target' => '',
		), $atts));
		$HTML = '<a href="'.$url.'" '.((!empty($target))? ' target="'.$target.'" ':'').'class="clapat-button button '.(($type == 'grey')?'reverse':'').' '.(($ico == 'yes')?'clapat-with-icon':'').'">'.$content.'</a>';
		return $HTML;
	}
		
	
	function message($atts, $content){
		extract(shortcode_atts(array(
	      'type' => '',
		), $atts));
		
		switch($type){
			case 'error':
				$clapat_class = 'clapat-error error';
			break;
			case 'warn':
				$clapat_class = 'clapat-warn warning';
			break;
			case 'success':
				$clapat_class = 'clapat-success success';
			break;
			default:
				$clapat_class = 'clapat-notice notice';
			break;
		}
		$HTML = '<div class="clapat-message notification '.$clapat_class.'">'.$content.'</div>';
		return $HTML;
	}
	
	function pricingTable($atts, $content){
		$HTML = '<div class="clapat-pricing-table pricing-table clearfix">'.do_shortcode($content).'</div>';
		return $HTML;
	}	
	
	function pricingTableSecondary($atts, $content){
		$HTML = '<div class="clapat-pricing-table pricing-table-second clearfix">'.do_shortcode($content).'</div>';
		return $HTML;
	}
	
	function pricingTableColumn($atts, $content){
		extract(shortcode_atts(array(
	      'featured' 	=> 'disabled',
	      'title' 		=> 'Webhosting package',
	      'row1' 		=> '&nbsp;',
	      'row2' 		=> '&nbsp;',
		  'url' 		=> '#',
		  'link' 		=> 'Sign Up Now',
		  'pid' 		=> '0',
		  'price'		=> '',
		  'currency'	=> '$',
		  'suffix'		=> 'per month',
		), $atts));
		$HTML = '<div class="column '.(($featured != 'disabled')? 'level-max':'').'">
		<h2>'.$title.'</h2>
		<div class="header">';
		if($price != 0 && $row1 != '&nbsp;'){
			$HTML .= '<h4><span>'.$currency.' '.$price.'</span> '.$suffix.'</h4>';
		}
		else {
			$HTML .= '<h4>'.$row1.'</h4>
			<p>'.$row2.'</p>';
		}
		$HTML .= '</div>
		<ul>'.do_shortcode($content).'</ul>
		<div class="footer">
			<a class="btn btn-small b-color '.(($pid != 0)? 'addtocart" rel="'.$pid :'').'" href="'.$url.'">'.$link.'</a>
		</div>
		</div>';
		return $HTML;
	}
	
	function pricingTableRow($atts, $content){
		$HTML = '<li>'.do_shortcode($content).'</li>';
		return $HTML;
	}
	
	function ourTeam($atts, $content){
		extract(shortcode_atts(array(
	      'members' 	=> '',
		  'hidedetails' => false,
		  'title' => 'Meet Our Team',
		), $atts));
		
		
		$args = array(
			'posts_per_page'  => -1,
			'orderby'         => 'post_date',
			'order'           => 'DESC',
			'post_type'       => 'our-team',
			'post_status'     => 'publish',
			'suppress_filters' => true
		);
		if(trim($members) != ''){
			$args['include'] = $members;
		}
		$member_Array = get_posts( $args );
		$members = count($member_Array);
		if($members == 0) return;

		$HTML = '
<div class="ourteam">
<div class="container clearfix">
<div class="container nopadding"><h1 class="color mb mot">'.$title.'</h1></div>';
			for($i=1;$i<=$members;$i++){
				$currentMember 	= (isset($member_Array[$i - 1]))? $member_Array[$i - 1] : '';
				if(!is_object($currentMember)) continue;
				$clapat 		= get_post_meta($currentMember->ID,'clapat_memberinfo', true);
				$details 		= array();
				if($clapat != null){
					$details 	= (array) json_decode($clapat);
				}
				$title 			= (isset($details['title']))? 	$details['title'] 		: '#';
				$facebook 		= (isset($details['facebook']))?$details['facebook'] 	: '#';
				$twitter 		= (isset($details['twitter']))? $details['twitter'] 	: '#';
				$google 		= (isset($details['google']))? 	$details['google'] 		: '#';
				$linkedin 		= (isset($details['linkedin']))?$details['linkedin'] 	: '#';
				
				$thumb = wp_get_attachment_image_src( get_post_thumbnail_id($currentMember->ID), 'our-team-thumb' );

				$img = $thumb['0'];
				if(strlen($img) < 10){
					$img = get_template_directory_uri().'/images/user-nopic.png';
				}
				$extraClass = '';
		//		$extraClass = (($i%4 == 0)? ' last':'');
			
				if($hidedetails == false){ $extraClass .= ' expand';}
				$HTML .= '<div class="team '.$extraClass.'" data-id="'.$i.'"><img class="user" src="'.$img.'" alt="" width="225"><div class="team-overlay"><h5 class="black">'.$currentMember->post_title.'</h5><p class="team-function">'.$title.'</p>';
				if($hidedetails == false){			
					$HTML .= '<p class="team-description">'.$currentMember->post_content.'</p>';
						$HTML .= ($facebook != '')?	'<div class="team-social"><a href="'.$facebook.'" target="_blank"><img src="'.get_template_directory_uri().'/images/icon_facebook.png" alt=""></a></div>' : '';
						$HTML .= ($twitter != '')?	'<div class="team-social"><a href="'.$twitter.'" target="_blank"><img src="'.get_template_directory_uri().'/images/icon_twitter.png" alt=""></a></div>' : '';
						$HTML .= ($google != '')?	'<div class="team-social"><a href="'.$google.'" target="_blank"><img src="'.get_template_directory_uri().'/images/icon_google.png" alt=""></a></div>' : '';
						$HTML .= ($linkedin != '')?	'<div class="team-social"><a href="'.$linkedin.'" target="_blank"><img src="'.get_template_directory_uri().'/images/icon_linkedin.png" alt=""></a></div>' : '';
				}
				$HTML .= '</div></div>';
				if($i % 4 == 0 && $i != $members && $i != 0){
				//	$HTML .= '</div><div class="container clearfix">';
				}
				unset($currentMember);
			}
		$HTML .= '</div></div>';
		return $HTML;
	}
		
	function divider($atts, $content){
		extract(shortcode_atts(array(
		  'text'		=> '',
		  'type'		=> '', 
		), $atts));
		return '<div class="divider'.(($type != '')?" $type ":'').'">
		'.(($text != '')? '<div class="scroll-top">'.$text.'</div>' : '').'
		</div>';
	}
	
	function space($atts, $content){
		extract(shortcode_atts(array(
		  'height'		=> 5,
		), $atts));
		return '<div class="space" style="clear:both; height:'.$height.'px;"></div>';
	}
	
	function youtube($atts, $content){
		extract(shortcode_atts(array(
		  'video_id'	=> '',
		  'url'			=> '',
		  'height'		=> 0,
		  'width'		=> 0,
		  'ratio'		=> '4:3',
		), $atts));
		
		list($ar_w, $ar_h) = @explode(':', $ratio);
		
		if($height == 0 && $width == 0){
			$height = 200;
			$width = 300;
		}else if($height > 0){
			$width = ($height / $ar_h) * $ar_w;
		} else {
			$height = ($width / $ar_w) * $ar_h;
		}
		
	
		$style = '';
		if($height > 0){
			$style .= ' height:'.$height.'px;';
		}
		if($width > 0){
			$style .= ' width:'.$width.'px;';
		}
		if(strlen($url) < 10 && $video_id == ''){
			return; 
		}
		
		if(strlen($video_id) > 3){
			$url = 'http://www.youtube.com/watch?v='.$video_id;
		}else {
			if(strlen($url) >= 10){
				// Do nothing
			}else {		
				return;
			}
		}
		
		$url = str_replace('/watch?v=', '/embed/', $url);
		return '
		<div class="youtube-video" style="'.$style.'">
			<iframe style="height:100%; width:100%;" src="'.$url.'" frameborder="0" allowfullscreen></iframe>
		</div>
		';
	}
	
	function testimonial($atts, $content){
		extract(shortcode_atts(array(
		  'author'	=> 'Amonimous',
		), $atts));
		return '
            <div class="testimonial">
				<blockquote>
					'.apply_filters('the_content', $content).'
                </blockquote>
                <p class="black"><strong class="client_identity">'.$author.'</strong></p>
            </div>
		';
	}		
	
	function testimonialWidget($atts, $content){
		return '
            <div class="fade_testimonials">
				'.do_shortcode($content).'
            </div>
		';
	}
	
	function meter($atts, $content){
		extract(shortcode_atts(array(
		  'value'	=> '1',
		), $atts));
		return '
			<div class="meter">
               <div style="width:'.$value.'%"><p class="white">'.$content.' ( '.$value.'% )</p></div>
            </div>
		';
	}	
	
	function slist($atts, $content){
		extract(shortcode_atts(array(
		  'type'	=> 'check',
		  'class'	=> 'custom-list',
		), $atts));
		return '
            <div class="'.$type.'-list '.$class.'">
				'.do_shortcode($content).'
            </div>
		';
	}
	
	function box($atts, $content){
		return '
            <div class="container clearfix">
				'.do_shortcode($content).'
            </div>
		';
	}
	
	function map($atts, $content){
		return '<div id="map_canvas"></div>';
	}
	
	function contactForm($atts, $content){
		return '<div class="contact-form">
            <div class="container clearfix">
				<h2 class="black mb">'.__('Send us a message','clapat').'</h2>
                <div id="message"></div>
                <form method="post" action="'.get_template_directory_uri().'/clapat/AjaxCall.php?action=contact" onSubmit="return false;" name="contactform" id="contactform">
				<div class="one_half">
                    <input name="name" type="text" id="name" size="30"  onfocus="if(this.value == this.defaultValue) { this.value = \'\'; }" onBlur="if(this.value == \'\') { this.value = this.defaultValue; }" value="'.__('Name','clapat').'" >
                    <input name="email" type="text" id="email" size="30" onFocus="if(this.value == this.defaultValue) { this.value = \'\'; }" onBlur="if(this.value == \'\') { this.value = this.defaultValue; }" value="'.__('E-mail','clapat').'" >
                    <input name="phone" type="text" id="phone" size="30" onFocus="if(this.value == this.defaultValue) { this.value = \'\'; }" onBlur="if(this.value == \'\') { this.value = this.defaultValue; }" value="'.__('Phone','clapat').'" >
                </div>
                <div class="one_half last">
                    <textarea name="message" cols="40" rows="3" id="message" onFocus="if(this.value == this.defaultValue) { this.value = \'\'; }" onBlur="if(this.value == \'\') { this.value = this.defaultValue; }" >'.__('Message','clapat').'</textarea>
				</div>
                	<input type="submit" class="send_message" id="submit" value="'.__('Submit', 'clapat').'" /> 
				</form>
            </div>
        </div>';
	}
	
	function clapat_slider($atts, $content){
		extract(shortcode_atts(array(
	      'slides' 	=> '',
		  'order' => 'internal',
		), $atts));
		
		$TemplateURL = get_template_directory_uri();
		
		$args = array(
			'posts_per_page'  => -1,
			'orderby'         => 'post_date',
			'order'           => 'DESC',
			'post_type'       => 'full-slider',
			'post_status'     => 'publish',
		//	'suppress_filters' => true
		);
		if($order == 'external'){
			unset($args['order']);
			unset($args['orderby']);
		}
		if(trim($slides) != ''){
			$args['include'] = $slides;
		}
		$items_Array = get_posts( $args );
		$items = count($items_Array);
		if($items == 0) return;
		$HTML = '<a href="#" id="arrow_left"><img src="'.$TemplateURL.'/images/arrow_left.png" alt="Slide Left" /></a><a href="#" id="arrow_right"><img src="'.$TemplateURL.'/images/arrow_right.png" alt="Slide Right" /></a><img id="cycle-loader" src="'.$TemplateURL.'/images/loading.gif" alt="" /><div id="maximage" class="clearfix">';
		foreach($items_Array as $Item){
			$image = wp_get_attachment_image_src( get_post_thumbnail_id($Item->ID), 'full' );

			$URL = $image['0'];
			if(strlen($URL) < 10) continue; 
			$HTML .= '<div><img src="'.$URL.'" alt=""  /><div class="pattern"></div><div class="in-slide-content" style="display:none;"><h1>'.$Item->post_title.'</h1>'.apply_filters('the_content',$Item->post_content).'</div></div>';
	}
		$HTML .= '</div>';
		return $HTML;
	}
	
	function clapat_ytfull($atts, $content){
		extract(shortcode_atts(array(
	      'video' 	=> '',
		  'ratio'	=> '16:9',
		  'autoplay'=> 'true',
		  'fallback_img' => false,
		), $atts));
		$ratio = str_replace(':','/', $ratio);
		if(strlen($video) < 5) return 'No video selected' . $video;
		$rand = rand(1000,9999);
		return '<div class="pattern"></div><div class="bg_yt_video vid'.$rand.'" style="'.(($fallback_img != false)? "background-image:url('$fallback_img');":'').' width: 100%; height: 100%;"><a id="bgndVideo" href="'.$video.'" class="movie" data-property="{opacity:1, isBgndMovie:false, optimizeDisplay:false, showControls:true, ratio:\''.$ratio.'\',startAt:0,quality:\'hd720\',addRaster:true,lightCrop:true,autoPlay:'.$autoplay.', containment: \'.vid'.$rand.'\'}"></a></div>';
	}
	
	function clapat_parallax($atts, $content){
		extract(shortcode_atts(array(
	      'image' 	=> '',
		  'speed'	=> '0.3',
		  'height'	=> 'full',
		  'direction'=> 'normal',
		  'fixed'=>false
		), $atts));
	$class = 'full-section';
	$extra = '';
	if($height != 'full'){
		$extra = ' height:'.$height.'px"; ';
	}
	if($fixed != false){
		$extra = ' background-attachment:fixed; background-position:0 0;';
		$class .= ' fixed-bg ';
		$speed = 0;
	}
	$parallaxClass = 'parallax';
	if($direction == 'inverse'){
		$parallaxClass = 'inverse-parallax';
	}
	$uniqueID = 'parallax-'.rand(100,1000);
	$HTML = '<div  class="'.$class.' '.$parallaxClass.'" data-speed="'.$speed.'" id="'.$uniqueID.'" style="background-image:url(\''.$image.'\'); '.$extra.'">'.do_shortcode($content).'</div>';
		return $HTML;
	}
	
	function fontawesome($atts, $content){
		extract(shortcode_atts(array(
	      'icon' 	=> '',
	      'size' 	=> 'small',
		), $atts));
		$Size = ($size != 'small')? 'fa-'.$size : '';
		return '<i class="fa '.$icon.' '.$Size.'"></i>';
	}
	
	function clapat_toggle($atts, $content){
		extract(shortcode_atts(array(
	      'title' 	=> __('Toggle','clapat'),
		), $atts));
		return '<div class="toggle" data-type="toggle"><a class="action"><i class="icon fa fa-plus"></i><span>'.$title.'</span></a><div class="toggle-content">'.do_shortcode($content).'</div></div>';
	}
	
	function clapat_flex($atts, $content){
		extract(shortcode_atts(array(
	      'class' 	=> 'clapat-flexslider',
		), $atts));
		return '<div class="'.$class.' flexslider" data-type="slider"><ul class="slides">'.do_shortcode($content).'</ul></div>';
	}
	
	function clapat_flex_slide($atts, $content){
		extract(shortcode_atts(array(
	      'image' 	=> '',
		), $atts));
		return '<li>'.((!empty($image))?'<img src="'.$image.'">':'').''.((!empty($content))?'<div class="flex-caption">'.do_shortcode($content).'</div>':'').'</li>';
	}
	
	function clapat_cta($atts, $content){
		extract(shortcode_atts(array(
	      'url' 	=> 'http://themeforest.net/user/Hector18/portfolio',
	      'title' 	=> __('Call to action','clapat'),
	      'show-triangle' 	=> true,
		), $atts));
		return '<div class="call-to-action"><div class="container"><div class="triangle"></div><span> '.do_shortcode($content).'</span><a href="'.$url.'">'.$title.'</a></div></div>';
	}
	
	function clapat_soundcloud($atts) {
		$atts = shortcode_atts(
		array(
			'url' => '',
			'width' => '100%',
			'height' => 81,
			'comments' => 'true',
			'auto_play' => 'false',
			'color' => 'ff7700',
		), $atts);
		return '<iframe width="'.$atts['width'].'" height="'.$atts['height'].'" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=' . urlencode($atts['url']) . '&amp;show_comments=' . $atts['comments'] . '&amp;auto_play=' . $atts['auto_play'] . '&amp;color=' . $atts['color'] . '"></iframe>';
	}
	
	function clapat_padding($atts, $content) {
		$atts = shortcode_atts(
		array(
			'clear' => 'yes',
			'size' => '0',
			'left' => '0',
			'right' => '0',
			'top' => '0',
			'bottom' => '0',
		), $atts);
		$style = '';
		if($size != '0'){
			$style .= 'padding:'.$size.';';
		}
		if($top != '0'){
			$style .= 'padding-top:'.$top.';';
		}
		if($right != '0'){
			$style .= 'padding-right:'.$right.';';
		}
		if($bottom != '0'){
			$style .= 'padding-bottom:'.$bottom.';';
		}
		if($left != '0'){
			$style .= 'padding-left:'.$left.';';
		}
		return '<!-- Padding-box --><div '.(($clear == 'yes')? ' class="group" ':'').' '.(($style != '')? " $style ":'').'>'.do_shortcode($content).'</div><!-- /Padding-box -->';
	}

/* Added by VDC */
	
	function center($atts, $content){
		return '
            <div class="align-center-container"><div class="div-align-center">
				'.do_shortcode($content).'
            </div></div>
		';
	}
	
	function homebutton($atts, $content){
		extract(shortcode_atts(array(
	      'url' => '',
	      'target' => '',
		), $atts));
		$HTML = '<a href="'.$url.'" '.((!empty($target))? ' target="'.$target.'" ':'').'class="home-button">'.$content.'</a>';
		return $HTML;
	}
}


add_shortcode('cflex', array('ClapatShortcode','clapat_flex'));
add_shortcode('cslide', array('ClapatShortcode','clapat_flex_slide'));
add_shortcode('text-slider', array('ClapatShortcode','textSlider'));
add_shortcode('tslide', array('ClapatShortcode','textSliderSlide'));

add_shortcode('pad-box', array('ClapatShortcode','clapat_padding'));
add_shortcode('padding-box', array('ClapatShortcode','clapat_padding'));
add_shortcode('padding', array('ClapatShortcode','clapat_padding'));
add_shortcode('cta', array('ClapatShortcode','clapat_cta'));
add_shortcode('call-action', array('ClapatShortcode','clapat_cta'));
add_shortcode('call-to-action', array('ClapatShortcode','clapat_cta'));
add_shortcode('soundcloud', array('ClapatShortcode','clapat_soundcloud'));

add_shortcode('toggle', array('ClapatShortcode','clapat_toggle'));
add_shortcode('dc', array('ClapatShortcode','dropcap'));
add_shortcode('dropcap', array('ClapatShortcode','dropcap'));

add_shortcode('fa', array('ClapatShortcode','fontawesome'));
add_shortcode('fontawesome', array('ClapatShortcode','fontawesome'));

add_shortcode('contact-form', array('ClapatShortcode','contactForm'));
add_shortcode('map', array('ClapatShortcode','map'));
add_shortcode('twitter-feed', array('ClapatShortcode','twitterFeed'));

add_shortcode('newsletter-register', array('ClapatShortcode','newsletterRegister'));
add_shortcode('news', array('ClapatShortcode','news'));
add_shortcode('service', array('ClapatShortcode','service'));
add_shortcode('clients', array('ClapatShortcode','clients'));

add_shortcode('portfolio', array('ClapatShortcode','portfolio'));
add_shortcode('tabs', array('ClapatShortcode','tabs'));
add_shortcode('tab', array('ClapatShortcode','tab'));
add_shortcode('accordion', array('ClapatShortcode','accordion'));
add_shortcode('item', array('ClapatShortcode','accordion_item'));
add_shortcode('features', array('ClapatShortcode','features_list'));
add_shortcode('notify', array('ClapatShortcode','notify'));
add_shortcode('button', array('ClapatShortcode','button'));
add_shortcode('homebutton', array('ClapatShortcode','homebutton'));
add_shortcode('message', array('ClapatShortcode','message'));
add_shortcode('pricing-table', array('ClapatShortcode','pricingTable'));
add_shortcode('pricing-table-second', array('ClapatShortcode','pricingTableSecondary'));
add_shortcode('col', array('ClapatShortcode','pricingTableColumn'));
add_shortcode('row', array('ClapatShortcode','pricingTableRow')); 
add_shortcode('our-team', array('ClapatShortcode','ourTeam')); 
add_shortcode('divider', array('ClapatShortcode','divider')); 
add_shortcode('space', array('ClapatShortcode','space')); 
add_shortcode('youtube', array('ClapatShortcode','youtube')); 
add_shortcode('testimonial', array('ClapatShortcode','testimonial')); 
add_shortcode('testimonial-widget', array('ClapatShortcode','testimonialWidget')); 
add_shortcode('list', array('ClapatShortcode','slist')); 
add_shortcode('box', array('ClapatShortcode','box')); 
add_shortcode('center', array('ClapatShortcode','center')); 
add_shortcode('bar', array('ClapatShortcode','meter')); 
add_shortcode('meter', array('ClapatShortcode','meter')); 
add_shortcode('testimonial-slider', array('ClapatShortcode','testimonialSlider')); 

function clapat_one_third( $atts, $content = null ) {
   return apply_filters('uds_shortcode_out_filter', '<div class="one_third">' . do_shortcode(trim($content)) . '</div>');
}
add_shortcode('one_third', 'clapat_one_third');

function clapat_one_third_last( $atts, $content = null ) {
   return apply_filters('uds_shortcode_out_filter', '<div class="one_third last">' . do_shortcode(trim($content)) . '</div><div class="clearboth"></div>');
}
add_shortcode('one_third_last', 'clapat_one_third_last');

function clapat_two_third( $atts, $content = null ) {
   return apply_filters('uds_shortcode_out_filter', '<div class="two_third">' . do_shortcode(trim($content)) . '</div>');
}
add_shortcode('two_third', 'clapat_two_third');

function clapat_two_third_last( $atts, $content = null ) {
   return apply_filters('uds_shortcode_out_filter', '<div class="two_third last">' . do_shortcode(trim($content)) . '</div><div class="clearboth"></div>');
}
add_shortcode('two_third_last', 'clapat_two_third_last');
/*
function clapat_one_half( $atts, $content = null ) {
   return apply_filters('uds_shortcode_out_filter', '<div class="one_half">' . do_shortcode(trim($content)) . '</div>');
}
add_shortcode('one_half', 'clapat_one_half');

function clapat_one_half_last( $atts, $content = null ) {
   return apply_filters('uds_shortcode_out_filter', '<div class="one_half last">' . do_shortcode(trim($content)) . '</div><div class="clearboth"></div>');
}
add_shortcode('one_half_last', 'clapat_one_half_last');
*/
function clapat_one_fourth( $atts, $content = null ) {
   return apply_filters('uds_shortcode_out_filter', '<div class="one_fourth">' . do_shortcode(trim($content)) . '</div>');
}
add_shortcode('one_fourth', 'clapat_one_fourth');

function clapat_one_fourth_last( $atts, $content = null ) {
   return apply_filters('uds_shortcode_out_filter', '<div class="one_fourth last">' . do_shortcode(trim($content)) . '</div><div class="clearboth"></div>');
}
add_shortcode('one_fourth_last', 'clapat_one_fourth_last');

function clapat_three_fourth( $atts, $content = null ) {
   return apply_filters('uds_shortcode_out_filter', '<div class="three_fourth">' . do_shortcode(trim($content)) . '</div>');
}
add_shortcode('three_fourth', 'clapat_three_fourth');

function clapat_three_fourth_last( $atts, $content = null ) {
   return apply_filters('uds_shortcode_out_filter', '<div class="three_fourth last">' . do_shortcode(trim($content)) . '</div><div class="clearboth"></div>');
}
add_shortcode('three_fourth_last', 'clapat_three_fourth_last');

function clapat_one_fifth( $atts, $content = null ) {
   return apply_filters('uds_shortcode_out_filter', '<div class="one_fifth">' . do_shortcode(trim($content)) . '</div>');
}
add_shortcode('one_fifth', 'clapat_one_fifth');

function clapat_one_fifth_last( $atts, $content = null ) {
   return apply_filters('uds_shortcode_out_filter', '<div class="one_fifth last">' . do_shortcode(trim($content)) . '</div><div class="clearboth"></div>');
}
add_shortcode('one_fifth_last', 'clapat_one_fifth_last');

function clapat_two_fifth( $atts, $content = null ) {
   return apply_filters('uds_shortcode_out_filter', '<div class="two_fifth">' . do_shortcode(trim($content)) . '</div>');
}
add_shortcode('two_fifth', 'clapat_two_fifth');

function clapat_two_fifth_last( $atts, $content = null ) {
   return apply_filters('uds_shortcode_out_filter', '<div class="two_fifth last">' . do_shortcode(trim($content)) . '</div><div class="clearboth"></div>');
}
add_shortcode('two_fifth_last', 'clapat_two_fifth_last');

function clapat_three_fifth( $atts, $content = null ) {
   return apply_filters('uds_shortcode_out_filter', '<div class="three_fifth">' . do_shortcode(trim($content)) . '</div>');
}
add_shortcode('three_fifth', 'clapat_three_fifth');

function clapat_three_fifth_last( $atts, $content = null ) {
   return apply_filters('uds_shortcode_out_filter', '<div class="three_fifth last">' . do_shortcode(trim($content)) . '</div><div class="clearboth"></div>');
}
add_shortcode('three_fifth_last', 'clapat_three_fifth_last');

function clapat_four_fifth( $atts, $content = null ) {
   return apply_filters('uds_shortcode_out_filter', '<div class="four_fifth">' . do_shortcode(trim($content)) . '</div>');
}
add_shortcode('four_fifth', 'clapat_four_fifth');

function clapat_four_fifth_last( $atts, $content = null ) {
   return apply_filters('uds_shortcode_out_filter', '<div class="four_fifth last">' . do_shortcode(trim($content)) . '</div><div class="clearboth"></div>');
}
add_shortcode('four_fifth_last', 'clapat_four_fifth_last');

function clapat_one_sixth( $atts, $content = null ) {
   return apply_filters('uds_shortcode_out_filter', '<div class="one_sixth">' . do_shortcode(trim($content)) . '</div>');
}
add_shortcode('one_sixth', 'clapat_one_sixth');

function clapat_one_sixth_last( $atts, $content = null ) {
   return apply_filters('uds_shortcode_out_filter', '<div class="one_sixth last">' . do_shortcode(trim($content)) . '</div><div class="clearboth"></div>');
}
add_shortcode('one_sixth_last', 'clapat_one_sixth_last');

function clapat_five_sixth( $atts, $content = null ) {
   return apply_filters('uds_shortcode_out_filter', '<div class="five_sixth">' . do_shortcode(trim($content)) . '</div>');
}
add_shortcode('five_sixth', 'clapat_five_sixth');

function clapat_five_sixth_last( $atts, $content = null ) {
   return apply_filters('uds_shortcode_out_filter', '<div class="five_sixth last">' . do_shortcode(trim($content)) . '</div><div class="clearboth"></div>');
}
add_shortcode('five_sixth_last', 'clapat_five_sixth_last');

function clapat_one_half( $atts, $content = null ) {
   return '<div class="one_half">' . do_shortcode(trim($content)) . '</div>';
}
add_shortcode('one_half', 'clapat_one_half');

function clapat_one_half_last( $atts, $content = null ) {
   return apply_filters('uds_shortcode_out_filter', '<div class="one_half last">' . do_shortcode(trim($content)) . '</div><div class="clearboth"></div>');
}
add_shortcode('one_half_last', 'clapat_one_half_last');

function clapat_group( $atts, $content = null ) {
   return '<div class="clearfix">' . $content . '</div>';
   return '<div class="clearfix">' . do_shortcode(trim($content)) . '</div>';
}
add_shortcode('group', 'clapat_group');

function clapat_get_page( $atts, $content = null ) {
	extract(shortcode_atts(array(
		'id'	=> '0',
		'slug' => ''
	), $atts));
	if($id != 0){
		$page = get_page($id, OBJECT, 'display');
	} else if($slug != ''){
		$page = get_page_by_path($slug);
	}
	if(!isset( $page->post_content)) return;
//	$content = apply_filters('the_content', $page->post_content);
	$content = $page->post_content;
//	$content = do_shortcode($page->post_content);
//var_dump($content);
   return do_shortcode($content);
}
add_shortcode('page', 'clapat_get_page');

add_shortcode('full-slider', array('ClapatShortcode','clapat_slider'));
add_shortcode('youtube-video', array('ClapatShortcode','clapat_ytfull'));
add_shortcode('parallax', array('ClapatShortcode','clapat_parallax'));
add_shortcode('blogm', array('ClapatShortcode','blogMasonery'));
add_shortcode('big-quote', array('ClapatShortcode','bigQuote'));



function uds_clear_autop($content)
{
	return $content;
    $content = str_ireplace('<p>', '', $content);
    $content = str_ireplace('</p>', '', $content);
    $content = str_ireplace('<br>', '', $content);
    return $content;
}