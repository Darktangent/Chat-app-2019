var socket = io();
// const moment=require("moment")
function scrollToBottom(){
  //selectors
  let messages=jQuery("#messages")
  let newMessage=messages.children('li:last-child')
  //heights
  let clientHeight=messages.prop('clientHeight')
  let scrollTop=messages.prop('scrollTop')
  let scrollHeight=messages.prop("scrollHeight")
  let newMessageHeight=newMessage.innerHeight()
  let lastMessageheight=newMessage.prev().innerHeight()
  if(clientHeight+scrollTop+newMessageHeight+lastMessageheight>=scrollHeight){
    // console.log('schould scroll');
    messages.scrollTop(scrollHeight)
  }
}
//joining a room
socket.on('connect', function () {
  // console.log('Connected to server');
  let params=jQuery.deparam(window.location.search);
  socket.emit('join',params,function(err){
      if(err){
        alert(err)
        window.location.href='/';
      }else{
        console.log("No error")
      }
  })
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});
//event update user list

socket.on('updateUserList',function(users){
  console.log('Users List', users)
  let ol=jQuery('<ol></ol>')
  users.forEach(function(user){
    ol.append(jQuery('<li></li>').text(user))
  })
  jQuery("#users").html(ol)
})



//listening for newMessage
socket.on('newMessage', function (message) {
let formattedTime=moment(message.createdAt).format('h:mm a')
let template=jQuery("#message-template").html();
let html=Mustache.render(template,{
  text:message.text,
  from:message.from,
  createdAt:formattedTime

})
jQuery('#messages').append(html);
scrollToBottom()

  // console.log('newMessage', message);
  // var li = jQuery('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  //
  // jQuery('#messages').append(li);
});
//location segment
socket.on('newLocationMessage', function (message) {
  let formattedTime=moment(message.createdAt).format('h:mm a')
  let template=jQuery("#location-message-template").html()
  let html=Mustache.render(template,{
    url:message.url,
    from:message.from,
    createdAt:formattedTime
  })
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My current location</a>');
  //
  // li.text(`${message.from} ${formattedTime}: `);
  // // li.text(`${formattedTime}`);
  // a.attr('href', message.url);
  // li.append(a);
  jQuery('#messages').append(html);
  scrollToBottom()
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    // from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('')
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});
