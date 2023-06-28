import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import {useParams} from "react-router-dom";
import { fetchAppointments } from "../../store/appointment";
import AppointmentUpdateModal from "../AppointmentUpdateModal";
import AppointmentDeleteModal from "../AppointmentDeleteModal";
import AppointmentForm from "../AppointmentForm"
import { fetchClientIndex, fetchClients } from "../../store/client";

const Appointments = () => {
    const dispatch = useDispatch();
    const appointmentReducer = useSelector((state) => state.appointmentReducer);

    const appointment = Object.values(appointmentReducer);

    useEffect(() => {
        dispatch(fetchAppointments())
    }, [dispatch])

    console.log("<-------AppointmentComponent------->", appointment)

    return (
		<>
			<h1>All Appointments</h1>
			{appointment.map((appointment) => (
				<div key={appointment.id}>
					Client: {appointment.client.first_name}
					<br />
					Date: {appointment.date}
					<br />
					Time: {appointment.time}
					<br />
					<OpenModalButton
						buttonText="Delete"
						modalComponent={
							<AppointmentDeleteModal prop={appointment.id} />
						}
					/>
					<OpenModalButton
						buttonText="Update"
						modalComponent={
							<AppointmentUpdateModal prop={appointment} />
						}
					/>
				</div>
			))}
					<div>
						<OpenModalButton
							buttonText="Create New Appointment"
							modalComponent={<AppointmentForm />}
						/>
					</div>
		</>
	);
}

export default Appointments
