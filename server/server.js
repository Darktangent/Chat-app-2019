const path=require('path');
const http=require("http");
const publicPath=path.join(__dirname, '../public');
const express=require('express');
const socketIO=require("socket.io")
const {generateMessage,generateLocationMessage}=require('./utils/message')

const port=process.env.PORT ||3000;
console.log(publicPath)
const app=express()
const server=http.createServer(app)
app.use(express.static(publicPath))

let io=socketIO(server);
io.on('connection',(socket)=>{
	console.log("new user connected")

	//send a message to user when they join
	socket.emit('newMessage',generateMessage("Admin","Welcome to the chat app"))
	//let every other user know that a new user joined
	socket.broadcast.emit('newMessage',generateMessage("Admin","New user joined the room"))
	socket.on("createMessage",(message,callback)=>{
		console.log("Incoming Message",message)
		io.emit('newMessage',generateMessage(message.from,message.text))
		callback('This is from the server');
		// socket.broadcast.emit('newMessage',{
		// 	from:newMessage.from,
		// 	text:newMessage.text,
		// 	createdAt: new Date().getTime()
		// })
	})
	socket.on('createLocationMessage',(coords)=>{
		io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude))
	})
	// socket.on('createEmail',(newEmail)=>{
	// 	console.log('createEmail',newEmail)
	// })
	socket.on("disconnect",()=>{
		console.log("Client disconnected")
	})
});







server.listen(port,()=>{
	console.log(`server runnng on port ${port}`)
})
