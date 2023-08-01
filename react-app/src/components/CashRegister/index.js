import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import {fetchRegister} from "../../store/cashRegister";
import {useModal} from "../../context/Modal";
import {fetchServices} from "../../store/service";
import Services from "../Services";
import PostTransactionModal from "../PostTransactionModal";
import OpenModalButton from "../OpenModalButton";

const CashRegister = () => {
	const dispatch = useDispatch();
	const {closeModal} = useModal();
	const registerReducer = useSelector((state) => state.cashRegisterReducer);
	const serviceReducer = useSelector((state) => state.serviceReducer);
	const register = Object.values(registerReducer);
	const service = Object.values(serviceReducer);
	console.log("<-----register----->", register);

	const [isLoaded, setIsLoaded] = useState(false);

	const [selectedService, setSelectedService] = useState("");
	const [totalItems, setTotalItems] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);
	const [errors, setErrors] = useState([]);

	const handleServiceSelection = (service) => {

		setSelectedService(service.id);
		setTotalItems(totalItems+1);
		setTotalPrice(totalPrice+service.price);
	};

	useEffect(() => {
		dispatch(fetchServices()).then(() => setIsLoaded(true));
	}, [dispatch]);

	console.log(service);

	return (
		<div>
			Cash Register
			{/* <button onButtonClick={handleServiceSelection}>Add Service </button> */}
			<div className="serviceContainer">
				{service.map((service) => (
					<div key={service.id}>
						{service.service_name}
						<br />
						{service.price}
						<br />
						{service.description}
						<br />
						{service.time_frame}
						<OpenModalButton
							buttonText="Add Service"
							// onClick={() => setSelectedService(service)}
							modalComponent={<PostTransactionModal service={service} />}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default CashRegister;
