/*global  $, Skycons*/
(function () {
    'use strict';
    
    var App = {
        APIKEY: "378d8d7166336b82e10f18b3aa9d9436",
        lat: "",
        lng: "",
        
        init: function () {
            //kickstart the app
            App.getLocation();
        },
        getLocation: function () {
            // get the current user position
            navigator.geolocation.getCurrentPosition(App.foundPosition);
        },
        foundPosition: function (pos) {
        // found the current user position
            App.lat = pos.coords.latitude;
            App.lng = pos.coords.longitude;
            App.getWeather();
        },
        getWeather: function () {
            //get the current weather for my location
            var url = "https://api.forecast.io/forecast/" + App.APIKEY + "/" + App.lat + "," + App.lng;
            
            //JSONP
            window.jQuery.ajax({
                url: url,
                dataType: "jsonp",
                success: function (data) {
                    $(".weather-summary").text(data.currently.summary);
                    $(".weather-summary").append("<br>" + parseInt(((data.currently.apparentTemperature) - 32) * (5 / 9)) + "°C");
                    
                    var skycons = new Skycons({"color": "white"});

                    $(".weather-summary").append(skycons.add(document.getElementById("icon1"), Skycons.RAIN));
                    
                    skycons.play();

                    console.log(data);
                }
            });
        }
    };
    
    App.init();
    
}());