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
	back.send("NET_STATUS",connected)

	client.on('error', (err) => {
		console.log(err.message)
		connected = false
		back.send("NET_STATUS",connected)
	})

	client.on('connect', () => {
		console.log(`successful connection host: ${opts['host']} port: ${opts['port']}`)
		connected = true
		back.send("NET_STATUS",connected)
	})
})

back.on("btn", (msg) => {
	console.log(msg)
	if (connected) {
		console.log("sending..")
		client.write(msg)
	}
})

