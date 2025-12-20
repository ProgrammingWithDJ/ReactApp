import { HomePage } from './pages/HomePage.jsx'
import { Route, Routes } from 'react-router'
import { CheckoutPage } from './pages/CheckoutPage/CheckoutPage.jsx'
import { OrdersPage } from './pages/OrdersPage.jsx'
import { TrackingPage } from './pages/TrackingPage.jsx'
import { NotFound } from './pages/NotFound.jsx'
import axios from 'axios';
import { useEffect, useState } from 'react'
import './App.css'

function App() {

 const [cart, setCartItems] = useState([]);

   useEffect(() => {
         axios.get('/api/cart-items?expand=product')
    .then((response) => { 
        setCartItems(response.data);
    }, [])
});
  return (
   <Routes>
    <Route index element={<HomePage cart={cart}/>} />
     <Route path='/checkout' element={<CheckoutPage cart={cart}/>} />
    <Route path='/orders' element={<OrdersPage/>}/>
    <Route path='/tracking' element={<TrackingPage/>}/>
    <Route path='*' element={<NotFound/>}/>
    </Routes>
  ) 
}

export default App
