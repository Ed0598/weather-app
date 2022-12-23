const input= document.querySelector("input")
const button= document.querySelector("button")
let div=document.createElement("div")
document.body.appendChild(div)
let now = new Date ()
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const divGraph= document.querySelector(".myGraph")
let arrDay= []
let arrTemp=[]
let arrFeels=[]


button.addEventListener('click',()=>
{
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
        
        let divCarte= document.createElement("div")
            divCarte.classList.add("carte")
            div.appendChild(divCarte)

        for (elem of list )
        {
           
            let ensemble=document.createElement("div")
            ensemble.classList.add(elem.dt_txt.split(" ")[0],"class"+elem.dt_txt.substring(11,13))
            divCarte.appendChild(ensemble)

            //image
            let des=document.createElement("div")
            des.classList.add("image")
            let description=document.createElement("p")
            description.classList.add("description")
            description.textContent= elem.weather[0].description
            let image=document.createElement("img")
            image.src="http://openweathermap.org/img/wn/"+elem.weather[0].icon+"@2x.png"
            ensemble.appendChild(des)
            des.appendChild(image)
            des.appendChild(description)
            
            // date et heure 
            let dayHour= document.createElement('p')
            dayHour.classList.add("dayandhour")
            dayHour.textContent= weekday[new Date(elem.dt_txt).getDay()]
            ensemble.appendChild(dayHour)

            //temperature
            let divTemp=document.createElement("div")
            divTemp.classList.add("temperatures")
            let temperature=document.createElement("p")
            temperature.classList.add("temperatureactuelle")
            temperature.textContent= "🌡️ "+((elem.main.temp).toFixed(0) + "°" )
            ensemble.appendChild(divTemp)
            divTemp.appendChild(temperature)

            //temperature min/max
            let tempsMinMax=document.createElement("p")
            tempsMinMax.classList.add("temperatureMax")
            tempsMinMax.textContent= (elem.main.temp_min).toFixed(0) + "°"+ "/" +((elem.main.temp_max).toFixed(0) + "°")
            divTemp.appendChild(tempsMinMax) 

            //div reste
            let reste=document.createElement("div")
            reste.classList.add("reste")
            ensemble.appendChild(reste)

            //ressenti
            let feels=document.createElement("p")
            feels.classList.add("ressenti")
            feels.textContent= "Feels like : "+(elem.main.feels_like).toFixed(0) +"°"
            reste.appendChild(feels)

            // vitesse du vent 
            let vVent=document.createElement("p")
            vVent.classList.add("vitessevent")
            vVent.textContent= "💨 "+((elem.wind.speed)*3.6).toFixed(0)+ " km/h "
            reste.appendChild(vVent)

            // pourcentage d'humidité
            let hum= document.createElement("p")
            hum.classList.add("humidité")
            hum.textContent= "💧 " +elem.main.humidity + "%"
            reste.appendChild(hum)

            //affichage carte uniquement midi

            if (ensemble.classList.contains("class12"))
            {
                arrDay.push(weekday[new Date(elem.dt_txt).getDay()])
                arrTemp.push((elem.main.temp).toFixed(0))
                arrFeels.push((elem.main.feels_like).toFixed(0))
            }
            else
            {
                ensemble.style.display="none"
            }
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
