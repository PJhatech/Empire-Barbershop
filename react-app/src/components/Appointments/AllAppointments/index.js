import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAppointments } from "../../../store/appointment";


const AllAppointments = () => {
    const dispatch = useDispatch();
    const appointmentReducer = useSelector((state) => state.appointmentReducer)
    // const allAppointments = Object.values(appointmentReducer);

    console.log("<-------1------->", appointmentReducer)


    useEffect(() => {
        dispatch(fetchAllAppointments())
    }, [dispatch])

    // const userTransactions = Object.values(allTransactions).filter(
    //     (transaction) => transaction.user_id === userId
    // );

    return (
        <>
            <h1>AllAppointments</h1>
        </>
    )

}

export default AllAppointments
