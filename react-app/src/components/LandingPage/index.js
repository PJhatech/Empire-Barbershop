import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import "./landingPage.css";
import cut1 from "../Images/cut1.jpg";
import cut2 from "../Images/cut2.jpg";
import cut4 from "../Images/cut4.jpg";
import whitechair from "../Images/whitechar.jpg";
import cut6 from "../Images/cut6.JPG";
import cut3 from "../Images/cut3.jpg";
import cut5 from "../Images/cut5.jpg";
import cut9 from "../Images/cut9.jpg";
import cut10 from "../Images/cut10.jpg";
import cut11 from "../Images/cut11.jpg";
import cut12 from "../Images/cut12.JPG";
import cut14 from "../Images/cut14.jpg";
import cut15 from "../Images/cut15.jpg";
import cut16 from "../Images/cut16.jpg";
import cut17 from "../Images/cut17.jpg";
import cut18 from "../Images/cut18.jpg";
import cut19 from "../Images/cut19.jpg";
import cut20 from "../Images/cut20.jpg";
import pin from "../Images/pin.jpg";
import logo from "../Images/whiteIcon.jpeg";
import bestofeast from "../Images/bestofeast.jpg";
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
			<div className="imgContainer">
				{/* <NavLink exact to="/barber"> */}
				{isLoaded && (
					<div class="scroll-container">
						<img alt="hottowel" width="375" height="300" src={cut16} />
						<img
							alt="bestoftheeast"
							className="logoimg"
							src={bestofeast}
						/>

						<img alt="cape" className="logoimg" src={cut9} />
						<img alt="cut2" className="logoimg" src={cut2} />
						<img alt="tape" className="logoimg" src={cut4} />
						<img alt="tape" className="logoimg" src={cut1} />
						<img alt="jhaCut" className="logoimg" src={cut12} />
						<img alt="hassan" width="280" height="300" src={cut15} />
						<img alt="dariocut" width="290" height="300" src={cut19} />
						<img alt="cut4" width="310" height="300" src={cut3} />
						<img alt="cut4" className="logoimg" src={cut10} />
						{/* <img alt="cut4" width="310" height="300" src={cut5} /> */}
						<img alt="chris" width="425" height="300" src={cut11} />
						{/* <img alt="pin" className="logoimg" src={pin} /> */}
						<img alt="cut4" className="logoimg" src={whitechair} />
						{/* <img alt="ronecut" className="logoimg" src={cut20} /> */}
						<img alt="justin" width="310" height="300" src={cut14} />
						{/* <img alt="cut4" className="logoimg" src={cut17} /> */}
						{/* <img alt="logoImg" className="logoimg" src={logo} /> */}
						{/* <ProfileButton user={sessionUser} /> */}
					</div>
				)}
				{/* </NavLink> */}
			</div>
		</div>
	);
};

export default LandingPage;
