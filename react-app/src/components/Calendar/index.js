import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const MyCalendar = ({appointments}) => {
	const localizer = momentLocalizer(moment);
	console.log(appointments)
	const inputDateString = `${appointments.date}${appointments.time}`;
	const dateObj = new Date(`${inputDateString.slice(0, 10)}T${inputDateString.slice(10)}`);
	const addTo = dateObj.setMinutes(dateObj.getMinutes() + 45);
	const newDate = dateObj.toISOString();
	const endTime = dateObj.toISOString();

	const event = [
		{
			start: moment(newDate).toDate(),
			end: moment(endTime).toDate(),
			title: `${appointments.client.first_name}`,
		},
	];
	// console.log("<----here--->", moment().format(appointments.date));

	return (
		<>
			<div className="Calander">
				<Calendar
					localizer={localizer}
					defaultDate={new Date()}
					defaultView="day"
					events={event}
					views={["day", "week"]}
					style={{height: "400px"}}
				/>
			</div>
		</>
	);
};

export default MyCalendar;
