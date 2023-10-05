import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useModal} from "../../context/Modal";
import {NavLink, useParams} from "react-router-dom";
import { destroyLocation } from "../../store/location";

const DeleteLocation = ({location}) => {
	const dispatch = useDispatch();
	// const {serviceId} = useParams();
	const {closeModal} = useModal();

	// console.log("<-------delete------->", location);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (location) {
			dispatch(destroyLocation(location.id)).then(() => closeModal());
		}
	};

	return (
		<div id="location-delete-modal" className="deletemodal">
			<h1 className="confirm-delete-txt">Confirm Delete</h1>
			<p>Are you sure you want to delete this location?</p>
			<button className="deletesubmit-button" type="submit" onClick={handleSubmit}>
				Delete Location?
			</button>
			<button onClick={closeModal}>Keep Location</button>
		</div>
	);
};

export default DeleteLocation;
