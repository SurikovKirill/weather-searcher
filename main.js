const tokenAPI = 'b50d06cf0be2ceacf57cf97451e6a7af';
const request = new XMLHttpRequest();
const source = document.getElementById('handlebarsTemplate').innerHTML;
const template = Handlebars.compile(source);
const errorSource = document.getElementById('errorTemplate').innerHTML;
const errorTemplate = Handlebars.compile(errorSource);


getWeather=(cityName) => {
    cityName.preventDefault();
    request.open('GET', "https://api.openweathermap.org/data/2.5/weather?q="+cityName.target[0].value+"&appid=b50d06cf0be2ceacf57cf97451e6a7af&mode=xml");
    request.send();

    request.onreadystatechange =()=> {

      const previousMarkup = document.getElementById('output');
      if (previousMarkup) {
        previousMarkup.remove();
      }
      

      if (request.responseXML.getElementsByTagName('cod').length != 0) {
        const data = {errorMsg: request.responseXML.getElementsByTagName('cod')[0].textContent}
        renderError(data);
        return;
      }

      const data = {
        city: request.responseXML.getElementsByTagName('city')[0].attributes[1].textContent,
        temperature: request.responseXML.getElementsByTagName('temperature')[0].attributes[0].textContent,
        windDir: request.responseXML.getElementsByTagName('direction')[0].attributes[2].textContent,
        windSpd: request.responseXML.getElementsByTagName('speed')[0].attributes[0].textContent,
        sunrise: request.responseXML.getElementsByTagName('sun')[0].attributes[0].textContent,
        sunset: request.responseXML.getElementsByTagName('sun')[0].attributes[1].textContent,
        humidity: request.responseXML.getElementsByTagName('humidity')[0].attributes[0].textContent
      };

      render(data);
    }
}


render=(data)=> {
  const main = document.getElementById('main');
  const html = template(data);
  const div= document.createElement('div');
  div.innerHTML = html;
  div.id = 'output';
  div.className = 'output';
  main.appendChild(div);
}


renderError=(data)=> {
  const main = document.getElementById('main');
  const errorMsg = errorTemplate(data)
  const errorDiv = document.createElement('div');
  //const errorMsg = document.createTextNode('Please enter correct data');
  errorDiv.innerHTML = errorMsg;
  errorDiv.id = 'err';
  main.appendChild(errorDiv);
}

document.getElementById('inputForm').addEventListener('submit', getWeather);