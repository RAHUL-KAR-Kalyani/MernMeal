import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Signup = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
    const [loading, setLoading] = useState(false); // 🔥 **Loader State**
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();  
        setLoading(true); // **🔄 Show Loader**

        try {
            const response = await fetch("https://mernmeal-backend.onrender.com/api/createuser", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    location: credentials.geolocation
                }),
            });

            const json = await response.json();
            console.log(json);

            if (!json.success) {
                alert("Enter valid credentials");
                setLoading(false); // **Stop loader on error**
                return;
            }

            // 🔥 **Parallel Execution for Fast Signup**
            setTimeout(() => {
                localStorage.setItem("authToken", json.authToken);
                console.log("Token Set:", localStorage.getItem("authToken"));
            }, 0); // **Jaldi execute hoga**  

            navigate("/login"); // **🔥 Fast Navigation**  
        } catch (error) {
            console.error("Signup Error:", error);
            alert("Something went wrong! Try again.");
        } finally {
            setLoading(false); // **Stop Loader After API Call**
        }
    };

    const inputChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    return (
        <div>
            <Navbar />
            <div className='container mt-2'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control text-capitalize" name='name' value={credentials.name} onChange={inputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={inputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={inputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" id="address" name='geolocation' value={credentials.geolocation} onChange={inputChange} required />
                    </div>

                    <button type="submit" className="m-3 btn btn-success">
                        {loading ? "Signing Up..." : "Submit"} {/* 🔄 Loader Indicator */}
                    </button>
                    <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
                </form>
            </div>
        </div>
    );
};

export default Signup;
