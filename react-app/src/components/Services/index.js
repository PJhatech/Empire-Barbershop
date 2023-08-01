import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useParams, useLocation} from "react-router-dom";
import {fetchServices} from "../../store/service";
import OpenModalButton from "../OpenModalButton";
import DeleteService from "../ServiceDeleteModal";
import ServiceFormModal from "../ServiceFormModal";
import ServiceUpdateModal from "../ServiceUpdateModal";
import ServiceIndex from "../ServiceIndex";
import CashRegister from "../Register";

const Services = () => {
	const dispatch = useDispatch();
	// const {id} = useParams();
	const serviceReducer = useSelector((state) => state.serviceReducer);
	const service = Object.values(serviceReducer);
	const location = useLocation();

	// console.log("<-------Services------->", serviceReducer);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(fetchServices()).then(() => setIsLoaded(true));
	}, [dispatch]);

	// const userTransactions = Object.values(allTransactions).filter(
	//     (transaction) => transaction.user_id === userId
	// );

	return (
		<>
			<div>
				{service.map((service) => (
					<div key={service.id}>
						<NavLink to={`/services/${service.id}`}>
							{/* <ServiceIndex prop={service} /> */}
							{service.service_name}
						</NavLink>
						<br />
						{service.price}
						<br />
						{service.description}
						<br />
						{service.time_frame}
						{location.pathname === "/services" ? (
							<div>
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
						) : null}

						{/* {location.pathname === "/register" ? (
								<div>
									<button>Add Service</button>
								</div>
							) : null} */}
					</div>
				))}
			</div>
		</>
	);
};

export default Services;
