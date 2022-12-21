const input= document.querySelector("input")
const button= document.querySelector("button")
let div=document.createElement("div")
document.body.appendChild(div)
let now = new Date ()
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

button.addEventListener('click',()=>{
    div.innerHTML=""
    let userLocation= input.value
    let fetchWeather=(userLocation) => fetch('https://api.openweathermap.org/data/2.5/forecast?q='+userLocation+'&cnt=3&appid=e69c960a61169de7a06b2a5805d637b0&units=metric')
    fetchWeather(userLocation)
    .then((response=> response.json()))
    .then((json)=>{  
        localStorage.setItem("data",JSON.stringify(json))
        let nameCity= json.city.name
        h2= document.createElement("h2")
        div.appendChild(h2)
        h2.textContent=nameCity
        let list= json.list
        console.log(json) 
         //jour + heure
            /*let dayHour=document.createElement("p")
            dayHour.classList.add("jouretheure")
            dayHour.textContent= weekday[now.getDay()] + ", " + now.getHours()+ ":" + now.getMinutes()
            div.appendChild(dayHour) a faire plus tard (rajouter heure en fonction de la où on se trouve dans le monde)*/

        for (elem of list ){
            //image
            let image=document.createElement("img")
            image.src="http://openweathermap.org/img/wn/"+elem.weather[0].icon+"@2x.png"
            div.appendChild(image)

          

            //temperature
            let temperature=document.createElement("p")
            temperature.classList.add("temperatureactuelle")
            temperature.textContent=((elem.main.temp).toFixed(0) + "°" )
            div.appendChild(temperature)
            //temperature min/max
            let tempsMinMax=document.createElement("p")
            tempsMinMax.classList.add("temperatureMax")
            tempsMinMax.textContent= (elem.main.temp_min).toFixed(0) + "°"+ "/" +((elem.main.temp_max).toFixed(0) + "°")
            temperature.appendChild(tempsMinMax) 
            
            //ressenti
            let feels=document.createElement("p")
            feels.classList.add("ressenti")
            feels.textContent= "Feels like : "+(elem.main.feels_like).toFixed(0) +"°"
            div.appendChild(feels)

            // vitesse du vent 
            let vVent=document.createElement("p")
            vVent.classList.add("vitessevent")
            vVent.textContent= "Wind : "+((elem.wind.speed)*3.6).toFixed(0)+ " km/h "
            div.appendChild(vVent)

            // pourcentage d'humidité
            let hum= document.createElement("p")
            hum.classList.add("humidité")
            hum.textContent= "Humidity : " +elem.main.humidity + "%"
            div.appendChild(hum)

            //sunrise sunset 
            let sun= document.createElement('p')
            sun.classList.add("sunHour")
            sun.textContent= "Sunrise : " + (json.city.sunrise)/1000
            div.appendChild(sun)

        }

    

    })

})

