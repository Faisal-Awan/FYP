import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Divider, Alert } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { GoogleSVG, FacebookSVG } from 'assets/svg/icon';
import CustomIcon from 'components/util-components/CustomIcon'
import {
	signIn,
	showLoading,
	showAuthMessage,
	hideAuthMessage,
	signInWithGoogle,
	signInWithFacebook
} from 'store/slices/authSlice';
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"

export const LoginForm = props => {

	const navigate = useNavigate();

	const {
		otherSignIn,
		showForgetPassword,
		hideAuthMessage,
		onForgetPasswordClick,
		showLoading,
		signInWithGoogle,
		signInWithFacebook,
		extra,
		signIn,
		token,
		loading,
		redirect,
		showMessage,
		message,
		allowRedirect = true
	} = props

	const initialCredential = {
		email: 'user1@themenate.net',
		password: '2005ipo'
	}

	const onLogin = values => {
		showLoading()
		signIn(values);
	};

	const onGoogleLogin = () => {
		showLoading()
		signInWithGoogle()
	}

	const onFacebookLogin = () => {
		showLoading()
		signInWithFacebook()
	}

	useEffect(() => {
		if (token !== null && allowRedirect) {
			navigate(redirect)
		}
		if (showMessage) {
			const timer = setTimeout(() => hideAuthMessage(), 3000)
			return () => {
				clearTimeout(timer);
			};
		}
	}, []);

	const renderOtherSignIn = (
		<div>
			<Divider>
				<span className="text-muted font-size-base font-weight-normal">or connect with</span>
			</Divider>
			<div className="d-flex justify-content-center">
				<Button
					onClick={() => onGoogleLogin()}
					className="mr-2"
					disabled={loading}
					icon={<CustomIcon svg={GoogleSVG} />}
				>
					Google
				</Button>
				<Button
					onClick={() => onFacebookLogin()}
					icon={<CustomIcon svg={FacebookSVG} />}
					disabled={loading}
				>
					Facebook
				</Button>
			</div>
		</div>
	)

	return (
		<>
			<motion.div
				initial={{ opacity: 0, marginBottom: 0 }}
				animate={{
					opacity: showMessage ? 1 : 0,
					marginBottom: showMessage ? 20 : 0
				}}>
				<Alert type="error" showIcon message={message}></Alert>
			</motion.div>
			<Form
				layout="vertical"
				name="login-form"
				initialValues={initialCredential}
				onFinish={onLogin}
			>
				<Form.Item
					name="email"
					label="Email"
					rules={[
						{
							required: true,
							message: 'Please input your email',
						},
						{
							type: 'email',
							message: 'Please enter a validate email!'
						}
					]}>
					<Input prefix={<MailOutlined className="text-primary" />} />
				</Form.Item>
				<Form.Item
					name="password"
					label={
						<div className={`${showForgetPassword ? 'd-flex justify-content-between w-100 align-items-center' : ''}`}>
							<span>Password</span>
							{
								showForgetPassword &&
								<span
									onClick={() => onForgetPasswordClick}
									className="cursor-pointer font-size-sm font-weight-normal text-muted"
								>
									Forget Password?
								</span>
							}
						</div>
					}
					rules={[
						{
							required: true,
							message: 'Please input your password',
						}
					]}
				>
					<Input.Password prefix={<LockOutlined className="text-primary" />} />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" block loading={loading}>
						Sign In
					</Button>
				</Form.Item>
				{
					otherSignIn ? renderOtherSignIn : null
				}
				{extra}
			</Form>
		</>
	)
}

LoginForm.propTypes = {
	otherSignIn: PropTypes.bool,
	showForgetPassword: PropTypes.bool,
	extra: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
};

LoginForm.defaultProps = {
	otherSignIn: true,
	showForgetPassword: false
};

const mapStateToProps = ({ auth }) => {
	const { loading, message, showMessage, token, redirect } = auth;
	return { loading, message, showMessage, token, redirect }
}

const mapDispatchToProps = {
	signIn,
	showAuthMessage,
	showLoading,
	hideAuthMessage,
	signInWithGoogle,
	signInWithFacebook
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)






























// import React, { useContext, useState } from 'react';
// import { LockOutlined, UserOutlined } from '@ant-design/icons';
// import { Button, Checkbox, Form, Input, message } from 'antd';
// import { PiStudentDuotone } from "react-icons/pi";
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// // import { GoogleLogin } from '@react-oauth/google';
// // import FacebookLogin from 'react-facebook-login';
// // import jwt_decode from 'jwt-decode';
// // import { login } from '../components/store/feature/Auth';
// // import { useDispatch } from 'react-redux';
// import { API_BASE_URL } from '../../../constants/ApiConstant';
// // import ProfilePage from '../../app-views/components/other/Profile';


// const LoginForm = () => {

// 	// const [ setUserDataL ] = useContext();



// 	const [login, setLogin] = useState(false);
// 	const [userId, setUserId] = useState(null);
// 	const [userData, setUserData] = useState({});
// 	const [data, setData] = useState({});
// 	const [picture, setPicture] = useState('');

// 	const navigate = useNavigate();

// 	const [form] = Form.useForm();

// 	const responseFacebook = (response) => {
// 		debugger
// 		if (response) {
// 			console.log(response);
// 			setData(response);
// 			if (response.picture && response.picture.data && response.picture.data.url) {
// 				setPicture(response.picture.data.url);
// 			}
// 			if (response.accessToken) {
// 				const accessToken = response.accessToken;
// 				// Do something with the access token, such as storing it in state or sending it to your server.
// 				console.log("Access token:", accessToken);
// 				setLogin(true);
// 				message.success(`Login successful with your Facebook account: ${response.email}`);


