const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img'); 

const updateUI = async (data) => {

  console.log(data);

  //Destructing properties
  const { cityDets, weather } = data;


  //Update details template
  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  //Update the Day/night & icon images
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);
  
  let timeSrc = null;
  if (weather.IsDayTime) {
    timeSrc = 'img/day.svg';
  } else {
    timeSrc = 'img/night.svg';
  }
  time.setAttribute('src', timeSrc);



  //Update the css property d-none
  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }
  
};

const updateCity = async (city) => {

  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return { cityDets, weather };
};

cityForm.addEventListener('submit', e => {
  //Prevent Default Value
  e.preventDefault();
  
  //Get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //Set local Storage
  localStorage.setItem('city', city);

  //Update the UI
  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

});

if (localStorage.getItem('city')) {
  updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data));
};