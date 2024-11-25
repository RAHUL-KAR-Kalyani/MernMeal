import React, { useState } from 'react'
import { Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

function Navbar() {
    const navigate = useNavigate();
    let data = useCart();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        navigate('/login')
    }

    const [cartView, setCartView] = useState(false)

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mt-1">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                            </li>
                            {
                                (localStorage.getItem("authToken")) ?
                                    <div className='d-flex align-items-center'>
                                        {/* <li className="nav-item">
                                            <Link className="nav-link active fs-5 text-white">Welcome, Guest</Link>
                                        </li> */}
                                        <li className="nav-item">
                                            <Link className="nav-link fs-5 text-white" aria-current="page" to="/myOrder">My Orders</Link>
                                        </li>
                                    </div>
                                    : ""
                            }

                        </ul>
                        {
                            (!localStorage.getItem("authToken")) ?
                                <div className='d-flex align-items-center justify-content-evenly'>
                                    <Link type="button" className="btn bg-white text-success mx-3" to="/login">Login</Link>
                                    <Link type="button" className="btn bg-white text-success mx-3" to="/createuser">Singup</Link>
                                </div>
                                :
                                <div className='d-flex align-items-center justify-content-evenly '>
                                    <div className='btn bg-white text-success mx-3' onClick={() => { setCartView(true) }}>
                                        My Cart{" "}
                                        <Badge pill bg='danger' >{data.length === 0 ? "" : data.length}</Badge>
                                    </div>
                                    {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}

                                    <button type="button" className='btn bg-white text-danger mx-3' onClick={handleLogout}>Logout</button>
                                </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar