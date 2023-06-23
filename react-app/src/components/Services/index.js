import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import { fetchServices } from "../../store/service";
import OpenModalButton from "../OpenModalButton";
import DeleteService from "../ServiceDeleteModal";

const Services = () => {
	const dispatch = useDispatch();
	// const {id} = useParams();
	const serviceReducer = useSelector((state) => state.serviceReducer);
	const service = Object.values(serviceReducer);

	// console.log("<-------Services------->", serviceReducer);

	useEffect(() => {
		dispatch(fetchServices());
	}, [dispatch]);

	// const userTransactions = Object.values(allTransactions).filter(
	//     (transaction) => transaction.user_id === userId
	// );

	return (
		<>
			All Services
			<div>
				{service.map((service) => (
					<div key={service.id}>
						<NavLink exact to={`/services/${service.id}`}>
							{service.service_name}
						</NavLink>
						<br />
						{service.price}
						<br />
						{service.description}
						<br />
						{service.time_frame}
						{/* <button type="button"> */}
						<OpenModalButton
							buttonText="Delete"
							modalComponent={<DeleteService prop={service.id} />}
						/>
						{/* Delete */}
						{/* </button> */}
						{/* <div>
							<button type="button">
								<OpenModalButton
									itemText="Delete"
									// onItemClick={showMenu}
									modalComponent={
										<DeleteService prop={service} />
									}
								/>
							</button>
						</div> */}
					</div>
				))}
			</div>
			{/* <div>
					<img
						src={service.previewImage}
						alt={service.city}
					/>
				</div> */}
			{/* <div className="pekabo">
					{service.city}, {service.state} <br />$
					{service.price} night
					<br />
					{service.AvgRating || "NEW"}
					<i className="fa-solid fa-star" />
				</div> */}
		</>
	);
};

export default Services;
