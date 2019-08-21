require('dotenv').config()
const AmbientWeatherApi = require('../lib/index')

const api = new AmbientWeatherApi({
  apiKey: process.env.AMBIENT_WEATHER_API_KEY || '73a25e407bab47e0878dba17ff134ef4076655f1ccf4488395edaa402e738a97',
  applicationKey: process.env.AMBIENT_WEATHER_APPLICATION_KEY || '2229057af4f34f609c9043f596d9c96ea752c0c3139d4b66ab41f0b0107ba3a6'
})

// list the user's devices
api.userDevices()
.then((devices) => {

  devices.forEach((device) => {
    // fetch the most recent data
    api.deviceData(device.macAddress, {
      limit: 5
    })
    .then((deviceData) => {
      console.log('The 5 most recent temperature reports for ' + device.info.name + ' - ' + device.info.location + ':')
      deviceData.forEach((data) => {
        console.log(data.date + ' - ' + data.tempf + '°F')
      })
      console.log('---')
    })
  })
})
