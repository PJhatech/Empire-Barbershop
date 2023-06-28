import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {NavLink} from "react-router-dom";
import { fetchAppointments } from "../../store/appointment";


const Appointments = () => {
    const dispatch = useDispatch();
    const appointmentReducer = useSelector((state) => state.appointmentReducer)
    const appointments = Object.values(appointmentReducer);

    console.log("<-------AppointmentComponent------->", appointments)


    useEffect(() => {
        dispatch(fetchAppointments())
    }, [dispatch])

    // const userTransactions = Object.values(allTransactions).filter(
    //     (transaction) => transaction.user_id === userId
    // ); w

    return (
		<>
			<h1>All Appointments</h1>
            {appointments.map((appointments) => (
                <div key={appointments.id}>
                    {appointments.client_id}
                </div>
            ))}
		</>
	);
}

export default Appointments
