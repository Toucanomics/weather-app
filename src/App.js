import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';

// this application is a weather app
// grabs data from a APIs to present real-time weather data

function App() {
  const [search, setSearch] = useState('')
  const [allData, setAllData] = useState({
    city: '',
    country: '',
    temperature: '',
    minTemperature: '',
    humidity: '',
    weatherIcons:''
  })

  useEffect(() => {
    fetchData()
  },[])

  const fetchData = async (city) => {
    try {
    const APIKEY = '3d1ac262833146ffa7ba45270f2134ef'
    const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=imperial`)
    await setAllData ({
      city: result.data.name,
      country: result.data.sys.country,
      temperature: result.data.main.temp,
      humidity: result.data.main.humidity,
      minTemperature: result.data.main.temp_min,
      weatherIcons: result.data.weather[0].icon
    })
  } catch (e) {
    console.log('API not loaded correctly - bad request')
    }
  }

  const handleSubmit = (event) => {
    console.log(search)
    event.preventDefault()
    fetchData(search)
  }

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  return( 
  <main>
    <div className="App"> 
      <h1 className="mainHeader">
        Simple Weather Application
      </h1>
      <form onSubmit={handleSubmit}>
        <input
        value={search}
        type='text'
        name='city'
        placeholder='city name'
        onChange={handleChange}
         />
         <button htmlFor='city'> Search</button>
      </form>
      <section className="resultsContainer">
        <h1>{allData.city}</h1> 
          <h2>{allData.country}</h2>
          <img src={'https://openweathermap.org/img/wn/' + allData.weatherIcons +'@2x.png'} />
          <h3> Temperature</h3> 
          <div>
          <p>{allData.temperature} °F</p>
          </div>
          <div>
          <h3> Minimum Temperature</h3>
          <p>{allData.minTemperature} °F</p>
          <h3> Humidity </h3>
          <p>{allData.humidity}%</p>
          </div>
      </section>

    
    </div>
  </main>
  );
}

export default App;