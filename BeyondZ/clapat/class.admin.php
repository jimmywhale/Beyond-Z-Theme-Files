<?php
$Colors = array(
					'white' => array(
						'label' => 'White color',
						'default'=> 'FFFFFF',
						),
					'black' => array(
						'label' => 'Black color',
						'default'=> '000000',
						),
					'secondary' => array(
						'label' => 'Secondary color',
						'default'=> 'ef4a4a',
						),
					'grey1' => array(
						'label' => 'Grey 1',
						'default'=> 'ECECEC',
						),
					'grey2' => array(
						'label' => 'Grey 2',
						'default'=> 'ebebeb',
						),
					'grey3' => array(
						'label' => 'Grey 3',
						'default'=> 'dddddd',
						),
					'grey4' => array(
						'label' => 'Grey 4',
						'default'=> 'A1A1A1',
						),
					'grey5' => array(
						'label' => 'Grey 5',
						'default'=> 'F2F2F2',
						),					
					'grey6' => array(
						'label' => 'Grey 6',
						'default'=> 'eeeeee',
						),					
					'grey7' => array(
						'label' => 'Grey 7',
						'default'=> 'ababab',
						),
					'grey8' => array(
						'label' => 'Grey 8',
						'default'=> 'C4C4C4',
						),
					'grey9' => array(
						'label' => 'Grey 9',
						'default'=> '7f7f7f',
						),
					'grey10' => array(
						'label' => 'Grey 10',
						'default'=> '555555',
						),
					'grey11' => array(
						'label' => 'Grey 11',
						'default'=> '363942',
						),
					'grey12' => array(
						'label' => 'Grey 12',
						'default'=> '262932',
						),
					'grey13' => array(
						'label' => 'Grey 13',
						'default'=> '808080',
						),
					
					'navi' => array(
						'label' => 'Navigation background color',
						'default'=> '1e2024',
						'opacity'=>'100',
						),
						
				);
include_once(dirname(__FILE__).'/Shortcodes.list.php');		
add_action('admin_ajax_export_data', 'clapat_export_settings');
add_action('wp_ajax_export_data', 'clapat_export_settings');
function clapat_export_settings(){
	$clapat_settings = array();
	// $clapat_settings['clapat_sections'] = @json_decode(stripslashes(get_option('clapat_sections')));
	$clapat_settings['clapat_sections'] = @json_decode(get_option('clapat_sections'));
	$clapat_settings['clapat_social'] = @json_decode(stripslashes(get_option('clapat_social')));
	$clapat_settings['clapat_design'] = @json_decode(stripslashes(get_option('clapat_design')));
	$clapat_settings['clapat_general_settings'] = @json_decode(get_option('clapat_general_settings'));
	$clapat_settings['clapat_contact'] = @json_decode(stripslashes(get_option('clapat_contact')));
	$clapat_settings['clapat_footer'] = @json_decode(stripslashes(get_option('clapat_footer')));
//	$clapat_settings['clapat_css_override'] = @json_decode(stripslashes(get_option('clapat_css_override')));
	//var_dump(stripslashes(get_option('clapat_sections')));
	echo str_replace(']rn[', '][', json_encode($clapat_settings));
	exit;
}

add_action('wp_ajax_savePalette', 'savePaletteFile');
function savePaletteFile(){
global $Colors;

$nonce = $_POST['security'];
if ( ! wp_verify_nonce( $nonce, 'myajax-clapat' ) )
	die ( 'No, no, no !!!!');
	wp_parse_str(stripslashes($_POST['data']), $data);
		unset($data['security']);//var_dump($data['clapat_design']['color']);
	ClapatAdmin::updateColorPalette($Colors, $data, 'custom-skin-'.time().'.css');
exit;
}


add_action('wp_ajax_saveCssOverride', 'saveCssOverride');
function saveCssOverride(){
$nonce = $_POST['security'];
if ( ! wp_verify_nonce( $nonce, 'myajax-clapat' ) )
	die ( 'No, no, no !!!!');
	wp_parse_str(stripslashes($_POST['data']), $data);
		unset($data['security']);//var_dump($data['clapat_design']['color']);
	ClapatAdmin::saveCssOverride($data);
exit;
}	

add_action('wp_ajax_my_action_web', 'my_action_web');
function my_action_web(){
$nonce = $_POST['security'];
if ( ! wp_verify_nonce( $nonce, 'myajax-clapat' ) )
	die ( 'No, no, no !!!!');
	wp_parse_str(stripslashes($_POST['data']), $data);
		unset($data['security']);
		$changed = ClapatAdmin::updateFields($data);
	if($changed > 0){
		_e('Options saved!!','clapat');
	}else {
		_e('Options not saved!!!','clapat');
	}
exit;
}	

add_action('wp_ajax_delete_skin', 'delete_skin_file');
function delete_skin_file(){
$nonce = $_POST['security'];
if ( ! wp_verify_nonce( $nonce, 'myajax-clapat' ) )
	die ( 'No, no, no !!!!');
	wp_parse_str(stripslashes($_POST['data']), $data);
		unset($data['security']);
	$SknFile = get_template_directory().'/dynamic/'.$data['file'];
	if(file_exists($SknFile)){
		if(unlink($SknFile)){
			_e('Skin was deleted','clapat');
		}
		else {
			_e('Cannot delete skin file','clapat');
		}
	}
	else {
		_e('Skin file does not exist!!','clapat');
	}
	
exit;
}	
			
add_action('wp_ajax_get_shortcode', 'get_shortcode');
function get_shortcode(){
	$nonce = $_POST['security'];
	if ( ! wp_verify_nonce( $nonce, 'myajax-clapat' ) )
		die ( 'No, no, no !!!!');
		wp_parse_str(stripslashes($_POST['data']), $data);
		unset($data['security']);
		echo ClapatAdmin::buildShortCode($data['selected']);
	exit;
}

			
add_action('admin_ajax_save_order', 'save_portfolio_order');
add_action('wp_ajax_save_order', 'save_portfolio_order');
function save_portfolio_order(){
	$nonce = $_POST['security'];
	if ( ! wp_verify_nonce( $nonce, 'myajax-clapat' ) )
		die ( 'No, no, no !!!!');
		wp_parse_str(stripslashes($_POST['data']), $data);
		unset($data['security']);
		echo ClapatAdmin::updatePostOrder($data['posts']);
	exit;
}
//     $wpdb->update( $wpdb->posts, array('menu_order' => $position, 'post_parent' => 0), array('ID' => $id) );
				                    

