/*
Retrieve Miami weather forecast from promise to json
- await is used for waiting current instruction until complete then move to next instruction
- Since fetching takes time longer than clock cycle, the fetching instruction may be overwritten before complete by next instruction without 'await'
- await must be used with async function
*/

async function start() {
  const miamiweather__promise = await fetch('https://api.weather.gov/gridpoints/MFL/110,50/forecast');
  const miami_weather_json = await miamiweather__promise.json();
  const miami_weather_forecast = miami_weather_json.properties.periods[0].temperature;
  // console.log(miami_weather_forecast);
  document.querySelector("#dynamic-weather").textContent = miami_weather_forecast;
}
// start(); //Uncomment if I want to retrieve Miami weather data
// --------------------------------------------------------------------------------

/*
Update style of buttons based on current click
- el = automatically selected object executed every key stroke (key pressed) interrupt
- event = manually selected object used with currentTarget attribute
- By the way, both are objects with classList property
*/

const list = document.querySelectorAll(".meet-our-friends-filter .filter-btn");
//path of object selection at .filter-btn from .meet-our-friends-filter
list.forEach(el => {
  el.addEventListener("click", (event) => { click_to_update_color(event) });
  // console.log(
  //   'Uncomment it for testing forEach execution every key stroke \
  //   by typing anything here ......') 

})

function click_to_update_color(event) {
  //Clear active font style (re-initialize font style to be grey)
  const li = (el) => { el.classList.remove("active"); }
  list.forEach(li)
  //Update active (blue color font to the button we click)
  event.currentTarget.classList.add("active");
}
// --------------------------------------------------------------------------------

// const aek = document.querySelector(".pet-card-list");
// console.log(aek)

/*
Retrieve pet database from promise to json
- await is used for waiting current instruction until complete then move to next instruction
- await must be used with async function
*/



async function fetch_pet_data() {
  const pet_promise = await fetch("https://learnwebcode.github.io/bootcamp-pet-data/pets.json");
  const pet_json = await pet_promise.json();
  // console.log(pet_json);
  const pet_card_template = document.querySelector("#pet-card-template");
  console.log(pet_json)
  pet_json.forEach(el => {
    const pet_card_deep_clone = pet_card_template.content.cloneNode(true);
    if (!el.photo) {
      el.photo = './images/Fallback.jpg';
    }
    pet_card_deep_clone.querySelector("#pet-img img").src = el.photo;
    pet_card_deep_clone.querySelector("#pet-name").textContent = el.name;
    pet_card_deep_clone.querySelector("#pet-detail").textContent = el.description;
    pet_card_deep_clone.querySelector("#pet-age").textContent = get_age_year(el.birthYear);
    document.querySelector("#pet-card-list").appendChild(pet_card_deep_clone);
    console.log(el.name)
  })

}

fetch_pet_data(); //Uncomment if I want to retrieve pet data


function get_age_year(birthYear) {
  const current_year = new Date().getFullYear();
  const age = current_year - birthYear;
  if (age == 1) {
    return `${age} year old`;
  } else if (age > 1) {
    return `${age} years old`;
  } else {
    return `less than a year`
  }
}



// --------------------------------------------------------------------------------