// create a function , that takes city as atgument and shows the weather
let searchBtn = document.querySelector(".search-btn");
let inputText = document.querySelector(".city-input");
let currWeathDiv = document.querySelector(".details");
let weathCardLst = document.querySelector(".weather-cards");
let srchHistDiv = document.querySelector(".search-history");

let strarr;

showHistory();

function showHistory() {
  // this function gets history from local storage
  //and creates buttons using the history
  let getstr = localStorage.getItem("history");
  //got the history in string format
  console.log(getstr);
  strarr = JSON.parse(getstr);
  //converted history string in array using JSON parse
  if (strarr == null) {
    //When there is no history (e.g, when the app starts for the first time)meaning history is null
    //Initialiazing variable with empty array so null error does not appear
    strarr = [];
  }

  console.log(strarr);
  srchHistDiv.innerHTML = "";
  for (let i = 0; i < strarr.length; i++) {
    strarr[i];

    srchHistDiv.innerHTML += `<button type="button" class="history-btn">${strarr[i]}</button>`;
  }
  let histBtn = document.querySelectorAll(".history-btn");
  for (let i = 0; i < histBtn.length && i < 5; i++) {
    histBtn[i].addEventListener("click", function (event) {
      event.preventDefault();

      console.log("clicked");
      let cityName = histBtn[i].innerHTML;
      currentData(cityName);
    });
  }
}

searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  let cityName = inputText.value;
  currentData(cityName);
  showHistory();
  inputText.value = "";
});

let langLatData = { lon: "", lat: "" };

function currentData(city) {
  let longLaturl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=a9325c02fbe57116b24144187e4af9e9`;

  fetch(longLaturl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data[0].lon);
      console.log(data);

      langLatData.lon = data[0].lon;
      langLatData.lat = data[0].lat;
      console.log(langLatData);

      let weatherurl = `https://api.openweathermap.org/data/2.5/forecast?lat=${langLatData.lat}&lon=${langLatData.lon}&units=metric&appid=a9325c02fbe57116b24144187e4af9e9`;

      console.log(weatherurl);
      fetch(weatherurl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          let currTemp = data.list[0].main.temp;
          let currWind = data.list[0].wind.speed;
          let currHum = data.list[0].main.humidity;
          let currIcon = data.list[0].weather[0].icon;
          let date = data.list[0].dt_txt.slice(0, 10);
          //   let h2ele = document.createElement("h2");
          //   h2ele.textContent = "paris";
          //   currWeathDiv.append(h2ele);
          console.log(currWeathDiv.innerHTML);
          currWeathDiv.innerHTML = `<h2>${city} (${date}) <h2><img class="mainIcon" src="https://openweathermap.org/img/wn/${currIcon}.png"/><h6>Temperature: ${currTemp}°C</h6><h6>Wind:${currWind}M/S</h6><h6>Humidity:${currHum}%</h6>`;
          //   currWeathDiv.innerHTML = `<h2> ${inputTxt.value} </h2>`;
          //   currWeathDiv.innerHTML =
          //     currWeathDiv.innerHTML + `<h6> Temperature: ${currTemp}°C </h6>`;
          //   currWeathDiv.innerHTML =
          //     currWeathDiv.innerHTML + `<h6> Wind:${currWind}M/S </h6>`;
          //   currWeathDiv.innerHTML =
          //     currWeathDiv.innerHTML + `<h6> Humidity:${currHum}% </h6>`;
          console.log(data.list.length);
          weathCardLst.innerHTML = "";
          for (let i = 0; i < data.list.length; i += 8) {
            let cardTemp = data.list[i].main.temp;
            let cardWind = data.list[i].wind.speed;
            let cardHum = data.list[i].main.humidity;
            let currIcon = data.list[i].weather[0].icon;
            console.log(currIcon);
            let cardDate = data.list[i].dt_txt.slice(0, 10);
            weathCardLst.innerHTML =
              weathCardLst.innerHTML +
              ` <li class="card">
              <h3>${cardDate}</h3>
              <img class="mainIcon" src="https://openweathermap.org/img/wn/${currIcon}.png"/>
              <h6>Temp:${cardTemp} °C</h6>
              <h6>Wind:${cardWind} M/S</h6>
              <h6>Humidity:${cardHum} %</h6>
            </li>`;
          }
        });
    });

  let cityarr = strarr;
  cityarr.unshift(city);
  let str = JSON.stringify(cityarr);
  console.log(cityarr);
  localStorage.setItem("history", str);
}
