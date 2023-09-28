import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, {useState, useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import { fetchAppointments } from "../../store/appointment";
import './Calendar.css'

const MyCalendar = () => {
	const localizer = momentLocalizer(moment);
	const dispatch = useDispatch();
	const appointmentReducer = useSelector((state) => state.appointmentReducer);

	const appointment = useMemo(() => Object.values(appointmentReducer), [appointmentReducer]);
	// console.log('<---usememo-->', useMemo)

	const [date, setDate] = useState([]);
	const [time, setTime] = useState([]);
	const [clientName, setClientName] = useState([]);

	useEffect(() => {
		let dateArr = [];
		let timeArr = [];
		let clientNameArr = [];

		appointment.forEach((app) => {
			dateArr.push(app.date);
			timeArr.push(app.time);
			clientNameArr.push(`${app.client.first_name} ${app.client.last_name}`);
		});

		setDate(dateArr);
		setTime(timeArr);
		setClientName(clientNameArr);
	}, [appointment]);

	const events = date.map((dateItem, index) => {
		const inputDateString = `${dateItem}${time[index]}`;
		const startDate = new Date(`${inputDateString.slice(0, 10)}T${inputDateString.slice(10)}:00`);

		const endDate = new Date(startDate);
		endDate.setMinutes(endDate.getMinutes() + 45);

		return {
			start: startDate,
			end: endDate,
			title: clientName[index] ,
		};
	});

	return (
		<>
			<div className="Calander">
				<Calendar
					localizer={localizer}
					defaultDate={new Date()}
					defaultView="day"
					events={events}
					views={["day", "week", "month"]}
					style={{height: "700px"}}
				/>
			</div>
		</>
	);
};

export default MyCalendar;
