import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {useParams} from "react-router-dom/cjs/react-router-dom.min";
import { fetchAppointmentById } from "../../store/appointment";


const AppointmentIndex = () => {
	const dispatch = useDispatch();
	const {id} = useParams();
	const appointmentReducer = useSelector((state) => state.appointmentReducer);
	const appointment = Object.values(appointmentReducer);

	const barberAppointment = appointment.reduce((accumulator, current) => {
		return {...accumulator, ...current};
	}, {});

	console.log("<-------AppointmentIndex------->", barberAppointment);

	useEffect(() => {
		dispatch(fetchAppointmentById(id));
	}, [dispatch, id]);

	// const userTransactions = Object.values(allTransactions).filter(
	//     (transaction) => transaction.user_id === userId
	// );

	return (
		<>
			AppointmentIndex
			<h1>{appointment.barber_id}</h1>
			<div>
				{Object.keys(barberAppointment).map((key) => (
					<div key={key}>
						<p>Id: {barberAppointment[key].barber.first_name}</p>
						{/* <p>Date: {appointment[key].date}</p>
						<p>Service: {appointment[key].service}</p> */}
					</div>
				))}
			</div>
			{/* <NavLink to={`/appointments/${.id}/edit`}>
				<button type="submit">Update</button>
			</NavLink> */}
		</>
	);
};

export default AppointmentIndex;
