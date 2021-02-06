

function displayTemperature (response){
    console.log (response.data)
}

let apiKey = "99c6c9b126b6c2748213ca0867d33cb6";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=33.4418&lon=-94.0377&exclude=hourly,minutely,alerts&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);