import React from "react";
import {NavLink, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import ProfileButton from "../Navigation/ProfileButton";
import OpenModalButton from "../OpenModalButton";
import ComingSoon from "../ComingSoon";
import './BarberNavBar.css';

import { ModalProvider, useModal } from "../../context/Modal";

function BarberNavBar({isLoaded}) {
	const sessionUser = useSelector((state) => state.session.user);

	const {setModalContent} = useModal();


	return (
		<div className="BarberNavContainer">
			<div className="BarberNavLinks">{sessionUser.firstName}</div>
			{isLoaded && (
				<div className="userButton">
                  adsklfghjaldksfjgkalksjdflkasdfjl
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</div>
	);
}

export default BarberNavBar;
