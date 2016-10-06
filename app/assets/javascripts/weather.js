if("geolocation" in navigator) {
	navigator.geolocation.getCurrentPosition(function(position) {
		loadWeather(position.coords.latitude + ',' + position.coords.longitude);
	}); // End getCurrentPosition
} else {
	loadWeather("New York City, US", "");
}

$(document).ready(function() {
	setInterval(getWeather, 1000);
});

function loadWeather(location, woeid) {
	$.simpleWeather({
		location: location,
		woeid: woeid,
		unit: 'f',
		success: function(weather) {
			city = weather.city;
			temp = weather.temp+'&deg;';
			wcode = '/assets/' + weather.code + '.svg';
			wind = '<p>' + weather.wind.speed + '</p><p>' + weather.units.speed + '</p>';
			humidity = weather.humidity + " %";

			$(".location").text(city);
			$(".temperature").html(temp);
			// $(".climate_bg").html(wcode);
			$(".weathericon").attr("src", wcode)
			$(".humidity").text(humidity);
			$(".windspeed").html(wind);

		},
		error: function(error) {
			$(".error").html('<p>' + error + '</p>');
		}
	}); // End simpleWeather
} // End loadWeather