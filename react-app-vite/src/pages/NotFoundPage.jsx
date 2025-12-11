import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Auth.css";

const NotFoundPage = () => {
    return (
        <div className="notfound-container">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <Link to="/">Go Back Home</Link>
        </div>
    );
}

export default NotFoundPage;
