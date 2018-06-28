const APIKEY = "32cf239183c741397f1c731a5405acc4";

export function getWeather(city){
  let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${APIKEY}`;

  return fetch(url, {
    method: 'GET'
  })
.then(response => {return response.json()});
}