// 				// Redirect to '/sidenav' after successful login
// 				navigate('/sidenav');
// 			} else {
// 				setLogin(false);
// 			}
// 		} else {
// 			console.error("Empty response received from Facebook.");
// 			// Handle the error, such as displaying a message to the user or retrying the login process.
// 		}
// 	}

// 	const handleGoogleSignInSuccess = (response) => {
// 		debugger
// 		if (response && response.credential) {
// 			const idTokenPayload = parseJwt(response.credential);
// 			if (idTokenPayload && idTokenPayload.email) {
// 				console.log('Google sign-in successful:', response);
// 				message.success(`Login successful with your Google account: ${idTokenPayload.email}`);
// 				navigate('/sidenav');
// 			} else {
// 				console.error('Failed to retrieve email from Google sign-in response:', response);
// 				message.error('Failed to retrieve email from Google sign-in response. Please try again or use a different method to log in.');
// 			}
// 		} else {
// 			console.error('Google sign-in response does not contain credential:', response);
// 			message.error('Failed to retrieve credential from Google sign-in response. Please try again or use a different method to log in.');
// 		}
// 	};
// 	const parseJwt = (token) => {
// 		try {
// 			const base64Url = token.split('.')[1];
// 			const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
// 			const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
// 			return JSON.parse(jsonPayload);
// 		} catch (error) {
// 			console.error('Error parsing JWT token:', error);
// 			return null;
// 		}
// 	};
// 	const handleGoogleSignInFailure = (error) => {
// 		console.error('Google sign-in failed:', error);
// 	};


// 	// const navigateToProfile = (userData) => {
// 	// 	navigate('/profile', { state: { userData } });
// 	// };
// 	const onFinish = async (values) => {
// 		debugger
// 		try {

// 			const response = await axios.post(`${API_BASE_URL}login`, values);
// 			console.log("ahdhkfhkajdhfka", response.status)
// 			if (response.status === 200) {

// 				const userData = response.data;
// 				// setUserData(userData); 
// 				// setUserId(userData.id); 
// 				const userId = userData.id;
// 				sessionStorage.setItem('userData', JSON.stringify(userData));

// 				message.success('Login successful!');
// 				navigate('/sidenav');
// 			} else {
// 				message.error('User does not exist.');
// 			}
// 		} catch (error) {
// 			console.error('Login failed:', error.response?.data || error.message);
// 			message.error('User not Exist.');
// 		}
// 	};

// 	return (
// 		<>
// 			<div className="login-container">
// 				<Form
// 					form={form}
// 					name="normal_login"
// 					className="login-form"
// 					initialValues={{
// 						remember: true,
// 					}}
// 					onFinish={onFinish}
// 				>
// 					<Form.Item>
// 						<PiStudentDuotone className="icon" style={{ fontSize: '48px' }} />
// 					</Form.Item>
// 					<Form.Item
// 						name="email"
// 						rules={[
// 							{
// 								required: true,
// 								message: 'Please input your Username!',
// 							},
// 						]}
// 					>
// 						<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
// 					</Form.Item>
// 					<Form.Item
// 						name="password"
// 						rules={[
// 							{
// 								required: true,
// 								message: 'Please input your Password!',
// 							},
// 						]}
// 					>
// 						<Input
// 							prefix={<LockOutlined className="site-form-item-icon" />}
// 							type="password"
// 							placeholder="Password"
// 						/>
// 					</Form.Item>
// 					<Form.Item>
// 						<Form.Item name="remember" valuePropName="checked" noStyle>
// 							<Checkbox>Remember me</Checkbox>
// 						</Form.Item>
// 						<Link className="login-form-forgot" to="/forgotPassword">
// 							Forgot password ?
// 						</Link>
// 					</Form.Item>
// 					<Form.Item>
// 						<Button className="login-form-button" type="primary" htmlType="submit">
// 							Log in
// 						</Button>
// 					</Form.Item>
// 					<Form.Item>
// 						Don't have an account yet? {' '}
// 						<Link to="/login2">Sign Up</Link>
// 					</Form.Item>
// 					{/* <Form.Item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

// 						<GoogleLogin
// 							clientId="26121329412-p55g1a7o7su76bdhu29a8uq7a0fgminh.apps.googleusercontent.com"
// 							buttonText="Sign in with Google"
// 							onSuccess={handleGoogleSignInSuccess}
// 							onFailure={handleGoogleSignInFailure}
// 							cookiePolicy={'single_host_origin'}
// 						/>
// 					</Form.Item> */}
// 					<Form.Item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
// 						{/* <div>
// 							{!login ? (
// 								<FacebookLogin
// 									appId="708761370314324"
// 									// appId="1110520183471339"
// 									autoLoad={false}
// 									fields="name,email,picture"
// 									callback={responseFacebook}
// 									textButton="Login with Facebook"
// 									version="12.0"
// 									buttonStyle={{ width: '200px', height: '40px', background: 'rgb(77 122 215)', color: '#fff', border: 'none', fontSize: '12px', padding: '0' }}
// 								/>
// 							) : (
// 								<div>
// 									<h2>Welcome, {userData.name}!</h2>
// 									<p>Email: {userData.email}</p>
// 									<img src={userData.picture} alt="Profile" />
// 								</div>
// 							)}
// 						</div> */}
// 						{/* <ProfilePage userId={userId} userData={userData} /> */}


// 					</Form.Item>

// 					{/* <ProfilePage userData={userData} /> */}
// 				</Form>
// 			</div>
// 		</>
// 	);
// };

// export default LoginForm;

















