import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div>
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div className="col text-center">
                    <Link to="/" className="me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"></Link>
                    <span className="mb-md-0 text-body-secondary align-content-center">© 2024 GoFood, Inc</span>
                </div>
            </footer>
        </div>
    )
}

export default Footer