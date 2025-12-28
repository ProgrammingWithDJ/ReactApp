import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money.js';
import axios from 'axios';

export function DeliveryOptions({ deliveryOptions, cartitem , loadCartItems}) {
    return (
        <div className="delivery-options" >
            <div className="delivery-options-title">
                Choose a delivery option:
            </div>

            {deliveryOptions.map((deliveryOption) => {
                const priceString =
                    deliveryOption.priceCents === 0
                        ? 'FREE Shipping'
                        : `${formatMoney(
                            deliveryOption.priceCents
                        )} Shipping`;

                        const updateDeliveryOption = async () => {

                            await axios.put(`/api/cart-items/${cartitem.productId}`, {
                                deliveryOptionId: deliveryOption.id
                            });

                           await loadCartItems();
                        };
                return (
                    <div
                        key={deliveryOption.id}
                        className="delivery-option"
                        onClick = {updateDeliveryOption}
                    >
                        <input
                            type="radio"
                            className="delivery-option-input"
                            name={`delivery-option-${cartitem.productId}`}
                            checked={
                                deliveryOption.id ===
                                cartitem.deliveryOptionId
                            }
                            onChange={() => {}}
                        />
                        <div>
                            <div className="delivery-option-date">
                                {dayjs(
                                    deliveryOption.estimatedDeliveryTime
                                ).format('dddd, MMMM D')}
                            </div>
                            <div className="delivery-option-price">
                                {priceString}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}