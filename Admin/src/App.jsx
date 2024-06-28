
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Additems from './pages/AddItems/Additems';
import Items from './pages/Items/Items';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {


  return (
    <>
      <ToastContainer autoClose={2000} />
      <Navbar />
      <div className=" contain-container">
        <Sidebar />
        <div className="routes">
          <Routes>
            <Route path="/add" element={<Additems />} />
            <Route path="/items" element={<Items />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App
