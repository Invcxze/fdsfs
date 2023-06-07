import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Product from './components/products';
import Cart from './components/cart';
import Order from './components/order';

// API http://api-shop.alabuga.space/api-shop/

function App() {

  const [token, setToken] = useState('')

  return <div class="container py-3">
    <Routes>
      <Route path='login' element={<Login token={token} setToken={setToken} />}></Route>
      <Route path='signup' element={<Signup token={token} setToken={setToken} />}></Route>
      <Route path='/' element={<Product token={token} setToken={setToken} />}></Route>
      <Route path='cart' element={<Cart token={token} setToken={setToken} />}></Route>
      <Route path='order' element={<Order token={token} setToken={setToken} />}></Route>
    </Routes>
    <footer class="pt-4 my-md-5 pt-md-5 border-top">
        <div class="row">
            <div class="col-12 col-md">
                <small class="d-block mb-3 text-muted">&copy; 2017–2021</small>
            </div>
        </div>
    </footer>
  </div>
}

export default App;
