function formatDate (date) {
    let hours = date.getHours();
    if  (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if  (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let days = [
      "sunday",
      "monday",
     "tuesday", 
     "wednesday", 
     "thursday", 
     "friday",
     "saturday"
     ];
     let day = days[date.getDay()]; 
     
     let months = [
     "january", 
     "february", 
     "march", 
     "april", 
     "may", 
     "june", 
     "july", 
     "august", 
     "september", 
     "october", 
     "november", 
     "december"
     ];
     let month = months [date.getMonth()]; 
  
    return `${day}, ${month} ${dateNumber} <br> ${hours}:${minutes}`;
  }
  
  let now = new Date();
  let dateNumber = now.getDate();
   
  let currentDate = document.querySelector(".current-date");
  currentDate.innerHTML = formatDate(now);
  
  function showWeatherInfo(response){
  document.querySelector("#main-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  
  document.querySelector("#weather-discription").innerHTML = response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
   
  }
  
  function searchCity(city) {
    let apiKey = "a2448133104335b630f878b5541b3167";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(showWeatherInfo);
  
  }
  
  function handleSearch(event) {
    event.preventDefault();
    let city = document.querySelector("#search-city-input").value;
    searchCity(city);
  }
  
  function searchCurrentLocation(position){
  let apiKey = "a2448133104335b630f878b5541b3167";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(showWeatherInfo);
  }
  
  function getCurrentLocation(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchCurrentLocation);
  }
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSearch);
  
  let currentLocationButton = document.querySelector("#current-location-button");
  currentLocationButton.addEventListener("click", getCurrentLocation);
  
  searchCity("Kyiv");