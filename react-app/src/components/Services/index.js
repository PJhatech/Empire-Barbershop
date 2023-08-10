import React, {useState, useEffect, useRef, Component} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useLocation} from "react-router-dom";
import {fetchServices} from "../../store/service";
import OpenModalButton from "../OpenModalButton";
import DeleteService from "../ServiceDeleteModal";
import ServiceFormModal from "../ServiceFormModal";
import ServiceUpdateModal from "../ServiceUpdateModal";
import ServiceIndex from "../ServiceIndex";
import "./Services.css";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const Services = () => {
	const dispatch = useDispatch();
	const serviceReducer = useSelector((state) => state.serviceReducer);
	const service = Object.values(serviceReducer);
	const location = useLocation();
	const [isLoaded, setIsLoaded] = useState(false);
	const [dropdownVisible, setDropdownVisible] = useState(null);

	const dropdownRef = useRef(null);

	// Fetch services on component mount
	useEffect(() => {
		dispatch(fetchServices()).then(() => setIsLoaded(true));
	}, [dispatch]);

	// Event listener for clicks outside dropdown
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setDropdownVisible(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<>
			<div className="dropDownContainer">
				{service.map((service) => (
					<div key={service.id} className="dropdown">
						<div>
							{service.service_name}${service.price}
						</div>
						<button
							className="dropbtn"
							onClick={() => {
								if (dropdownVisible === service.id) {
									setDropdownVisible(null);
								} else {
									setDropdownVisible(service.id);
								}
							}}
						>
							<div className="serviceContainer">

								<div>{service.description}</div>
								<div>{service.time_frame}</div>
							</div>
						</button>

						<div
							className={`dropdownContent ${dropdownVisible === service.id ? "show" : ""}`}
						>
							<OpenModalButton
								buttonText="Delete"
								modalComponent={<DeleteService prop={service.id} />}
							/>
							<OpenModalButton
								buttonText="Update"
								modalComponent={<ServiceUpdateModal prop={service} />}
							/>
							<OpenModalButton
								buttonText="Create New Service"
								modalComponent={<ServiceFormModal />}
							/>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default Services;

// import React, {useState, useEffect} from "react";
// import {useDispatch, useSelector} from "react-redux";
// import {NavLink, useParams, useLocation} from "react-router-dom";
// import {fetchServices} from "../../store/service";
// import OpenModalButton from "../OpenModalButton";
// import DeleteService from "../ServiceDeleteModal";
// import ServiceFormModal from "../ServiceFormModal";
// import ServiceUpdateModal from "../ServiceUpdateModal";
// import ServiceIndex from "../ServiceIndex";

// const Services = () => {
// 	const dispatch = useDispatch();
// 	// const {id} = useParams();
// 	const serviceReducer = useSelector((state) => state.serviceReducer);
// 	const service = Object.values(serviceReducer);
// 	const location = useLocation();

// 	// console.log("<-------Services------->", serviceReducer);
// 	const [isLoaded, setIsLoaded] = useState(false);

// 	useEffect(() => {
// 		dispatch(fetchServices()).then(() => setIsLoaded(true));
// 	}, [dispatch]);

// 	// const userTransactions = Object.values(allTransactions).filter(
// 	//     (transaction) => transaction.user_id === userId
// 	// );

// 	return (
// 		<>
// 			<div className="dropdown">
// 				{service.map((service) => (
// 					<div key={service.id}>
// 						<NavLink to={`/services/${service.id}`}>
// 							{/* <ServiceIndex prop={service} /> */}
// 							{service.service_name}
// 						</NavLink>
// 						<br />
// 						{service.price}
// 						<br />
// 						{service.description}
// 						<br />
// 						{service.time_frame}
// 						{location.pathname === "/barberprofile" || location.pathname === "/services" ? (
// 							<div>
// 								<OpenModalButton
// 									buttonText="Delete"
// 									modalComponent={<DeleteService prop={service.id} />}
// 								/>
// 								<OpenModalButton
// 									buttonText="Update"
// 									modalComponent={<ServiceUpdateModal prop={service} />}
// 								/>

// 								<OpenModalButton
// 									buttonText="Create New Service"
// 									modalComponent={<ServiceFormModal />}
// 								/>
// 							</div>
// 						) : null}

// 						{/* {location.pathname === "/register" ? (
// 								<div>
// 									<button>Add Service</button>
// 								</div>
// 							) : null} */}
// 					</div>
// 				))}
// 			</div>
// 		</>
// 	);
// };

// export default Services;
