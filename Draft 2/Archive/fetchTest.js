fetch('https://weather.gc.ca/wxlink/wxlink.html?cityCode=ab-3&amp;lang=e', {mode: no-cors})
  .then(function(response) {
    console.log(response);
  })



    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'https://weather.gc.ca/rss/city/ab-52_e.xml', true);
    xhr.send();
    xhr.onloadend = function (response){
        console.log(response)
    }