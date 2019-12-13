const { getWeather, render } = require('../main');
const { bodyHtml } = require('../setupJest');

beforeEach(() => {
  document.body.innerHTML = bodyHtml;
});

describe('drawing result functions', () => {

  test('render error', () => {
      const data = {
        "errorMsg": "404"
      };
      render(data);

      const expectedResult =
          '<div class="er">'+'<p>Error: 404</p>'+'</div>';

      expect(document.getElementById('err').innerHTML)
          .toEqual(expectedResult);
  })

  test('render city', () => {
      const data = {
        city: "Moscow",
        temperature: "2",
        windSpd: "3",
        humidity: "80",
        pressure: "1018",
        weatherDescription: "broken clouds",
      };
      render(data);

      const expectedResult =
          '<div class="city"><p>Moscow</p></div>' +
          '<div class="temperature"><p>2 K</p></div>' +
          '<div class="wind"><p>Wind speed: 3 m/s</p></div>' +
          '<div class="sun"><p>Pressure: 1018hpa</p></div>' +
          '<div class="desc"><p>broken clouds</p></div>' +
          '<div class="rain"><p>Humidity: 80%</p></div>'
          ;

      expect(document.getElementById('output').innerHTML)
          .toEqual(expectedResult);
  })

});

describe('submit function', () => {

  beforeEach(()=>{
    fetch.resetMocks();
  })

  test('submit should call getWeather and render with city', async () => {
      var myObj=[{value:'Moscow'}];
      var event = new Event('submit');
      Object.defineProperty(event, 'target', {writable: false, value: myObj});
      await fetch.mockResponseOnce(JSON.stringify({
        ok: true,
          base: "stations",
          clouds:{
            all: 75
          },
          cod: 200,
          coord: {
            lat: 55.75,
            lon: 37.62
          },
          dt: 1576207900,
          id: 524901,
          main:{
            feels_like: 269.5,
            humidity: 86,
            pressure: 1018,
            temp: 274.4,
            temp_max: 275.93,
            temp_min: 273.15
          },
          name: "Moscow",
          sys:{
            country: "RU",
            id: 9029,
            sunrise: 1576216247,
            sunset: 1576241782,
            type: 1
          },
          timezone: 10800,
          visibility: 10000,
          weather:[{
            description: "broken clouds",
            icon: "04n",
            id: 803,
            main: "Clouds"
          }],
          wind:{
            deg: 180,
            speed: 4
          }
      }))
      await getWeather(event);

      const expectedResult =
          '<div class="city"><p>Moscow</p></div>' +
          '<div class="temperature"><p>1 K</p></div>' +
          '<div class="wind"><p>Wind speed: 4 m/s</p></div>' +
          '<div class="sun"><p>Pressure: 1018hpa</p></div>' +
          '<div class="desc"><p>broken clouds</p></div>' +
          '<div class="rain"><p>Humidity: 86%</p></div>'
          ;

      expect(document.getElementById('output').innerHTML)
          .toEqual(expectedResult);
  });

  test('submit submit should call getWeather and render with error', async () => {
    var myObj=[{value:'Mosco'}];
    var event = new Event('submit');
    Object.defineProperty(event, 'target', {writable: false, value: myObj});
    await fetch.mockResponseOnce(JSON.stringify({body: 0}),{status: 404}, {ok: false});
    await getWeather(event);

      const expectedResult =
          '<div class="er">'+'<p>Error: 404</p>'+'</div>';

      expect(document.getElementById('err').innerHTML)
          .toEqual(expectedResult);
  })

});



