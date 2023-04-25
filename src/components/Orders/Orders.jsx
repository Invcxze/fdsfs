import React, {useEffect, useState} from 'react';
import {getOrders} from "../../api";
import '../../assets/css/bootstrap.min.css'
import {useNavigate} from "react-router-dom";


const Orders = ({setTitle, token}) => {

    const [orders, setOrders] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const OrderData = await getOrders(token);
                setOrders(OrderData.body);
            } catch (error){
                console.error("Error fetch order:", error);
            }
        }
        fetchOrders();
        setTitle("Ваши заказы");
    }, [])

    return (
        <main>
            {orders.map((order, index) => (
                <div className="row row-cols-1 row-cols-md-3 mb-3 text-center bg-light">
                    <h2 className="w-100">Заказ №{order.id}</h2>
                    {order.products.map((product, productIndex) => (
                        <div className="col">
                            <div className="card mb-4 rounded-3 shadow-sm">
                                <div className="card-header py-3">
                                    <h4 className="my-0 fw-normal">{product}</h4>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title pricing-card-title">{product}р.<small
                                        className="text-muted fw-light"> &times; 1 шт.</small></h1>
                                    <p>{product}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            <div className="row justify-content-center gap-1">
                <button onClick={() => navigate('/')} className="col-6 btn btn-lg btn-outline-info mb-3" type="button">Назад</button>
            </div>
        </main>
            );
};

export default Orders;