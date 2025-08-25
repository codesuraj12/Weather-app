import React from 'react'

const WeatherDetail = () => {
    // 5 day weather fetch with 3 hour delay
      useEffect(() => {
        // `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        fetch('https://api.openweathermap.org/data/2.5/forecast?q=Belgaum&appid=107dff9ecbe206388e20a7343fac929f&units=metric')
          .then((res) => res.json())
          .then((data) => {
            // console.log(data)
            //         const date =  new Date()
            //         const offsetMs = data.city.timezone * 1000;
            //         const localOffsetMs = date.getTimezoneOffset() * 60000; 
            //            // Adjust time correctly
            //         const citytime = new Date(date.getTime()+offsetMs+localOffsetMs)
            // console.log(citytime.toTimeString())
    
            // console.log(data.list[0].dt)
          })
      }, [])
  return (
    <div>WeatherDetail</div>
  )
}

export default WeatherDetail