const path=require('path');
const http=require("http");
const publicPath=path.join(__dirname, '../public');
const express=require('express');
const socketIO=require("socket.io")


const {generateMessage,generateLocationMessage}=require('./utils/message')
const {isRealString}=require("./utils/validation")
const {Users}=require('./utils/users');



const port=process.env.PORT ||3000;
console.log(publicPath)
const app=express()
const server=http.createServer(app)
app.use(express.static(publicPath))

let io=socketIO(server);

let users=new Users()

io.on('connection',(socket)=>{
	console.log("new user connected")


	//join event listener
socket.on('join',(params,callback)=>{
if(!isRealString(params.name) || !isRealString(params.room)){
	return callback("Name and room name required")
}
socket.join(params.room);
users.removeUser(socket.id)
users.addUser(socket.id,params.name,params.room)

io.to(params.room).emit('updateUserList',users.getUserList(params.room))

//send a message to user when they join
socket.emit('newMessage',generateMessage("Admin","Welcome to the chat app"))
//let every other user know that a new user joined
socket.broadcast.to(params.room).emit('newMessage',generateMessage("Admin",`${params.name} has joined the room`))
callback()
})

	//createmessage event listener
	socket.on("createMessage",(message,callback)=>{
		console.log("Incoming Message",message)
		let user=users.getUser(socket.id);
		if(user && isRealString(message.text)){
			io.to(user.room).emit('newMessage',generateMessage(user.name,message.text))
		}

		callback('This is from the server');
		})
	socket.on('createLocationMessage',(coords)=>{
		let user=users.getUser(socket.id)
		if(user){
			io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude))
		}

	})

	socket.on("disconnect",()=>{
		console.log("Client disconnected")
		let user=users.removeUser(socket.id);
		if(user){
			io.to(user.room).emit('updateUserList',users.getUserList(user.room))
			io.to(user.room).emit('newMessage',generateMessage('admin',`${user.name} has left`))
		}
	})
});







server.listen(port,()=>{
	console.log(`server runnng on port ${port}`)
})
