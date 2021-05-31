//VARIABLES
const d = document;
const api = {
  key: "33e16bfaeeaa5a2b960ec518e46d2e84",
  url: `https://api.openweathermap.org/data/2.5/weather`,
};
const $form = d.getElementById("search-form"),
  $searchbox = d.getElementById("searchbox"),
  $card = d.querySelector(".weather-card"),
  $city = d.querySelector(".city"),
  $date = d.querySelector(".date"),
  $temperature = d.querySelector(".temp"),
  $tempImg = d.querySelector(".temp-img"),
  $weather = d.querySelector(".weather"),
  $range = d.querySelector(".range");

//EVENTOS
$form.addEventListener("submit", onSubmit, true);

//FUNCIONES
async function search(query) {
  try {
    const res = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
    const data = await res.json();
    $card.style.display = "block";
    console.log(data);
    $city.innerHTML = `${data.name}, ${data.sys.country}`;
    $date.innerHTML = new Date().toLocaleDateString();
    $temperature.innerHTML = `${toCelsius(data.main.temp)}°c`;
    $weather.innerHTML = data.weather[0].description;
    $range.innerHTML = `${toCelsius(data.main.temp_min)}°c  / ${toCelsius(
      data.main.temp_max
    )}°c `;
    updateImages(data);
  } catch (err) {
    console.log(err);
    alert("Hubo un error");
  }
}

const updateImages = (data) => {
  const temp = toCelsius(data.main.temp);
  let src;
  if (temp >= 26) {
    src = "./images/warm.png";
  } else if (temp < 26 && temp >= 15) {
    src = "./images/normal.png";
  } else if (temp < 14) {
    src = "./images/cold.png";
  }

  $tempImg.src = src;
};

const toCelsius = (kelvin) => {
  return Math.round(kelvin - 273.15);
};

function onSubmit(event) {
  event.preventDefault();
  search($searchbox.value);
}
