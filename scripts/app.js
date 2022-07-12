const url = 'https://api.nasa.gov/planetary/apod?api_key=ytdlk2cVwZSEpFfqC86sLe2EKOffc99Qbe7zDjpf'
// const api_key = config.NASA_API_KEY

const fetchNASAData = async () => {
    // date = document.getElementById('date-picker').value
    // console.log(date)
    try {
        //const response = await fetch(`${url}${api_key}`)
        const response = await fetch(`${url}`)
        const data = await response.json()
        console.log('NASA APOD data', data)
        displayData(data)
    } catch (error) {
        console.log(error)
    }
}

const displayData = data => {
    document.getElementById('title').textContent = data.title
    document.getElementById('date').textContent = data.date
    document.getElementById('picture').src = data.hdurl
    document.getElementById('explanation').textContent = data.explanation
}

fetchNASAData()
