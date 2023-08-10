import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import {fetchRegister} from "../../store/cashRegister";
import {useModal} from "../../context/Modal";
import {fetchServices} from "../../store/service";
import Services from "../Services";
import Transaction from "../Transaction";
import OpenModalButton from "../OpenModalButton";
import "./CashRegister.css";

const CashRegister = () => {
	const dispatch = useDispatch();
	const {closeModal} = useModal();
	const registerReducer = useSelector((state) => state.cashRegisterReducer);
	const serviceReducer = useSelector((state) => state.serviceReducer);
	const register = Object.values(registerReducer);
	const service = Object.values(serviceReducer);
	const [dropdownVisible, setDropdownVisible] = useState(true);
	const [isLoaded, setIsLoaded] = useState(false);
	const [clicked, setClick] = useState();

	const [selectedService, setSelectedService] = useState([]);
	const [totalItems, setTotalItems] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);
	const [errors, setErrors] = useState([]);

	// useEffect(() => {
	// 	setSelectedService(service);
	// }, [service]);

	console.log(selectedService);
	const removeItem = (itemToRemove) => {
		const itemArr = selectedService.filter((_, item) => item !== itemToRemove);
		setSelectedService(itemArr);
	};
	const handleDropClick = async (e) => {
		e.preventDefault();
		if (dropdownVisible) {
			setDropdownVisible(false);
		} else {
			setDropdownVisible(true);
		}
	};

	useEffect(() => {
		setTotalItems(selectedService.length);
		setTotalPrice(
			selectedService.reduce((total, currentService) => total + currentService.price, 0)
		);
	}, [selectedService]);

	const handleServiceSelection = (e, service) => {
		e.stopPropagation();
		setSelectedService([...selectedService, service]);
		setTotalItems(totalItems + 1);
		setTotalPrice(totalPrice + service.price);
	};

	useEffect(() => {
		dispatch(fetchServices()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<div>
			<div className="row">
				<div className="dropDownContainer">
					<div className="left-column">
						<div className="service-container" onClick={handleDropClick}>
							Services
							<div className={`dropdown-content ${dropdownVisible === false ? "show" : ""}`}>
								{service.map((service) => (
									<div key={service.id}>
										<div className="service-content">
											<p>{service.price}</p>
											<p>{service.description}</p>
											<p>{service.time_frame}</p>
											<button
												type="button"
												onClick={(e) => handleServiceSelection(e,service)}
											>
												Add Service
											</button>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
				<div className="right-column">
						Current Sale:
					<div className="currentsale">
						<div className="containitems">
						{selectedService.map((service, index) => (
							<div key={index}>
								{service.service_name}
								<button onClick={() => removeItem(index)}>Remove</button>
							</div>
						))}
						</div>
					</div>
					<div className="modalbutton">
					<div className="containitems">
						<div>
							Total Items:
							{totalItems}
						</div>
						<div>Total Price: ${totalPrice}</div>
						<div>
							<OpenModalButton
								buttonText="Charge"
								modalComponent={
									<Transaction service={{selectedService, totalItems, totalPrice}} />
								}
							/>
						</div>
					</div>
					</div>
					{/* {console.log(selectedService)} */}
					{/* {console.log(selectedService)} */}
				</div>
			</div>
		</div>
	);
};

export default CashRegister;
