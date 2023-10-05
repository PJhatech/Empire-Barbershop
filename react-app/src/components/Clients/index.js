import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
// import {NavLink} from "react-router-dom";
import {fetchClients} from "../../store/client";
import "./clients.css";

const Clients = () => {
	const dispatch = useDispatch();
	const clientReducer = useSelector((state) => state.clientReducer);
	const clients = Object.values(clientReducer);

	

	useEffect(() => {
		dispatch(fetchClients());
	}, [dispatch]);

	// const userTransactions = Object.values(allTransactions).filter(
	//     (transaction) => transaction.user_id === userId
	// );

	return (
		<div>
			<h1>Clients</h1>
			<div>
				{clients.map((clients) => (
					<div key={clients.id}>
						{clients.first_name}
						{/* <NavLink exact to={`/clients/${clients.id}`}>
						</NavLink> */}
					</div>
				))}
			</div>
		</div>
	);
};

export default Clients;
