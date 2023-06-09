import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import "./landingPage.css"

const LandingPage = () => {
	// const dispatch = useDispatch();
	// const appointmentReducer = useSelector((state) => state.appointmentReducer);
	// const appointments = Object.values(appointmentReducer);

	// console.log("<-------1------->", appointments);

	// useEffect(() => {
	// 	dispatch(fetchAppointments());
	// }, [dispatch]);

	// const userTransactions = Object.values(allTransactions).filter(
	//     (transaction) => transaction.user_id === userId
	// );

	return (
        <div className="sign">
        <h1>Empire Barbershop</h1>

		</div>
	);
};

export default LandingPage;
