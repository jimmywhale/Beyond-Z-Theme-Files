jQuery(document).ready(function($){

	$('#contactform').submit(function(){

		var action = $(this).attr('action');
		var formValid = true;
		
		var n = $(this).find('input#name');
		var e = $(this).find('input#email');
		var p = $(this).find('input#phone');
		var c = $(this).find('textarea#message');
		if(n.prop("defaultValue") == n.val()){
			formValid = false;
			n.addClass('invalid');
		}else {
			n.removeClass('invalid');
		}
		if(e.prop("defaultValue") == e.val()){
			formValid = false;
			e.addClass('invalid');
		}else {
			e.removeClass('invalid');
		}
		if(p.prop("defaultValue") == p.val()){
			formValid = false;
			p.addClass('invalid');
		}else {
			p.removeClass('invalid');
		}

		if(c.prop("defaultValue") == c.val()){
			formValid = false;
			c.addClass('invalid');
		}else {
			c.removeClass('invalid');
		}
		
		if(formValid == false){
			return false;
		}
		
		$("#message").slideUp(750,function() {
			$('#message').hide();
			$('#submit').attr('disabled','disabled');
			$.post(action, $('#contactform').serialize(), function(data){
				data = eval('('+ data +')');
				document.getElementById('message').innerHTML = data.message;
				$('#message').slideDown('slow');
				$('#contactform img.loader').fadeOut('slow',function(){$(this).remove()});
				$('#submit').removeAttr('disabled');
				if(data.status == 1){
					$('#contactform').slideUp('slow');
				}
			});
		});

		return false;

	});

});