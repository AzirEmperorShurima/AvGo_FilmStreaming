import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, AuthContext } from './Context/AuthContext';
// import Home from './components/Home';
// import ProductList from './components/ProductList';
// import ProductDetail from './components/ProductDetail';
// import Cart from './components/Cart';
// import Checkout from './components/Checkout';
import LOGIN from './components/Auth/Login';
import HEADER from './components/Header/Header';
import ProtectedRoute from './router/Private/PrivateRouter'
import FOOTER from './components/footer/footer';

import DARKLIGHTSWITCH from './components/toogleSwitch/Dark_Light_Switch';

import './reset1.css';
import LOADER from './components/loader/loader';
import HamsterLoader from './components/loader/HamsterLoader';
import VideoList from './components/Media/VideoList';
import VideoDetail from './components/Media/VideoDetail';
import SIDEBAR from './components/SideBar/SideBar';
import NotFound from './components/Error/Public/err';
import { BiAtom } from "react-icons/bi";
import './App.css';
import Page404 from './components/Error/Public/404Page';
import Footer from './components/footer/footers';
function App() {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('mode') === 'dark';
  });
  const [loading, setLoading] = useState(false);

  const handleDarkLightToogleSwitch = () => {
    const newMode = !mode;
    setMode(newMode);
    localStorage.setItem('mode', newMode ? 'dark' : 'light');
  };

  useEffect(() => {
    const a = document.getElementById('wrapper');
    if (mode) {
      a.classList.add('dark-mode');
      a.classList.remove('light-mode');
    } else {
      a.classList.add('light-mode');
      a.classList.remove('dark-mode');
    }
  }, [mode]);

  const fetchData = async () => {
    setLoading(true);
    // Giả sử việc tải dữ liệu mất 2 giây
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const videos = [
    { id: '1', title: 'Video 1', src: 'https://www.youtube.com/watch?v=KObR1fhS7nQ' },
    { id: '2', title: 'Video 2', src: 'https://phimmoiday.net/watch-muc-dich-cua-cac-co-nang/full-sv1.html' },
    { id: '3', title: 'Video 3', src: 'https://www.youtube.com/watch?v=KObR1fhS7nQ' },
    { id: '3', title: 'Video 3', src: 'https://www.youtube.com/watch?v=KObR1fhS7nQ' },
    { id: '3', title: 'Video 3', src: 'https://www.youtube.com/watch?v=KObR1fhS7nQ' },
    { id: '3', title: 'Video 3', src: 'https://www.youtube.com/watch?v=KObR1fhS7nQ' },
    { id: '3', title: 'Video 3', src: 'https://www.youtube.com/watch?v=KObR1fhS7nQ' },
    { id: '3', title: 'Video 3', src: 'https://www.youtube.com/watch?v=KObR1fhS7nQ' },
    { id: '3', title: 'Video 3', src: 'https://www.youtube.com/watch?v=KObR1fhS7nQ' },
    { id: '3', title: 'Video 3', src: 'https://www.youtube.com/watch?v=KObR1fhS7nQ' },
    { id: '3', title: 'Video 3', src: 'https://www.youtube.com/watch?v=KObR1fhS7nQ' },
    { id: '3', title: 'Video 3', src: 'https://www.youtube.com/watch?v=KObR1fhS7nQ' },
    
  ];

  return (
    <Router>
      <AuthProvider>
        <div className="App App-Container" id='wrapper'>
          <AuthContext.Consumer>
            {({ auth, logout }) => (
              <>
                <HEADER user={auth?.user} onLogout={logout} Authorization={auth?.Authorization} Authentication={true} />
                <SIDEBAR mode={mode} handleToggle={handleDarkLightToogleSwitch}></SIDEBAR>
                {/* <BiAtom className='App-logo'/> */}
                {/* <DARKLIGHTSWITCH mode={mode} onToogleDarkLight={handleDarkLightToogleSwitch} /> */}
                <div className='main-body' id='main'>
                  {loading ? (
                    <>
                      <div className="loader-container">
                        <LOADER />
                      </div>
                      <div className="hamster-loader-container">
                        <HamsterLoader />
                      </div>
                    </>
                  ) : (
                    <Routes>
                      {/* <Route path="/products" element={<ProductList />} /> */}
                      <Route exact path='/'></Route>
                      <Route path="/listVideo/:id" element={<VideoDetail videos={videos} />} />
                      <Route path="/login" element={<LOGIN />} />
                      <Route path="/listVideo" element={<VideoList videos={videos} />}></Route>
                      <Route path='*' element={<NotFound />}></Route>
                      {/* <Route path='*' element={<Page404/>}></Route> */}

                    </Routes>)
                  }

                </div>
                <Footer></Footer> 
                {/* <FOOTER /> */}

              </>
            )}

          </AuthContext.Consumer>
        </div>

      </AuthProvider></Router>
  );
}

export default App;
