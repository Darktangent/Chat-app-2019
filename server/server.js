const path=require('path');
const http=require("http");
const publicPath=path.join(__dirname, '../public');
const express=require('express');
const socketIO=require("socket.io")

const port=process.env.PORT ||3000;
console.log(publicPath)
const app=express()
const server=http.createServer(app)
app.use(express.static(publicPath))

let io=socketIO(server);
io.on('connection',(socket)=>{
	console.log("new user connected")
	// socket.emit('newEmail',{
	// 	from:'mike@example.com',
	// 	text:'Hey,Whats up',
	// 	createdAt:123
	// });
	socket.emit('newMessage',{
		from:"rohan",
		text:"hey you there?",
		createdAt:123
	})
	socket.on("createMessage",(newMessage)=>{
		console.log("Incoming Message",newMessage)
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
