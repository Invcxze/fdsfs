import './App.css';
import Navigaton from "./components/Navigation/Navigaton";
import {useState} from "react";
import {NavLink, Route, Routes} from "react-router-dom";
import Products from "./components/Products/Products";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";
import Orders from "./components/Orders/Orders";
import Cart from "./components/Cart/Cart";



function App() {
  const [title, setTitle] = useState("");
  const [token, setToken] = useState(null);

  return (
      <div className="container py-3">
        <header>
          <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
            <NavLink to="/" className="d-flex align-items-center text-dark text-decoration-none">
              <span className="fs-4">«Just buy»</span>
            </NavLink>

            <Navigaton token={token} setToken={setToken}></Navigaton>
          </div>

          <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
            <h1 className="display-4 fw-normal">{title}</h1>
          </div>
        </header>
        <Routes>
            <Route path='/' element={<Products setTitle={setTitle} token={token}/>}/>
            <Route path='/registration' element={<Registration setTitle={setTitle}/>}/>
            <Route path='/login' element={<Login setToken={setToken} setTitle={setTitle}/>}/>
            <Route path='/orders' element={<Orders setTitle={setTitle} token={token}/>}/>
            <Route path='/cart' element={<Cart setTitle={setTitle} token={token}/>}/>
        </Routes>

          <footer className="pt-4 my-md-5 pt-md-5 border-top">
              <div className="row">
                  <div className="col-12 col-md">
                      <small className="d-block mb-3 text-muted">&copy; 2017–2021</small>
                  </div>
              </div>
          </footer>
      </div>
  );
}

export default App;
