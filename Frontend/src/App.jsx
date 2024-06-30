import { Route, Routes } from 'react-router-dom';
import './App.css';


import Home from './components/pages/Home/Home';
import Cart from './components/pages/Cart/Cart';
import PlaceOrder from './components/pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import { useState } from 'react';

import Login from "./components/Login/Login"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './components/pages/Verify/Verify';

// import PlaceOrder from './pages/PlaceOrder/PlaceOrder';

function App() {
  const [loginBtn, setLoginBtn] = useState(false)

  return (
    <>

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"

      />
      {loginBtn && <Login setLoginBtn={setLoginBtn} loginBtn={loginBtn} />}
      <Navbar setLoginBtn={setLoginBtn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/verify" element={<Verify />} />

      </Routes>
      <Footer />
    </>
  );
}

export default App;
