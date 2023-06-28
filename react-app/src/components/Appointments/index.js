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
    const {id} = useParams();
    const appointmentReducer = useSelector((state) => state.appointmentReducer);
    const clientReducer = useSelector((state) => state.clientReducer);

    const client = Object.values(clientReducer);
    const appointment = Object.values(appointmentReducer);


    const appointments = appointment.map((appointment) => {
        return appointment.client_id
	})

	const value = Object.values(appointments)

    useEffect(() => {
        dispatch(fetchAppointments())
		dispatch(fetchClientIndex(id))
    }, [dispatch, id])

    console.log("<-------AppointmentComponent------->", clientReducer)

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
						modalComponent={
							<AppointmentUpdateModal prop={appointment} />
						}
					/>
					<div>
						<OpenModalButton
							buttonText="Create New Appointment"
							modalComponent={<AppointmentForm />}
						/>
					</div>
				</div>
			))}
			<div>
				{client.map((client) => (
					<div key={client.id}>
                        <NavLink exact to={`/barbers/${client.id}`}>
							{client.first_name}
							<br/>
						    {client.last_name}
						</NavLink>
					</div>
				))}
			</div>
		</>
	);
}

export default Appointments
