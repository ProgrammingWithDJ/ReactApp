import './CheckoutPage.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { CheckoutHeader } from './CheckoutHeader.jsx';
import { PaymentSummary } from './PaymentSummary.jsx';
import { OrderSummary } from './OrderSummary.jsx';

export function CheckoutPage({ cart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);



    useEffect(() => {

        var fetchCheckoutdata = async () => {
            let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
            setDeliveryOptions(response.data || []);

            response = await axios.get('/api/payment-summary');
            setPaymentSummary(response.data);
        };

        fetchCheckoutdata();

    }, []);

    return (
        <>
            <title>Checkout</title>
            <link rel="icon" type="image/png" href="/cart-favicon.png" />
            <CheckoutHeader />
            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />

                    <PaymentSummary paymentSummary={paymentSummary} />
                </div>
            </div>
        </>
    );
}
