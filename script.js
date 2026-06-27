const apiKey = "YOUR_API_KEY";

const searchBtn = document.getElementById("searchBtn");
const weatherDiv = document.getElementById("weather");

searchBtn.addEventListener("click", () => {
    const city = document.getElementById("city").value.trim();

    if(city === ""){
        weatherDiv.innerHTML = "<p class='error'>Please enter a city.</p>";
        return;
    }

    getWeather(city);
});

async function getWeather(city){

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try{

        weatherDiv.innerHTML = "Loading...";

        const response = await fetch(url);

        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();

        displayWeather(data);

    }
    catch(error){

        weatherDiv.innerHTML =
        `<p class="error">${error.message}</p>`;

    }

}

function displayWeather(data){

    weatherDiv.innerHTML = `

    <h2>${data.name}</h2>

    <p><strong>Temperature:</strong>
    ${data.main.temp} °C</p>

    <p><strong>Humidity:</strong>
    ${data.main.humidity}%</p>

    <p><strong>Wind Speed:</strong>
    ${data.wind.speed} m/s</p>

    <p><strong>Weather:</strong>
    ${data.weather[0].description}</p>

    `;
}