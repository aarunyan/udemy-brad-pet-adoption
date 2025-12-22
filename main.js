async function start() {
  const miamiweather__promise = await fetch('https://api.weather.gov/gridpoints/MFL/110,50/forecast');
  const miami_weather_json = await miamiweather__promise.json();
  const miami_weather_forecast = miami_weather_json.properties.periods[0].temperature;
  // console.log(miami_weather_forecast);
  document.querySelector("#dynamic-weather").textContent = miami_weather_forecast;
}

start()

// console.log("bye")