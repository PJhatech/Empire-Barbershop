import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {fetchServices, createService} from "../../store/service";


const ServiceForm = () => {
	const dispatch = useDispatch();
	const serviceReducer = useSelector((state) => state.serviceReducer);
	const services = Object.values(serviceReducer);

	console.log("<-------CreateServiceComponent------->", services);

	useEffect(() => {
		// dispatch(fetchServices());
		dispatch(createService());
	}, [dispatch]);

	const [serviceName, setServiceName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState();
	const [timeFrame, setTimeFrame] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const service = {
			service_name: serviceName,
			description, price,
			time_frame: timeFrame
		};
		const newService = await dispatch(createService(service));

		if (newService) {
			// redirect to new service (serviceIndex)
		}

		// history.push(`/spots/${newService.id}`);
		// dispatch(spotIndexThunk(newService.id));
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Service Name:
				<input
					type="text"
					id="serviceName"
					value={serviceName}
					onChange={(e) => setServiceName(e.target.value)}
					required
				/>
			</label>

			<label>
				Description:
				<input
					type="text"
					id="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</label>

			<label>
				Price:
				<input
					type="text"
					id="price"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					required
				/>
			</label>

			<label>
				Time Frame:
				<select
					value={timeFrame}
					onChange={(e) => setTimeFrame(e.target.value)}
					required
				>
					<option value="30 Mins">30 Mins</option>
					<option value="45 Mins">45 Mins</option>
					<option value="60 Mins">60 Mins</option>
					<option value="90 Mins">90 Mins</option>
					<option value="90 Mins">90 Mins</option>
				</select>
			</label>
			{/* <input
				type="text"
				id="timeFrame"
				value={timeFrame}
				onChange={(e) => setTimeFrame(e.target.value)}
				required
			/> */}

			<button type="submit">Submit</button>
		</form>
	);
};

export default ServiceForm;
