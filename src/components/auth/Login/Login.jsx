import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'; // Import the custom CSS for background image

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:9090/api/login', { email, password });
            const userData = response.data;
            console.log(userData);

            if (userData && userData.roles) {
                localStorage.setItem('user', JSON.stringify(userData));

                const roles = userData.roles.map(role => role.authority);
                if (roles.includes('DOCTOR')) {
                    navigate('/doctor-dashboard');
                } else if (roles.includes('PATIENT')) {
                    navigate('/patient-dashboard');
                } else if (roles.includes('ADMIN')) {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/');
                }
            } else {
                console.error('Roles are missing from the response');
                alert('Login failed. Roles are missing.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="login-page">
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card p-5 shadow-lg"> {/* Navy Blue Color */}
                    <h3 className="text-white text-center mb-4">Login</h3> {/* White Text */}
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label text-navy">Email</label> {/* White Text */}
                            <input 
                                type="email" 
                                className="form-control" 
                                id="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label text-navy">Password</label> {/* White Text */}
                            <input 
                                type="password" 
                                className="form-control" 
                                id="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-light w-50">Login</button> {/* Light Button */}
                        </div>
                    </form>
                    <div className="text-center mt-3">
                        <p className="text-white">
                            Don't have an account? <a href="/signup" className="text-light">Sign Up</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
