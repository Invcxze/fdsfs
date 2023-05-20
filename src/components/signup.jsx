import { useState } from "react"
import Header from "./header"
import { useNavigate } from "react-router-dom"
export default function Signup() {
    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [pass, setPass] = useState()
    const [fio, setFio] = useState()
    const [err, setErr] = useState( {"code": "","message": "", "errors": {"password": "", "email": "", "fio":""}})
    async function sign(event){
        event.preventDefault();
        let api = await fetch("http://api-shop.alabuga.space/api-shop/signup", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify( {"email": email, "password":pass, "fio": fio})})
        let data = await api.json()
        if (api.ok){
            navigate("../login")
        } else setErr(data.error)
    }
    return <> <header><Header />
     <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
            <h1 class="display-4 fw-normal">Регистрация</h1>
        </div>
    </header>

    <main>
        <div class="row row-cols-1 row-cols-md-3 mb-3 text-center justify-content-center">
            <div class="col">
                <div class="row">
                    <form onSubmit={(event) => sign(event)}>
                        <h1 class="h3 mb-3 fw-normal">Пожалуйста заполните все поля</h1>
                        <div class="form-floating mb-3">
                            <input type="text" style={err.code == 422 && err.errors.fio ? {"border-color": "red"}: {}}  class="form-control" value={fio} onChange={(event)=> setFio(event.target.value)} id="floatingFio" placeholder="ФИО"/>
                            <label for="floatingFio">ФИО</label>
                            {err.code ==422 ? err.errors.fio : ''}
                        </div>
                        <div class="form-floating mb-3">
                            <input type="email" style={err.code==422 && err.errors.email ? {"border-color": "red"}: {}} class="form-control" value={email} onChange={(event)=> setEmail(event.target.value)} id="floatingInput" placeholder="name@example.com"/>
                            <label for="floatingInput">Email</label>
                            {err.code ==422 ? err.errors.email: ''}
                        </div>
                        <div class="form-floating mb-3">
                            <input type="password" style={err.code==422 && err.errors.password ? {"border-color": "red"} : {}}class="form-control" value={pass} onChange={(event)=> setPass(event.target.value)} id="floatingPassword" placeholder="Password"/>
                            <label for="floatingPassword">Password</label>
                            {err.code ==422 ? err.errors.password: ''}
                        </div>

                        <button class="w-100 btn btn-lg btn-success mb-3" type="submit">Зарегистрироваться</button>
                        {err.message}
                        <button class="w-100 btn btn-lg btn-outline-secondary" type="submit" onClick={()=> navigate("../")}>Назад</button>
                    </form>
                </div>
            </div>
        </div></main></>
}