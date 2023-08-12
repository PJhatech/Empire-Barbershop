import React, {useState} from "react";
import {login} from "../../store/session";
import {useDispatch} from "react-redux";
import { useModal } from "../../context/Modal";
import "./ComingSoon.css"


function ComingSoon() {
	const {closeModal} = useModal();



	return (
		<div id="comingsoon-modal" className="fullPageContainer">
			<button id="close-button" onClick={closeModal}>
				X
			</button>
			<div className="comingSoonContainer">
				<div className="content">
					<h1>Content Coming Soon!</h1>
				</div>
			</div>
		</div>
	);
}

export default ComingSoon;
