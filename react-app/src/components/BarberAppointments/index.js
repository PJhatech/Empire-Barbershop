import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchBarberAppointments,fetchBarberIndex } from "../../store/barber";
import { fetchAppointmentById } from "../../store/appointment";

const BarberAppointments = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const barberReducer = useSelector((state) => state.barberReducer);
	const appointmentReducer = useSelector((state) => state.appointmentReducer)
	// const barberAppointments = Object.values(appointmentReducer)
	const barberAppointments = Object.values(barberReducer);

	// const object = barberAppointments.reduce((accumulator, current) => {
	// 	return {...accumulator, ...current};
	// }, {});

    useEffect(() => {
		// dispatch(fetchAppointmentById(id))
		// dispatch(fetchBarberAppointment(id));
		// dispatch(fetchBarberIndex(id));
	}, [dispatch, id]);

	console.log("<-------BarberAppointments------->", barberAppointments);
	// const userTransactions = Object.values(allTransactions).filter(
	//     (transaction) => transaction.user_id === userId
	// );

	return (
        <>
            BarberAppointments
            <h1>{barberAppointments.first_name}</h1>
			<div>
				{barberAppointments.map((barberAppointments) => (
					<div key={barberAppointments.id}>

							{barberAppointments.id}
							<br/>
                           {/* { console.log("<-------BarberAppointments------->", barberAppointments)} */}
						    {barberAppointments.last_name}

					</div>
				))}
			</div>
			{/* <NavLink to={`/appointments/${.id}/edit`}>
				<button type="submit">Update</button>
			</NavLink> */}
		</>
	);
};

export default BarberAppointments;
