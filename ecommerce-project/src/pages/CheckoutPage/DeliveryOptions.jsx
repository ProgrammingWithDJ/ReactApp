import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money.js';

export function DeliveryOptions({ deliveryOptions, cartitem }) {
    return (
        <div className="delivery-options">
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

                return (
                    <div
                        key={deliveryOption.id}
                        className="delivery-option"
                    >
                        <input
                            type="radio"
                            className="delivery-option-input"
                            name={`delivery-option-${cartitem.productId}`}
                            defaultChecked={
                                deliveryOption.id ===
                                cartitem.deliveryOptionId
                            }
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