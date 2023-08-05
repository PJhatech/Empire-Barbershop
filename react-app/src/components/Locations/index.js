import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import {fetchLocations, fetchLocationById} from "../../store/location";

const Locations = () => {
	const dispatch = useDispatch();
	const {id} = useParams();
	const locationReducer = useSelector((state) => state.locationReducer);
	const authUser = useSelector((state) => state.session.user)
	const location = Object.values(locationReducer);

	console.log("<-------LOCATIONS------->", location);

	useEffect(() => {
		dispatch(fetchLocations());
		// dispatch(fetchLocationById(id));
	}, [dispatch, id]);

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
							<NavLink exact to={`/location/${location.id}`}>
								{location.name}
							</NavLink>
						) : location.name }
					</div>
				))}
			</div>
		</>
	);
};

export default Locations;
