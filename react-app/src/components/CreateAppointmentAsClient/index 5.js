import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments } from "../../store/appointment";
import "./createAppointmentAsClient.css"



const CreateAppointmentAsClient = () => {
    const dispatch = useDispatch();
    const appointmentReducer = useSelector((state) => state.appointmentReducer)
    const client = useSelector(state => state.session)
    // const allAppointments = Object.values(appointmentReducer);

    // const barbe

    console.log("<-------createAppopintment------->", client)


    useEffect(() => {
        dispatch(fetchAppointments())
    }, [dispatch])


    // const userTransactions = Object.values(allTransactions).filter(
    //     (transaction) => transaction.user_id === userId
    // );

    return (
        <>
            <h1>CreateAppointment</h1>
        </>
    )

}

export default CreateAppointmentAsClient
