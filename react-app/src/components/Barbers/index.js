import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import { fetchBarbers } from "../../store/barber";
import "./barbers.css";


const Barbers = () => {
	const dispatch = useDispatch();
	const barberReducer = useSelector((state) => state.barberReducer);
	// const appointments = Object.values(appointmentReducer);

	console.log("<-------1------->", barberReducer);

	useEffect(() => {
		dispatch(fetchBarbers());
	}, [dispatch]);

	// const userTransactions = Object.values(allTransactions).filter(
	//     (transaction) => transaction.user_id === userId
	// );

	return (
		<>
			<h1>Barbers</h1>
			{/* <NavLink to={`/appointments/${.id}/edit`}>
				<button type="submit">Update</button>
			</NavLink> */}
		</>
	);
};

export default Barbers;
