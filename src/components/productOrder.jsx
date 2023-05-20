import { useEffect } from "react";
import { useState } from "react";

export default function OrderProducts({ids}){

    const [products, setProducts] = useState([])
    const [result, setResult]= useState()

    async function get() {
        let api = await fetch("http://api-shop.alabuga.space/api-shop/products")
        let data = await api.json()
        let arr = []
        for (let product of data.data){
            if (ids.includes(product.id)) {
                arr.push(product)
            }
        }
        setProducts(arr)
    }

    useEffect(()=> {get()}, [])
    
    useEffect(()=> {setResult(products.map(product =>{
        return <div class="col">
        <div class="card mb-4 rounded-3 shadow-sm">
            <div class="card-header py-3">
                <h4 class="my-0 fw-normal">{product.name}</h4>
            </div>
            <div class="card-body">
                <h1 class="card-title pricing-card-title">{product.price}р.<small class="text-muted fw-light"> &times; 1шт.</small></h1>
                <p>{product.description}</p>
            </div>
        </div>
    </div>
    }))}, [products])

    return result
}