function add_pf_smenu(){
    add_submenu_page( 'edit.php?post_type=portfolio', 'Portfolio order', 'Reorder', 'manage_options', 'portfolio-reorder-menu', array('ClapatAdmin','reorder_portfolio') );
}
add_action( 'admin_menu', 'add_pf_smenu' );


class ClapatAdmin {
	function reorder_portfolio(){
		$posts = get_posts('post_type=portfolio&orderby=post_order&order=ASC&numberposts=-1');
		echo '<h1>'.__('Portfolio gallery order','clapat').'</h1>';
		echo '<div class="message updated" style="display:none;">loading...</div><form action="" id="post-reorder-portfolio"><ul class="order sortable"><input type="hidden" name="action" class="action" value="save_order">';
		foreach($posts as $post){
			echo '<li class="grid-item">
			<b style="text-align:center; display:block;">'.$post->post_title.'</b>
			<input type="hidden" name="posts[]" value="'.$post->ID.'"><div style="width:128px; height:128px; background:#ddd;">'.get_the_post_thumbnail( $post->ID, array(128,128)).'</div>
			</li>';
		}
		echo '</ul>
		<a class="button save-settings">Save order</a>
		
		</form>';
		
		//var_dump($posts);
	}
	
	function updatePostOrder($DATA){
		global $wpdb;
		$position= 1;
		foreach($DATA as $id){
			$wpdb->update( $wpdb->posts, array('menu_order' => $position), array('ID' => $id) );
			$position++;
		}
		$message = array(
			'status'=>'1',
			'message'=>__('order updated','clapat'),
		);
		echo json_encode($message);
		exit;
	}
	
	function updateFields($DATA){
		global $Colors;
		$updated = 0;
			/* Update social media settings*/
			if(isset($DATA['socialAct']) && isset($DATA['socialUrl'])){
				$clapat_socialSettings['act'] = $DATA['socialAct'];
				$clapat_socialSettings['url'] = $DATA['socialUrl'];
				update_option('clapat_social', json_encode($clapat_socialSettings));
				$updated++;
			}
			
			/* Update general settings */
			if(isset($DATA['clapat_general'])){
				unset($DATA['clapat_general']['clapat_color_updatenow']);
				update_option('clapat_general_settings', json_encode($DATA['clapat_general']));
				if(isset($DATA['clapat_general']['clapat_use_combine']) && $DATA['clapat_general']['clapat_use_combine'] == 1){
					combineScripts();
				}
				$updated++;
			}
			
			/* Update footer settings */
			if(isset($DATA['clapat_footer'])){
				update_option('clapat_footer', json_encode($DATA['clapat_footer']));$updated++;
			}	
			/* Update contact page settings */
			if(isset($DATA['clapat_contact'])){
				update_option('clapat_contact', json_encode($DATA['clapat_contact']));$updated++;
			}
			
			/* Update css overrides */
			if(isset($DATA['clapat_override'])){
				self::saveCssOverride($DATA['clapat_override']['css']); $updated++;
			}			
			/* Update page layout settings */
			if(isset($DATA['clapat_design'])){
			//	if(isset($DATA['clapat_general']['clapat_color_updatenow'])){
					self::updateFonts($DATA['clapat_design']['fonts']);
					self::updateColorPalette($Colors, $DATA);
			//	}
				update_option('clapat_design', json_encode($DATA['clapat_design']));$updated++;
			}
			
			/* Set values for all fields in one place */
			if(isset($DATA['import_settings'])){
				$temp = json_decode($DATA['import_settings']);
				
				if(!empty($temp)){
					foreach($temp as $key=>$value){
						update_option($key, json_encode($value));
					}
					$updated++;
				}
			}
			return $updated;
	}
	
	function buildShortCodeSelect(){
		global $Shortcodes;
		$HTML = '<select name="insert_shortcode" id="insert_shortcode">';
		foreach($Shortcodes as $k=>$v){
			$HTML .= '<option value="'.$k.'">'.$v['name'].'</option>';
		}
		$HTML .= '</select>';
		return $HTML;
	}
	
	function buildShortCode($name){
		global $Shortcodes;
		if(!isset($Shortcodes[$name])) return;
		
		$Sc = $Shortcodes[$name];
		
		$shortcode = "[$name";
		foreach($Sc['params'] as $k=>$v){
			$shortcode .= ' '.$k.'="'.$v.'"';
		}
		$shortcode .= ']';
		if($Sc['content'] != false){
			$shortcode .= $Sc['content'];
			$shortcode .= "[/$name]";
		}
	
		return $shortcode;
	}
	
	function buildShortcodeGenerator($echo = true){
		$html = '';
		$html .= self::buildShortCodeSelect().self::buildShortCode('test');
		
		$html .= '<br>';
		$html .= __('Code to insert','clapat').':<br>';
		$html .= '<textarea id="cti" style="width:100%; height:150px; resize:none"></textarea>';
		if($echo == true) {	
			echo $html;
			echo '<br><br><a class="button-primary" onClick="insertIntoEditor()">'.__('Insert into editor','clapat').'</a> <small>'.__('Only on visual editor','clapat').'</small>';
		}
		return $html;
	}
	
