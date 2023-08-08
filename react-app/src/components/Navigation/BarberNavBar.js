import React from "react";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import ComingSoon from "../ComingSoon";
import barberPole from "../Images/whitepole.PNG";
import {ModalProvider, useModal} from "../../context/Modal";

function BarberNavBar({isLoaded}) {
	const sessionUser = useSelector((state) => state.session.user);

	const {setModalContent} = useModal();

	return (
			<div className="barbercontainer">
				<div>
					<NavLink exact to="/">
						<img alt="poleIcon" className="barberPole" src={barberPole} />
					</NavLink>
				</div>
				<div>
					<div className="profileName">
						<h1>
							askjdfhkjsadfh
							{sessionUser.first_name} {sessionUser.last_name}
						</h1>
					</div>
					<div className="h2Tags">
						<NavLink exact to="/">
							<h2> Home</h2>
						</NavLink>
						{isLoaded && (
							<div className="userButton">
								{/* <h2>Barber Profile</h2> */}
								<ProfileButton user={sessionUser} />
							</div>
						)}
					</div>
				</div>
			</div>

	);
}

export default BarberNavBar;
