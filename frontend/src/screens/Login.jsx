import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Login() {
	const [credentials, setCredentials] = useState({ email: "", password: "" })
	let navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault();  // synthetic event
		const response = await fetch("https://mernmeal-backend.onrender.com/api/loginuser", {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({ email: credentials.email, password: credentials.password }),
		});
		const json = await response.json()
		console.log(json)

		if (!json.success) {
			alert("Enter valid credentials")
		}
		if (json.success) {
			localStorage.setItem("userEmail",credentials.email)
			localStorage.setItem("authToken",json.authToken)
			console.log(localStorage.getItem("authToken"))
			console.log(credentials.email,"check for email display or not")
			navigate("/");
		}
	}

	const inputChange = (event) => {
		setCredentials({ ...credentials, [event.target.name]: event.target.value })
	}
	return (
		<div className='container'>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">Email address</label>
					<input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={inputChange} />
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">Password</label>
					<input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={inputChange} />
				</div>

				<button type="submit" className="m-3 btn btn-success">Submit</button>
				<Link to="/createuser" className='m-3 btn btn-danger '>I'm a new user</Link>
			</form>
		</div>
	)
}

export default Login