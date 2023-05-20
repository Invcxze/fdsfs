import { useEffect } from "react";
import { useState } from "react";
import Header from "./header";

export default function Products ({token, setToken}){
    const [products, setProducts] = useState([])
    const [result, setResult]=useState()
    async function get(){
        let api = await fetch("http://api-shop.alabuga.space/api-shop/products")
        let data = await api.json()
        setProducts(data.data)
    }
    useEffect(()=> {get()}, [])
    useEffect(()=> {setResult(products.map(product =>{
        return   <div class="col">
        <div class="card mb-4 rounded-3 shadow-sm">
            <div class="card-header py-3">
                <h4 class="my-0 fw-normal">{product.name}</h4>
            </div>
            <div class="card-body">
                <h1 class="card-title pricing-card-title">{product.price}р.</h1>
                <p>{product.description}</p>
                {token ? <button type="button" class="w-100 btn btn-lg btn-outline-success" onClick={(event)=> {AddCart(product.id); event.target.parentElement.style.animation = "btn 1s ease-out"}}>Добавить в корзину</button> : ''}
            </div>
        </div>
    </div>
    }))}, [products])
    async function AddCart(id){
        let api = await fetch(`http://api-shop.alabuga.space/api-shop/cart/${id}`, {method: "POST", headers: {"Authorization": `Bearer ${token}`}})
    }
    return <> <header> <Header setToken={setToken} token={token}>
    </Header><div class="pricing-header p-3 pb-md-4 mx-auto text-center">
        <h1 class="display-4 fw-normal">Каталог товаров</h1>
    </div></header><main>
        <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">{result}</div></main>
    </>
}