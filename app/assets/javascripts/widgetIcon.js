$(document).ready(function() {
	var $themeWidgetIcon = $('#theme-widget-icon');
	var $sketchpadWidgetIcon = $('#sketchpad-widget-icon');
	var $pongWidgetIcon = $('#pong-widget-icon');
	var $capitalsWidgetIcon = $('#us-capitals-widget-icon');
	
	var $themeWidget = $('#theme');
	var $sketchpadWidget = $('#sketch-pad-widget');
	var $pongWidget = $('#pong_board');
	var $capitalsWidget = $('#us-capitals-widget');
	
	var iconWidgetMatch = {
		'theme-widget-icon' : $themeWidget,
		'sketchpad-widget-icon' : $sketchpadWidget,
		'pong-widget-icon' : $pongWidget,
		'us-capitals-widget-icon' : $capitalsWidget
	}

	var widgets = [
		$themeWidget,
		$sketchpadWidget,
		$pongWidget,
		$capitalsWidget
	];

	function widgetIconClick($widgetIcon){
		var icon = $widgetIcon[0].id;
		var widget = iconWidgetMatch[icon];
		for(var i = 0; i < widgets.length; i++) {
			if (widgets[i] == widget) {
				widgets[i].toggle(400);
			} else {
				widgets[i].hide(400);
			}
		}
	}

	$themeWidgetIcon.click(function(event) {
		event.preventDefault();
		widgetIconClick($themeWidgetIcon);
	});

	$sketchpadWidgetIcon.click(function(event) {
		event.preventDefault();
		widgetIconClick($sketchpadWidgetIcon);
	});

	$pongWidgetIcon.click(function(event) {
		event.preventDefault();
		widgetIconClick($pongWidgetIcon);
	});

	$capitalsWidgetIcon.click(function(event) {
		event.preventDefault();
		widgetIconClick($capitalsWidgetIcon);
	});
})