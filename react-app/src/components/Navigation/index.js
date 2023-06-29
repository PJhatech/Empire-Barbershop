import React from "react";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import ProfileButton from "./ProfileButton";
import barberPole from "../Images/barberPoleLogo.JPG";
import "./Navigation.css";

function Navigation({isLoaded}) {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<div id="navigation-container">
			<img alt="poleIcon" className="barberPole" src={barberPole} />
			<div className="home-icon">
				<h1>Empire BarberShop</h1>
				<div className="nav-wrapper">
					<div>
						<h2>Book</h2>
						<h2>Loggin</h2>
						
						<NavLink exact to="/">
							{isLoaded && (
								<>
									<ProfileButton user={sessionUser} />
								</>
							)}
						</NavLink>
					</div>
				</div>


				{/* <NavLink to={"/barbers"}>
				<button type="button">Book Now</button>
			</NavLink> */}
			</div>
		</div>
	);
}

export default Navigation;
