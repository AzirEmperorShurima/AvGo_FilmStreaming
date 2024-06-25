import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import { Link } from "react-router-dom";
import { FaSortAmountDown } from "react-icons/fa";
import { BsCaretUpSquare } from "react-icons/bs";

HEADER.propTypes = {
    user: PropTypes.object,
    Authentication: PropTypes.bool,
    Authorization: PropTypes.object // Đổi kiểu dữ liệu thành object cho Authorization
};

function HEADER({ Authorization, user, Authentication }) {
    const [barOpen, setBarOpen] = useState(false);

    const handleBarFeatureOpen = () => {
        setBarOpen(!barOpen);
        console.log("Feature bar open:", !barOpen);
    };

    console.log("Authorization:", Authorization);
    console.log("User:", user);

    const getRole = () => {
        return Authorization ? Authorization.role : null;
    };

    return (
        <header className='app-header'>
            <ul className="menu" id='menu-bar'>
                <li className="menu-tab"><a href="#" className="menu-link"> <Link to={'/'}>Home</Link></a></li>
                <li className="menu-tab"><a href="#" className="menu-link">TV Shows</a></li>
                <li className="menu-tab"><a href="#" className="menu-link">Movies</a></li>
                <li className="menu-tab"><a href="#" className="menu-link"><Link to={'/listVideo'}>List Video</Link> </a></li>
                <li className="menu-tab"><a href="#" className="menu-link">More Type</a></li>
                {Authentication && Authorization ? (
                    getRole() === 'admin' ? (
                        <div className="user-portfolio">
                            <a href="#" className="user-image"></a>
                            <p className="username">{user?.Name}</p>
                            <ul className={`feature ${barOpen ? 'open' : ''}`}>
                                <li className="features-link">Profile</li>
                                <li className="features-link">Settings</li>
                                <li className="features-link">Logout</li>
                            </ul>
                            {barOpen ? (
                                <FaSortAmountDown className='displayFeatureBar' onClick={handleBarFeatureOpen} />
                            ) : (
                                <BsCaretUpSquare className='displayFeatureBar' onClick={handleBarFeatureOpen} />
                            )}
                        </div>
                    ) : (
                        <div className="user-portfolio">
                            <a href="/" className="user-image"></a>
                            <p className="username">{user?.Name}</p>
                            <ul className={`feature ${barOpen ? 'open' : ''}`}>
                                <li className="features-link">Profile</li>
                                <li className="features-link">Settings</li>
                                <li className="features-link">Logout</li>
                            </ul>
                            {barOpen ? (
                                <FaSortAmountDown className='displayFeatureBar' onClick={handleBarFeatureOpen} />
                            ) : (
                                <BsCaretUpSquare className='displayFeatureBar' onClick={handleBarFeatureOpen} />
                            )}
                        </div>
                    )
                ) : (
                    <div className="auth-links">
                        <Link to="/Auth/login" className="auth-link-item">Login</Link>
                        {/* <Link to="/register" className="auth-link">Register</Link> */}
                        <Link to={"/Auth/Register"} className='auth-link-item' >Register</Link>


                    </div>
                )}
            </ul>

        </header>
    );
}

export default HEADER;
