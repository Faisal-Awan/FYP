import fetch from 'auth/FetchInterceptor'

const AuthService = {}
debugger
AuthService.login = function (data) {
	
	debugger;
	console.log('AuthService', data);

	return fetch({
		url: 'http://127.0.0.1:5000/login',
		method: 'post',
		headers: {
			'Content-Type': 'application/json' // Add Content-Type header
		},
		data: JSON.stringify(data) // Convert data to JSON string
	})
}

AuthService.register = function (data) {
	debugger;
	return fetch({
		url: 'http://127.0.0.1:5000/register',
		method: 'post',
		headers: {
			'Content-Type': 'application/json' // Add Content-Type header
		},
		data: JSON.stringify(data) // Convert data to JSON string
	})
}

export default AuthService;












// import fetch from 'auth/FetchInterceptor'

// const AuthService = {}

// AuthService.login = function (data) {
// 	console.log('AuthService',data );
	
// 	return fetch({
// 		url: 'http://127.0.0.1:5000/login',
// 		method: 'post',
// 		data: data
// 	})
// }

// AuthService.register = function (data) {
// 	return fetch({
// 		url: '/register',
// 		method: 'post',
// 		data: data
// 	})
// }

// export default AuthService;