import './HomePage.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../Components/Header.jsx';
import { ProductGrid } from './ProductGrid.jsx';

export function HomePage({ cart, loadCartItems }) {

    const [products, setProducts] = useState([]);


    useEffect(() => {
        const getHomeData = async () => {
            var response = await axios.get('/api/products');
            setProducts(response.data);

        };

        getHomeData();

    }, []);  // Proper semicolon + empty array



    return (
        <>
            <title>E Commerce Project</title>
            <Header cart={cart} />
            <link rel="icon" type="image/png" href="/home-favicon.png" />
            <div className="home-page">
                <ProductGrid products={products} loadCartItems={loadCartItems} />
            </div>
        </>
    );
}