const senseHat = require('node-sense-hat');

// Let the joystick library initialise the joystick handling code
senseHat.Joystick.getJoystick()
.then((joystick) => {

	// Use this to detect presses on the joystick
	joystick.on('press', (value) => {
		console.log('You pressed ', value);
	});

	// Use this to detect when the joystick released
	joystick.on('release', (value) => {
		console.log('You released ', value);
	});

	// Use this to detect when the joystick is being held down
	joystick.on('hold', (value) => {
		console.log("You're holding down ", value);
	});

});
