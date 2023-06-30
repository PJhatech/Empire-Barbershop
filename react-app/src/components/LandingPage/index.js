import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import "./landingPage.css";
import logo from "../Images/logo2.JPG";

const LandingPage = () => {
	// const dispatch = useDispatch();
	// const appointmentReducer = useSelector((state) => state.appointmentReducer);
	// const appointments = Object.values(appointmentReducer);
	const client = useSelector((state) => state.session.user);

	console.log("<-------check------->", client);

	// useEffect(() => {
	// 	dispatch(fetchAppointments());
	// }, [dispatch]);

	// const userTransactions = Object.values(allTransactions).filter(
	//     (transaction) => transaction.user_id === userId
	// );

	return (
		<div className="fullPage">
			<div className="bookNow">
				<div>
					<h1>
					Book Now
					</h1>
						<NavLink to={"/barbers"}>
				<button type="button">Book Now</button>
			</NavLink>
				</div>
			</div>
			<div className="sign">
				<img alt="logoImg" className="logoimg" src={logo} />
			</div>
		</div>
	);
};

export default LandingPage;
