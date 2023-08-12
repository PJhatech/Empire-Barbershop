import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAppointments, updateAppointment} from "../../store/appointment";
import {fetchServices} from "../../store/service";
import {fetchClients} from "../../store/client";
import {fetchBarbers} from "../../store/barber";
import {useModal} from "../../context/Modal";
import Clients from "../Clients";

const AppointmentUpdateModal = (selectedAppointment) => {
	const dispatch = useDispatch();
	const appointmentReducer = useSelector((state) => state.appointmentReducer);
	const serviceReducer = useSelector((state) => state.serviceReducer);
	const appointment = Object.values(appointmentReducer);
	const clientReducer = useSelector((state) => state.clientReducer);
	const clients = Object.values(clientReducer);
	const services = Object.values(serviceReducer);
	const {closeModal} = useModal();

	console.log("<-------UpdateAppointmentComponent------->", clients);

	useEffect(() => {
		dispatch(updateAppointment());
		dispatch(fetchServices());
		dispatch(fetchClients());
		// dispatch(fetchBarbers())
	}, [dispatch]);

	const [selectedBarber, setSelectedBarber] = useState(appointment.barber_id);
	const [selectedService, setSelectedService] = useState(appointment.service_id);
	const [client, setClient] = useState(appointment.client_id);
	const [date, setDate] = useState(appointment.date);
	const [time, setTime] = useState(appointment.time);
	const [repeat, setRepeat] = useState(appointment.repeat);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const appointmentData = {
			barber_id: selectedBarber,
			service_id: selectedService,
			client_id: client,
			date: date,
			time: time,
			repeat: repeat,
		};

		await dispatch(updateAppointment(appointment[0].id, appointmentData));
		dispatch(fetchAppointments());
		closeModal();
	};
function getTimeOptions() {
	const times = [];

	for (let i = 8; i <= 22; i++) {
		let hour = i > 12 ? i - 12 : i;
		const meridian = i < 12 ? "AM" : "PM";

		times.push(`${hour}:00 ${meridian}`);
		if (i !== 22) times.push(`${hour}:30 ${meridian}`);
	}

	return times.map((time, index) => (
		<option key={index} value={time}>
			{time}
		</option>
	));
}
	// console.log("<---here--->",times)

	return (
		<div>
			<button id="close-button" onClick={closeModal}>
				X
			</button>
			<form onSubmit={handleSubmit}>
				<div className="updatemodal-container">
					{/* <div>
				<label>
					Barber:
					<select
						value={selectedBarber}
						onChange={(e) => setSelectedBarber(e.target.value)}
					>
						{barbers.map((barbers) => (
							<option key={barbers.id} value={barbers.id}>
								{barbers.first_name}
							</option>
						))}
					</select>
				</label>
			</div> */}
					<div className="updatemodal-row">
						<p>Service:</p>
						<div className="updatemodal-row2">
							<label>
								<select
									value={selectedService}
									onChange={(e) => setSelectedService(e.target.value)}
								>
									{services.map((service) => (
										<option key={service.id} value={service.id}>
											{service.service_name}
										</option>
									))}
								</select>
							</label>
						</div>
						<p>Client:</p>
						<div className="updatemodal-row2">
							<label>
								<select value={client} onChange={(e) => setClient(e.target.value)}>
									{clients.map((client) => (
										<option key={client.id} value={client.id}>
											{`${client.first_name} ${client.last_name}`}
										</option>
									))}
								</select>
							</label>
						</div>
					</div>
					<div className="updatemodal-row"></div>
					<div className="updatemodal-row">
						<p>Date:</p>
						<div className="updatemodal-row2">
							<label>
								<input
									type="date"
									id="date"
									value={date}
									onChange={(e) => setDate(e.target.value)}
								/>
							</label>
						</div>
						<p>Time:</p>
						<div className="updatemodal-row2">
							<select value={time} onChange={(e) => setTime(e.target.value)}>
								{getTimeOptions()}
							</select>
						</div>
					</div>
					<div className="updatemodal-row"></div>
					<div className="updatemodal-row">
						<p>Repeat:</p>
						<div className="updatemodal-row2">
							<label>
								<select value={repeat} onChange={(e) => setRepeat(e.target.value)}>
									<option value="None">None</option>
									<option value="1 Week">1 Week</option>
									<option value="2 Week">2 Week</option>
									<option value="3 Week">3 week</option>
									<option value="1 Month">1 Month</option>
									<option value="2 Month">2 Month</option>
								</select>
							</label>
							<button id="update-button" type="submit">
								Submit
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AppointmentUpdateModal;
