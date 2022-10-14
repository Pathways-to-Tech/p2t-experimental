const http = require('http');
const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();
const PORT = 80;
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

http.createServer(app).listen(PORT, function() {
	console.log(`Server listening on port ${PORT}.`);
});

rl.on('line', async (input) => {
	try {
		await eval(input);
	}
	catch (error) {
		console.error(error);
	}
});

app.use(limiter);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
	const time = new Date().toISOString().replace('T', ' ').substring(0, 19);
	console.log('New request at ' + time);
});