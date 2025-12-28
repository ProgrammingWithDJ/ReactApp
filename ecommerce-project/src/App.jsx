import { HomePage } from './pages/home/HomePage.jsx'
import { Route, Routes } from 'react-router'
import { CheckoutPage } from './pages/CheckoutPage/CheckoutPage.jsx'
import { OrdersPage } from './pages/Orders/OrdersPage.jsx'
import { TrackingPage } from './pages/TrackingPage.jsx'
import { NotFound } from './pages/NotFound.jsx'
import axios from 'axios';
import { useEffect, useState } from 'react'
import './App.css'

function App() {

 const [cart, setCartItems] = useState([]);

 var loadCartItems = async () => {
    var response = await axios.get('/api/cart-items?expand=product');
    setCartItems(response.data);
  }

useEffect(() => {
  loadCartItems();
}, []); 

  return (
   <Routes>
    <Route index element={<HomePage cart={cart} loadCartItems={loadCartItems}/>} />
     <Route path='/checkout' element={<CheckoutPage cart={cart} loadCartItems={loadCartItems}/>} />
    <Route path='/orders' element={<OrdersPage cart={cart}/>} />
    <Route path='/tracking' element={<TrackingPage/>}/>
    <Route path='*' element={<NotFound/>}/>
    </Routes>
  ) 
}

export default App
