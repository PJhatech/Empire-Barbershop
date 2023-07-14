import React, {useState} from "react";
import {login} from "../../store/session";
import {useDispatch} from "react-redux";
import { useModal } from "../../context/Modal";
import "./ComingSoon.css"


function ComingSoon() {
	const {closeModal} = useModal();



	return (
		<div className="page">
            <h1>Coming Soon!</h1>
		</div>
	);
}

export default ComingSoon;
