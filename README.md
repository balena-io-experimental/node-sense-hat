# Sense HAT node library

The Sense HAT is an add-on board for the Raspberry Pi family. It features an LED
matrix, a joystick, a gyroscope, an accelerometer, a magnetometer, and temperature, barometric
pressure, and humidity sensors.

This library pulls in hardware specific modules for the Sense HAT and exports
them in a single module.

## LEDs

The LED library is the
[sense-hat-led](https://github.com/aonghusonia/sense-hat-led) module. [Example](https://github.com/resin-io-playground/sense-snake)

It supports setting individual pixels, flipping the display horizontally or vertically,
displaying characters, and batch pixel jobs (clear, fill). We recommend you check
the documentation for the library above for the entire API documentation.

### Setting an LED

```javascript
// Using the standalone hw-specific library
const matrix = require('sense-hat-led');
// Using this library
const matrix = require('node-sense-hat').Leds;

const x = 3;
const y = 3;
const red = [255, 0, 0];

// Set a single pixel
matrix.setPixel(x, y, red);
```

### Switching off an LED

```javascript
const matrix = require('node-sense-hat').Leds;

const x = 3;
const y = 3;
const off = [0, 0, 0];

matrix.setPixel(x, y, off);
```

### Filling the matrix

```javascript
const matrix = require('node-sense-hat').Leds;

const O = [0, 0, 0];
const X = [255, 0, 0];

const cross = [
	X, O, O, O, O, O, O, X,
	O, X, O, O, O, O, X, O,
	O, O, X, O, O, X, O, O,
	O, O, O, X, X, O, O, O,
	O, O, O, X, X, O, O, O,
	O, O, X, O, O, X, O, O,
	O, X, O, O, O, O, X, O,
	X, O, O, O, O, O, O, X,
];

matrix.setPixels(cross);

// To fill with a single color instead
matrix.clear([127, 0, 0]);
```

### Clearing the matrix

```javascript
const matrix = require('node-sense-hat').Leds

matrix.clear()
```

## Joystick

The joystick library used is the
[sense-joystick](https://github.com/resin-io-playground/sense-joystick) module. [Example](https://github.com/resin-io-playground/sense-snake)

The joystick library exposes an `EventEmitter` interface, so that you
can register a function to be called when a joystick event occurs.

Possible joystick events are `'press'`, `'release'` and `'hold'`, and the
possible direction values for these events are `'up'`, `'down'`, `'left'`,
`'right'`, and `'click'`.

### Using the joystick

When using the joystick, the first thing that needs to be done is retrieving a
handle to the device. Behind the scenes this involves finding the correct Linux
`/dev` file and reading the descriptions. As this can be quite a long process,
the `getJoystick` function returns a promise.

```javascript
const JoystickLib = require("node-sense-hat").Joystick;

JoystickLib.getJoystick().then(joystick => {
  // We now have a handle the joystick hardware
});
```

### Registering for events

```javascript
const JoystickLib = require("node-sense-hat").Joystick;

JoystickLib.getJoystick().then(joystick => {
  joystick.on("press", direction => {
    console.log("Joystick pressed in " + direction + " direction");
  });
  joystick.on("release", direction => {
    console.log("Joystick released in " + direction + " direction");
  });
  joystick.on("hold", direction => {
    console.log("The joystick is being held in the " + direction + " direction");
  });
});
```

## IMU

The Inertial Measurement Unit library used is the [nodeimu](https://github.com/rupnikj/nodeimu)
module. [Example](https://github.com/resin-io-playground/node-sense-hat/tree/master/examples/imu)

The use of the IMU is slightly more involved—we recommend you check the example
above. We've provided some snippets below to detail the simple cases.

### Data collection
```javascript
const imu = require("node-sense-hat").Imu;

const IMU = new imu.IMU();

IMU.getValue((err, data) => {
  if (err !== null) {
    console.error("Could not read sensor data: ", err);
    return;
  }

  console.log("Accelleration is: ", JSON.stringify(data.accel, null, "  "));
  console.log("Gyroscope is: ", JSON.stringify(data.gyro, null, "  "));
  console.log("Compass is: ", JSON.stringify(data.compass, null, "  "));
  console.log("Fusion data is: ", JSON.stringify(data.fusionPose, null, "  "));

  console.log("Temp is: ", data.temperature);
  console.log("Pressure is: ", data.pressure);
  console.log("Humidity is: ", data.humidity);
});
```

### Tilt heading correction

Getting the tilt correction is more involved again:

```javascript
const imu = require("node-sense-hat").Imu;

const IMU = new imu.IMU();

const headingCorrection = (heading, offset = 0) => {
  // Once you have your heading, you must then add your 'Declination Angle', which is the 'Error' of the magnetic field in your location.
  // Find yours here: http://www.magnetic-declination.com/
  const declinationAngle = 0.03106686;

  heading += declinationAngle + offset;

  // Correct for when signs are reversed.
  if (heading < 0) {
    heading += 2 * Math.PI;
  }

  // Check for wrap due to addition of declination.
  if (heading > 2 * Math.PI) {
    heading -= 2 * Math.PI;
  }

  return heading;
};

const headingToDegree = heading => {
  // Convert radians to degrees for readability.
  return heading * 180 / Math.PI;
};

IMU.getValue((err, data) => {
  if (err !== null) {
    console.error("Could not read data: ", err);
  }

  console.log("Tilt heading is: ", headingToDegree(headingCorrection(data.tiltHeading, Math.PI / 2)));
});
```

## Interface

These modules are exposed by the following entries:
```
Joystick: joystick library
Leds: LED library
Imu: nodeimu library
```