	function sections(){
		$content = '';
		if($_POST){
			if(isset($_POST['section'])){
				for($i=0;$i<count($_POST['section']['name']);$i++){
					if(mb_detect_encoding($_POST['section']['name'][$i]) == 'UTF-8'){
						$_POST['section']['name'][$i] = urlencode($_POST['section']['name'][$i]);
					}
				}
				
				if(update_option('clapat_sections', json_encode($_POST['section'])) 
				or update_option('clapat_separator_pattern', json_encode(@$_POST['separator_pattern'])) ){
					echo self::message('Sections saved.');
				}else {
					echo self::message('Sections failed to save or not changed.', 'error');
				}
			}
		}
		
		$sections 			= (array) @json_decode(get_option('clapat_sections', true));
		$separator_pattern 	= @json_decode(get_option('clapat_separator_pattern', true));
		$sections['sepposition'] = (array) $sections['sepposition'];
		$html = '';
		$html .= '
		<input type="checkbox" name="separator_pattern" value="1" '.(($separator_pattern == '1')?'checked="checked"':'').'> '.__('Use pattern above separators','clapat').'<br><br>
		<input type="button" class="button-primary" onClick="addNewSection(); return false;" value="Add section">
		<input type="submit" name="save" value="'.__('Save sections').'" class="button-primary">
		<ul class="sortable" id="siteSections">';
		if(isset($sections) && count($sections['name']) > 0){
			for($i=0;$i<count($sections['name']);$i++){
				$html .= '<li><div class="toggle">'.stripslashes(urldecode($sections['name'][$i])).'</div>
				<div class="toggledContent">'.__('Section ID','clapat').':<br> 
				<input type="text" name="section[id][]" class="wide" value="'.stripslashes(htmlspecialchars($sections['id'][$i])).'" rel="notempty"><br>
				'.__('Section name','clapat').':<br>
				<input type="text" name="section[name][]" class="wide sectionName" value="'.stripslashes(urldecode($sections['name'][$i])).'"><br>
				'.__('Layout type','clapat').':<br>
				<select name="section[layout][]" class="wide">
					<option value="'.$sections['layout'][$i].'">'.__('Keep current','clapat').'</option>
					<option value="1">'.__('Boxed','clapat').'</option>
					<option value="2">'.__('Full','clapat').'</option>
					<option value="3">'.__('External','clapat').' ('.__('Link','clapat').')</option>
				</select><br>
				'.__('Section content').':<br>
				<textarea name="section[content][]" class="section">'.stripslashes( htmlspecialchars($sections['content'][$i])).'</textarea><br>
				'.__('Section background image','clapat').':<br>
				<input type="text" class="upload_image" value="'.stripslashes( htmlspecialchars(@$sections['sec_bg'][$i])).'" name="section[sec_bg][]"> <a href="#" class="upload_image_button">'.__('Choose image','clapat').'</a><br>
				'.__('Section background color','clapat').':<br>
				<input type="text" class="color picker" value="'.stripslashes(htmlspecialchars(@$sections['sec_col'][$i])).'" name="section[sec_col][]"> <br>
				
				
				'.__('Separator background','clapat').':<br>
				<small>Image:<br></small>
				<input type="text" class="upload_image" value="'.stripslashes(htmlspecialchars(@$sections['sep_bg'][$i])).'" name="section[sep_bg][]"> <a href="#" class="upload_image_button">'.__('Choose image','clapat').'</a><br>
				<small>Youtube video:<br></small>
				<input type="text" class="yt-video" value="'.stripslashes(htmlspecialchars(@$sections['sep_bg_vid'][$i])).'" name="section[sep_bg_vid][]"> <br>
				Separator Parallax speed:<br>
				<input type="text" name="section[prlx_spd][]" value="'.((isset($sections['prlx_spd'][$i]))?$sections['prlx_spd'][$i]:'0.1').'"><br>
				'.__('Section separator content').':<br>
				<textarea name="section[sep][]" class="section">'.stripslashes(htmlspecialchars(@$sections['sep'][$i])).'</textarea><br>
				'.__('Separator height','clapat').' <small>(px)</small>:<br>
				<input type="text" name="section[sepheight][]" class="wide sectionName" value="'.((isset($sections['sepheight'][$i]))?$sections['sepheight'][$i]:'400').'"><br>
				'.__('Position separator above content','clapat').'<br>'.clapatSwitch('section[sepposition][]',$sections['sepposition'][$i]).'
				<a href="#" class="close">X</a>
				</div>
				</li>'; 
			}
		}
		$html .= '</ul> 
		<input type="button" class="button-primary" onClick="addNewSection(); return false;" value="Add section">
		<input type="submit" name="save" value="'.__('Save sections').'" class="button-primary">
		
		';
		$content .= self::box('Sections', $html);
		
		$html = self::buildShortcodeGenerator(false);
		$content .= self::box(__('Add element to section','clapat'), $html);

		echo '<form action="" method="post" onsubmit="return checkForm(this); return false;">';
		echo self::wrap(__('Website sections','clapat'), $content);
		
		echo '</form>
		<div id="temp_section" style="display:none;">
			<div>
			'.__('Section ID','clapat').':<br>
			<input type="text" name="section[id][]" class="wide" rel="notempty"><br>
			
			'.__('Layout type','clapat').':<br>
			<select name="section[layout][]" class="wide">
				<option value="1">'.__('Boxed','clapat').'</option>
				<option value="2">'.__('Full','clapat').'</option>
				<option value="3">'.__('External','clapat').' ('.__('Link','clapat').')</option>
			</select><br>
			'.__('Section name','clapat').':<br>
			<input type="text" name="section[name][]" class="wide sectionName"><br>
			'.__('Section content','clapat').':<br>
			<textarea name="section[content][]" class="section"></textarea><br>
			Separator background:<br>
			<input type="text" class="upload_image" name="section[sep_bg][]"> <a href="#" class="upload_image_button">'.__('Choose image','clapat').'</a><br>
			Separator Parallax speed:<br>
			<input type="text" name="section[prlx_spd][]" value="0.1"><br>
			
			'.__('Section separator content','clapat').':<br>
			<textarea name="section[sep][]" class="section"></textarea><br>
			<a href="" class="close">X</a>
			</div>
		</div>
		';
	}
	
