// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();
// export const FakeAuthContext = React.createContext({
//     auth: {
//         user: {
//             Name: 'Nguyen Van A',
//             // Các thuộc tính khác của user
//         },
//         Authorization: {
//             role: 'admin',
//             // Các thuộc tính khác liên quan đến quyền hạn
//         }
//     },
//     logout: () => console.log('Logged out')
// });
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const token = Cookies.get('token');
        return token ? { token } : null;
    });

    const navigate = useNavigate();
    const handleLogin = async () => {
        // Gọi function login từ AuthContext
        await AuthContext.login("username", "password");
    };
    const login = (token) => {
        Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Strict' });
        setAuth({ token });
        navigate('/');
    };

    const logout = () => {
        Cookies.remove('token'); // Xóa cookie token
        setAuth(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
// src / context / AuthContext.js


// context để test
// import React, { createContext, useState } from 'react';

// export const AuthContext = createContext({
//     auth: {
//         user: {
//             Name: 'Nguyen Van A',
//             // Các thuộc tính khác của user
//         },
//         Authorization: {
//             role: 'admin',
//             // Các thuộc tính khác liên quan đến quyền hạn
//         }
//     },
//     login: () => { },
//     logout: () => { }
// });

// export const AuthProvider = ({ children }) => {
//     const [auth, setAuth] = useState({
//         user: {
//             Name: 'Nguyen Van A',
//             // Các thuộc tính khác của user
//         },
//         Authorization: {
//             role: 'admin',
//             // Các thuộc tính khác liên quan đến quyền hạn
//         }
//     });

//     const login = (user, authorization) => {
//         setAuth({ user, authorization });
//     };

//     const logout = () => {
//         setAuth(null);
//     };

//     return (
//         <AuthContext.Provider value={{ auth, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
