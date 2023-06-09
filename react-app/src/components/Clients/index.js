import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
// import {NavLink} from "react-router-dom";
import { fetchClients } from "../../store/client";
import "./clients.css";

const Clients = () => {
	const dispatch = useDispatch();
	const clientReducer = useSelector((state) => state.clientReducer);
	// const appointments = Object.values(appointmentReducer);

	console.log("<-------1------->", clientReducer);

	useEffect(() => {
		dispatch(fetchClients());
	}, [dispatch]);

	// const userTransactions = Object.values(allTransactions).filter(
	//     (transaction) => transaction.user_id === userId
	// );

	return (
		<>
			<h1>Clients</h1>
			{/* <NavLink to={`/appointments/${.id}/edit`}>
				<button type="submit">Update</button>
			</NavLink> */}
		</>
	);
};

export default Clients;
