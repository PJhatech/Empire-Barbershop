import React, {useState, useEffect} from "react";
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
import './appointments.css'
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
	const appointment = Object.values(appointmentReducer);
	const localizer = momentLocalizer(moment);

	const [date, setDate] = useState()

	useEffect(() => {
		dispatch(fetchAppointments());
	}, [dispatch]);



	//  console.log("<-------AppointmentComponent------->", appointment.date)

	return (
		<>
			{appointment.map((appointment) => (
				<div key={appointment.id}>
					Client: {appointment.client.first_name}
					<br />
					{/* Date: {appointment.date} */}
					{/* {console.log(`${appointment.date}T${appointment.time}`)} */}
					Date: {appointment.date}
					<br />
					Time: {appointment.time}
					<br />
					<OpenModalButton
						buttonText="Delete"
						modalComponent={<AppointmentDeleteModal prop={appointment.id} />}
					/>
					<OpenModalButton
						buttonText="Update"
						modalComponent={<AppointmentUpdateModal prop={appointment} />}
					/>
			<div className="calandercontainer">
				<MyCalendar appointments={appointment} />
			</div>
				</div>
			))}
			<div>
				<OpenModalButton
					buttonText="Create New Appointment"
					modalComponent={<AppointmentForm onClose={closeModal} />}
				/>
			</div>
		</>
	);
};

export default Appointments;
