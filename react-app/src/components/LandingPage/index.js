import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import "./landingPage.css";
import logo from "../Images/Logo.JPG";
import ProfileButton from "../Navigation/ProfileButton";


const LandingPage = () => {
	// const dispatch = useDispatch();
	// const appointmentReducer = useSelector((state) => state.appointmentReducer);
	// const appointments = Object.values(appointmentReducer);
	const client = useSelector((state) => state.session.user);
	const sessionUser = useSelector((state) => state.session.user);
	const [isLoaded, setIsLoaded] = useState(true);
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
					<NavLink to={"/barbers"}>
						<button className="book">
							<h1>Book Now</h1>
						</button>
					</NavLink>
				</div>
			</div>
			<div className="sign">
				hi
				<NavLink exact to="/">
					{isLoaded && (
						<>
							<img alt="logoImg" className="logoimg" src={logo} />
							{/* <img alt="logoImg" className="logoimg" src={logo} /> */}
							<ProfileButton user={sessionUser} />
						</>
					)}
				</NavLink>
			</div>
		</div>
	);
};

export default LandingPage;
