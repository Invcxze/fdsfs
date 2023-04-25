import React, {useEffect, useState} from 'react';
import {createOrder, deleteFromCart, getCart} from "../../api";
import {useNavigate} from "react-router-dom";
import '../../assets/css/bootstrap.min.css'

const Cart = ({setTitle, token}) => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    const createOrderClick = () => {
        const fetchCreateOrder = async () => {
            try {
                await createOrder(token);
            } catch (e) {
                console.error(e)
            }
        }
        fetchCreateOrder();
    }

    const fetchCart = async () => {
        try {
            let cartData = await getCart(token);
            cartData = cartData.body.map((product, id) => {
                product['quantity'] = 1;
                return product
            })
            setCart(cartData);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchCart();
        setTitle("Корзина");
    }, [])

    const increment = (productId) => {
        const newCart = [...cart]
        newCart[productId].quantity += 1

        setCart(newCart);
    }

    const decrement = (productId) => {
        const newCart = [...cart]
        newCart[productId].quantity -= 1

        setCart(newCart);
    }

    const removeFromCartClick = (productId) => {
        const fetchRemoveFromCart = async () => {
            try {
                await deleteFromCart(token, productId);
                fetchCart();
            } catch (e) {
                console.error(e)
            }
        }
        fetchRemoveFromCart();
    }

    const total_cost = () => {
        console.log(cart)
       return cart.reduce((a, item) => a+= item.price * item.quantity, 0)
    }


    return (
        <main>
            <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                {cart.map((product, id) => (
                    <div className="col">
                        <div className="card mb-4 rounded-3 shadow-sm">
                            <div className="card-header py-3">
                                <h4 className="my-0 fw-normal">{product.name}</h4>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">{product.price}р.<small
                                    className="text-muted fw-light"> &times; {product.quantity}
                                    шт.</small></h1>
                                <p>{product.description}</p>

                                <button onClick={() => {increment(id)}} type="button" className="btn btn-lg btn-info mb-3">+</button>
                                <button onClick={() => {decrement(id)}} type="button" className="btn btn-lg btn-warning mb-3">&minus;</button>
                                <button onClick={() => removeFromCartClick(product.id)} type="button" className="btn btn-lg btn-outline-danger mb-3">Удалить из
                                    корзины
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row justify-content-center gap-1">
                <h2 className="mb-5">Итоговая стоимость: {total_cost()}р.</h2>
                <button onClick={() => {navigate("/")}} className="col-6 btn btn-lg btn-outline-info mb-3" type="button">Назад</button>
                <button onClick={() => {createOrderClick(); navigate("/orders")}} type="button" className="col-6 btn btn-lg btn-primary mb-3">Оформить заказ</button>


            </div>
        </main>
    );
};

export default Cart;