/*
[Chunk]
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
start(); //Uncomment if I want to retrieve Miami weather data
// --------------------------------------------------------------------------------

/*
[Chunk]
Update style of buttons based on current click
- el = automatically selected object executed every key stroke (key pressed) interrupt
- event = manually selected object used with currentTarget attribute
- By the way, both are objects with classList property
*/
fetch_pet_data("all");
const list = document.querySelectorAll(".meet-our-friends-filter .filter-btn");
//path of object selection at .filter-btn from .meet-our-friends-filter
list.forEach(el => {
  el.addEventListener("click", (event) => { click_to_update_tab_color_and_pet_filter(event) });
  // console.log(
  //   'Uncomment it for testing forEach execution every key stroke \
  //   by typing anything here ......') 

})
// --------------------------------------------------------------------------------

/*
[Chunk]
Function to update filter tab color and pet data
*/
function click_to_update_tab_color_and_pet_filter(event) {
  //Clear active font style (re-initialize font style to be grey)
  const li = (el) => { el.classList.remove("active"); }
  list.forEach(li)

  //Update active (blue color font to the button we click)
  event.currentTarget.classList.add("active");

  //Update pet content according to filter mode selection
  const filter_mode = event.currentTarget.dataset.filter;
  fetch_pet_data(filter_mode); //Expand function by search this function
}
// --------------------------------------------------------------------------------

/*
[Chunk]
Retrieve pet database from promise to json
- await is used for waiting current instruction until complete then move to next instruction
- await must be used with async function
- async is branching function that execute code independently and looks like to run code parralelly with the other normal code.
  When it start to run, it initially return Promise (Promise to finish final output later). 
  After that, it will run its code separately until everything done. 
  So, the code (variable and instruction) is supposed to be independent to other code in the main branch.
  The final output can be able to present on HTML DOM as normal. 
*/

async function fetch_pet_data(filter_mode) {
  //fetch pet data from website and parse to json format for data retrieval
  const pet_promise = await fetch("https://pets-adoption-server.netlify.app/.netlify/functions/pets");
  const pet_json = await pet_promise.json();

  //Select and assign template into variable as a copy used for later
  const pet_card_template = document.querySelector("#pet-card-template");

  //(Re)initialize pet-card-list (container of pet data) to be blank template, which is ready for new update.
  //Here, copy of template is re-used (append into DOM)
  const parent = document.querySelector("#pet-card-list");
  parent.innerHTML = "";
  parent.appendChild(pet_card_template);

  //For each pet data, clone template and update pet data into blank template
  pet_json.forEach(el => {
    const pet_card_deep_clone = pet_card_template.content.cloneNode(true);
    //Filter pet data by matching selected tab
    if ((el.species != filter_mode) && (filter_mode != "all")) {
      pet_card_deep_clone.querySelector("#pet-card").style.display = "none";
    }
    //In case of no pet photo, use dummy photo
    if (!el.photo) {
      el.photo = './images/Fallback.jpg';
    }
    //Update pet data into copied template
    pet_card_deep_clone.querySelector("#pet-img img").src = el.photo;
    pet_card_deep_clone.querySelector("#pet-name").textContent = el.name;
    pet_card_deep_clone.querySelector("#pet-detail").textContent = el.description;
    pet_card_deep_clone.querySelector("#pet-age").textContent = get_age_year(el.birthYear); //Expand function by searching keyword
    document.querySelector("#pet-card-list").appendChild(pet_card_deep_clone);
  })
}
// --------------------------------------------------------------------------------

/*
[Chunk]
Function to format the pet age
*/
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