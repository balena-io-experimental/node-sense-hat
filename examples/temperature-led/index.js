const senseLeds = require('sense-hat-led')
const imu = require('nodeimu');

const white = [255, 255, 255]
const red = [255, 0, 0]
const green = [0, 255, 0]
const blue = [0, 0, 255]
const black = [0, 0, 0];

const intervalTime =20000

const IMU = new imu.IMU();

const _ = black;
const none = [
  _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _
];

const displayMessage = (message, color) => 
  new Promise( resolve => {
    senseLeds.showMessage(message, 0.1, color, () => setTimeout( resolve, 1000))
  })

async function callb (e, data) {

  if (e) {
    console.log(e);
    return;
  }

  senseLeds.setPixels(none);
  const messageTemp = `T ${data.temperature.toFixed(2)}` 
  const messageHumidity = `H ${data.humidity.toFixed(2)}` 
  const messagePressure = `P ${data.pressure.toFixed(2)}` 

  console.log('\n')
  console.log(`${+new Date} → ${messageTemp}`)
  console.log(`${+new Date} → ${messageHumidity}`)
  console.log(`${+new Date} → ${messagePressure}`)

  await displayMessage(messageTemp, white)
  await displayMessage(messageHumidity, blue)
  await displayMessage(messagePressure, green)
  
}

senseLeds.rotation = 180
IMU.getValue(callb)
setInterval(() => IMU.getValue(callb), intervalTime)
