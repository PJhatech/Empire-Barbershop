import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import "./landingPage.css";
import cut1 from "../Images/cut1.jpg"
import cut2 from "../Images/cut2.jpg"
import cut4 from "../Images/cut4.jpg"
import cut5 from "../Images/whitechar.jpg"
import cut6 from "../Images/cut6.JPG"
import cut7 from "../Images/cut7.jpg"
import cut8 from "../Images/cut8.jpg"
import cut9 from "../Images/cut9.jpg"
import cut10 from "../Images/cut10.jpg"
import cut11 from "../Images/cut11.jpg"
import cut12 from "../Images/cut12.JPG"
import cut13 from "../Images/cut13.JPG"
import logo from "../Images/whiteIcon.jpeg";
import bestofeast from "../Images/bestofeast.jpg"
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
					<NavLink to={"/locations"}>
						<button className="book">
							<h1>Book Now</h1>
						</button>
					</NavLink>
				</div>
			</div>
			<div className="sign">
				<NavLink exact to="/barber">
					{isLoaded && (
						<div class="scroll-container">
							<img
								alt="bestoftheeast"
								className="logoimg"
								src={bestofeast}
							/>

							<img alt="cut1" className="logoimg" src={cut1} />
							<img alt="cut2" className="logoimg" src={cut2} />
							<img alt="cut4" className="logoimg" src={cut4} />
							{/* <img alt="cut4" className="logoimg" src={cut6} /> */}
							<img alt="cut4" width="310" height="300" src={cut7} />
							<img alt="cut4" className="logoimg" src={cut9} />
							<img alt="cut4" width="310" height="300" src={cut8} />
							<img alt="cut4" className="logoimg" src={cut10} />
							<img alt="cut4"  width="400" height="300" src={cut11} />
							<img alt="cut4" className="logoimg" src={cut12} />
							{/* <img alt="cut4" className="logoimg" src={cut13} /> */}
							<img alt="cut4" className="logoimg" src={cut5} />
							{/* <img alt="logoImg" className="logoimg" src={logo} /> */}
							{/* <ProfileButton user={sessionUser} /> */}
						</div>
					)}
				</NavLink>
			</div>
		</div>
	);
};

export default LandingPage;
