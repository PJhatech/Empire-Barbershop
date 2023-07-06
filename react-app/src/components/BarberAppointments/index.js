import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchBarberAppointments,fetchBarberIndex } from "../../store/barber";

const BarberAppointments = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const barberReducer = useSelector((state) => state.barberReducer);
	const barberAppointments = Object.values(barberReducer);


    useEffect(() => {
		dispatch(fetchBarberAppointments(id))
		// dispatch(fetchBarberIndex(id));
	}, [dispatch, id]);

	console.log("<-------BarberAppointments------->", fetchBarberAppointments);
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
						    {barberAppointments.last_name}
                           { console.log("<-------BarberAppointments------->", barberAppointments)}

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
