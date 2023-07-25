import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import { fetchBarberIndex, fetchBarbers } from "../../store/barber";
import "./barbers.css";


const Barbers = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const barberReducer = useSelector((state) => state.barberReducer);
	const barbers = Object.values(barberReducer);

	console.log("<-------BarbersComponenet------->", barbers);

	useEffect(() => {
		dispatch(fetchBarbers());
		dispatch(fetchBarberIndex(id));
	}, [dispatch, id]);

	// const userTransactions = Object.values(allTransactions).filter(
	//     (transaction) => transaction.user_id === userId
	// );

	return (
		<>
			<h1>Choose Your Barber</h1>
			<div>
				{barbers.map((barbers) => (
					<div key={barbers.id}>
						<NavLink exact to={`/barbers/${barbers.id}`}>
						{barbers.first_name}
						</NavLink>
					</div>
				))}
			</div>
			{/* <NavLink to={`/appointments/${.id}/edit`}>
				<button type="submit">Update</button>
			</NavLink> */}
		</>
	);
};

export default Barbers;
