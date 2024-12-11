import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { logout } from "../../actions/userAction";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { useNavigate } from 'react-router-dom';
import SpinnerLoader from '../../utility/SpinnerLoader';

const Navbar = ({adminProfile = {}}) => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSubDropdownOpen, setIsSubDropdownOpen] = useState(false);
    const [isSubDropdownOpen2, setIsSubDropdownOpen2] = useState(false);
    
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { provider } = adminProfile || {}; 

    const { isAuthenticated } = useSelector((state) => ({
        isAuthenticated: state.admin?.isAuthenticated || state.user?.isAuthenticated,
      }));
    const [loading, setLoading] = useState(false);

    const handleLogout = async (e) => {
        e.preventDefault();

        setLoading(true);
        await dispatch(logout());
        setLoading(false);

        navigate("/")
    };

    const handleNavigation = (e, path, title, stateTitle) => {
        e.preventDefault();

        setLoading(true);  // Show spinner when a link is clicked
        setTimeout(() => {
            setLoading(false); // Hide spinner after delay
            navigate(path, {state: {title, stateTitle}} );  // Navigate to the specified path
        }, 1500);  // You can adjust the delay as needed
    };
    
    const toggleMenu = () => {
        setIsNavOpen(!isNavOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleSubDropdown = () => {
        setIsSubDropdownOpen(!isSubDropdownOpen);
    };

    const toggleSubDropdown2 = () => {
        setIsSubDropdownOpen2(!isSubDropdownOpen2);
    };

    return (
        <>
        {loading && <SpinnerLoader />}
        <div className="navbar">
            <a href="/"><img src={logo} className="logo" alt="Logo" /></a>

            <div className={`menu-toggle ${isNavOpen ? "open" : ""}`} onClick={toggleMenu}>
                <FaBars className="fa-bars" />
                <FaTimes className="fa-times" />
            </div>
            
            <div className={`nav-links ${isNavOpen ? "active" : ""}`}>
                <a href="/">Home</a>
                
                {isAuthenticated ? <a href="/profile">Profile</a> : ""}
                { provider=="Officer" ?  <a href="https://reportsemitraapp.rajasthan.gov.in/WebSrc/Reports/rpt_newemitra_app_status.jsp" target="_blank" rel="noopener noreferrer">Report</a> : ""}

                <div className={`dropdown ${isDropdownOpen ? "open" : ""}`}>
                    <a href="#!" className="dropdown-toggle" onClick={toggleDropdown}>
                        Services
                    </a>
                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            <a href="#!" className="dropdown-toggle" onClick={toggleSubDropdown}>
                                Rajasthan
                            </a>
                            {isSubDropdownOpen && (
                                <div className="dropdown-menu nested-dropdown">
                                    <a onClick={(e) => handleNavigation(e, "/certificate", "Jodhpur", "Rajasthan")}>Jodhpur</a>
                                    <a onClick={(e) => handleNavigation(e, "/certificate", "Jaipur", "Rajasthan")}>Jaipur</a>
                                    <a onClick={(e) => handleNavigation(e, "/certificate", "Kota", "Rajasthan")}>Kota</a>
                                    <a onClick={(e) => handleNavigation(e, "/certificate", "Udaipur", "Rajasthan")}>Udaipur</a>
                                </div>
                            )}

                            {/* Delhi */}
                            <a href="#!" className="dropdown-toggle" onClick={toggleSubDropdown2}>
                                Delhi
                            </a>
                            {isSubDropdownOpen2 && (
                                <div className="dropdown-menu nested-dropdown">
                                    <a onClick={(e) => handleNavigation(e, "/certificate", "North", "Delhi")}>North</a>
                                    <a onClick={(e) => handleNavigation(e, "/certificate", "North-East", "Delhi")}>North-East</a>
                                    <a onClick={(e) => handleNavigation(e, "/certificate", "South-West", "Delhi")}>South-West</a>
                                    <a onClick={(e) => handleNavigation(e, "/certificate", "West", "Delhi")}>West</a>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                
                <a href="/contact">Contact Us</a>
                <div className="user-profile">
                    <FaUserCircle style={{ fontSize: "2rem" }} />
                    <div className="dropdown-content">
                        {isAuthenticated ? (
                            <>
                                <a href="/" onClick={handleLogout}>Logout</a>
                            </>
                        ) : (
                            <>
                                <a href="/login">Employee Login</a>
                                <a href="/adminLogin">Officer Login</a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Navbar;
