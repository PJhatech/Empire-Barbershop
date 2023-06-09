import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {NavLink} from "react-router-dom";
import "./appointments.css"
import { fetchAppointments } from "../../store/appointment";


const Appointments = () => {
    const dispatch = useDispatch();
    const appointmentReducer = useSelector((state) => state.appointmentReducer)
    const appointments = Object.values(appointmentReducer);

    console.log("<-------1------->", appointments)


    useEffect(() => {
        dispatch(fetchAppointments())
    }, [dispatch])

    // const userTransactions = Object.values(allTransactions).filter(
    //     (transaction) => transaction.user_id === userId
    // );

    return (
		<>
			<h1>Appointments</h1>
			{/* <NavLink to={`/appointments/${.id}/edit`}>
				<button type="submit">Update</button>
			</NavLink> */}
		</>
	);
}

export default Appointments
