import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useModal} from "../../context/Modal";
import {NavLink, useParams} from "react-router-dom";


const AddServiceButton = (service) => {
	const dispatch = useDispatch();
	// const {serviceId} = useParams();
	const serviceReducer = useSelector((state) => state.serviceReducer);
	const {closeModal} = useModal();
	const selectedService = Object.values(service);

	// console.log("<-------Services------->", serviceReducer);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (selectedService) {
			dispatch(destroyService(selectedService)).then(() => closeModal());
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

export default DeleteService;
