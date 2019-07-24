$(function() {
  getWeather("glasgow")
})

function displayTemperature(temp) {
  $("#weather").html(`&nbsp; <span id="temperature">${Math.round((temp-273.15)*10)/10} &deg;C</span>`);
}

function getWeather(city) {
  var url = 'https://api.openweathermap.org/data/2.5/weather';
  $.ajax({
    dataType: "jsonp",
    url: url,
    jsonCallback: 'jsonp',
    data: { q: city, APPID: "0344bc32a4c61486961ce9b22ad3c9e0" },
    cache: false,
    success: function (data) {
      displayTemperature(data.main.temp);
    }
  });
}
