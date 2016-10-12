$(document).ready(function() {
	$('#theme-widget-icon').click(function(event) {
		event.preventDefault();
		$('#theme').toggle(400);
	});
	$('#theme').submit(function(event) {
		event.preventDefault();
		var $theme = $('#theme-key').val(); 
		var flickrAPI = "http://api.flickr.com/services/rest/";
		var apiKey = 'e29cd81aa86ac7e648ee767247bbf0a9';
		var userId = '145628052@N07'
		var flickrOptions = {
			method: 'flickr.photos.search',
			api_key: 'bcbc325f7b20aa56ed50c1988b57a889',
			format: 'json',
			tags: $theme
		};
		function displayPhoto(data) {
			var min = Math.ceil(0);
  			var max = Math.floor(data.photos.photo.length);
			var item_number = Math.floor(Math.random() * (max - min + 1)) + min;
			var photo = data.photos.photo[item_number].id;
			$.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=' + apiKey + '&photo_id=' + photo + '&format=json&nojsoncallback=1', function(data) {
				var largePhoto= data.sizes.size[data.sizes.size.length - 1];
				var largeURL = largePhoto.source
				debugger;
				$('body').css('background-image', 'url(' + largeURL + ')')
				$('#theme').toggle(400);
			});

		}
	$.getJSON('https://api.flickr.com/services/rest/?&nojsoncallback=1', flickrOptions, displayPhoto) 
		
	}); //End Submit Click
});// End Ready