	function wrap($title, $content){
		return '
		<style>
		.half { float:left; width:46%; margin:1%; }
		.ui-sortable-helper { cursor:move; }
		textarea.section { width:100%; height:100px; max-height:250px; min-width:100%; max-width:100%;}
		#siteSections li { position:relative; padding:5px; background:#fff; border-radius:5px; }
		#siteSections li .close { width:16px; height:16px; color:#36393D; text-decoration:none; font-weight:bold; font-size:18px; display:block; position:absolute; top:12px; right:7px; }
		#siteSections li .toggle { cursor:pointer;  height:23px; padding-top:7px; padding-left:10px; color:#0000cc; background:#eeeeee; display:block; }
		#siteSections .wide { width:100%; }
		</style>
		<script>
		 jQuery(function() {
			jQuery("#siteSections a.close").live("click", function(e){
				e.preventDefault();
				e.stopPropagation();
				jQuery(this).parent().parent().stop().slideUp(function(){ jQuery(this).remove(); });
			});
			
			jQuery("#siteSections div.toggle").live("click", function(e){
				e.preventDefault();
				e.stopPropagation();
				jQuery(this).next().stop().slideToggle();
			});
			
			
			jQuery( ".sortable" ).sortable();
			var lastOpenedObject = false;
			jQuery(".upload_image_button").live("click", function(e) {
				e.preventDefault();
				lastOpenedObject = jQuery(this).prev(".upload_image");
			 formfield = lastOpenedObject.attr("name");
			 tb_show("", "media-upload.php?type=image&amp;TB_iframe=true");
			 return false;
			});

			window.send_to_editor = function(html) {
			 imgurl = jQuery("img",html).attr("src");
			// console.log(lastOpenedObject);
			 if(lastOpenedObject != false)
				lastOpenedObject.val(imgurl);
			 tb_remove();
			}
		});
		
		
		jQuery.fn.tinymce_textareas = function(){
		  tinyMCE.init({
			skin : "wp_theme",
			mode : "textareas"
			// other options here
		  });
		};
		function checkForm(t){
			var $  	= jQuery;
			var me = $(t);
			var noerror = true;
			$("item[rel=\'notempty\']").each(function(){
				if($(this).val() == ""){ noerror = false; }
			});
			if(noerror == false){ alert("'.__('Section ID cannot be empty!').'"); }
			return error;
		}
		function addNewSection(){
			var $  	= jQuery;
			var tmp = $("#temp_section").html();
			$("#siteSections").append("<li><div class=\"toggle\"></div>"+tmp+"</li>");
		}
		</script>
		<div class="wrap metabox-holder">
		<h2>'.$title.'</h2>
		'.$content.'
		</div>';
	}
	
	function box($title, $content, $class = 'half'){
		return '
		<div class="postbox '.$class.'">
			<h3 class="hndle">
				<span>'.$title.'</span>
			</h3>
			<div class="inside">
				'.$content.'
			</div>
		</div>
		';
	}
	
	function message($content, $type = 'updated'){
		return '
		<div id="setting-error-settings_updated" class="'.$type.' settings-error">
			<p>
			<strong>'.__($content,'clapat').'</strong>
			</p>
		</div>';
	}

	function updateColorPalette($colors = array(), $DATA = null, $file = 'skin.css', $header = '/* Default palette */'){
		$TemplateOfCSS = dirname(__FILE__).'/skin.css';
		$newCSSFile = dirname(dirname(__FILE__)).'/dynamic/'.$file;
		if(file_exists($TemplateOfCSS)){
			$CssData 		= $header;
			$CssData 		.= @file_get_contents($TemplateOfCSS);
			$colorPost 		= @$DATA['clapat_design']['color'];
			$opacityPost 	= @$DATA['clapat_design']['opacity'];
			$OutColor 		= array();
			foreach($colors as $k=>$v){
				$color = $colorPost[$k];
				$CssData = str_replace('%'.$k.';', $color.';', $CssData);
				$OutColor[] = $color;
			}
			if(isset($opacityPost['navi']) && $opacityPost['navi'] != '100'){
				$rgb = hex2rgb($colorPost['navi']);
				$opacity = $opacityPost['navi'];
				$CssData .= '#navigation { background:rgba('.$rgb[0].','.$rgb[1].','.$rgb[2].','.round($opacity/100,2).');}';
			}
			file_put_contents($newCSSFile, $CssData."\n\n\n/*---Colors:".implode(',', $OutColor).'---*/');
			unset($OutColor);
		}
	}
	
	function saveCssOverride($content, $file = 'override.css'){
		$newCSSFile = dirname(dirname(__FILE__)).'/dynamic/'.$file;
		file_put_contents($newCSSFile, $content);
	}

	
	function updateFonts($clapat_settings = array()){
		$newCSSFile = dirname(dirname(__FILE__)).'/dynamic/custom-fonts.css';
		$CssData = $CssHead = '';
		
		$baseGooglePath = "@import url(http://fonts.googleapis.com/css?family=%s);\n";
		$usedFonts = array();
		if(count($clapat_settings) > 0){
			foreach($clapat_settings as $tag=>$font){
				if($tag == 'menu'){
					$tag = '#menu a, #menu a:active, #menu a:visited,#menu-new-style a, #menu-new-style a:active, #menu-new-style a:visited';
				}
			//	if($tag == 'body') $tag = 'body, #content';
				$CssData .= $tag.' { '.
							(($font['color'] != '')? 'color:'.$font['color'].';':'').' '.
							(($font['size'] != '')? 'font-size:'.trim($font['size']).'px;':'').' '.
							(($font['family'] != '')? 'font-family:\''.trim($font['family']).'\';':'')
							.'} '."\n\n";
				$usedFonts[] = $font['family'];
			}
			$usedFonts = array_unique($usedFonts);
			foreach($usedFonts as $font){
				if($font == '') continue;
				$CssHead .= sprintf($baseGooglePath, urlencode($font));
			}
			file_put_contents($newCSSFile, $CssHead.$CssData);
		}else {
			echo  __('Nothing to do','clapat');
		}
	}
	
