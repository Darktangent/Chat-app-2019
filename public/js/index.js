//initiate request
		let socket=io();
		socket.on('connect',function(){
			console.log("connected to server")
		
			
			// socket.emit('createMessage',{
			// 	from:'jen',
			// 	text:"message"
			// })
		})

		socket.on('disconnect',function(){
			console.log("Disconnected from server");
		})
// socket.on("newEmail",function(email){
// 	console.log("New Email",email)
// })
socket.on("newMessage",function(msg){
	// console.log("Printing message",msg)
	var li=jQuery('<li></li>')
	li.text(`${msg.from}:${msg.text}`)
	jQuery('#messages').append(li)
})
// socket.emit("createMessage",{
// 	from:"Frank",
// 	text:"Hi"
// },function(data){
// 	console.log('Got it',data)
// })
socket.on("newLocationMessage",function(message)
{
	let li=jQuery('<l1></li>');
	let a=jQuery('<a target="_blank"> Current Location</a>'
		)
	li.text(`${message.from}:`);
	a.attr('href',message.url)
	li.append(a);
	jQuery('#messages').append(li)

}
	)
jQuery('#message-form').on('submit',function(e){
	e.preventDefault();
	socket.emit('createMessage',{
		from:'user',
		text:jQuery("[name=message]").val()
	},function(){

	})
})

let locationButton=jQuery("#send-location");
locationButton.on('click',function(){
	if(!navigator.geolocation){
		return alert("Geolocation not supported by your browser")
	}

	navigator.geolocation.getCurrentPosition
	(function(position){
		socket.emit('createLocationMessage',{
			latitude:position.coords.latitude,
			longitude:position.coords.longitude
		})
	},function(){
		alert('Unable to fetch location')
	})
})