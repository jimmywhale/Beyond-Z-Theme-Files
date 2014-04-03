/*
Clapat JS framework for admin only.
Please do not thouch this unless you know what you`re doing.
*/

jQuery(function($){
	if(typeof $ == 'undefined'){
		var $ = jQuery;
	}
	
	
	$(".inside .switch-options > label").live("click", function(e){
		e.preventDefault();
		e.stopPropagation();
		$(this).parent().find('label').removeClass('selected');
		$(this).addClass('selected');
		var el = $(this).parent().find('.checkbox');
		var folds = el.data('fold');
		var fold = false;
		if(typeof $(folds).html() == 'string'){
			fold = $(folds);
		}
		if($(this).hasClass('cb-enable')){
			el.val('1');
			if(fold != false){ fold.stop().slideDown(); }
		}else {
			el.val('0');
			if(fold != false){ fold.stop().slideUp(); }
		}
	});
	
	jQuery.ajax({
		type:"POST",
		url: ajaxurl, // our PHP handler file
		data: {action: 'export_data', security: MyAjax.clapat_settings_nonce, data: 'hello'},
		success:function(results){
			$('#exportContent').html(results);
		}
	});
	
	jQuery('#insert_shortcode').live('change', function(){
		$.post(ajaxurl, {action: 'get_shortcode', security: MyAjax.clapat_settings_nonce, data: "selected="+jQuery("option:selected",'#insert_shortcode').val()}, function(data){
			$('#cti').val(data);
		});	
	});
	var timeout = false;
	jQuery('.save-settings').live('click', function(){
		var form = $(this).parents('form');
		var queryString = form.serialize();
		var ajaxAction = form.find('input.action').val();
		console.log(MyAjax.clapat_settings_nonce);
		$.post(ajaxurl, {action: ajaxAction, security: MyAjax.clapat_settings_nonce, data: queryString}, function(data){
			var response = eval('('+data+')');
			var errorMessage = $(form.prev('.message'));
			errorMessage.slideUp().removeClass('error').addClass('updated').html(response.message).slideDown();
			timeout = setTimeout(function(){ errorMessage.slideUp() }, 5000);
		//	alert(data);
		});	
	}); 
	
	jQuery('#clapat-settings').tabs();
	if(typeof $('<div/>').ColorPicker == 'function'){
	jQuery('.cpicker, .color').each(function(){
		jQuery(this).ColorPicker({
			onSubmit: function(hsb, hex, rgb, el) {
				jQuery(el).val('#' + hex);
				jQuery(el).ColorPickerHide();
			},
			onBeforeShow: function () {
				jQuery(this).ColorPickerSetColor(this.value);
			},
			onChange: function (hsb, hex, rgb,el) {
				jQuery(el).val('#' + hex);
				jQuery(el).prev().css({backgroundColor: '#' + hex});
		
			}
		})
		.bind('keyup', function(){
			jQuery(this).ColorPickerSetColor(this.value);
		});
	});	
	}
	
	jQuery('.picker-preview').click(function(){
		$(this).next().click();
	});
	
	jQuery('.importPalette').live('click', function(){
		var palette = $(this).parent().parent().find('td.palette');
		var index = 0;
		var items = jQuery('.inline-items.cpick');
		//console.log(palette.html());
		$('span', palette).each(function(e){
			var item = items[index];
			var color = $(this).html();
			var _preview = jQuery('.picker-preview', item);
			console.log(color);
			var _input = _preview.next('input');
			_input.val(color);
			_preview.css({backgroundColor: color});
			index++;
		});
	
	});
	
	jQuery('.test.button').click(function(e){
		e.preventDefault();
		e.stopPropagation();
		jQuery.ajax({
			type:"POST",
			url: ajaxurl, // our PHP handler file
			data: {action: 'savePalette', security: MyAjax.clapat_settings_nonce, data: jQuery('#clapat-settings .ui-tabs-panel[aria-hidden=false]').find('form').serialize()},
			success:function(results){
				if(typeof jQuery('#clapat-error-message').html() == 'undefined'){
					jQuery('<div id="clapat-error-message"/>').appendTo('body');
				}
				jQuery('#clapat-error-message').hide().html(results).fadeIn(1000, function(){
					setTimeout("jQuery('#clapat-error-message').fadeOut(1000)", 3000);
				});
				//alert(results);
			}
		});
		//	jQuery('#clapat-settings .ui-tabs-panel[aria-hidden=false]').find('form').submit();

	});
	
	jQuery('#clapat-settings .button-primary').click(function(e){
		e.preventDefault();
		e.stopPropagation();
		jQuery.ajax({
			type:"POST",
			url: ajaxurl, // our PHP handler file
			data: {action: 'my_action_web', security: MyAjax.clapat_settings_nonce, data: jQuery('#clapat-settings .ui-tabs-panel[aria-hidden=false]').find('form').serialize()},
			success:function(results){
				if(typeof jQuery('#clapat-error-message').html() == 'undefined'){
					jQuery('<div id="clapat-error-message"/>').appendTo('body');
				}
				jQuery('#clapat-error-message').hide().html(results).fadeIn(1000, function(){
					setTimeout("jQuery('#clapat-error-message').fadeOut(1000)", 3000);
				});
				//alert(results);
			}
		});
		//	jQuery('#clapat-settings .ui-tabs-panel[aria-hidden=false]').find('form').submit();

	});
	jQuery('#clapat-settings .button').click(function(e){
		e.preventDefault();
		jQuery('#clapat-settings .ui-tabs-panel').not('.ui-tabs-hide').find('form').get(0).reset();
	});
	
	if(typeof jQuery('body').sortable == 'function'){
		jQuery('.sortable').sortable();
	}
	
	jQuery('.addstep').click(function(e){
		e.preventDefault();
		$class = jQuery(this).attr('rel');
		jQuery(this).next('ul.sortable').append('<li><span>Name: <input type="text" name="ch['+$class+'][name][]"></span> <span>Price:<input type="text" name="ch['+$class+'][price][]"></span></li>');
	});
	
	jQuery('.addfield').click(function(e){
		e.preventDefault();
		$class = jQuery(this).attr('rel');
		if($class == 'domain'){
			$Content = '<li><span>Extension: <input type="text" name="domainTypes[name][]"></span> <span>Price: <input type="text" name="domainTypes[price][]"></span> </li>';
		}else if($class == 'order') {
			$Content = '<li><span>Field name: <input type="text" name="fields_'+$class+'[]"></span></li>';
		}else {
			$Content = '<li><span>Field title: <input type="text" name="fields_'+$class+'[]"></span></li>';
		}
		jQuery(this).next('ul.sortable').append($Content);
	});
	
	jQuery('#clapat-settings ul.sortable li').each(function(){
		jQuery(this).append('<a class="removeitem" href="#"><img src="../wp-content/themes/simple-hosting/images/remove-from-cart.png" alt="X"></a>');
	});
	
	jQuery('.removeitem').click(function(e){
		e.preventDefault();
		jQuery(this).parent('li').remove();
	});
	
	jQuery('.togglenext').click(function(e){
		e.preventDefault();
		console.log(jQuery(this).parent().parent().next().toggle());
	});
	
	jQuery('.sectionName').live('keyup', function(){
		var $ = jQuery;
		var me = $(this);
		var title = me.val();
		console.log(title);
		me.parent().parent().find('.toggle').html(title);
	});

});


