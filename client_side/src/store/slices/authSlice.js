import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AUTH_TOKEN } from 'constants/AuthConstant';
import { json } from 'd3-fetch';
import AuthService from 'services/AuthService';
import FirebaseService from 'services/FirebaseService';

export const initialState = {
	loading: false,
	message: '',
	showMessage: false,
	redirect: '',
	token: localStorage.getItem(AUTH_TOKEN) || null
}

export const signIn = createAsyncThunk('auth/signIn', async (data, { rejectWithValue }) => {
	debugger;
	const { email, password } = data;
	try {
		const response = await AuthService.login(data); // Pass data object to login method
		console.log(response,"authSlice data");
		// return response.token;

		if (response.success) { // Assuming response contains a success property
		console.log(response,"authSlice data");
		alert(response,"fafad")
			const token = "1122" // Adjust this based on your actual response structure
			localStorage.setItem(AUTH_TOKEN, token);
			return token;
		} else {
			return rejectWithValue(response.message);
		}
	} catch (err) {
		return rejectWithValue(err.message || 'Error');
	}
});

export const signUp = createAsyncThunk('auth/signUp', async (data, { rejectWithValue }) => {
	try {
		const { email, username, password } = data;
		const response = await AuthService.register(data);
		console.log(response, "data hasdhah")

		if (!response || !response.message) {
			throw new Error('Invalid response from server');
		}
			console.log(response,"data hasdhah")
		if (response.message) {
			alert("Register successfully")
			const token = "11222";
			localStorage.setItem(AUTH_TOKEN, token);
			return token;
		} else {
			throw new Error('Registration failed');
		}
	} catch (err) {
		return rejectWithValue(err.message || 'Error');
	}
});


// export const signUp = createAsyncThunk('auth/signUp', async (data, { rejectWithValue }) => {
// 	try {
// 		// Destructure email, username, and password from data
// 		const { email, username, password } = data;

// 		// Call AuthService.register function with data
// 		const response = await AuthService.register(email, username, password);

// 		// Check if the response is not undefined
// 		if (!response) {
// 			throw new Error('Empty response received from server');
// 		}

// 		// Assuming the response doesn't contain a token, set a static token
// 		const token = "11222";

// 		// Set the token in local storage
// 		localStorage.setItem(AUTH_TOKEN, 11222);

// 		// Return the token
// 		return token;
// 	} catch (err) {
// 		// If an error occurs, reject with the error message
// 		return rejectWithValue(err.message || 'Error');
// 	}
// });





// export const signIn = createAsyncThunk('http://127.0.0.1:5000/login',async (data, { rejectWithValue }) => {
// 	const { email, password } = data
// 	try {
// 		alert(email)
// 		console.log('Email in authSlice',email)
// 		const response = await AuthService.login(email, password)
// 		console.log('Responce',response)
// 		if (response.user) {
// 			const token = response.user.refreshToken;
// 			localStorage.setItem(AUTH_TOKEN, response.user.refreshToken);
// 			return token;
// 		} else {
// 			return rejectWithValue(response.message?.replace('Firebase: ', ''));
// 		}
// 	} catch (err) {
// 		return rejectWithValue(err.message || 'Error')
// 	}
// })

// export const signUp = createAsyncThunk('auth/signUp',async (data, { rejectWithValue }) => {
// 	const { email, password } = data
// 	try {
// 		const response = await FirebaseService.signUpEmailRequest(email, password)
// 		if (response.user) {
// 			const token = response.user.refreshToken;
// 			localStorage.setItem(AUTH_TOKEN, response.user.refreshToken);
// 			return token;
// 		} else {
// 			return rejectWithValue(response.message?.replace('Firebase: ', ''));
// 		}
// 	} catch (err) {
// 		return rejectWithValue(err.message || 'Error')
// 	}
// })

export const signOut = createAsyncThunk('auth/signOut',async () => {
    const response = await FirebaseService.signOutRequest()
	localStorage.removeItem(AUTH_TOKEN);
    return response.data
})

export const signInWithGoogle = createAsyncThunk('auth/signInWithGoogle', async (_, { rejectWithValue }) => {
    const response = await FirebaseService.signInGoogleRequest()
	if (response.user) {
		const token = response.user.refreshToken;
		localStorage.setItem(AUTH_TOKEN, response.user.refreshToken);
		return token;
	} else {
		return rejectWithValue(response.message?.replace('Firebase: ', ''));
	}
})

export const signInWithFacebook = createAsyncThunk('auth/signInWithFacebook', async (_, { rejectWithValue }) => {
    const response = await FirebaseService.signInFacebookRequest()
	if (response.user) {
		const token = response.user.refreshToken;
		localStorage.setItem(AUTH_TOKEN, response.user.refreshToken);
		return token;
	} else {
		return rejectWithValue(response.message?.replace('Firebase: ', ''));
	}
})


export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		authenticated: (state, action) => {
			state.loading = false
			state.redirect = '/'
			state.token = action.payload
		},
		showAuthMessage: (state, action) => {
			state.message = action.payload
			state.showMessage = true
			state.loading = false
		},
		hideAuthMessage: (state) => {
			state.message = ''
			state.showMessage = false
		},
		signOutSuccess: (state) => {
			state.loading = false
			state.token = null
			state.redirect = '/'
		},
		showLoading: (state) => {
			state.loading = true
		},
		signInSuccess: (state, action) => {
			state.loading = false
			state.token = action.payload
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(signIn.pending, (state) => {
				state.loading = true
			})
			.addCase(signIn.fulfilled, (state, action) => {
				state.loading = false
				state.redirect = '/'
				state.token = action.payload
			})
			.addCase(signIn.rejected, (state, action) => {
				state.message = action.payload
				state.showMessage = true
				state.loading = false
			})
			.addCase(signOut.fulfilled, (state) => {
				state.loading = false
				state.token = null
				state.redirect = '/'
			})
			.addCase(signOut.rejected, (state) => {
				state.loading = false
				state.token = null
				state.redirect = '/'
			})
			.addCase(signUp.pending, (state) => {
				state.loading = true
			})
			.addCase(signUp.fulfilled, (state, action) => {
				state.loading = false
				state.redirect = '/'
				state.token = action.payload
			})
			.addCase(signUp.rejected, (state, action) => {
				state.message = action.payload
				state.showMessage = true
				state.loading = false
			})
			.addCase(signInWithGoogle.pending, (state) => {
				state.loading = true
			})
			.addCase(signInWithGoogle.fulfilled, (state, action) => {
				state.loading = false
				state.redirect = '/'
				state.token = action.payload
			})
			.addCase(signInWithGoogle.rejected, (state, action) => {
				state.message = action.payload
				state.showMessage = true
				state.loading = false
			})
			.addCase(signInWithFacebook.pending, (state) => {
				state.loading = true
			})
			.addCase(signInWithFacebook.fulfilled, (state, action) => {
				state.loading = false
				state.redirect = '/'
				state.token = action.payload
			})
			.addCase(signInWithFacebook.rejected, (state, action) => {
				state.message = action.payload
				state.showMessage = true
				state.loading = false
			})
	},
})

export const { 
	authenticated,
	showAuthMessage,
	hideAuthMessage,
	signOutSuccess,
	showLoading,
	signInSuccess
} = authSlice.actions

export default authSlice.reducer