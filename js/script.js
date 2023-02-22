const input = document.querySelector("input")
const button = document.querySelector("button")
let div = document.createElement("div")
let now = new Date()
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const divGraph = document.querySelector(".myGraph")
let arrDay = []
let arrTemp = []
let arrFeels = []

document.body.appendChild(div)

function appendChild(element, parent) {
  parent.appendChild(element)
}

function addClassName(element, className) {
  element.classList.add(className)
}

button.addEventListener('click', () => {
  div.innerHTML = ""
  let userLocation = input.value
  let fetchWeather = (userLocation) => fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + userLocation + '&appid=e69c960a61169de7a06b2a5805d637b0&units=metric')
  fetchWeather(userLocation)
    .then((response => response.json()))
    .then((json) => 
    {
      localStorage.setItem("data", JSON.stringify(json))
      let nameCity = json.city.name
      h2 = document.createElement("h2")
      div.appendChild(h2)
      h2.textContent = nameCity
      let list = json.list

      let divCarte = document.createElement("div")
      divCarte.classList.add("carte")
      appendChild(divCarte, div)

      for (elem of list) 
    {
        let ensemble = document.createElement("div")
        ensemble.classList.add("heuresetjours")
        appendChild(ensemble, divCarte)

        //image
        let des = document.createElement("div")
        des.classList.add("image")
        let description = document.createElement("p")
        addClassName(description, "description")
        description.textContent = elem.weather[0].description
        let image = document.createElement("img")
        image.src = "http://openweathermap.org/img/wn/" + elem.weather[0].icon + "@2x.png"
        appendChild(des, ensemble)
        appendChild(image, des)
        appendChild(description, des)

        // date et heure 
        let dayHour = document.createElement('p')
        dayHour.classList.add("dayandhour")
        dayHour.textContent = weekday[new Date(elem.dt_txt).getDay()] + " " + elem.dt_txt.substring(11, 13) + "h"
        appendChild(dayHour, ensemble)

        //temperature
        let divTemperature = document.createElement("div")
        addClassName(divTemperature, "temperature")
        let temperature = document.createElement("p")
        temperature.classList.add("temperatureactuelle")
        temperature.textContent = "🌡️ " + ((elem.main.temp).toFixed(0) + "°")
        appendChild(divTemperature, ensemble)
        appendChild(temperature, divTemperature)

        //temperature min/max
        let tempsMinMax = document.createElement("p")
        addClassName(tempsMinMax, "temperatureminmax")
        tempsMinMax.textContent = (elem.main.temp_min).toFixed(0) + "°" + "/" + ((elem.main.temp_max).toFixed(0) + "°")
        appendChild(tempsMinMax, divTemperature)

        //div reste
        let reste = document.createElement("div")
        addClassName(reste, "reste")
        appendChild(reste, ensemble)

        //ressenti
        let feels = document.createElement("p")
        addClassName(feels, "ressenti")
        feels.textContent = "Feels like : " + (elem.main.feels_like).toFixed(0) + "°"
        appendChild(feels, reste)
        
        // vitesse du vent 
        let vVent=document.createElement("p")
        addClassName(vVent,"vent")
        vVent.textContent= "💨 "+((elem.wind.speed)*3.6).toFixed(0)+ " km/h "
        appendChild(vVent,reste)

        // pourcentage d'humidité
        let humidity= document.createElement("p")
        addClassName(humidity,"humidite")
        humidity.textContent= "💧 " +elem.main.humidity + "%"
        appendChild(humidity,reste)

        arrDay.push(weekday[new Date(elem.dt_txt).getDay()])
        arrTemp.push((elem.main.temp).toFixed(0))
        arrFeels.push((elem.main.feels_like).toFixed(0))
    }
    })

    document.body.insertBefore(div,divGraph)
    const barCanvas= document.querySelector("canvas");
    const barChart = new Chart(barCanvas, 
    {
        type:"line",
        data: 
        {
            labels: arrDay,
            datasets: 
            [{
                label: 'Température par jour',
                data: arrTemp,
                backgroundColor: "cyan",
                borderColor:"black",
                tension: 0.5,
                pointBorderColor: 
                [
                    'red',
                ],
                pointBorderWidth: 3,
            },
            {
                label: 'Temperatures ressenties',
                data: arrFeels,
                backgroundColor: "red",
                borderColor:"grey",
                tension: 0.5,
                pointBorderColor: 
                [
                    'red',
                ],
                pointBorderWidth: 3,
            }]
        }
    }) 
})
