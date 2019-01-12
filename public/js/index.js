//initiate request
		let socket=io();
		socket.on('connect',function(){
			console.log("connected to server")
			// socket.emit('createEmail',{
			// 	to:'jen@example.com',
			// 	text:'hey its rohan'
			// })
			socket.emit('createMessage',{
				from:'jen',
				text:"message"
			})
		})

		socket.on('disconnect',function(){
			console.log("Disconnected from server");
		})
// socket.on("newEmail",function(email){
// 	console.log("New Email",email)
// })
socket.on("newMessage",function(msg){
	console.log("Printing message",msg)
})