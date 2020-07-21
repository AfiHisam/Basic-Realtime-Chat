const socket = io();

$('#send-username').submit(function(e){
	e.preventDefault();

	socket.emit('new user', $('#username').val(), (callback) => {

		// console.log(callback);

		if(callback){
			$('#username-div').hide();
			$('#message-div').show();
		}else{
			$('#username-error').html('Username already exist, please try other username');
		}

	});
	$('#username').val('');

});


$('#send-message').submit(function(e){
	e.preventDefault();
	// console.log(message.val());
	socket.emit('send message', $('#message').val());
	$('#message').val('');
});


socket.on('receive message', (text) => {

	$('#chatbox').append("<div class='msgln'><b>"+text.name+"</b> :"+text.msg+"<div>");

});





socket.on('userlists', (text) => {

	var listuser = '';

	for(i=0; i < text.length; i++){

		listuser += "<i>"+text[i]+" </i><br/>";

	}
	$('#userlist').html(listuser);
	
});



