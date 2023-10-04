import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createAppointment, fetchAppointments} from "../../store/appointment";
import {fetchServices} from "../../store/service";
import {fetchClients} from "../../store/client";

const generateDates = (start, end, interval) => {
	const dateArr = [];
	let currentDate = new Date(start);

	while (currentDate <= end) {
		dateArr.push(currentDate.toISOString().split("T")[0]);

		switch (interval) {
			case "week":
				currentDate.setDate(currentDate.getDate() + 7);
				break;
			case "month":
				currentDate.setMonth(currentDate.getMonth() + 1);
				break;
			case "year":
				currentDate.setFullYear(currentDate.getFullYear() + 1);
				break;
			default:
				currentDate.setDate(currentDate.getDate() + 1);
				break;
		}
	}

	return dateArr;
};

const AvailableDates = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const appointmentReducer = useSelector((state) => state.appointmentReducer);
	const serviceReducer = useSelector((state) => state.serviceReducer);
	const appointments = Object.values(appointmentReducer);
	const clientReducer = useSelector((state) => state.clientReducer);
	const clients = Object.values(clientReducer);
	const services = Object.values(serviceReducer);

	const [selectedService, setSelectedService] = useState("");
	const [date, setDate] = useState("");
	const [availableDates, setAvailableDates] = useState([]);
	const [time, setTime] = useState("");
	const [repeat, setRepeat] = useState("None");
	const [client, setClient] = useState("");

	useEffect(() => {
		dispatch(createAppointment());
		// dispatch(fetchAppointments());
		// dispatch(fetchServices());
		dispatch(fetchClients());
	}, [dispatch]);

	// this useEffect is causing a infinite loop
	// useEffect(() => {
	// 	setAvailableDates((prevDates) =>
	// 		prevDates.filter(
	// 			(date) => !appointments.some((app) => app.date === date)
	// 		)
	// 	);
	// }, [appointments]);

	useEffect(() => {
		const start = new Date();
		const end = new Date();
		end.setMonth(end.getMonth() + 3);
		setAvailableDates(generateDates(start, end, "week"));
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const appointment = {
			barber_id: user.id,
			service_id: Number(selectedService),
			client_id: Number(client),
			date,
			time,
			repeat,
		};
		if (appointment) {
			const newAppointment = await dispatch(
				createAppointment(appointment)
			);
		}
	};

	return (
		<>
			<h1>Available Dates</h1>
			<form onSubmit={handleSubmit}>

				<label>
					Date:
					<select>
						<input
							type="date"
							id="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
							required
						/>
						{availableDates.map((availableDate, index) => (
							<option key={index} value={availableDate}>
								{availableDate}
							</option>
						))}
					</select>
				</label>

				<label>
					Time:
					<input
						type="time"
						id="time"
						value={time}
						onChange={(e) => setTime(e.target.value)}
						required
					/>
				</label>
			</form>
		</>
	);
};

export default AvailableDates;