function insertIntoEditor(){
	tinyMCE.execInstanceCommand('content', "mceInsertContent", true, jQuery('#cti').val());
}

function removeItem(t){
	jQuery(t).parent().remove();
}

function addAccordionItem(num){
	jQuery('div#accordion-widget-elements').append('<p><label for="">Heading: <input class="widefat" name="widget-accordion-widget['+num+'][elementtitles][]" type="text"/></label><label for="">Content: <textarea class="widefat" name="widget-accordion-widget['+num+'][elementcontent][]" /></textarea></label></p>');
	//jQuery('div#accordion-widget-elements').append(' <input class="widefat" name="widget-accordion-widget[2][elementtitles][]" type="text">');
	console.log('click');
	return false;
}



/* Build and insert shortcode into editor */
function insertScCode(){
	var sc = jQuery('#sc_popup #sc_name').val();
	var ct = jQuery('#sc_popup #sc_content').text();
	var params = '';
	jQuery('#sc_popup input[type="text"]').each(function(){
		var me = jQuery(this);
		if(me.val() != ''){
			params += me.attr('name')+'="'+me.val()+'" ';
		}
	});
	out = '['+sc+' '+params+']';
	if(ct.length > 0){
		out += ct;
		out += '[/'+sc+']';
	}
	tinyMCE.activeEditor.execCommand( "mceInsertContent", false, out )
	tb_remove();
}


function updateSectionTitle(t){
	var $ = jQuery;
	var me = $(t);
	var title = me.val();
	me.prev('.toggle').html(title);
}

function deletePalette(file){
	if(confirm("Are you sure you want to delete custom skin?\nAction cannot be reverted!!!")){
		jQuery.ajax({
			type:"POST",
			url: ajaxurl, // our PHP handler file
			data: {action: 'delete_skin', security: MyAjax.clapat_settings_nonce, data: 'file='+file},
			success:function(results){
				if(typeof jQuery('#clapat-error-message').html() == 'undefined'){
					jQuery('<div id="clapat-error-message"/>').appendTo('body');
				}
				jQuery('#clapat-error-message').hide().html(results).fadeIn(1000, function(){
					setTimeout("jQuery('#clapat-error-message').fadeOut(1000)", 3000);
				});
			}
		});
	}
}