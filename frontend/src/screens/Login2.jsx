import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {
	const [credentials, setCredentials] = useState({ email: "", password: "" });
	const [loading, setLoading] = useState(false);
	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission
		setLoading(true); // Start loading state		

		try {
			const response = await fetch(
				"https://mernmeal-backend.onrender.com/api/loginuser",
				{
					method: "POST",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify({
						email: credentials.email,
						password: credentials.password,
					}),
				}
			);

			const json = await response.json();
			console.log(json);

			if (!json.success) {
				alert("Invalid credentials, please try again.");
			} else {
				localStorage.setItem("userEmail", credentials.email);
				localStorage.setItem("authToken", json.authToken);
				console.log("Token:", localStorage.getItem("authToken"));

				setTimeout(() => {
					navigate("/");
				}, 500); // Small delay for smoother transition
			}
		} catch (error) {
			console.error("Error logging in:", error);
			alert("Something went wrong. Please try again.");
		} finally {
			setLoading(false); // Stop loading state
		}
	};

	const inputChange = (event) => {
		setCredentials({ ...credentials, [event.target.name]: event.target.value });
	};

	return (
		<div>
			<Navbar />
			<div className="container mt-2">
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label htmlFor="email" className="form-label">
							Email address
						</label>
						<input
							type="email"
							className="form-control"
							id="email"
							name="email"
							value={credentials.email}
							onChange={inputChange}
							required
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="password" className="form-label">
							Password
						</label>
						<input
							type="password"
							className="form-control"
							id="password"
							name="password"
							value={credentials.password}
							onChange={inputChange}
							required
						/>
					</div>

					<button type="submit" className="m-3 btn btn-success" disabled={loading}>
						{loading ? "Logging in..." : "Submit"}
					</button>
					<Link to="/createuser" className="m-3 btn btn-danger">
						I'm a new user
					</Link>
				</form>
			</div>
		</div>
	);
}

export default Login;
