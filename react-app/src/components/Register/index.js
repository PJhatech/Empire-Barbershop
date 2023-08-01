import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import {fetchRegister} from "../../store/cashRegister";
import {useModal} from "../../context/Modal";
import {fetchServices} from "../../store/service";
import Services from "../Services";

const CashRegister = () => {
	const dispatch = useDispatch();
	const {closeModal} = useModal();
	const registerReducer = useSelector((state) => state.cashRegisterReducer);
	const serviceReducer = useSelector((state) => state.serviceReducer);
	const service = Object.values(serviceReducer);

	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(fetchServices()).then(() => setIsLoaded(true));
	}, [dispatch]);

	console.log(service);

	return (
		<div>
			Cash Register
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
					</div>
				))}
			</div>
		</div>
	);
};

export default CashRegister;
