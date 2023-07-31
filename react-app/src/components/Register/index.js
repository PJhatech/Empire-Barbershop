import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import { fetchRegister } from "../../store/cashRegister";
import {useModal} from "../../context/Modal";
import Services from "../Services";


const CashRegister = ({service}) => {
    const dispatch = useDispatch();
    const {closeModal} = useModal();
    const registerReducer = useSelector((state) => state.cashRegisterReducer)


    console.log(service)

    return (
        <div>
            Cash Register
           {service}
        </div>
    );
}


export default CashRegister
