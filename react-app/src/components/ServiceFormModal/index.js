import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {fetchServices, createService} from "../../store/service";
import {useModal} from "../../context/Modal";

const ServiceFormModal = () => {
	const dispatch = useDispatch();
	const serviceReducer = useSelector((state) => state.serviceReducer);
	const services = Object.values(serviceReducer);
	const {closeModal} = useModal();

	// console.log("<-------CreateServiceComponent------->", services);

	useEffect(() => {
		dispatch(createService());
		dispatch(fetchServices());
	}, [dispatch]);

	const [serviceName, setServiceName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState();
	const [timeFrame, setTimeFrame] = useState("30 Mins");
	const [errors, setErrors] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const service = {
			service_name: serviceName,
			description,
			price:Number(price),
			time_frame: timeFrame,
		};
		console.log('<------3----.>',service)
		if (service) {
			dispatch(createService(service))
			.then((service) => {
				if (service) {
					closeModal();
					dispatch(fetchServices());
				}
			});
		}
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
									onChange={(e) => {
										setServiceName(e.target.value);
										setErrors([]);
									}}
									required
								/>
							</label>
						</div>
						<p>Price:</p>
						<div className="updatemodal-row2">
							<label>
								<input
									type="number"
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
						Add Service
					</button>
				</div>
			</form>
			{errors && (
				<div>
					{errors.map((error, index) => (
						<p key={index}>{error}</p>
					))}
				</div>
			)}
		</div>
	);
};

export default ServiceFormModal;
