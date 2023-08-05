import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {fetchLocations, fetchServices, updateService} from "../../store/location";
import {useModal} from "../../context/Modal";

const LocationUpdateModal = ({location}) => {
	const dispatch = useDispatch();
	const locationReducer = useSelector((state) => state.locationReducer);
	const location = Object.values(selectedService);
	const {closeModal} = useModal();

	console.log("<-------CreateServiceComponent------->", location[0]);

	// useEffect(() => {
	// 	dispatch(updateService());
	// 	dispatch(fetchServices());
	// }, [dispatch]);

	const [address, setAddress] = useState(location.address);
	const [city, setCity] = useState(location.city);
	const [state, setState] = useState(location.state);
	const [zipCode, setZipCode] = useState(location.zipCode);
	const [country, setCountry] = useState(location.country);
	const [lat, setLat] = useState(location.lat);
	const [lng, setLng] = useState(location.lng);
	const [name, setName] = useState(location.name);


	const handleSubmit = async (e) => {
		e.preventDefault();
		const locationData = {
			address: address,
			city: city,
			state: state,
			zipCode: zipCode,
			country: country,
			lat: lat,
			lng: lng,
			name: name,
		};

		await dispatch(updateService(location.id, locationData));
		fetchLocations();
		closeModal();
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Address:
				<input
					type="text"
					id="address"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					required
				/>
			</label>

			<label>
				City:
				<input
					type="text"
					id="city"
					value={city}
					onChange={(e) => setCity(e.target.value)}
				/>
			</label>

			<label>
				State:
				<input
					type="text"
					id="state"
					value={state}
					onChange={(e) => setState(e.target.value)}
				/>
			</label>

			<label>
				Zip Code:
				<input
					type="text"
					id="zipCode"
					value={zipCode}
					onChange={(e) => setZipCode(e.target.value)}
				/>
			</label>

			<label>
				Country:
				<input
					type="text"
					id="country"
					value={country}
					onChange={(e) => setCountry(e.target.value)}
				/>
			</label>

			<label>
				Latitude:
				<input
					type="text"
					id="lat"
					value={lat}
					onChange={(e) => setLat(e.target.value)}
				/>
			</label>

			<label>
				Longitude:
				<input
					type="text"
					id="lng"
					value={lng}
					onChange={(e) => setLng(e.target.value)}
				/>
			</label>

			<label>
				Longitude:
				<input
					type="text"
					id="lng"
					value={lng}
					onChange={(e) => setLng(e.target.value)}
				/>
			</label>

			<label>
				Name:
				<input
					type="text"
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</label>

			<button type="submit">Update Service</button>
		</form>
	);
};

export default LocationUpdateModal
;
