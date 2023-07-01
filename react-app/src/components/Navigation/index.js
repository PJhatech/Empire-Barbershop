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
			<NavLink exact to="/">
				<img alt="poleIcon" className="barberPole" src={barberPole} />
			</NavLink>
			<div className="nav-wrapper">
				<div className="home-icon">
					<div className="shopSign">
						<h2>Clean Cuts Sharp Lines Close Shaves</h2>
					</div>

					<div className="components">
						{/* <h2>Clean Cuts Sharp Lines Close Shaves</h2> */}

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
