import { useEffect, useState } from 'react'

import './App.css'
import Button from '@mui/material/Button';
import Cloudy from '/cloudy.png';
import Rain from '/rain.png';
import Snow from '/snow.png';
import Sun from '/sun.png';
import Thunder from '/thunderstorm.png';
import Background from '/background.jpg'
import {

  TextField,
  Card,
  CardContent,
  Typography,
  Container,
  Box,
  Paper,
  Divider,
  CircularProgress
} from '@mui/material';
import { Search, LocationOn, Thermostat, Cloud, WbSunny, WbTwilight, Sunny } from '@mui/icons-material';



function App() {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [city, setCity] = useState('Belgaum')


  const fetchWeather = async () => {
    const keys = '107dff9ecbe206388e20a7343fac929f'


    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keys}`)
      const weatherData = await response.json()
      setData(weatherData)
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // this is for weather image manually
  const weatherImg = (main)=>{
    switch(main){
      case 'Clear':
       return Sun 
      case 'Clouds':
       return Cloudy
      case 'Rain':
       return Rain
   case "Thunderstorm":
    return Thunder
      case 'Snow':
       return Snow
  
       default:
        return Cloudy
    }
  }


  const currentTime = () => {
    const date = data.dt
    const timezone = data.timezone
    const citytime = new Date((date + timezone) * 1000)
    const hours = citytime.getUTCHours()
    const minutes = (citytime.getUTCMinutes()).toString().padStart(2, '0')

    return `${hours}:${minutes}`;   // return formatted time
  }

  // current weather featch
  useEffect(() => {
    // api key =107dff9ecbe206388e20a7343fac929f
    fetch('https://api.openweathermap.org/data/2.5/weather?q=auli&appid=107dff9ecbe206388e20a7343fac929f')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        const date = data.dt
        const timezone = data.timezone
        const citytime = new Date((date + timezone) * 1000)
        // dt.toDateString() this will not work first we have to convert that to date
        // current time chahiye to dt+timezone dono add krna padega and multiply by 1000
        console.log(citytime.getUTCHours(), ':', (citytime.getUTCMinutes()).toString().padStart(2, '0'))
      })
  }, [])



  return (
    <>
    <div style={{backgroundImage:`url(${Background})`, minHeight:'100vh', padding:'8px' }}>

   
      <Container maxWidth="md">
        <div>
          <Paper elevation={3} sx={{ p: 3, mb: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h3" component="h1" gutterBottom>
              🌤️ Weather App
            </Typography>
            <Typography variant="subtitle1">
              Get real-time weather information
            </Typography>
          </Paper>


          <Card elevation={2} sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>

                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter city name..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}

                  InputProps={{
                    startAdornment: <LocationOn sx={{ mr: 1, color: 'action.active' }} />
                  }}
                />

                {/* 
        // this is searching button */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={fetchWeather}
                  disabled={loading || !city.trim()}
                  startIcon={loading ? <CircularProgress size={20} /> : <Search />}
                  sx={{ minWidth: 120 }}
                >
                  {loading ? 'Loading...' : 'Search'}
                </Button>

              </Box>
            </CardContent>
          </Card>

          <div>
            {data.main && (
              <div>
                <Card elevation={3}>

                  <CardContent>

                    <Box sx={{ textAlign: 'center', mb: 2 }}>

                      <Typography variant="h4" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                        <LocationOn variant="contained" color='primary' />
                        {data.name}, {data.sys?.country}
                      </Typography>
                    </Box>
                    {data.sys && (
                      <Box sx={{ textAlign: 'center', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: 1 }}>
                        <Box sx={{ background: 'linear-gradient(135deg, #226ba3, #1a4d7a)', padding: '12px', color: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>

                          <Sunny sx={{ fontSize: 40, mb: 1, color: '#ff4d00' }} />

                          <Typography variant="body2">

                            Sunrise
                          </Typography>
                          <Typography variant="body2">
                            {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}
                          </Typography>

                        </Box>
                        <Box>
                          <Typography variant="body2">
                            {new Date(data.sys.sunrise * 1000).toDateString()}
                          </Typography>

                          {currentTime()}
                        </Box>

                        <Box sx={{ background: 'linear-gradient(135deg, #226ba3, #1a4d7a)', padding: '12px', color: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                          <WbTwilight sx={{ fontSize: 40, mb: 1, color: '#ee5d6c' }} />

                          <Typography variant="body2">
                            Sunset
                          </Typography>
                          <Typography variant="body2">
                            {new Date(data.sys.sunset * 1000).toLocaleTimeString()}
                          </Typography>
                        </Box>


                      </Box>
                    )
                    }

                    <Divider sx={{ mb: 3 }} />

                    {/* paper is create one background surface with shadow
box is for the box 
sx ek shortcut styling prop hai jo tumhe direct component ke andar hi CSS likhne deta hai
*/}
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 2 }}>

                      {/* Temperature */}
                      <Paper elevation={1} sx={{ p: 2, textAlign: 'center', minWidth: 150, bgcolor: 'info.light', color: 'white' }}>
                        <Thermostat sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="h4" component="div">
                          {Math.round(data.main.temp - 273.15)}°C
                        </Typography>
                        <Typography variant="body2">
                          Temperature
                        </Typography>
                        <Typography variant="caption" display="block">
                          Feels like {Math.round(data.main.feels_like - 273.15)}°C
                        </Typography>
                      </Paper>

                      {/* Weather Description */}
                      <Paper elevation={1} sx={{ p: 2, textAlign: 'center', minWidth: 150, bgcolor: 'info.main', color: 'white' }}>
                       <img
  src={weatherImg(data.weather[0].main)}
  alt={data.weather[0].description}
  style={{ 
    width: 60, 
    height: 60, 
    marginBottom: '8px',
    
 
    padding: '4px'
  }}
/>


                        <Typography variant="h6" component="div" sx={{ textTransform: 'capitalize' }}>
                          {data.weather[0].description}
                        </Typography>
                        <Typography variant="body2">
                          Condition
                        </Typography>
                      </Paper>

                      {/* body2 → font size ~14px, line height 1.43 */}
                    </Box>

                    <Divider sx={{ my: 3 }} />
                    {/* Additional Info */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 2 }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" color="primary">
                          {data.main.humidity}%
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Humidity
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" color="primary">
                          {data.wind?.speed} m/s
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Wind Speed
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" color="primary">
                          {data.main.pressure} hPa
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Pressure
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" color="primary">
                          {data.visibility / 1000} km
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Visibility
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" color="primary">
                          {data.weather[0].main}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Weather
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </div>
            )}



          </div>
          {data.cod === '404' && (
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>
                  City not found. Please try again.
                </Typography>
              </CardContent>
            </Card>
          )}
        </div>
      </Container>
       </div>
    </>
  )
}

export default App
