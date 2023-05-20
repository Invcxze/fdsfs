import { useEffect } from "react";
import { useState } from "react";
import OrderProducts from "./productOrder";
import { useNavigate } from "react-router-dom";
import Header from "./header";

export default function Order({token,setToken}){
    const [products,setProducts] = useState([])
    const [result, setResult] = useState()
    const [full, setFull] = useState(0)
    const navigate = useNavigate()

    async function get(){
        let api = await fetch("http://api-shop.alabuga.space/api-shop/order", {headers: {"Authorization": `Bearer ${token}`}})
        let data = await api.json()
        setProducts(data.data)
    }

    useEffect(()=> {get()}, [])
    useEffect(()=>{setResult(products.map(product =>{
        return <div class="row row-cols-1 row-cols-md-3 mb-3 text-center bg-light">
        <h2 class="w-100">Заказ № {product.id}</h2>
        <OrderProducts ids={product.products} />
        <h2 class="w-100">Итоговая стоимость: {product.order_price}р.</h2>
        </div>
    }))}, [products])
    return <> <header><Header setToken={setToken} token={token}>
    </Header>
    <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
            <h1 class="display-4 fw-normal">Ваши заказы</h1>
        </div>
    </header>
    <main>{result}
    <div class="row justify-content-center gap-1">
            <button class="col-6 btn btn-lg btn-outline-secondary mb-3" type="button" onClick={()=> navigate("../")}>Назад</button>
        </div>
    </main></>
}