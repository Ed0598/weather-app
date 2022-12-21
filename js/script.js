const input= document.querySelector("input")
const button= document.querySelector("button")
let div=document.createElement("div")
document.body.appendChild(div)
button.addEventListener('click',()=>{
   
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
        console.log(json.list)
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

            // vitesse du vent 
            let vVent=document.createElement("p")
            vVent.classList.add("vitessevent")
            vVent.textContent= "Vent : "+(elem.wind.speed)*3.6.toFixed(0)+ " km/h "
            div.appendChild(vVent)

            // pourcentage d'humidité
            let hum= document.createElement("p")
            hum.classList.add("humidité")
            hum.textContent= "Humidité : " +elem.main.humidity + "%"
            div.appendChild(hum)
        }

    

    })

})

