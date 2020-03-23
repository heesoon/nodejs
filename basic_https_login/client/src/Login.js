import React, {useState} from 'react';
import axios from 'axios';
import {setUserSession} from './utils/Common';

function Login(props){
	const username = useFormInput('');
	const password = useFormInput('');
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);


	const handleLogin = () => {
		setError(null);
		setLoading(true);
		axios.post('http://192.168.0.12:8000/users/signin', {username : username.value, password : password.value}).then(response => {
		//axios.post('http://localhost:8000/users/signin', {username : username.value, password : password.value}).then(response => {
			setLoading(false);
			setUserSession(response.data.token, response.data.user);
			props.history.push('/dashboard');
		}).catch(error => {
			setLoading(false);
			if(error.response.status === 401) setError(error.response.data.message);
			else setError("something went wrong. please try again later.");
		});
	}

	return(
		<div>
			Login<br /><br />
			<div>
				Username<br />
				<input type="text" {...username} autoComplete="new-password" />
			</div>
			<div style={{marginTop : 10}}>
				Password<br />
				<input type ="password" {...password} autoComplete="new-password" />
			</div>
			{error && <><small style={{color: 'red'}}>{error}</small><br /></>}<br />
			<input type="button" value={loading ? 'loading ...' : 'login'} onClick={handleLogin} disable={loading} /><br />
		</div>
	)
}

const useFormInput = initialValue => {
	const [value, setValue] = useState(initialValue);
	
	const handleChange = e => {
		setValue(e.target.value);
	}

	return {
		value,
		onChange : handleChange
	}
}

export default Login;
