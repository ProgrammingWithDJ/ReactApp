
import { formatMoney } from "../../utils/money.js";
import axios from "axios";

export function CartItemsDetails({ cartitem, loadCartItems }) {

    const deleteCartItem = async () => {
        await axios.delete(`/api/cart-items/${cartitem.productId}`);
        await loadCartItems();
    }

    const updateCartItem = async () => {
            await axios.put(`/api/cart-items/${cartitem.productId}`, {
                quantity: cartitem.quantity + 1
            });
            await loadCartItems();
    }
    return (
        <div className="cart-item-details">
            <div className="product-name">
                {cartitem.product.name}
            </div>
            <div className="product-price">
                {formatMoney(cartitem.product.priceCents)}
            </div>
            <div className="product-quantity">
                <span>
                    Quantity:{' '}
                    <span className="quantity-label">
                        {cartitem.quantity}
                    </span>
                </span>
                <span className="update-quantity-link link-primary"
                onClick={updateCartItem}>
                    Update
                </span>
                <span className="delete-quantity-link link-primary"
                onClick={deleteCartItem}>
                    Delete
                </span>
            </div>
        </div>
    );
}