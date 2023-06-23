import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import {fetchServices,  fetchServicekById} from "../../store/service";
import OpenModalButton from "../OpenModalButton";
import ServiceUpdateModal from "../ServiceUpdateModal";


const ServiceIndex = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
	const serviceReducer = useSelector((state) => state.serviceReducer);
	const service = Object.values(serviceReducer);

	console.log("<-------serviceIndex------->", serviceReducer);

	useEffect(() => {
		dispatch(fetchServicekById(id))
	}, [dispatch, id]);

	// const userTransactions = Object.values(allTransactions).filter(
	//     (transaction) => transaction.user_id === userId
	// );

	return (
		<>
			serviceIndex
			<h1>{service.first_name}</h1>
			<div>
				{service.map((service) => (
					<div key={service.id}>
						{service.service_name}
						{service.description}
						<OpenModalButton
							buttonText="Update"
							modalComponent={<ServiceUpdateModal prop={service} />}
						/>
					</div>
				))}
			</div>
		</>
	);
};

export default ServiceIndex;
