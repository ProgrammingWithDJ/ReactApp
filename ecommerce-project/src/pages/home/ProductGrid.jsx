import { Product } from "./Product";


export function ProductGrid({ products, loadCartItems }) {

    return (
        <div className="products-grid">
            {products.map((product) => {
                return (
                   <Product key={product.id} product={product} loadCartItems={loadCartItems} />
                );
            })}
        </div>
    );
}