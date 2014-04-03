<?php
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past
error_reporting(0);
define('WP_THEME', dirname(dirname(__FILE__)));
define('WP_ROOT', dirname(dirname(dirname(dirname(dirname(__FILE__))))));
// Including WP Core files to be able to work with database.
include_once(WP_ROOT . '/wp-load.php');
include_once(WP_ROOT . '/wp-includes/wp-db.php');

$recaptchaEnabled = false;
$privatekey = '';
/*
require_once('lib/recaptcha/recaptchalib.php');			
$privatekey = "6LcYx90SAAAAAPQbC9T8JWw0Mwt7ndG6XC9t-eSy";*/
if(!function_exists('recaptcha_check_answer')){
	function recaptcha_check_answer($a, $b, $c){
		$resp = new stdClass();
		$resp->is_valid = true;
		return $resp; 
	}
}
 
switch($_GET['action']){
	case 'shortcode':
		include_once(get_template_directory().'/clapat/Shortcodes.list.php');
		$sc = $_GET['popup'];
		if(!empty($Shortcodes[$sc])){
			$Sc = $Shortcodes[$sc];
			$height = count($Sc['params']) * 50;
			echo '<form action="#content" id="sc_popup" style="width:250px; height:'.$height.'px;">
			<br>
			'.__('Configure shortcode fields','clapat').':<br><br>
			<dl>
			';
			
			
		
			foreach($Sc['params'] as $param=>$value){
				echo '<dt>'.ucfirst($param).' :</dt><dd><input type="text" name="'.$param.'" value="'.$value.'"></dd>';
			}
			
			if($Sc['content'] != false){
				echo '<dt>Content:</dt><dd><textarea name="sc_content"  id="sc_content">'.$Sc['content'].'</textarea></dd>';
			}else {
				echo '<textarea name="sc_content"  id="sc_content" style="display:none;"></textarea>';
			}
			echo '</dl>';
			echo '<input type="hidden" name="sc_name" id="sc_name" value="'.$sc.'">';
			echo '<br>
			<a href="#" onClick="insertScCode(); return false;" class="button-primary">Insert into editor</a>
			</form>
			<style>
	#sc_popup dl { width:350px;}		
#sc_popup dd, #sc_popup dt { display:inline-block; margin-left:0; width:100px;}
#sc_popup dd, #sc_popup dd textarea, #sc_popup dd input { width:200px;}

#TB_window a.button-primary { color:#fff; }
			</style>
			';
		}
		//var_dump($Shortcodes);
		$Response = '';
		exit;
	break;
	case 'contact':
		$resp = recaptcha_check_answer ($privatekey,
                                $_SERVER["REMOTE_ADDR"],
                                @$_POST["recaptcha_challenge_field"],
                                @$_POST["recaptcha_response_field"]);

		if (!$resp->is_valid && $recaptchaEnabled == true) {
			$Response = array('status'=>'0','message'=> __("Captcha code is not correct. Try again",'clapat'));
		} else {
			if(strlen($_POST['name']) > 3 && strlen($_POST['email']) > 3 && filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) && strlen($_POST['message']) > 3){
				$clapat_settings_contact = @json_decode(get_option('clapat_contact'));
				$in = array('%from', '%subject', '%message', '%ip', '%date','%email','%phone');
				$out = array(@$_POST['name'], @$_POST['subject'], @$_POST['message'], $_SERVER['REMOTE_ADDR'], date(get_option('date_format')),$_POST['email'],$_POST['phone']);
				$message = str_replace($in, $out, $clapat_settings_contact->email_template);

				if(wp_mail($clapat_settings_contact->clapat_ct_email, __('New message from website','clapat'), $message)){
					$Response = array('status'=>'1','message'=>__('Message sent','clapat'));
				} else {
					$Response = array('status'=>'0','message'=>'<div class="error_message">'.__('Failed to send','clapat').'</div>');
				}
			} else {
				$Response = array('status'=>'0','message'=>'<div class="error_message">'.__('Invalid input data','clapat').'</div>');
			}
		}
	break;
	default:
		$Response = array('status'=>'0','message'=>__('Nothing to do...','clapat'));
	break;
}
echo json_encode($Response);