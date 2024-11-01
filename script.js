/*
                   _     _        _    _
    /\            | |   (_)      | |  | |
   /  \   _ __ ___| |__  _  ___  | |__| | __ _ _ __  ___  ___ _ __
  / /\ \ | '__/ __| '_ \| |/ _ \ |  __  |/ _` | '_ \/ __|/ _ \ '_ \
 / ____ \| | | (__| | | | |  __/ | |  | | (_| | | | \__ \  __/ | | |
/_/    \_\_|  \___|_| |_|_|\___| |_|  |_|\__,_|_| |_|___/\___|_| |_|
*/
var userLocation;
let geocode;
const bar = document.getElementById("theBar");
let weatherJSON;
let temp;
let feelsLike;
let humidity;
let windSpeed;
let sky;
const info = document.getElementById("infoFlexbox");

document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        geocodeAPI();
    }
});
function geocodeAPI(){
    userLocation = bar.value;
    geocode = `https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&appid=6e97cc6dc671b39718fa2629a673c051&units=metric`;
    weatherJSON = fetch(geocode);
    weatherJSON.then(res =>
        res.json()).then(json => {
        console.log(`Temp : ${json.main.temp}`);
        temp = json.main.temp;
        console.log(`Feels Like : ${json.main.feels_like}`);
        feelsLike = json.main.feels_like;
        console.log(`Humidity : ${json.main.humidity}`);
        humidity = json.main.humidity;
        console.log(`Wind Speed : ${json.wind.speed}`);
        windSpeed = json.wind.speed;
        console.log(`Weather : ${json.weather[0].main}`);
        sky = json.weather[0].main;

        console.log(json)
        document.getElementById("degrees").innerHTML = `Temperature : ${Math.round(temp)}°C`;
        document.getElementById("feelsLike").innerHTML = `Feels like : ${Math.round(feelsLike)}°C`;
        document.getElementById("humidity").innerHTML = `Humidity: ${Math.round(humidity)}%`;
        document.getElementById("wind").innerHTML = `Wind: ${Math.round(windSpeed)} km/h`;
        document.getElementById("icon").classList.remove("fa-cloud-sun");
        document.getElementById("icon").classList.remove("fa-cloud-rain")
        document.getElementById("icon").classList.remove("fa-cloud-sun-rain")
        document.getElementById("icon").classList.remove("fa-snowflake")
        document.getElementById("icon").classList.remove("fa-sun")

        switch (sky) {
            case 'Clouds':
                document.getElementById("icon").classList.add("fa-cloud-sun")
                break;
            case 'Rain':
                document.getElementById("icon").classList.add("fa-cloud-rain")
                break;
            case 'Mist':
                document.getElementById("icon").classList.add("fa-cloud-sun-rain")
                break;
            case 'Snow':
                document.getElementById("icon").classList.add("fa-snowflake")
                break;
            case 'Clear':
                document.getElementById("icon").classList.add("fa-sun")
                break;
        }
    })
    bar.style.animationName = 'shrinkBar';
    bar.style.animationDuration = '1.5s';
    info.style.animationDuration = '1s';
    info.style.animationName = 'shrinkInfo';
    document.getElementById("icon").style.animationName = 'iconFade';
    document.getElementById("icon").style.animationDuration = '1.5s';
    setTimeout(function() {
        bar.style.width = '50%';
        bar.style.height = '50px';
        bar.style.top = '10%';
        document.getElementById("icon").style.opacity = '100%';
    }, 1490);
    setTimeout(function() {
        info.style.width = '100%';
    }, 990)
}
