import { HomePage } from './pages/HomePage.jsx'
import { Route, Routes } from 'react-router'
import { CheckoutPage } from './pages/CheckoutPage/CheckoutPage.jsx'
import { OrdersPage } from './pages/OrdersPage.jsx'
import { TrackingPage } from './pages/TrackingPage.jsx'
import { NotFound } from './pages/NotFound.jsx'
import './App.css'

function App() {


  return (
   <Routes>
    <Route index element={<HomePage/>}/>
     <Route path='/checkout' element={<CheckoutPage/>}/>
    <Route path='/orders' element={<OrdersPage/>}/>
    <Route path='/tracking' element={<TrackingPage/>}/>
    <Route path='*' element={<NotFound/>}/>
    </Routes>
  ) 
}

export default App
