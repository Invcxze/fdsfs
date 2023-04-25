import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {login} from "../../api";
import '../../assets/css/bootstrap.min.css'

const Login = ({setToken, setTitle} ) => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        setTitle("Авторизация");
    }, [])

    const loginClick = (e) => {
        const fetchLogin = async () => {
            try {
                const token = await login({
                    'email': email,
                    'password': password
                })
                setToken(token.data.user_token);
                navigate("/");
            } catch (e) {
                console.error(e);
            }
        }
        fetchLogin();
    }
    return (
        <main>
            <div className="row row-cols-1 row-cols-md-3 mb-3 text-center justify-content-center">
                <div className="col">
                    <div className="row">
                        <form onSubmit={(e) => {e.preventDefault(); loginClick()}}>
                            <div className="form-floating mb-3">
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="floatingInput"
                                       placeholder="name@example.com"/>
                                    <label htmlFor="floatingInput">Email</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="floatingPassword"
                                       placeholder="Password"/>
                                    <label htmlFor="floatingPassword">Password</label>
                            </div>

                            <button className="w-100 btn btn-lg btn-primary mb-3" type="submit">Войти</button>
                            <button onClick={() => navigate("/")} className="w-100 btn btn-lg btn-outline-info" type="submit">Назад</button>
                        </form>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default Login;