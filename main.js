const back = require('androidjs').back;
const net = require('net');

let opts = {
	port: 8001,
	host: 'localhost'
}

let connected = false
let client = null
back.on("IP",(msg) =>{
	opts.host = msg
	client = net.createConnection(opts)
	console.log("connect_signal")

	client.on('error', (err) => {
		console.log(err.message)
	})

	client.on('connect', () => {
		console.log(`successful connection host: ${opts['host']} port: ${opts['port']}`)
		connected = true
	})
})

back.on("btn", (msg) => {
	console.log(msg)
	if (connected) {
		console.log("sending..")
		client.write(msg)
	}
})

