const apiKey="65959c367a43308709b033e8054beb02";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".searchButton img");
let weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if(response.status==404){
        document.querySelector(".error").style.visibility="visible";
        document.querySelector(".weather").style.visibility="hidden";
        document.querySelector(".other-info").style.visibility="hidden";
        document.getElementById('spinner').style.display = 'none'

    }
    else{
        let data = await response.json();
        document.getElementById('spinner').style.display = 'none'

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity-number").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind-speed-number").innerHTML = data.wind.speed + " km/h";

    weatherIcon.src = `images/${data.weather[0].main}.png`;

    document.querySelector(".weather").style.visibility="visible";
    document.querySelector(".other-info").style.visibility="visible";
    document.querySelector(".error").style.visibility="hidden";
    }
}

document.getElementById('form').addEventListener("submit",(e)=>{
    e.preventDefault();
    document.getElementById('spinner').style.display = 'block'
    checkWeather(searchBox.value);
});
