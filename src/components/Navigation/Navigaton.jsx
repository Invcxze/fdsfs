import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {logout} from "../../api";
import '../../assets/css/bootstrap.min.css'


const Navigation = ({token, setToken}) => {
    const navigate = useNavigate();

    const logoutClick = () => {
        const fetchLogout = async () => {
            await logout(token);
        }
        fetchLogout();
    }

    return (
        <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
            {!token ? <>
                <NavLink className="me-3 py-2 text-dark text-decoration-none" to="/registration">Регистрация</NavLink>
                <NavLink className="me-3 py-2 text-dark text-decoration-none" to="/login">Авторизация</NavLink>
            </> : <>
                <button onClick={() => {setToken(null); navigate("/"); logoutClick();}} className="me-3 py-2 text-dark text-decoration-none">Выход</button>
                <NavLink className="me-3 py-2 text-dark text-decoration-none" to="/orders">Мои заказы</NavLink>
                <NavLink className="me-3 py-2 text-dark text-decoration-none" to="/cart">Корзина</NavLink>
            </>}
        </nav>
    );
};

export default Navigation;