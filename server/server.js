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
	socket.on("disconnect",()=>{
		console.log("Client disconnected")
	})
});







server.listen(port,()=>{
	console.log(`server runnng on port ${port}`)
})
