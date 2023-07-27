import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import { fetchRegister } from "../../store/cashRegister";


const CashRegister = () => {
    const dispatch = useDispatch();
    const registerReducer = useSelector((state) => state.cashRegisterReducer)


    return (
        <div>
            Cash Register
        </div>
    );
}


export default CashRegister
