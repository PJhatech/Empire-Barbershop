import React from "react";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({isLoaded}) {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<ul id="navigation-container">
			<div className="home-icon">
				<NavLink exact to="/">
					Home
				{isLoaded && (
					<>
						<ProfileButton user={sessionUser} />
					</>
				)}
				</NavLink>
			</div>
			<NavLink to={"/barbers"}>
				<button type="button">Book Now</button>
			</NavLink>
		</ul>
	);
}

export default Navigation;
