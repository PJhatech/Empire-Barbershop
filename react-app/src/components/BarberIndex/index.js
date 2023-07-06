import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import { fetchBarberIndex } from "../../store/barber";
import "./barberIndex.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const BarberIndex = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const barberReducer = useSelector((state) => state.barberReducer);
	const barber = Object.values(barberReducer);

	// console.log("<-------BarberIndex------->", barberReducer);

	useEffect(() => {
		dispatch(fetchBarberIndex(id));
	}, [dispatch, id]);

	// const userTransactions = Object.values(allTransactions).filter(
	//     (transaction) => transaction.user_id === userId
	// );

	return (
        <>
            BarberIndex
            <h1>{barber.first_name}</h1>
			<div>
				{barber.map((barber) => (
					<div key={barber.id}>
                        <NavLink exact to={`/barbers/${barber.id}`}>
							{barber.first_name}
							<br/>
						    {barber.last_name}
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

export default BarberIndex;
