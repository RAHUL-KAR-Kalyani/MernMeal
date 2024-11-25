import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {

	const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
	let navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault();  // synthetic event
		const response = await fetch("https://mernmeal-backend.onrender.com/api/createuser", {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation }),
		});
		const json = await response.json()
		console.log(json)

		if (!json.success) {
			alert("Enter valid credentials")
		}
		if (json.success) {
			localStorage.setItem("authToken",json.authToken)
			console.log(localStorage.getItem("authToken"))
			// navigate("/");
			navigate("/login");
		}
	}

	const inputChange = (event) => {
		setCredentials({ ...credentials, [event.target.name]: event.target.value })
	}

	return (
		<div className='container'>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="name" className="form-label">Name</label>
					<input type="text" className="form-control text-capitalize" name='name' value={credentials.name} onChange={inputChange} />
				</div>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">Email address</label>
					<input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={inputChange} />
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">Password</label>
					<input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={inputChange} />
				</div>
				<div className="mb-3">
					<label htmlFor="address" className="form-label">Address</label>
					<input type="text" className="form-control" id="address" name='geolocation' value={credentials.geolocation} onChange={inputChange} />
				</div>

				<button type="submit" className="m-3 btn btn-success">Submit</button>
				<Link to="/login" className='m-3 btn btn-danger '>Already a user</Link>
			</form>
		</div>
	)
}

export default Signup