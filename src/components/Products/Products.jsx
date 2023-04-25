import React, {useEffect, useState} from 'react';
import {addToCart, getProducts} from "../../api";
import '../../assets/css/bootstrap.min.css'


const Products = ({setTitle, token}) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const ProductsData = await getProducts();
                setProducts(ProductsData.body);
            } catch (error){
                console.error("Error fetch order:", error);
            };
        }
        fetchProducts();
        setTitle("Каталог товаров");
    }, [])

    const addToCartClick = (productId) => {
        const fetchAddToCart = async () => {
            try {
                await addToCart(productId, token)
            } catch (e) {
                console.error(e)
            }
        }
        fetchAddToCart();
    }


    return (
        <main>
            <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                {products.map((product, id) => (
                    <div className="col">
                        <div className="card mb-4 rounded-3 shadow-sm">
                            <div className="card-header py-3">
                                <h4 className="my-0 fw-normal">{product.name}</h4>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">{product.price}р.</h1>
                                <p>{product.description}</p>
                                {token ? <button onClick={() => addToCartClick(product.id)} type="button" className="w-100 btn btn-lg btn-outline-primary">Добавить в
                                    корзину
                                </button> : <div></div>}

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default Products;