import React, {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useLocation} from "react-router-dom";
import {fetchServices} from "../../store/service";
import OpenModalButton from "../OpenModalButton";
import DeleteService from "../ServiceDeleteModal";
import ServiceFormModal from "../ServiceFormModal";
import ServiceUpdateModal from "../ServiceUpdateModal";
import ServiceIndex from "../ServiceIndex";
import './Services.css'

const Services = () => {
	const dispatch = useDispatch();
	const serviceReducer = useSelector((state) => state.serviceReducer);
	const service = Object.values(serviceReducer);
	const location = useLocation();
	const [isLoaded, setIsLoaded] = useState(false);
	const [dropdownVisible, setDropdownVisible] = useState(false);
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
            {service.map((service) => (
                <div key={service.id} className="dropdown">

                    {/* service.name as a button to trigger the dropdown */}
                    <button
                        className="dropbtn"
                        onClick={() => setDropdownVisible(!dropdownVisible)}
                    >
                        {service.service_name}
                    </button>

                    {/* The dropdown content contains the modal buttons */}
                    <div className={`dropdown-content ${dropdownVisible ? 'show' : ''}`}>
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

                    <br />
                    {service.price}
                    <br />
                    {service.description}
                    <br />
                    {service.time_frame}
                </div>
            ))}
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
