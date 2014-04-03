
(function ()
{
	// create ionutShortcodes plugin
	tinymce.create("tinymce.plugins.ionutShortcodes",
	{
		init: function ( ed, url )
		{
			ed.addCommand("ionutPopup", function ( a, params )
			{
				var popup = params.identifier;
				
				// load thickbox
				tb_show("Insert Shortcode", ionutShortcodes.plugin_folder + "clapat/AjaxCall.php?action=shortcode&popup=" + popup + "&height=350&width=370&inlineId=divStart");
			//	var ajx = jQuery('#sc_popup');
			//	var h = ajx.outerHeight();
			//	var w = ajx.outerWidth();
				var TB_WIDTH = 400,
				TB_HEIGHT = 350; // set the new width and height dimensions here..
				jQuery("#TB_window").animate({
					marginLeft: '-' + parseInt((TB_WIDTH / 2), 10) + 'px',
					width: TB_WIDTH + 'px',
					height: TB_HEIGHT + 'px',
					marginTop: '-' + parseInt((TB_HEIGHT / 2), 10) + 'px',
					top: '50%',
					left:'50%'
				});
			});
		},
		createControl: function ( btn, e )
		{
			if ( btn == "ionut_button" )
			{	
				var a = this;
				var btn = e.createSplitButton('ionut_button', {
                    title: "Insert Shortcode",
					image: ionutShortcodes.plugin_folder +"/images/eleven_shortcode_16.png",
					icons: false
                });

                btn.onRenderMenu.add(function (c, b)
				{	
				c=b.addMenu({title: "Columns"});
					a.addImmediate( c,"1/3", "[one_third]Lorem ipsum[/one_third]" );
					a.addImmediate( c,"1/3 last", "[one_third_last]Lorem ipsum[/one_third_last]" );
					a.addImmediate( c,"2/3", "[two_third]Lorem ipsum[/two_third]" );
					a.addImmediate( c,"2/3 last", "[two_third_last]Lorem ipsum[/two_third_last]" );
					a.addImmediate( c,"1/2", "[one_half]Lorem ipsum[/one_half]" );
					a.addImmediate( c,"1/2 last", "[one_half_last]Lorem ipsum[/one_half_last]" );
					a.addImmediate( c,"1/4", "[one_fourth]Lorem ipsum[/one_fourth]" );
					a.addImmediate( c,"1/4 last", "[one_fourth_last]Lorem ipsum[/one_fourth_last]" );
					a.addImmediate( c,"3/4", "[three_fourth]Lorem ipsum[/three_fourth]" );
					a.addImmediate( c,"3/4 last", "[three_fourth_last]Lorem ipsum[/three_fourth_last]" );
					a.addImmediate( c,"1/5", "[one_fifth]Lorem ipsum[/one_fifth]" );
					a.addImmediate( c,"1/5 last", "[one_fifth_last]Lorem ipsum[/one_fifth_last]" );
					a.addImmediate( c,"2/5", "[two_fifth]Lorem ipsum[/two_fifth]" );
					a.addImmediate( c,"2/5 last", "[two_fifth_last]Lorem ipsum[/two_fifth_last]" );
					a.addImmediate( c,"3/5", "[three_fifth]Lorem ipsum[/three_fifth]" );
					a.addImmediate( c,"3/5 last", "[three_fifth_last]Lorem ipsum[/three_fifth_last]" );
					a.addImmediate( c,"4/5", "[four_fifth]Lorem ipsum[/four_fifth]" );
					a.addImmediate( c,"4/5 last", "[four_fifth_last]Lorem ipsum[/four_fifth_last]" );
					a.addImmediate( c,"1/6", "[one_sixth]Lorem ipsum[/one_sixth]" );
					a.addImmediate( c,"1/6 last", "[one_sixth_last]Lorem ipsum[/one_sixth_last]" );
					a.addImmediate( c,"5/6", "[five_sixth]Lorem ipsum[/five_sixth]" );
					a.addImmediate( c,"5/6 last", "[five_sixth_last]Lorem ipsum[/five_sixth_last]" );
				c=b.addMenu({title: "Pricing table"});
					a.addImmediate( c, "Pricing table", "[pricing-table] Insert items here [/pricing-table]" );
					a.addImmediate( c, "Pricing table secondary", "[pricing-table-second] Insert items here [/pricing-table-second]" );
					a.addWithPopup( c, "Table column", "col" );
					a.addImmediate( c, "Table row", "[row]Lorem ipsum[/row]" );
				a.addImmediate( b, "Contact form", "[contact-form]" );
				a.addImmediate( b, "Map", "[map]" );
				a.addWithPopup( b, "Twitter feed", "twitter-feed" );
				a.addWithPopup( b, "Newsletter register form", "newsletter-register" );
				a.addWithPopup( b, "News", "news" );
				a.addWithPopup( b, "Service irem", "service" );
				a.addWithPopup( b, "Clients", "clients" );
				a.addWithPopup( b, "Portfolio", "portfolio" );
				c=b.addMenu({title: "Tabs"});
					a.addImmediate( c, "Tabs holder", "[tabs] Insert tabs here [/tabs]" );
					a.addWithPopup( c, "Tab item", "tab" );
				c=b.addMenu({title: "Accordion"});
					a.addImmediate( c, "Accordion holder", "[accordion] Insert items here [/accordion]" );
					a.addWithPopup( c, "Accordion item", "item" );
				a.addImmediate( b, "features", "[features]" );
				a.addWithPopup( b, "Notify box", "notify" );
				a.addWithPopup( b, "Button", "button" );
				a.addWithPopup( b, "Message box", "message" );
				a.addWithPopup( b, "Team members", "our-team" );
				a.addWithPopup( b, "Divider", "divider" );
				a.addWithPopup( b, "Add space", "space" );
				a.addWithPopup( b, "Youtube video", "youtube" );
				a.addWithPopup( b, "Testimonial", "testimonial" );
				a.addImmediate( b, "Testimonial widget", "[testimonial-widget]Lorem ipsum[/testimonial-widget]" );
				a.addWithPopup( b, "Custom list style", "list" );
				a.addImmediate( b, "Box", "[box]Lorem ipsum[/box]" );
				a.addWithPopup( b, "Bar", "bar" );
				a.addWithPopup( b, "Meter", "meter" );
				a.addWithPopup( b, "Testimonial slider", "testimonial-slider" );
				a.addImmediate( b, "Group", "[group]Lorem ipsum[/group]" );
				a.addWithPopup( b, "Insert page", "page" );
				a.addWithPopup( b, "Full slider (maximage)", "full-slider" );
				a.addWithPopup( b, "Youtube video - Fullscreen", "youtube-video" );
				});
                
                return btn;
			}
			
			return null;
		},
		addWithPopup: function ( ed, title, id ) {
			ed.add({
				title: title,
				onclick: function () {
					tinyMCE.activeEditor.execCommand("ionutPopup", false, {
						title: title,
						identifier: id
					})
				}
			})
		},
		addImmediate: function ( ed, title, sc) {
			ed.add({
				title: title,
				onclick: function () {
					tinyMCE.activeEditor.execCommand( "mceInsertContent", false, sc )
				}
			})
		},
		getInfo: function () {
			return {
				longname: 'Ionut Shortcodes',
				author: 'Ionut Stoica',
				authorurl: 'http://themeforest.net/user/ionuts/',
				infourl: 'http://ionutstoica.info/',
				version: "1.0"
			}
		}
	});
	
	// add ionutShortcodes plugin
	tinymce.PluginManager.add("ionutShortcodes", tinymce.plugins.ionutShortcodes);
})();