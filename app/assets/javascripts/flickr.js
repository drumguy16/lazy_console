$(document).ready(function() {
	$('#theme').submit(function(event) {
		event.preventDefault();
		var $theme = $('#theme-key').val(); 
		var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
		var flickrOptions = {
			format: 'json',
			tags: $theme
		};
		function displayPhoto(data) {
			var min = Math.ceil(0);
  			var max = Math.floor(data.items.length);
			var item_number = Math.floor(Math.random() * (max - min + 1)) + min;
			var photo = data.items[item_number];
			$('body').css('background-image', 'url(' + photo.media.m + ')' );

		}
	$.getJSON(flickrAPI, flickrOptions, displayPhoto);
	}); //End Submit Click
});// End Ready