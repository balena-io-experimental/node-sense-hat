# Sense hat node library

This library pulls in hardware specific modules for the sense hat and exports
them in a single module.

## Leds

The LED library is the
[sense-hat-led](https://github.com/aonghusonia/sense-hat-led) module. [Example](https://github.com/resin-io-playground/node-sense-hat/tree/master/examples/led)

## Joystick

The joystick library used is the
[sense-joystick](https://github.com/resin-io-playground/sense-joystick) module. [Example](https://github.com/resin-io-playground/node-sense-hat/tree/master/examples/joystick)

## IMU

The Inertial Measurement Unit library used is the [nodeimu](https://github.com/rupnikj/nodeimu)
module. [Example](https://github.com/resin-io-playground/node-sense-hat/tree/master/examples/imu)

## Interface

These modules are exposed by the following entries:
```
Joystick: joystick library
Leds: LED library
Imu: nodeimu library
```
