import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import logo from "../Images/remove.png";
import concordImg from "../Images/shopimg.jpeg";
import herculesShop from "../Images/herculesShop.jpg";
import ProfileButton from "../Navigation/ProfileButton";
import {fetchLocations, addLocation} from "../../store/location";
import "./LocationPage.css";

const LocationPage = () => {
	const dispatch = useDispatch();
	const locationReducer = useSelector((state) => state.locationReducer);
	const locations = Object.values(locationReducer);

	const [isLoaded, setIsLoaded] = useState(true);
	// console.log("<-------check------->", client);

	useEffect(() => {
		dispatch(fetchLocations());
	}, [dispatch]);

	return (
		<div className="">
			LOCATION PAGE
			<div className="">
				<div>
					{/* <NavLink to={"/barbers"}>
						<button className="">
							<h1>Location</h1>
						</button>
					</NavLink> */}
				</div>
			</div>
			<div className="locationImg">
				<NavLink to={"/barbers"}>
				<img alt="concordImg" className="concordImg" src={concordImg} />
				</NavLink>
				<img alt="herculesShop" className="herculesShop" src={herculesShop} />
				<img alt="locationLog" className="locationLogo" src={logo} />
				{/* <img alt="logoImg" className="logoimg" src={logo} /> */}
				{/* <ProfileButton user={sessionUser} /> */}
			</div>
		</div>
	);
};

export default LocationPage;
