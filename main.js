const tokenAPI = 'b50d06cf0be2ceacf57cf97451e6a7af';
const source = document.getElementById('handlebarsTemplate').innerHTML;
const template = Handlebars.compile(source);
const errorSource = document.getElementById('errorTemplate').innerHTML;
const errorTemplate = Handlebars.compile(errorSource);

getWeather = async (event) => {
    //console.log(event.target[0].value);
    event.preventDefault();
    response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${event.target[0].value}&appid=${tokenAPI}`);
    console.log(response);
    const previousMarkup = document.getElementById('output');
    if (previousMarkup) {
      previousMarkup.remove();
    }
    const errMarkup = document.getElementById('err');
    if (errMarkup) {
      errMarkup.remove();
    }
    console.log(response.ok);
    if (response.ok){ 
      const data = await response.json();
      render({
        city: data.name,
        temperature: (data.main.temp - 273.15).toFixed(0),
        windSpd: data.wind.speed,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        weatherDescription: data.weather[0].description,
      })
    }
    else {
      render({errorMsg: response.status});
    }
}

render=(data)=>{
  const main = document.getElementById('main');
  const div = document.createElement('div');
  if (data.errorMsg) {
    var html = errorTemplate(data);
    div.id = 'err';
  }
  else {
    var html = template(data);
    div.id = 'output';
  }
  div.innerHTML = html;
  main.appendChild(div);
}

document.getElementById('inputForm').addEventListener('submit', getWeather);

exports.getWeather = getWeather;
exports.render = render