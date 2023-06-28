import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import { fetchAppointments } from "../../store/appointment";
import AppointmentUpdateModal from "../AppointmentUpdateModal";
import AppointmentDeleteModal from "../AppointmentDeleteModal";


const Appointments = () => {
    const dispatch = useDispatch();
    const appointmentReducer = useSelector((state) => state.appointmentReducer)
    const appointment = Object.values(appointmentReducer);

    console.log("<-------AppointmentComponent------->", appointment)


    useEffect(() => {
        dispatch(fetchAppointments())
    }, [dispatch])

    // const userTransactions = Object.values(allTransactions).filter(
    //     (transaction) => transaction.user_id === userId
    // ); w

    return (
		<>
			<h1>All Appointments</h1>
			{appointment.map((appointment) => (
				<div key={appointment.id}>
                    {appointment.client_id}
                    <br />
					{appointment.date}
                    <br />
					{appointment.time}
                    <br />
					<OpenModalButton
						buttonText="Delete"
						modalComponent={
							<AppointmentDeleteModal prop={appointment.id} />
						}
					/>
					<OpenModalButton
						buttonText="Update"
						modalComponent={<AppointmentUpdateModal prop={appointment} />}
					/>
				</div>
			))}
		</>
	);
}

export default Appointments
