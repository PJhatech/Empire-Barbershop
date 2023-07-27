import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import logo from "../Images/remove.png";
import ProfileButton from "../Navigation/ProfileButton";
import "./BarberProfile.css";
import BarberIndex from "../BarberIndex";

const BarberProfile = () => {
	// const dispatch = useDispatch();
	// const appointmentReducer = useSelector((state) => state.appointmentReducer);
	// const appointments = Object.values(appointmentReducer);
	const client = useSelector((state) => state.session.user);
	const barber = useSelector((state) => state.session.user);
	// const barberId = barber.id;

	const [isLoaded, setIsLoaded] = useState(true);
	// console.log("<-------check------->", barberId);

	// useEffect(() => {
	// 	dispatch(fetchAppointments());
	// }, [dispatch]);

	// const userTransactions = Object.values(allTransactions).filter(
	//     (transaction) => transaction.user_id === userId
	// );

	return (
		<div className="pageContainer">
			<div className="componentContainter">
				<div className="barberName">{barber.first_name} {barber.last_name }</div>
				<div>
					<NavLink to={"/appointments"}>
						<button className="barberComponents">
							<h1>Appointments</h1>
						</button>
					</NavLink>
				</div>
				<div>
					<NavLink to={"/services"}>
						<button className="barberComponents">
							<h1>services</h1>
						</button>
					</NavLink>
				</div>
				<div>
					<NavLink to={"/register"}>
						<button className="barberComponents">
							<h1>register</h1>
						</button>
					</NavLink>
				</div>
			</div>
			<div className="barberProfile">
				{isLoaded && (
					<>
						<img alt="logo" className="barberimg" src={logo} />
					</>
				)}
			</div>
		</div>
	);
};

export default BarberProfile;
