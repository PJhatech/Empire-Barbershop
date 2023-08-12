import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useModal} from "../../context/Modal";
import {NavLink, useParams} from "react-router-dom";
import { destroyAppointment } from "../../store/appointment";
import './AppointmentDeleteModal.css'


const AppointmentDeleteModal = (appointment) => {
	const dispatch = useDispatch();
	// const {serviceId} = useParams();
	const appointmentReducer = useSelector((state) => state.appointmentReducer);
	const {closeModal} = useModal();
	const selectedAppointment = Object.values(appointment);

	// console.log("<-------Services------->", appointmentReducer);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (selectedAppointment) {
			dispatch(destroyAppointment(selectedAppointment)).then(() => closeModal());
		}
	};

	return (
		<div className="deletemodal">
			<h2 className="confirm-delete-txt">Confirm Delete</h2>
			Are you sure you want to delete this Appointment?
			<button
				className="deletesubmit-button"
				type="submit"
				onClick={handleSubmit}
			>
				Delete Appointment
			</button>
			<button onClick={closeModal}>Keep Appointment</button>
		</div>
	);
};

export default AppointmentDeleteModal;
