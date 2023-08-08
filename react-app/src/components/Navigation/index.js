import React, {useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import ProfileButton from "./ProfileButton";
import barberPole from "../Images/barberPoleLogo.JPG";
import whitePole from "../Images/whitepole.PNG";
import OpenModalButton from "../OpenModalButton";
import ComingSoon from "../ComingSoon";
import {ModalProvider, useModal} from "../../context/Modal";
import "./Navigation.css";

function Navigation({isLoaded}) {
	const sessionUser = useSelector((state) => state.session.user);
	const location = useLocation();

	const { setModalContent } = useModal();
	const [show, setshow] = useState(true);

	let navColor =
		location.pathname === "/" ||
		location.pathname === "/appointments" ||
		location.pathname === "/barberprofile"
			? "black"
			: "initial";
	let shopNameColor =
		location.pathname === "/" ||
		location.pathname === "/appointments" ||
		location.pathname === "/barberprofile"
			? "white"
			: "black";

	return (
		<div className="navigation-container" style={{backgroundColor: navColor}}>
			<div className="barberPole-wrapper">
				<div>
					<NavLink exact to="/">
						{location.pathname === "/" ||
						location.pathname === "/appointments" ||
						location.pathname === "/barberprofile" ? (
							<img alt="poleIcon" className="barberPole" src={whitePole} />
						) : (
							<img alt="poleIcon" className="barberPole" src={barberPole} />
						)}
					</NavLink>
				</div>
				<div className="components">
					<div className="shopName" style={{color: shopNameColor}}>
						{location.pathname === "/barberprofile" ?
							<h1>{sessionUser.first_name} {sessionUser.last_name}</h1> : <h1> Empire BarberShop </h1>}
					</div>
					<div className="h2Tags">
						{location.pathname === "/barberprofile" ? null :
						<NavLink to={"/locations"}> <h2>Book Now</h2> </NavLink>}
						<NavLink exact to="/">
							<h2> Home</h2>
						</NavLink>
						{location.pathname === "/barberprofile" ? null :
							<h2 onClick={() => setModalContent(<ComingSoon />)}> Gift Cards</h2>}

						<h2 onClick={() => setModalContent(<ComingSoon />)}> Shop</h2>
						{sessionUser ? (
							<NavLink to={"/barberprofile"}>
								<h2> Barber Profile</h2>
							</NavLink>
						) : null}
						{isLoaded && (
							<div className="userButton">
								{/* <h2>Barber Profile</h2> */}
								<ProfileButton user={sessionUser} />
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navigation;
