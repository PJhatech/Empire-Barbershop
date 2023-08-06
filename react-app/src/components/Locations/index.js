import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import { fetchLocations, fetchLocationById } from "../../store/location";
import LocationUpdateModal from "../LocationUpdateModal";
import DeleteLocation from "../LocationDeleteModal";
import CreateLocation from "../LocationAddModal";
import OpenModalButton from "../OpenModalButton";


const Locations = () => {
	const dispatch = useDispatch();
	const {id} = useParams();
	const locationReducer = useSelector((state) => state.locationReducer);
	const authUser = useSelector((state) => state.session.user)
	const location = Object.values(locationReducer);

	// console.log("<-------LOCATIONS------->", location);

	useEffect(() => {
		dispatch(fetchLocations());
		// dispatch(fetchLocationById(id));
	}, [dispatch]);

	// const userTransactions = Object.values(allTransactions).filter(
	//     (transaction) => transaction.user_id === userId
	// );

	return (
		<>
			<h1>Locations</h1>
			<div>
				{location.map((location) => (
					<div key={location.id}>
						{authUser ? (
							<div>
								{location.name}
								{location.address}
							<OpenModalButton buttonText="update" modalComponent={<LocationUpdateModal locationProp={location} />} />
							<OpenModalButton buttonText="Delete" modalComponent={<DeleteLocation location={location} /> } />
							</div>

						) : location.name }
					</div>
				))}
			</div>
			<div>
				<OpenModalButton buttonText="Create A New Location?" modalComponent={<CreateLocation />} />
			</div>
		</>
	);
};

export default Locations;
