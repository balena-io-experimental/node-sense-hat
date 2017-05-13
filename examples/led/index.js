const senseHat = require('node-sense-hat');
const _ = require('lodash');

const drawScreen = () => {
	senseHat.Leds.clear();

	x = 0;
	y = 0;
	while (y < 8) {
		while (x < 8) {
			senseHat.Leds.setPixel([x, y], [_.random(0, 255), _.random(0, 255), _.random(0, 255)]);
			x += 1;
		}
		y += 1;
	}

};

// Refresh the screen every 2 seconds
setTimeout(drawScreen, 2000);