	function admin(){
		global $Colors;
	
		if($_POST){
			self::updateFields($_POST);
		}
	
		/*
		Get social url and activation status
		*/
		$clapat_social 			= @json_decode(get_option('clapat_social'));
		
		/*
		Get general settings
		*/
		$clapat_settings 			= @json_decode(get_option('clapat_general_settings'));
		if(!isset($clapat_settings)) $clapat_settings = new stdClass();
		
		/*
		Get footer settings
		*/
		$clapat_footer 			= @json_decode(get_option('clapat_footer'));
		if(!isset($clapat_footer)) $clapat_footer = new stdClass();
		
		/*
		Get contact page options
		*/
		$clapat_contact 		= @json_decode(get_option('clapat_contact'));
		
		/*
		Get page layout options
		*/
		$clapat_design 		= @json_decode(get_option('clapat_design'));
		
		/*
		Get page layout options
		*/
		$clapat_override 	= @file_get_contents(dirname(dirname(__FILE__)).'/dynamic/override.css');
		
		/*
		Define your networks and shortnames for it
		*/
		$networks = array(
			'tw' 	=> 'Twitter',
			'fb' 	=> 'Facebook',
			'in' 	=> 'LinkedIn',
			'gp' 	=> 'Google+',
			'dr' 	=> 'Dribble',
			'pi' 	=> 'Pinterest',
			
			'be'	=> 'Behance',
			'dv' 	=> 'Deviant',
			'fk' 	=> 'Flickr',
			'is' 	=> 'Instagram',
			'sc' 	=> 'SoundCloud',
			'vi' 	=> 'Vimeo',
			'yt' 	=> 'Youtube',
			
			'rss' 	=> 'RSS Feed',
		);
		
		/*
		Define true/false values
		*/
		$trueFalse = array(
			'true' 	=> __('Yes','clapat'),
			'false' => __('No','clapat'),
		);
		
		/*
		Define speed values
		*/
		$pp_speed = array(
			'normal'=>  __('Normal speed','clapat'),
			'fast' 	=>  __('Fast','clapat'),
			'slow' 	=>  __('Slow','clapat'),
		);
		
		$LayoutTypes = array(
			'default' =>  __('Color template','clapat'),
			'black' =>  __('Black & White template','clapat'),
		);

		/* Process current social network settings */
		if(!isset($clapat_social)) $clapat_social = new stdClass();
		if(!isset($clapat_social->act)) $clapat_social->act = new stdClass();
		if(!isset($clapat_social->url)) $clapat_social->url = new stdClass();
		foreach($networks as $k=>$v){
			 $clapat_social->act->$k = (isset($clapat_social->act->$k) && $clapat_social->act->$k == '1')? ' checked="checked"' : '';
			 $clapat_social->url->$k = (isset($clapat_social->url->$k))? $clapat_social->url->$k : '';
		}

		$ToConfigure = array(
						'body' => array(
								'min' => 9,
								'max' => 20,
						),
						'h1' => array(
								'min' => 18,
								'max' => 55,
						),
						'h2' => array(
								'min' => 14,
								'max' => 45,
						),
						'h3' => array(
								'min' => 12,
								'max' => 35,
						),
						'h4' => array(
								'min' => 12,
								'max' => 25,
						),
						'h5' => array(
								'min' => 12,
								'max' => 25,
						),
						'menu' => array(
								'min' => 12,
								'max' => 25,
						),
						
				);
				
?>
<div id="clapat-settings">
	<div class="toptext clearfix">
		<div id="admin-panel-logo"></div>
	</div>
    <ul><li><a href="#clapat_design"><?php _e('Design customisation','clapat');?></a></li>
        <li><a href="#clapat_general"><?php _e('General settings','clapat');?></a></li>
        
        <li><a href="#clapat_contact"><?php _e('Contact settings','clapat');?></a></li>	        
        <li><a href="#clapat_footer"><?php _e('Footer section','clapat');?></a></li>	        
        <li><a href="#clapat_override"><?php _e('CSS Override','clapat');?></a></li>	        
		<li><a href="#clapat_import_export"><?php _e('Import / Export settings','clapat');?></a></li>
    </ul>
	<div class="clapat-left">
		<div id="clapat_general">
			<form action="#clapat_general" method="post">
				<h4><?php _e('Main Image Slider','clapat');?></h4>
				<?php _e('Slider used on first page','clapat');?>: <br>
				<?php
				$Text = (isset($clapat_settings->site_slider))? stripslashes($clapat_settings->site_slider) : '[full-slider]';
				wp_editor($Text, 'site_slider', array('textarea_name'=>'clapat_general[site_slider]','teeny' => true));
				?>
				<small><?php _e('You can use here any slider or static content. Shortcodes are available','clapat'); ?></small><br>
                <input type="checkbox" name="clapat_general[clapat_disable_home]" value="1" <?php echo (isset($clapat_settings->clapat_disable_home) && @$clapat_settings->clapat_disable_home == 1)? 'checked="checked"':''; ?>> <?php _e('Disable home content/slider','clapat');?><br>
				<input type="checkbox" name="clapat_general[clapat_home_auto]" value="1" <?php echo (isset($clapat_settings->clapat_home_auto) && @$clapat_settings->clapat_home_auto == 1)? 'checked="checked"':''; ?>> <?php _e('Auto height for home section','clapat');?><br>
				<input type="checkbox" name="clapat_general[clapat_home_nopattern]" value="1" <?php echo (isset($clapat_settings->clapat_home_nopattern) && @$clapat_settings->clapat_home_nopattern == 1)? 'checked="checked"':''; ?>> <?php _e('Don\'t use pattern above home section','clapat');?><br>
				<input type="checkbox" name="clapat_general[clapat_menu_nomargin]" value="1" <?php echo (isset($clapat_settings->clapat_menu_nomargin) && @$clapat_settings->clapat_menu_nomargin == 1)? 'checked="checked"':''; ?>> <?php _e('Don`t show menu above home section','clapat');?>
               
				<h4><?php _e('Custom scrollbar','clapat');?></h4>
				<input type="checkbox" name="clapat_general[clapat_nicescroll]" value="1" <?php echo (isset($clapat_settings->clapat_nicescroll) && @$clapat_settings->clapat_nicescroll == 1)? 'checked="checked"':''; ?>> <?php _e('Use nicescroll','clapat');?><br>
	
                
				<h4><?php _e('Show favicon','clapat');?></h4>
				<input type="checkbox" name="clapat_general[clapat_show_favicon]" value="1" <?php echo (isset($clapat_settings->clapat_show_favicon) && @$clapat_settings->clapat_show_favicon == 1)? 'checked="checked"':''; ?>> <?php _e('Favicon visible','clapat');?><br>
				
				<h4><?php _e('Custom Logo &amp; favicon','clapat');?></h4>
				<strong><?php _e('Favicon image','clapat');?>:</strong><br style="margin-bottom:5px" />
				<input type="text" style="width:85%;" class="upload_image" name="clapat_general[clapat_favicon]" value="<?php echo (isset($clapat_settings->clapat_favicon))? $clapat_settings->clapat_favicon : ''; ?>"> <a href="#" class="upload_image_button"><?php _e('Choose file','clapat');?></a><br><br>
				<strong><?php _e('Logo image','clapat');?>:</strong><br style="margin-bottom:5px" />
				<input type="text" style="width:85%;" class="upload_image" name="clapat_general[clapat_logo]" value="<?php echo (isset($clapat_settings->clapat_logo))? $clapat_settings->clapat_logo : ''; ?>"> <a href="#" class="upload_image_button"><?php _e('Choose file','clapat');?></a><br><br>
				<strong><?php _e('Logo position','clapat');?>:</strong><br style="margin-bottom:5px" />
				<?php _e('Left','clapat');?>: 
				<input type="text" style="width:10%;" name="clapat_general[clapat_logo_x]" value="<?php echo (isset($clapat_settings->clapat_logo_x))? $clapat_settings->clapat_logo_x : '50'; ?>"> 
				<?php _e('Top','clapat');?>: 
				<input type="text" style="width:10%;" name="clapat_general[clapat_logo_y]" value="<?php echo (isset($clapat_settings->clapat_logo_y))? $clapat_settings->clapat_logo_y : '30'; ?>"> <br>
				
				<?php _e('If no image is selected, logo will contain site name and site description!','clapat');?>
				<div class="hr-line"></div>
				<h4><?php _e('Preloader','clapat');?></h4>
				<input type="checkbox" name="clapat_general[clapat_preloader]" value="1" <?php echo (isset($clapat_settings->clapat_preloader) && @$clapat_settings->clapat_preloader == 1)? 'checked="checked"':''; ?>> <?php _e('Use preloader','clapat');?><br>
				<strong><?php _e('Preloader image','clapat');?>:</strong><br style="margin-bottom:5px" />
				<input type="text" style="width:85%;" class="upload_image" name="clapat_general[clapat_preloader_img]" value="<?php echo (isset($clapat_settings->clapat_preloader_img))? $clapat_settings->clapat_preloader_img : ''; ?>"> <a href="#" class="upload_image_button"><?php _e('Choose file','clapat');?></a><br><br>
				
				
				<h4><?php _e('Other settings','clapat'); ?></h4>
				
				<strong><?php _e('Window width for menu breakpoint','clapat'); ?>:</strong><br style="margin-bottom:5px" />
				<input type="text" class="" name="clapat_general[menu_bearkpoint]" value="<?php echo (isset($clapat_settings->menu_bearkpoint))? $clapat_settings->menu_bearkpoint : '1024'; ?>"><br><br>
				
				<strong><?php _e('Excerpt length','clapat'); ?>:</strong><br style="margin-bottom:5px" />
				<input type="text" class="" name="clapat_general[excerpt_length]" value="<?php echo (isset($clapat_settings->excerpt_length))? $clapat_settings->excerpt_length : '20'; ?>"><br><br>
				<input type="checkbox" name="clapat_general[clapat_use_combine]" value="1" <?php echo (isset($clapat_settings->clapat_use_combine) && @$clapat_settings->clapat_use_combine == 1)? 'checked="checked"':''; ?>> <?php _e('Use combine for scripts','clapat');?><br>
				
			</form>
		</div>
		<div id="clapat_footer">
			<form action="#clapat_footer" method="post">
				<h4><?php _e('Contact info','clapat');?></h4>
				<strong><?php _e('Email','clapat');?>:</strong><br style="margin-bottom:5px" />
				<input type="text" class="" name="clapat_footer[email]" value="<?php echo (isset($clapat_footer->email))? $clapat_footer->email : ''; ?>"><br><br>
				<strong><?php _e('Phone','clapat');?>:</strong><br style="margin-bottom:5px" />
				<input type="text" class="" name="clapat_footer[phone]" value="<?php echo (isset($clapat_footer->phone))? $clapat_footer->phone : ''; ?>"><br><br>
				
				<h4><?php _e('Social media accounts','clapat');?>:</h4>
				<table>
					<tr>
						<th><?php _e('Site','clapat');?></th>
						<th><?php _e('Visible','clapat');?></th>
						<th><?php _e('URL','clapat');?></th>
					</tr>
					<input type="hidden" name="socialAct[hidden]" value="1">
					<?php 
					if(count($networks) > 0 && is_array($networks)):
					foreach($networks as $k=>$v):?>
					<tr>
						<td><?php echo $v; ?></td>
						<td><input type="checkbox" name="socialAct[<?php echo $k; ?>]" value="1"<?php echo $clapat_social->act->$k; ?>></td>
						<td><input style=" width:450px;" type="text" name="socialUrl[<?php echo $k; ?>]" value="<?php echo $clapat_social->url->$k; ?>"></td>
					</tr>
					<?php endforeach; endif;?>
				</table>
                
                <div class="hr-line"></div>
				
				<h4><?php _e('Copyright text','clapat');?></h4>
				<textarea name="clapat_footer[clapat_copyright]"><?php echo isset($clapat_footer->clapat_copyright)? $clapat_footer->clapat_copyright : ''; ?></textarea><br><br>
			</form>
		</div>
		<div id="clapat_design">
			<form action="#clapat_design" method="post">
				<h3><?php _e('Typography','clapat'); ?></h3>
				<small><?php _e('Note','clapat'); echo ': '; _e('If you want to use default color let color input blank.','clapat'); ?></small>
				<div class="clearfix">					
<?php 
foreach($ToConfigure as $k=>$v){
	echo '
	<h4>'.ucfirst($k).' font</h4>
	<div class="inline-items">
		<select name="clapat_design[fonts]['.$k.'][family]" class="font">
			'.makeGoogleFontSelector(@$clapat_design->fonts->$k->family).'
		</select>
		<select name="clapat_design[fonts]['.$k.'][size]" class="size">
			'.makeFontSizeSelector($v['min'], $v['max'], @$clapat_design->fonts->$k->size).'
		</select>
		<div class="picker-preview" style="background-color:'.((isset($clapat_design->fonts->$k->color))? $clapat_design->fonts->$k->color: '').'"><span></span></div>
		<input type="text" name="clapat_design[fonts]['.$k.'][color]" value="'.((isset($clapat_design->fonts->$k->color))? $clapat_design->fonts->$k->color: '').'" class="cpicker" />
	</div>
	';
	
}
?>
				</div>
				<div class="hr-line"></div>
				<h3><?php _e('Colors','clapat');?></h3>
<?php
foreach($Colors as $k=>$v){
	echo '
	<h4>'.$v['label'].'</h4>
	<div class="inline-items cpick">
		<div class="picker-preview" style="background-color:'.((isset($clapat_design->color->$k))? $clapat_design->color->$k: '#'.$v['default']).'"><span></span></div>
		<input type="text" name="clapat_design[color]['.$k.']" value="'.((isset($clapat_design->color->$k))? $clapat_design->color->$k:  '#'.$v['default']).'" class="cpicker" /> <a href="#" onClick="setColor(this, \'#'.$v['default'].'\'); return false;">'.__('Reset','clapat').'</a>
		'.((isset($v['opacity']))?' <br>'.__('Opacity','clapat').':<input type="text" class="opacity" value="'.((isset($clapat_design->opacity->$k))? $clapat_design->opacity->$k: $v['opacity']).'" name="clapat_design[opacity]['.$k.']">%':'').'
	</div>
	';
}
$SkinPath = get_template_directory().'/dynamic/';
$Skins = scandir($SkinPath);
$Total = 1;
$HTMLSkins = '';
if(count($Skins) > 0){
	foreach($Skins as $skin){
		if(substr_count($skin, 'custom-skin-') < 1) continue;
		$date = date('d/m/Y H:i:s', str_replace(array('custom-skin-','.css'),'', $skin));
		preg_match('|---Colors:(.*?)---|ims', @file_get_contents($SkinPath.$skin), $out);
		if(!empty($out[1])){
			$colorbox = '';
			foreach(explode(',',$out[1]) as $color){
				$colorbox .= '<span class="colorbox" style="width:16px; height:16px; border:2px solid #141414; display:inline-block; margin:2px; text-indent:-9999px; background-color:'.$color.'">'.$color.'</span>';
			}
			$HTMLSkins .= '<tr>
			<td>'.$Total.'</td>
			<td class="palette">'.$colorbox.'</td>
			<td>'.$date.'</td>
			<td>
				<a href="#" class="importPalette" onClick="return false;">'.__('Import','clapat').'</a>
				<a href="#" class="" onClick="deletePalette(\''.$skin.'\'); return false;">'.__('Delete','clapat').'</a>
			</td>
			</tr>';
			$Total++;
		}
	}
}
if($HTMLSkins == ''){
	$HTMLSkins .= '<tr><td colspan="3">'.__('No valid skins found','clapat').'</td></tr>';
}


?>
				<h4><?php _e('Navigation bar background image','clapat');?>:</h4>
				<input type="text" style="width:85%;" class="upload_image" name="clapat_design[bg][nav]" value="<?php echo (isset($clapat_design->bg->nav))? $clapat_design->bg->nav : ''; ?>"> <a href="#" class="upload_image_button"><?php _e('Choose file','clapat');?></a><br>
				<small><?php _e('If no image is selected, background will have color defined before','clapat');?></small><br>
				<a href="#" onClick="return false;" class="test button"><?php _e('Save palette as new skin','clapat');?></a><br><br>
				<table class="wp-list-table widefat fixed posts" cellspacing="0">
				<thead>
					<tr>
						<th scope='col' id='cb' class='manage-column column-cb check-column'  style=""><a><span>#</span></a></th>
						<th scope='col' id='title' class='manage-column column-title '  style=""><a><span><?php _e('Colors','clapat');?></span></a></th>
						<th scope='col' id='date' class='manage-column column-date2 sortable asc'  style=""><a><span><?php _e('Date added','clapat');?></span></a></th>	
						<th scope='col' id='action' class='manage-column column-action '  style=""><a><span><?php _e('Action','clapat');?></span></a></th>	
					</tr>
				</thead>

				<tfoot>
					<tr>
						<th scope='col' id='cb2' class='manage-column column-cb check-column'  style=""><a><span>#</span></a></th>
						<th scope='col' id='title2' class='manage-column column-title '  style=""><a><span>Colors</span></a></th>
						<th scope='col' id='date2' class='manage-column column-date2 sortable asc'  style=""><a><span>Date added</span></a></th>	
						<th scope='col' id='action2' class='manage-column column-action '  style=""><a><span><?php _e('Action','clapat');?></span></a></th>	
					</tr>
				</tfoot>
					<tbody id="the-list">
						<?php echo $HTMLSkins; ?>
					</tbody>
				</table>
				</form>
		</div>
		<div id="clapat_contact">
			<form action="#clapat_contact" method="post">
				<h4>This is the contact form setup page</h4>
				<strong>Target email:</strong><br style="margin-bottom:5px" />
				<input type="text" name="clapat_contact[clapat_ct_email]" value="<?php echo (isset($clapat_contact->clapat_ct_email) && !empty($clapat_contact->clapat_ct_email))? $clapat_contact->clapat_ct_email : get_bloginfo('admin_email'); ?>"><br><br>
				<strong>Map X,Y location:</strong><br style="margin-bottom:5px" />
				<input type="text" name="clapat_contact[clapat_ct_map]" value="<?php echo (isset($clapat_contact->clapat_ct_map))? $clapat_contact->clapat_ct_map : ''; ?>"><br><br>
				<strong>Zoom level:</strong><br style="margin-bottom:5px" />
				<input type="text" name="clapat_contact[clapat_ct_zoom]" value="<?php echo (int) (isset($clapat_contact->clapat_ct_zoom))? $clapat_contact->clapat_ct_zoom : '1'; ?>"><br><br>
				<strong>Map style:</strong><br style="margin-bottom:5px" />
				<input type="checkbox" name="clapat_contact[map_style]" value="1" <?php echo (isset($clapat_contact->map_style) && $clapat_contact->map_style == '1')? ' checked="checked"' : ''; ?>> Use greyscame map
				<!--<br><br><input type="checkbox" name="clapat_contact[clapat_ct_hidect]" value="1" <?php echo (isset($clapat_contact->clapat_ct_hidect) && $clapat_contact->clapat_ct_hidect == 1)? 'checked="checked"':'';?>> Hide map controls-->
                <div class="hr-line"></div>
				<input type="checkbox" name="clapat_contact[clapat_ct_marker]" value="1" <?php echo (isset($clapat_contact->clapat_ct_marker) && $clapat_contact->clapat_ct_marker == 1)? 'checked="checked"':'';?>> Show marker on the map<br><br>
				<strong>Marker image:</strong><br style="margin-bottom:5px" />
				<input type="text" class="upload_image" id="upload_image" name="clapat_contact[clapat_ct_marker_img]" value="<?php echo (isset($clapat_contact->clapat_ct_marker_img))? $clapat_contact->clapat_ct_marker_img : ''; ?>"> <a href="#" id="upload_image_button" class="upload_image_button">Choose file</a><br><br>
				<strong>Marker popup title:</strong><br style="margin-bottom:5px" />
				<input type="text" name="clapat_contact[clapat_ct_marker_ttl]" value="<?php echo (isset($clapat_contact->clapat_ct_marker_ttl))? $clapat_contact->clapat_ct_marker_ttl : ''; ?>"><br><br>
				<strong>Marker popup content:</strong><br style="margin-bottom:5px" />
				<textarea name="clapat_contact[clapat_ct_marker_ct]"><?php echo (isset($clapat_contact->clapat_ct_marker_ct))? $clapat_contact->clapat_ct_marker_ct : ''; ?></textarea>
                <div class="hr-line"></div>
				<strong>Email template</strong> (this will be sent to admin):<br style="margin-bottom:5px" />
				<textarea name="clapat_contact[email_template]"><?php echo (isset($clapat_contact->email_template))? $clapat_contact->email_template : ''; ?></textarea><br>
				<small>Available tags: %from, %email, %phone, %message, %date, %ip</small>
			</form>
		</div>
		<div id="clapat_override">
			<form action="#clapat_override" method="post">
				<h4>CSS Overrides</h4>
				
				
				<textarea style="height:250px;" name="clapat_override[css]"><?php echo (isset($clapat_override))? $clapat_override : ''; ?></textarea>
              
			</form>
		</div>
		<div id="clapat_import_export">
<?php
	/*	$clapat_settings = array();
		$clapat_settings['clapat_social'] = @json_decode(get_option('clapat_social'));
		$clapat_settings['clapat_design'] = @json_decode(get_option('clapat_design'));
		$clapat_settings['clapat_general_settings'] = @json_decode(get_option('clapat_general_settings'));
		$clapat_settings['clapat_contact'] = @json_decode(get_option('clapat_contact'));
		$clapat_settings['clapat_footer'] = @json_decode(get_option('clapat_footer'));
		$clapat_settings['clapat_sections'] = @json_decode(get_option('clapat_sections'));
		json_encode($clapat_settings)
	*/
	echo '		
			Export: <small>(Copy and store in safe place this info)</small><br>			
			<textarea id="exportContent" name="TMP" style="resize:none; height:150px; width:100%;" onFocus="this.select();" onMouseOver="this.select();">Loading...</textarea>	
			<form action="#clapat_import_export" method="post">
				Import: <small>(Paste here previously exported settings)</small><br>			
				<textarea name="import_settings" style="resize:none; height:150px; width:100%;"></textarea><br>
				<input type="submit" class="button-primary" value="Import settings">
			</form>
		</div>
   </div>
	<br style="clear:both">
	<div class="bottombuttons">
		<input type="reset" id="button-reset" class="button" value="Reset settings">
		<input type="submit" id="button-save" class="button-primary" value="Save settings">
	</div>
	</div>';
	echo "
	<script>
	jQuery(function(){
	var lastOpenedObject = false;
		jQuery('.upload_image_button').click(function(e) {
			e.preventDefault();
			lastOpenedObject = jQuery(this).prev('.upload_image');
		 formfield = lastOpenedObject.attr('name');
		 tb_show('', 'media-upload.php?type=image&amp;TB_iframe=true');
		 return false;
		});

		window.send_to_editor = function(html) {
		 imgurl = jQuery('img',html).attr('src');
		 if(lastOpenedObject != false)
			lastOpenedObject.val(imgurl);
		 tb_remove();
		}
	});
	
	function setColor(el, color){
		jQuery(el).prev().val(color);
		jQuery(el).prev().prev().css({backgroundColor: color});
		
	}
	</script>";
	
	}

}