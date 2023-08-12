import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {fetchServices, createService, updateService} from "../../store/service";
import {useModal} from "../../context/Modal";

const ServiceUpdateModal = (selectedService) => {
	const dispatch = useDispatch();
	const serviceReducer = useSelector((state) => state.serviceReducer);
	const service = Object.values(selectedService);
	const {closeModal} = useModal();

	console.log("<-------CreateServiceComponent------->", service[0]);

	// useEffect(() => {
	// 	dispatch(updateService());
	// 	dispatch(fetchServices());
	// }, [dispatch]);

	const [serviceName, setServiceName] = useState(service.service_name);
	const [description, setDescription] = useState(service.description);
	const [price, setPrice] = useState(service.price);
	const [timeFrame, setTimeFrame] = useState(service.time_frame);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const serviceData = {
			service_name: serviceName,
			description: description,
			price: price,
			time_frame: timeFrame,
		};

		await dispatch(updateService(service[0].id, serviceData));
		fetchServices();
		closeModal();
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
			<button id="serviceclose-button" onClick={closeModal}>
				X
			</button>
				<div id="serviceupdate-modal" className="updatemodal-container">
					<div className="updatemodal-row">
						<p>Service:</p>
						<div className="updatemodal-row2">
							<label>
								<input
									type="text"
									id="serviceName"
									value={serviceName}
									onChange={(e) => setServiceName(e.target.value)}
									required
								/>
							</label>
						</div>
						<p>Price:</p>
						<div className="updatemodal-row2">
							<label>
								<input
									type="text"
									id="price"
									value={price}
									onChange={(e) => setPrice(e.target.value)}
									required
								/>
							</label>
						</div>
					</div>

					<div className="updatemodal-row">
						<p>Description:</p>
						<p>Time Frame:</p>
						<div className="updatemodal-row2">
							<label>
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
						</div>
					</div>
					<div className="updatemodal-description">
						<label>
							<textarea
								style={{height: "100px", width: "515px", fontSize: "20px"}}
								type="text"
								id="description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</label>
					</div>

					<button id="serviceupdate-button" type="submit">
						Update Service
					</button>
				</div>
			</form>
		</div>
	);
};

export default ServiceUpdateModal;
