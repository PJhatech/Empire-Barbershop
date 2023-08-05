import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useModal} from "../../context/Modal";
import {NavLink, useParams} from "react-router-dom";
import {destroyService} from "../../store/service";

const DeleteLocation = ({location}) => {
	const dispatch = useDispatch();
	// const {serviceId} = useParams();
	const {closeModal} = useModal();

	// console.log("<-------Services------->", serviceReducer);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (location) {
			dispatch(destroyService(location)).then(() => closeModal());
		}
	};

	return (
		<div>
			<h1>Confirm Delete</h1>
			<p>Are you sure you want to delete this Service?</p>
			<button className="button-class-submit" type="submit" onClick={handleSubmit}>
				Delete Service
			</button>
			<button onClick={closeModal}>Keep Service</button>
		</div>
	);
};

export default DeleteLocation;
