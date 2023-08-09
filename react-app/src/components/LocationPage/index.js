import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import logo from "../Images/remove.png";
import concordImg from "../Images/shopimg.jpeg";
import herculesShop from "../Images/herculesShop.jpg";
import ProfileButton from "../Navigation/ProfileButton";
import {fetchLocations, addLocation} from "../../store/location";
import "./LocationPage.css";
import OpenModalButton from "../OpenModalButton";
import ComingSoon from "../ComingSoon";
import {ModalProvider, useModal} from "../../context/Modal";

const LocationPage = () => {
	const dispatch = useDispatch();
	const locationReducer = useSelector((state) => state.locationReducer);
	const locations = Object.values(locationReducer);

	const [isLoaded, setIsLoaded] = useState(true);
	const {setModalContent} = useModal();

	useEffect(() => {
		dispatch(fetchLocations());
	}, [dispatch]);

	return (
		<div className="">
			<div className="locationImg">
				{/* <NavLink to={"/barbers"}> */}
				<img
					alt="concordImg"
					className="concordImg"
					src={concordImg}
					onClick={() => setModalContent(<ComingSoon />)}
				/>
				{/* </NavLink> */}
				<img
					alt="herculesShop"
					className="herculesShop"
					src={herculesShop}
					onClick={() => setModalContent(<ComingSoon />)}
				/>
				<img alt="locationLog" className="locationLogo" src={logo} />
			</div>
		</div>
	);
};

export default LocationPage;
