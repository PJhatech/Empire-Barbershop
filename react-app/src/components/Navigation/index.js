import React from "react";
import {NavLink, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import ProfileButton from "./ProfileButton";
import barberPole from "../Images/barberPoleLogo.JPG";
import whitePole from "../Images/whitepole.PNG";
import "./Navigation.css";

function Navigation({isLoaded}) {
	const sessionUser = useSelector((state) => state.session.user);
	const location = useLocation();
	let navColor = location.pathname === "/" ? "black" : "initial";

	return (
		<div
			className="navigation-container"
			style={{backgroundColor: navColor}}
		>
			<div className="barberPole-wrapper">
				<div>
					<NavLink exact to="/">
						{location.pathname !== "/" ? (
							<img
								alt="poleIcon"
								className="barberPole"
								src={barberPole}
							/>
						) : (
							<img
								alt="poleIcon"
								className="barberPole"
								src={whitePole}
							/>
						)}
					</NavLink>
				</div>
				<div className="components">
					<div className="shopName">
					<h1> Empire BarberShop </h1>

					</div>
					{isLoaded && (
						<div className="userButton">
							<ProfileButton user={sessionUser} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Navigation;
