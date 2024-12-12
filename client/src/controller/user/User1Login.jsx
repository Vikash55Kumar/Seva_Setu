import React, { useState } from 'react';
import "./auth.css";
import { useDispatch } from 'react-redux';
import { login } from '../../actions/userAction';
import { useNavigate } from 'react-router-dom';
import googleImg from "../../assets/google.png";
import { toast } from 'react-toastify';
import SpinnerLoader from '../../utility/SpinnerLoader';
import logo from "../../assets/logo.png"

export default function User1Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userOTR, setuserOTR] = useState("");
    const [number, setNumber] = useState("");
    const [loading, setLoading] = useState(false); // Loading state to manage spinner visibility

    return (
        <div className="account-set-main">
            <div className="login-container">
                {loading ? (
                    <SpinnerLoader /> // Show spinner if loading is true
                ) : (
                    <>
                        <div id="auth-account">
                            <img src={logo} className="logoDas" alt="Logo" />
                        </div>

                        <h3>OTR User Login Form</h3>


                        <form >
                            <div className="form-group-2">
                                <label htmlFor="userOTR">OTR NUMBER:</label>
                                <input
                                    type="userOTR"
                                    id="userOTR"
                                    placeholder="* Enter User OTR Number"
                                    value={userOTR}
                                    onChange={(e) => setuserOTR(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group-2">
                                <label htmlFor="number">Phone Number:</label>
                                <input
                                    type="number"
                                    id="number"
                                    placeholder="* Enter number"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group-2">
                                <button type="submit" ><a href="/formNavbar">Login</a></button>
                                {/* <a href='/formNavbar'><button  >Login</button></a> */}
                            </div>
                            <h4 class="mt-2 mb-3">Don't have an account? <a href="/formCertificate">Sign Up</a></h4>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
