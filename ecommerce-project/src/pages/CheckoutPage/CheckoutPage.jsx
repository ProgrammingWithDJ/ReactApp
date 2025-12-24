import './CheckoutPage.css'
import axios from 'axios';
import {useState,useEffect} from 'react';
import { CheckoutHeader } from './CheckoutHeader.jsx';
import { formatMoney } from '../../utils/money.js';
import dayjs from 'dayjs';

export function CheckoutPage({ cart }) {

    const [deliveryOption, setDeliveryOption] = useState([]);

    useEffect(() => {
            axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            .then((response) => {
                setDeliveryOption(response.data);
            });
    },[]);

    return (
        <>
            <title>Checkout</title>
            <link rel="icon" type="image/png" href="/cart-favicon.png" />
            <CheckoutHeader />
            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <div className="order-summary">
                        {cart.map((cartitem) => {
                            return (
                                <div key={cartitem.productId} className="cart-item-container">
                                    <div className="delivery-date">
                                        {cartitem.product.name}
                                    </div>

                                    <div className="cart-item-details-grid">
                                        <img className="product-image"
                                            src={cartitem.product.image} />

                                        <div className="cart-item-details">
                                            <div className="product-name">
                                                {cartitem.product.name}
                                            </div>
                                            <div className="product-price">
                                                {formatMoney(cartitem.product.priceCents)}
                                            </div>
                                            <div className="product-quantity">
                                                <span>
                                                    Quantity: <span className="quantity-label">{cartitem.quantity}</span>
                                                </span>
                                                <span className="update-quantity-link link-primary">
                                                    Update
                                                </span>
                                                <span className="delete-quantity-link link-primary">
                                                    Delete
                                                </span>
                                            </div>
                                        </div>

                                        <div className="delivery-options">
                                            <div className="delivery-options-title">
                                                Choose a delivery option:
                                            </div>
                                            {deliveryOption.map((deliveryOption) =>
                                            {


                                                return ( 
                                                       <div key = {deliveryOption.Id} className="delivery-option">
                                                <input type="radio" checked={deliveryOption.Id === cartitem.selectedDeliveryOptionId}
                                                    className="delivery-option-input"
                                                    name= {`delivery-option-${cartitem.productId}`} />
                                                <div>
                                                    <div className="delivery-option-date">
                                                        {dayjs.extend(deliveryOption.estimatedDeliveryTime).format('dddd, MMMM D')}
                                                    </div>
                                                    <div className="delivery-option-price">
                                                       { deliveryOption.priceCents === 0 ? 'FREE Shipping' : formatMoney(deliveryOption.priceCents) }
                                                    </div>
                                                </div>
                                            </div>
                                                );
                                            }) }
                                        </div>
                                    </div>
                                </div>

                            );
                        })}
                      
                    </div>

                    <div className="payment-summary">
                        <div className="payment-summary-title">
                            Payment Summary
                        </div>

                        <div className="payment-summary-row">
                            <div>Items (3):</div>
                            <div className="payment-summary-money">$42.75</div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Shipping &amp; handling:</div>
                            <div className="payment-summary-money">$4.99</div>
                        </div>

                        <div className="payment-summary-row subtotal-row">
                            <div>Total before tax:</div>
                            <div className="payment-summary-money">$47.74</div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Estimated tax (10%):</div>
                            <div className="payment-summary-money">$4.77</div>
                        </div>

                        <div className="payment-summary-row total-row">
                            <div>Order total:</div>
                            <div className="payment-summary-money">$52.51</div>
                        </div>

                        <button className="place-order-button button-primary">
                            Place your order
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}