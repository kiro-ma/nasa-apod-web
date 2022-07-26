const url = 'https://api.nasa.gov/planetary/apod?api_key=';
// const api_key = config.NASA_API_KEY;
const api_key = 'Oz3gUeGRyN3LH4U18HIvdMSwj2H0c0ldjrD1KyOd';

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

const fetchNASAData = async (date) => {

    try {
        const response = await fetch(`${url}${api_key}&date=${date}`);
        const data = await response.json();
        console.log('NASA APOD data', data);
        document.getElementById('picture').src = "";
        displayData(data);
    } catch (error) {
        console.log(error);
    }
}

const displayData = data => {
    document.getElementById('title').textContent = data.title;
    video_div = document.getElementById('video-div')
    video_player = document.getElementById('video')
    image = document.getElementById('picture')

    if (data.media_type == "image") {
        video_div.style = 'display: none'
        image.style = 'display: block'
        image.src = data.hdurl;
        document.getElementById('background').style.setProperty('background-image', `url(${data.hdurl})`)
    } else if (data.media_type == "video") {
        video_player.src = data.url
        image.style = 'display: none'
        video_div.style = 'display: block'
        document.getElementById('background').style.setProperty('background-image', `url("./imgs/carina.png")`)
    }
    document.getElementById('explanation').textContent = data.explanation;
    if (data.copyright != undefined) {
        document.getElementById('copyright').innerText = "© " + data.copyright
    }

}

function handleKey(e) {
    //key code for enter
    if (e.keyCode === 13) {
        e.preventDefault();
        date = e.target.value;
        date_handler(date)
    }
}

const fullScreen = (id) => {
    document.getElementById(id).requestFullscreen()
}

function date_handler(date) {
    if (date <= today) { fetchNASAData(date); }
    else {
        document.getElementById('invalid-date').innerHTML += 'Invalid date chosen!'
        document.getElementById('invalid-date').style.display = 'block'
        document.getElementById('date-picker').value = today
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

window.onload = () => {
    document.getElementById('date-picker').value = today
    fetchNASAData(today);
    //translate()
    // console.log(today);
}