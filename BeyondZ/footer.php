<?php
$clapat_social = @json_decode(get_option('clapat_social'));
$clapat_footer = @json_decode(get_option('clapat_footer'));
$clapat_general = @json_decode(get_option('clapat_general_settings'));

$clapat_socialIcons = array(
	'tw' 	=> 'footer_twitter.png',
	'fb' 	=> 'footer_facebook.png',
	'gp' 	=> 'footer_google.png',
	'in' 	=> 'footer_linkedin.png',
	'dr' 	=> 'footer_dribble.png',
	'pi' 	=> 'footer_pinterest.png',
	'be'	=> 'icon_behance.png',
	'dv' 	=> 'icon_deviant.png',
	'fk' 	=> 'icon_flick.png',
	'is' 	=> 'icon_instagram.png',
	'sc' 	=> 'icon_soundcloud.png',
	'vi' 	=> 'icon_vimeo.png',
	'yt' 	=> 'icon_youtube.png',
	'rss' 	=> 'footer_rss.png',
);

?>

	<!-- Footer-->
	<div class="footer">
    
        <div class="container clearfix">
        
            <ul class="contactus">
				<?php if(isset($clapat_footer->email) && strlen($clapat_footer->email) > 3): ?>
                <li> <a href="mailto:<?php echo $clapat_footer->email; ?>"><i class="fa fa-envelope-o fa-1x"></i><span class="mail"><?php _e('Email','clapat'); ?>: <?php echo $clapat_footer->email; ?></span></a></li>
				<?php endif; if(isset($clapat_footer->phone) && strlen($clapat_footer->phone) > 3): ?>
                <li><i class="fa-phone  fa fa-1x"></i><span class="phone"><?php _e('Phone','clapat'); ?>: <?php echo $clapat_footer->phone; ?></span></li>
				<?php endif; ?>
            </ul>
            <?php

			if(isset($clapat_social->act) && count($clapat_social->act) > 0){
				foreach($clapat_social->act as $k=>$v){//var_dump($k);
					if($k == 'hidden') continue;
					echo '<div class="footer-social"><a href="'.$clapat_social->url->$k.'" target="_blank"><img src="'.get_bloginfo('template_url').'/images/'.$clapat_socialIcons[$k].'" alt="'.$v.'"></a></div>';
				}
			}
			?>
            <div class="copyright">        
                <p><?php echo (isset($clapat_footer->clapat_copyright))? $clapat_footer->clapat_copyright : __('&copy; 2103 Eleven Media. All Rights Reserved.','clapat'); ?></p>        
            </div>
            
        </div>    

	</div>
    <!--/Footer-->
	<div id="back-to-top" style="display: block;">
       <a href="#"><i class="fa fa-chevron-up"></i></a>
   </div>
<script type="text/javascript">window.onload = function() {	initialize();}
<?php
$menuResponsiveWidth = (isset($clapat_general->menu_bearkpoint)?$clapat_general->menu_bearkpoint:'1024');
if(!is_front_page()){
?>
jQuery(function($){
	$('#navigation #menu li').removeClass('current');
	if($('body').hasClass('page') || $('body').hasClass('error404')){
		
	}else if($('body').hasClass('single-portfolio')){
		$('#navigation #menu li#nav-menu-portfolio').addClass('current');
	}else if($('body').hasClass('single-news-item')){
		$('#navigation #menu li#nav-menu-news').addClass('current');
	}else {
		$('#navigation #menu li#nav-menu-blog').addClass('current');
	}
})

<?php
} 

?>
jQuery(function($){
	jQuery(window).resize(function(){
		handleClapatMenu();
	});
	handleClapatMenu();
});
function handleClapatMenu(){
	var w = window.innerWidth;
		if(w < <?php echo $menuResponsiveWidth; ?>){
			if(typeof jQuery('#menu-new-style') != 'undefined'){
				jQuery('#menu-new-style').addClass('small');
			}
		}else {
			if(typeof jQuery('#menu-new-style') != 'undefined'){
				jQuery('#menu-new-style').removeClass('small');
			}
		}
}
var allimg = document.getElementsByTagName("IMG").length;
</script>
<style>
@media only screen and (min-width: <?php echo $menuResponsiveWidth; ?>px) {
	#navigation .toggler { display:none; }
	#navigation #menu-new-style { display:block !important;}
}
@media only screen and (max-width: <?php echo $menuResponsiveWidth; ?>px) {

#navigation.with-image-logo h2 img { width:150px; }
#navigation.with-image-logo #logo { margin-top:15px; }
#navigation ul#menu {width: 200px; padding: 5px 0; position: relative; top: 30px; right: 20px; border: solid 1px #efefef; background: #fff url(../images/icon-menu.png) no-repeat 10px 11px; border-radius: 3px;	}
ul#menu li { display: none; margin: 0; } 
#navigation #menu .current { display: block!important; }
#navigation #menu a { display: block; padding: 5px 5px 5px 32px; text-align: left; }
#navigation ul#menu:hover {	background-image: none; }
#navigation ul#menu:hover .current { background: url(../images/icon-check.png) no-repeat 10px 7px; }
#navigation ul#menu li:hover a, #navigation ul#menu li.current a { color: #000; border-top: 0px; }
#navigation #menu a, #navigation #menu a:active, #navigation #menu a:visited { padding-top:5px; height:auto; padding-bottom:5px; }

#navigation .toggler { 
	display: block;
	position: absolute;
	top: 25px;
	right: 20px;
	cursor:pointer;
	color:#ccc;
}
#navigation #menu-new-style  { position: absolute;
top: 100px;
padding-top: 0;
width: 100%;
max-width: 100%; background:#fff; display:none; }

#navigation #menu-new-style li,
#navigation #menu-new-style li a { display:block; }
#navigation #menu-new-style li a { padding:5px 10px; border-bottom:1px solid #dedede !important; }
#navigation #menu-new-style li a:hover { color:#000; }
#navigation #menu-new-style li { margin-right:0; }


}
</style>


	
<?php
wp_footer(); ?>
</body>
</html>