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
import BarberNavBar from "./BarberNavBar";
import DefaultNavBar from "./DefaultNav";

function Navigation({isLoaded}) {
	const sessionUser = useSelector((state) => state.session.user);
	const location = useLocation();

	const { setModalContent } = useModal();



	return (
		<div>
			{location.pathname !== "/barberprofile" ? <DefaultNavBar isLoaded={isLoaded}/> : <BarberNavBar isLoaded={isLoaded} />}

		</div>
	);
}

export default Navigation;
