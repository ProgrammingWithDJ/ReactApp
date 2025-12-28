import './OrdersPage.css'
import { Header } from '../../Components/Header.jsx';
import axios from 'axios';
import { OrdersGrid } from './OrdersGrid.jsx';
import { useEffect, useState } from 'react';

export function OrdersPage({ cart }) {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const fetchOrders = async () => {
      let response = await axios.get('/api/orders?expand=products');
      setOrders(response.data || []);
    }
    fetchOrders();
  }, []);
  return (
    <>
      <title>Orders</title>
      <link rel="icon" type="image/png" href="/orders-favicon.png" />
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

       <OrdersGrid orders={orders}/>
      </div>
    </>
  )
}   