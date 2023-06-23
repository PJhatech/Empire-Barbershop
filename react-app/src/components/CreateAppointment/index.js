import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import { createAppointment, fetchAppointments } from "../../store/appointment";
import {createService} from "../../store/service"

const CreateAppointmentForm = () => {
	const dispatch = useDispatch();
	const appointmentReducer = useSelector((state) => state.appointmentReducer);
    const serviceReducer = useSelector((state) => state.serviceReducer)
    const appointments = Object.values(appointmentReducer);

	console.log("<-------AppointmentComponent------->", appointments);

	useEffect(() => {
        dispatch(createAppointment());
        dispatch(createService());
	}, [dispatch]);

    const [service, setAddress] = useState();
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [repeat, setRepeat] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const appointment = {
			service, date, time, repeat };
        const newAppointment = await dispatch(createAppointment(appointment));

    }
	// const userTransactions = Object.values(allTransactions).filter(
	//     (transaction) => transaction.user_id === userId
	// );

	return (
		<>
			<h1>Create Appointment</h1>
			{/* <form onSubmit={handleSubmit}>
				<label>
					Service:
					<input
						type="text"
						value={service}
						onChange={handleServiceChange}
					/>
				</label>
				<br />
				<label>
					Date:
					<input
						type="date"
						value={date}
						onChange={handleDateChange}
					/>
				</label>
				<br />
				<label>
					Time:
					<input
						type="time"
						value={time}
						onChange={handleTimeChange}
					/>
				</label>
				<br />
				<label>
					Repeat:
					<input
						type="text"
						value={repeat}
						onChange={handleRepeatChange}
					/>
				</label>
				<br />
				<button type="submit" value="Submit">Save Appointment</button> */}
			{/* </form> */}
			{/* <NavLink to={`/appointments/${.id}/edit`}>
				<button type="submit">Update</button>
			</NavLink> */}
		</>
	);
};

export default CreateAppointmentForm;
