import dayjs from "dayjs";
import { DeliveryOptions } from "./DeliveryOptions.jsx";
import { CartItemsDetails } from "./CartItemsDetails.jsx";

export function OrderSummary({ cart = [], deliveryOptions = [], loadCartItems }) {
  const hasData = Array.isArray(deliveryOptions) && deliveryOptions.length > 0;

  return (
    <div className="order-summary">
      {hasData &&
        cart.map((cartitem) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => deliveryOption.id === cartitem.deliveryOptionId
          );

          const deliveryDate = selectedDeliveryOption
            ? dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
                "dddd, MMMM D"
              )
            : "Choose a delivery option";

          return (
            <div
              key={cartitem.productId}
              className="cart-item-container"
            >
              <div className="delivery-date">
                Delivery Date : {deliveryDate}
              </div>

              <div className="cart-item-details-grid">
                <img
                  className="product-image"
                  src={cartitem.product.image}
                  alt={cartitem.product.name}
                />

                <CartItemsDetails cartitem={cartitem} />

                <DeliveryOptions
                  deliveryOptions={deliveryOptions}
                  cartitem={cartitem}
                  loadCartItems={loadCartItems}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
