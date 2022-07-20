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
    if (data.media_type == "image") {
        image = document.getElementById('picture')
        image.style = 'display: block'
        image.src = data.hdurl;
    } else if (data.media_type == "video") {
        video_player = document.getElementById('video')
        video_player.src = data.url
        image.style = 'display: none'
        video_player.style = 'display: block'
    }
    document.getElementById('explanation').textContent = data.explanation;
    document.getElementById('background').innerHTML = `
    body {
        background-image: url(${data.url});
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;

        height: 100%;
        width: 100%;
        animation: changeWidth 8s ease-in-out infinite;
        backdrop-filter: blur(8px);
    }
    `
    if (data.copyright != undefined) {
        document.getElementById('copyright').innerText = "© " + data.copyright
    }

}

function handleKey(e) {
    //key code for enter
    if (e.keyCode === 13) {
        e.preventDefault();
        e.target.blur();
    }
}

const fullScreen = (id) => {
    document.getElementById(id).requestFullscreen()
}

function handler(e) {
    var date = e.target.value;
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