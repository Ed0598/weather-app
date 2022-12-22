const input= document.querySelector("input")
const button= document.querySelector("button")
let div=document.createElement("div")
document.body.appendChild(div)
let now = new Date ()
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

button.addEventListener('click',()=>{
    div.innerHTML=""
    let userLocation= input.value
    let fetchWeather=(userLocation) => fetch('https://api.openweathermap.org/data/2.5/forecast?q='+userLocation+'&appid=e69c960a61169de7a06b2a5805d637b0&units=metric')
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
            let divCarte=document.createElement("div")
            divCarte.classList.add(elem.dt_txt.split(" ")[0],"class"+elem.dt_txt.substring(11,13))
            div.appendChild(divCarte)
            //image
            let image=document.createElement("img")
            image.src="http://openweathermap.org/img/wn/"+elem.weather[0].icon+"@2x.png"
            divCarte.appendChild(image)
            
            /*//sunrise 
            let sunrise= document.createElement('p')
            sunrise.classList.add("sunrise")
            divCarte.appendChild(sunrise)
            if (divCarte.classList.contains("class12")){
                sunrise.textContent= "🌅 " + new Date(json.city.sunrise*1000).getHours()+":"+new Date(json.city.sunrise*1000).getMinutes()
            
            }*/

            /* //sunset 
            let sunset = document.createElement('p')
            divCarte.appendChild(sunset)
            if (divCarte.classList.contains("class12")){
            sunset.innerHTML= "🌇 " + new Date (json.city.sunset*1000).getHours() + ":"+new Date(json.city.sunset*1000).getMinutes()
            }*/
                        

            // date et heure 
            let dayHour= document.createElement('p')
            dayHour.classList.add("dayandhour")
            let idk= new Date(elem.dt_txt).toLocaleString('fr-BE').substring(11,16)
            dayHour.textContent= new Date(elem.dt_txt).toLocaleString('fr-BE').substring(0,5)+ " "+idk
            divCarte.appendChild(dayHour)
            let dayy= dayHour.textContent


            
            //temperature
            let temperature=document.createElement("p")
            temperature.classList.add("temperatureactuelle")
            temperature.textContent= "🌡️ "+((elem.main.temp).toFixed(0) + "°" )
            divCarte.appendChild(temperature)

            //temperature min/max
            let tempsMinMax=document.createElement("p")
            tempsMinMax.classList.add("temperatureMax")
            tempsMinMax.textContent= (elem.main.temp_min).toFixed(0) + "°"+ "/" +((elem.main.temp_max).toFixed(0) + "°")
            temperature.appendChild(tempsMinMax) 
            
            //ressenti
            let feels=document.createElement("p")
            feels.classList.add("ressenti")
            feels.textContent= "Feels like : "+(elem.main.feels_like).toFixed(0) +"°"
            divCarte.appendChild(feels)

            // vitesse du vent 
            let vVent=document.createElement("p")
            vVent.classList.add("vitessevent")
            vVent.textContent= "💨 : "+((elem.wind.speed)*3.6).toFixed(0)+ " km/h "
            divCarte.appendChild(vVent)

            // pourcentage d'humidité
            let hum= document.createElement("p")
            hum.classList.add("humidité")
            hum.textContent= "💧 : " +elem.main.humidity + "%"
            divCarte.appendChild(hum)

            //affichage carte uniquement midi

            if (divCarte.classList.contains("class12")){
            }
            else{
                divCarte.style.display="none"
            }
            

        }


    })

})

