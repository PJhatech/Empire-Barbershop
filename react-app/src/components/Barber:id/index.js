import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import { fetchBarberById } from "../../store/barber";
import "./barber:id.css";

const BarberById = () => {
	const dispatch = useDispatch();
	const barberReducer = useSelector((state) => state.barberReducer);
	const barber = Object.values(barberReducer);

	console.log("<-------1------->", barberReducer);

	useEffect(() => {
		dispatch(fetchBarberById());
	}, [dispatch]);

	// const userTransactions = Object.values(allTransactions).filter(
	//     (transaction) => transaction.user_id === userId
	// );

	return (
        <>
            barber
            <h1>{barber.first_name}</h1>
			<div>
				{barber.map((barber) => (
					<div key={barber.id}>
                        <NavLink exact to={`/barbers/${barber.id}`}>
						    {barber.first_name}
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

export default BarberById;
