
var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
				when('/', {
                    templateUrl: 'view/default.html',
                    controller: 'defaultController',
					title : 'CabAxe - designing phase'
                }).
                when('/login', {
                    templateUrl: 'view/login.html',
                    controller: 'loginController',
					title : 'CabAxe - login to cabaxe'
                }).
                when('/signup', {
                    templateUrl: 'view/signup.html',
                    controller: 'SignupController',
					title : 'CabAxe - signup wit cabaxe'
                }).
				when('/offer', {
                    templateUrl: 'view/offer.html',
                    controller: 'offerController',
					title : 'CabAxe - Osser a ride'
                }).
				when('/users', {
                    templateUrl: 'view/users.html',
                    controller: 'usersController',
					title : 'CabAxe - look for cotravelers'
                }).
				when('/howItWorks', {
                    templateUrl: 'view/howItWorks.html',
                    controller: 'howController',
					title : 'CabAxe - How it works?'
                }).
				when('/dashboard', {
                    templateUrl: 'view/dashboard.html',
                    controller: 'dashboardController',
					title : 'CabAxe - dashboard'
                }).
				when('/search', {
                    templateUrl: 'view/search.html',
                    controller: 'searchController',
					title : 'CabAxe - Search for rides'
                }).
				when('/ride/:rideid', {
					templateUrl: 'view/ride.html',
					controller: 'rideCtrl',
					title : 'CabAxe - View Ride'
				  }).
                otherwise({
                    redirectTo: '/'
                });
        }]);
		
app.run(['$rootScope', '$route', function($rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function(newVal, oldVal) {
        if (oldVal !== newVal) {
            document.title = $route.current.title;
        }
    });
}]);		

app.controller('defaultController', function($scope) {
     
    $scope.message = 'This is Add new order screen';
	
     
});

app.controller('rideCtrl', function($scope) {
     
    $scope.message = 'This is Add new order screen';
	
     
});

app.controller('searchController', function($scope) {
     
    $scope.message = 'This is Add new order screen';
	
     
});
		
app.controller('loginController', function($scope) {
     
    $scope.message = 'This is Add new order screen';
     
});
 
 
app.controller('SignupController',function($scope, $http,transformRequestAsFormPost) {
 	$scope.formData = {};
    $scope.message = 'This is Show orders screen';
	Object.toparams = function ObjecttoParams(obj) {
var p = [];
for (var key in obj) {
p.push(key + '=' + obj[key]);
}
return p.join('&');
};
	//console.log($.param($scope.userForm));
	$scope.submitForm = function(isValid) {
	console.log($($scope.userForm).serialize());
    // check to make sure the form is completely valid
    if (isValid) {
		 
		
      $http({
	  method  : 'POST',
	  url     : 'process.php',
	  data : $.param($scope.formData),
	 // data : Object.toparams($scope.userForm),
	  //transformRequest: transformRequestAsFormPost,
	  //data    : { name:$scope.userForm.name.$viewValue, email:$scope.userForm.email.$viewValue, password: $scope.userForm.password.$viewValue },  // pass in data as strings
	  //data    : { name:$scope.name, email:$scope.email, password: $scope.password },
	  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
	 })
	  .success(function(data) {
		console.log(data);
	
		if (!data.success) {
		  // if not successful, bind errors to error variables
		  $scope.errorName = data.errors.name;
		  $scope.errorEmail= data.errors.email;
		  $scope.errorPassword= data.errors.password;
		} else {
		  // if successful, bind success message to message
		  $scope.message = data.message;
		}
	  });
    }

  };
 
});	

app.controller('howController', function($scope) {
     
    $scope.message = 'This is Add new order screen';
     
});

app.controller('dashboardController', function($scope) {
 
    $scope.message = 'This is Show orders screen';
 
});	

app.controller('offerController', function($scope) {
    $scope.from = "";
    $scope.to = "";
	$scope.fromon = "";
	$scope.fromHr = "00";
	$scope.fromMin = "00";
	$scope.fromfull = function() {
        return $scope.fromon+", "+ $scope.fromHr+":"+$scope.fromMin+" Hrs";
    }
	$scope.majorcities = "";
	$scope.returnon = "";
	$scope.returnHr = "00";
	$scope.returnMin = "00";
	$scope.returnfull = function() {
        return $scope.returnon+", "+ $scope.returnHr+":"+$scope.returnMin+" Hrs";
    }
});
app.controller('usersController', function($scope, $http) {
    $http.get("http://api.randomuser.me/?results=18")
    .success(function(response) {$scope.names = response.results;});
});
app.filter('makeRange', function() {
        return function(input) {
            var lowBound, highBound;
            switch (input.length) {
            case 1:
                lowBound = 0;
                highBound = parseInt(input[0]) - 1;
                break;
            case 2:
                lowBound = parseInt(input[0]);
                highBound = parseInt(input[1]);
                break;
            default:
                return input;
            }
            var result = [];
            for (var i = lowBound; i <= highBound; i++)
			{
				if ( i < 10 ) {
						i = "0" + i;
					}
                result.push(i);
			}
            return result;
        };
    });
app.filter('capitalize', function() {
  return function(input, scope) {
    if (input!=null)
    input = input.toLowerCase();
    return input.substring(0,1).toUpperCase()+input.substring(1);
  }
});
 app.factory(
"transformRequestAsFormPost",
function() {
// I prepare the request data for the form post.
function transformRequest( data, getHeaders ) {
var headers = getHeaders();
headers[ "Content-type" ] = "application/x-www-form-urlencoded; charset=utf-8";
return( serializeData( data ) );
}
// Return the factory value.
return( transformRequest );
// ---
// PRVIATE METHODS.
// ---
// I serialize the given Object into a key-value pair string. This
// method expects an object and will default to the toString() method.
// --
// NOTE: This is an atered version of the jQuery.param() method which
// will serialize a data collection for Form posting.
// --
// https://github.com/jquery/jquery/blob/master/src/serialize.js#L45
function serializeData( data ) {
// If this is not an object, defer to native stringification.
if ( ! angular.isObject( data ) ) {
return( ( data == null ) ? "" : data.toString() );
}
var buffer = [];
// Serialize each key in the object.
for ( var name in data ) {
if ( ! data.hasOwnProperty( name ) ) {
continue;
}
var value = data[ name ];
buffer.push(
encodeURIComponent( name ) +
"=" +
encodeURIComponent( ( value == null ) ? "" : value )
);
}
// Serialize the buffer and clean it up for transportation.
var source = buffer
.join( "&" )
.replace( /%20/g, "+" )
;
return( source );
}
}
); 
