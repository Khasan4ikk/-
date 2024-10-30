const API_KEY ='b7245f6a8f458f106b5a226c3868b978' ; //добавил api адрес через сайт
const form = document.querySelector('#form');
const input = document.querySelector('.form_input');
// console.log(form);

form.onsubmit = SubmitHandler; //SubmitHandler  как  обработчик  события  onsubmit  для  формы.  То есть  функция  SubmitHandler  будет  вызываться,  когда  пользователь  отправляет  форму  (обычно  нажатием  на  кнопку  "Отправить").

async function SubmitHandler(e) {
    e.preventDefault(); // отмена обновления страницы

    if (input.value === '') {
        console.log('Enter City name');
        return;
    } else {
     // Делаем первую букву заглавной и удаляем пробелы
        const cityName = input.value.trim().charAt(0).toUpperCase() + input.value.trim().slice(1);
        console.log(cityName);
    }

    const cityName = input.value.trim();
    input.value = ''; //сбрасываем 

    // trim() удаляет лишние пробелы с начала и конца строки.

    const cityInfo=await getGeo (cityName);
    // console.log(cityInfo);
    // console.log(cityInfo[0] ['lat']);
    // console.log(cityInfo[0] [ 'lon']); //удаляем, по сути уже нам не нужны

    const weatherInfo = await getWeather(cityInfo[0] ['lat'], cityInfo[0] [ 'lon']) ;
    console.log(weatherInfo);

    // console.log(weatherInfo.name);
    // console.log(weatherInfo.main.temp); //температура
    // console.log(weatherInfo.main.humidity); //влажность
    // console.log(weatherInfo.wind.speed); //скорость ветра
    // console.log(weatherInfo.weather[0] ['main']); //картинка

    const weatherData = {
       name: weatherInfo.name,
       temp: weatherInfo.main.temp,
       humidity: weatherInfo.main.humidity,
       speed: weatherInfo.wind.speed,
       main: weatherInfo.weather[0] ['main'],
    }

    renderWeatherData(weatherData);

    }


    async function getGeo (name) {
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API_KEY}`;
        const response = await fetch(geoUrl);
        const  data =  await response.json();
        // console.log (data);
        return data;
   }

//сделаем запрос на получение погоды

//на сайте заходим api => Current weather data

async function getWeather(lat, lon) { 
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`
    //дальше делаем запрос
    const response = await fetch(weatherUrl);
        const  data =  await response.json();
        // console.log (data);
        return data;
}


function renderWeatherData (data) {

    // if (data) {

    // }

    const temp = document.querySelector('.weather_temp');
    const city = document.querySelector('.weather_city');
    const humidity = document.querySelector('#humidity');
    const speed = document.querySelector('#speed');
    const img = document.querySelector('.weather_img');

    temp.innerText = Math.ceil(data.temp) + '°c'; // округлим в большую сторону
    city.innerText = data.name;
    humidity.innerText = data.humidity + '%';
    speed.innerText = data.speed + "км/ч";

    //img // clouds-облока clear-ясный rain-дождливый
   

    const fileNames = {
        'Clouds': 'cloud', // если 'Clouds', то будет cloud (имя сохр картинки)
        'Clear' : 'sun',
        'Rain' : 'rain',
        'Snow' : 'snow',
        'Drizzle': 'morosit',
        'Thunderstorm' : 'lightning',
        'Mist': 'fog', // Туман
        'Overcast Clouds': 'overcast_clouds', // Пасмурная облачность 
        'Foggy': 'fogg', // Туман 


    }

    if (fileNames[data.main]) {
        img.src = `./img/${fileNames[data.main]}.png`; // Используем квадратные скобки для доступа к свойствам объекта
    } else {
        img.src = `./img/weather_questions.png`; // Если погода неизвестна, используем weather_questions.png
        }

    

}