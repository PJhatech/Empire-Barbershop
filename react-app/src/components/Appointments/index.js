import React, {useState, useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import {useParams} from "react-router-dom";
import {fetchAppointments} from "../../store/appointment";
import AppointmentUpdateModal from "../AppointmentUpdateModal";
import AppointmentDeleteModal from "../AppointmentDeleteModal";
import AppointmentForm from "../AppointmentForm";
import {fetchClientIndex, fetchClients} from "../../store/client";
import {useModal} from "../../context/Modal";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./appointments.css";
import MyCalendar from "../Calendar";

function formatDate(dateString) {
	const date = new Date(dateString);
	const day = date.getDate();
	const month = date.toLocaleString("default", {month: "long"});
	const year = date.getFullYear();

	function getOrdinal(n) {
		const s = ["th", "st", "nd", "rd"],
			v = n % 100;
		return n + (s[(v - 20) % 10] || s[v] || s[0]);
	}

	return `${month} ${getOrdinal(day)}, ${year}`;
}

function daysAgo(dateString) {
	const date = new Date(dateString);
	const now = new Date();
	const timeDiff = now - date;
	const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
	return daysDiff;
}

const Appointments = () => {
	const dispatch = useDispatch();
	const appointmentReducer = useSelector((state) => state.appointmentReducer);
	const closeModal = useModal();
	console.log('<------appointReduercer------>',appointmentReducer)
	const appointment = useMemo(() => Object.values(appointmentReducer), [appointmentReducer]);
	const localizer = momentLocalizer(moment);

	const [date, setDate] = useState();
	const [time, setTime] = useState();

	useEffect(() => {
		dispatch(fetchAppointments());
	}, [dispatch]);

	useEffect(() => {
		const mapDate = appointment.map((app) => {
			let data = app.date;
			return data;
		});
		const mapTime = appointment.map((app) => {
			let data = app.time;
			return data;
		});

		setDate(mapDate);
		setTime(mapTime);
	}, [appointment]);

	return (
		<>
			<div className="appointment-container">
				<div className="appointment-row">
					<div className="calandercontainer">
						<MyCalendar />
					</div>
					<OpenModalButton
						className="appointmentform-button"
						buttonText="Create New Appointment"
						modalComponent={<AppointmentForm onClose={closeModal} />}
					/>
				</div>
				<div className="info-column">
					{appointment.map((appointment) => (
						<div key={appointment.id}>
							<div className="client-appointment">
								<h3>Client:</h3>
								<p>
									{appointment.client.first_name}
									{appointment.client.last_name}
								</p>
								<p>
									Date: {formatDate(appointment.date)}
									<br />
									Time: {appointment.time}
								</p>
								<OpenModalButton
									buttonText="Delete"
									modalComponent={<AppointmentDeleteModal prop={appointment.id} />}
								/>
								<OpenModalButton
									buttonText="Update"
									modalComponent={<AppointmentUpdateModal prop={appointment} />}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Appointments;
