import React, {useEffect, useState} from 'react';
import {signup} from "../../api";
import '../../assets/css/bootstrap.min.css'
import {useNavigate} from "react-router-dom";


const Registration = ({setTitle}) => {
    const [fio, setFio] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setTitle("Регистрация");
    }, [])

    const signupClick = (e) => {
        const fetchRegistraton = async () => {
            try{
                await signup({
                    'fio': fio,
                    'password': password,
                    'email': email
                });
            } catch (e) {
                console.error(e);
            }
        }
        fetchRegistraton();
        navigate("/login");
    }

    return (
        <main>
            <div className="row row-cols-1 row-cols-md-3 mb-3 text-center justify-content-center">
                <div className="col">
                    <div className="row">
                        <form onSubmit={(e) => {e.preventDefault(); signupClick()}}>
                            <h1 className="h3 mb-3 fw-normal">Пожалуйста заполните все поля</h1>
                            <div className="form-floating mb-3">
                                <input value={fio} onChange={(e) => setFio(e.target.value)} type="text" className="form-control" id="floatingFio" placeholder="ФИО"/>
                                    <label htmlFor="floatingFio">ФИО</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={email} onChange={(e) => {setEmail(e.target.value)}} type="email" className="form-control" id="floatingInput"
                                       placeholder="name@example.com"/>
                                    <label htmlFor="floatingInput">Email</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" className="form-control" id="floatingPassword"
                                       placeholder="Password"/>
                                    <label htmlFor="floatingPassword">Password</label>
                            </div>

                            <button className="w-100 btn btn-lg btn-primary mb-3" type="submit">Зарегистрироваться
                            </button>
                            <button onClick={() => navigate("/")} className="w-100 btn btn-lg btn-outline-info" type="submit">Назад</button>
                        </form>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default Registration;