global.Handlebars = require('handlebars');
global.fetch = require('jest-fetch-mock');

const bodyHtml = '<body>'+
'<script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.2.0/handlebars.js"></script>'+
'<script id="handlebarsTemplate" type="text/x-handlebars-template">'+
    '<div class="city">'+
        '<p>{{city}}</p>'+
    '</div>'+
    '<div class="temperature">'+
        '<p>{{temperature}} K</p>'+
    '</div>'+
    '<div class="wind">'+
        '<p>Wind speed: {{windSpd}} m/s</p>'+
    '</div>'+
    '<div class="sun">'+
        '<p>Pressure: {{pressure}}hpa</p>'+
    '</div>'+
    '<div class="desc">'+
        '<p>{{weatherDescription}}</p>'+
    '</div>'+
    '<div class="rain">'+
        '<p>Humidity: {{humidity}}%</p>'+
    '</div>'+
'</script>'+
'<script id="errorTemplate" type="text/x-handlebars-template">'+
    '<div class="er">'+
        '<p>Error: {{errorMsg}}</p>'+
    '</div>'+
'</script>'+
'<div id="main">'+
    '<div class="searchArea">'+
        '<form id="inputForm">'+
            '<input type="text" id="inputCity">'+
            '<input type="submit" id="inputSubmit">'+
        '</form>'+
    '</div>'+
'</div>'+
'<script src="main.js"></script>'+
'</body>';


Object.defineProperty(document, 'currentScript', {
    value: document.createElement('script'),
});
document.body.innerHTML = bodyHtml;

exports.bodyHtml = bodyHtml;
