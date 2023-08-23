const back = require('androidjs').back;
const net = require('net');

const opts = {
	port: 8001,
	host: '192.168.1.41'
}

let connected = false
let client = null


back.on("btn", (msg) => {
	console.log(msg)
	
	if (msg == "CONNECT"){
		client = net.createConnection(opts)
		console.log("connect_signal")
	
		client.on('error', (err) => {
			console.log(err.message)
		})
	
		client.on('connect', () => {
			console.log(`successful connection host: ${opts['host']} port: ${opts['port']}`)
			connected = true
		})
	}
	else if (connected) {
		console.log("sending..")
		client.write(msg)
	}
})

