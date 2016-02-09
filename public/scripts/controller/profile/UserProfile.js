//currently if you open localhost:4000/open/chat , the chat client will get connected with chat server and it will work.

// but now i am converting this into angular js, earlier i was using  j query....
// currently it is not working as there is jquery/javascript code in the html file. BUt it will not work now,
// because now i am using angular routes, where i define the controllers, 
//so now all the jquery /javascript code now to be rewrite incontroller or u can say in angular way



loginApp.controller('UserProfileController', function($scope , socket) {

	$scope.load = function() { 
		document.getElementById("demo").innerHTML = "Hello JavaScript!";
	};
    // create a message to display in our view
    $scope.messageUser = 'User Profile!!';


    // ************ Angular Main Code for socket **************** 

	$scope.addName = function(){
		socket.emit('add name', $scope.username);
	}




// ************ Copied code for socket NOT WORKING **************** 
  // Socket listeners
  // ================

  socket.on('init', function (data) {
  	$scope.name = data.name;
  	$scope.users = data.users;
  });

  socket.on('send:message', function (message) {
  	$scope.messages.push(message);
  });

  socket.on('change:name', function (data) {
  	changeName(data.oldName, data.newName);
  });

  socket.on('user:join', function (data) {
  	$scope.messages.push({
  		user: 'chatroom',
  		text: 'User ' + data.name + ' has joined.'
  	});
  	$scope.users.push(data.name);
  });

  // add a message to the conversation when a user disconnects or leaves the room
  socket.on('user:left', function (data) {
  	$scope.messages.push({
  		user: 'chatroom',
  		text: 'User ' + data.name + ' has left.'
  	});
  	var i, user;
  	for (i = 0; i < $scope.users.length; i++) {
  		user = $scope.users[i];
  		if (user === data.name) {
  			$scope.users.splice(i, 1);
  			break;
  		}
  	}
  });

  // Private helpers
  // ===============

  var changeName = function (oldName, newName) {
    // rename user in list of users
    var i;
    for (i = 0; i < $scope.users.length; i++) {
    	if ($scope.users[i] === oldName) {
    		$scope.users[i] = newName;
    	}
    }

    $scope.messages.push({
    	user: 'chatroom',
    	text: 'User ' + oldName + ' is now known as ' + newName + '.'
    });
}

  // Methods published to the scope
  // ==============================

  $scope.changeName = function () {
  	socket.emit('change:name', {
  		name: $scope.newName
  	}, function (result) {
  		if (!result) {
  			alert('There was an error changing your name');
  		} else {

  			changeName($scope.name, $scope.newName);

  			$scope.name = $scope.newName;
  			$scope.newName = '';
  		}
  	});
  };

  $scope.sendMessage = function () {
  	socket.emit('send:message', {
  		message: $scope.message
  	});

    // add the message to our model locally
    $scope.messages.push({
    	user: $scope.name,
    	text: $scope.message
    });

    // clear message box
    $scope.message = '';
};

});