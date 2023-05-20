import './bootstrap.min.css'
import './App.css';
import { useEffect,useState } from 'react';
import {Route,Routes} from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Products from './components/products';
import Cart from './components/cart';
import Order from './components/order';
function App() {
  const [token,setToken] = useState(null)
  return (
    <div className='container py-3'>
    <Routes>
      <Route path='login' element={<Login setToken={setToken} />}></Route>
      <Route path='signup' element={<Signup />}></Route>
      <Route path='/' element={<Products token={token} setToken={token}/>}></Route>
      <Route path='cart' element={<Cart token={token} setToken={token}/>}></Route>
      <Route path='order' element={<Order token={token} setToken={token}/>}></Route>
    </Routes>
        <footer class="pt-4 my-md-5 pt-md-5 border-top">
        <div class="row">
            <div class="col-12 col-md">
                <small class="d-block mb-3 text-muted">&copy; 2017–2021</small>
            </div>
        </div>
    </footer></div>
  );
}

export default App;
