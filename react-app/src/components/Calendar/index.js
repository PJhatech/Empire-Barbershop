import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {fetchAppointments} from "../../store/appointment";

const MyCalendar = () => {
	const localizer = momentLocalizer(moment);
	const dispatch = useDispatch();
	const appointmentReducer = useSelector((state) => state.appointmentReducer);

	const appointment = React.useMemo(() => Object.values(appointmentReducer), [appointmentReducer]);

	const [date, setDate] = useState([]);
	const [time, setTime] = useState({});

	useEffect(() => {
		let dateArr = [];
		let timeArr = [];

		appointment.forEach((app) => {
			dateArr.push(app.date);
			timeArr.push(app.time);
		});

		setDate(dateArr);
		setTime(timeArr);
	}, [appointment]);




const event = date.map((dateItem, index) => {
	const inputDateString = `${dateItem}${time[index]}`;
	const startDate = new Date(`${inputDateString.slice(0, 10)}T${inputDateString.slice(10)}:00`);


	const endDate = new Date(startDate);
	endDate.setMinutes(endDate.getMinutes() + 45);

	return {
		start: startDate,
		end: endDate,
		title: "Test Event",
	};
});
	// console.log("<----here--->", moment().format(appointments.date));

	return (
		<>
			<div className="Calander">
				<Calendar
					localizer={localizer}
					defaultDate={new Date()}
					defaultView="day"
					events={event}
					views={["day", "week", "month"]}
					style={{height: "400px"}}
				/>
			</div>
		</>
	);
};

export default MyCalendar;
