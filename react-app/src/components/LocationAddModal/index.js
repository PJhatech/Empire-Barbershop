import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {fetchLocations, createLocation} from "../../store/location";

import {useModal} from "../../context/Modal";

const CreateLocation = () => {
	const dispatch = useDispatch();
	const locationReducer = useSelector((state) => state.locationReducer);
	const locations = Object.values(locationReducer);
	const {closeModal} = useModal();

	// console.log("<-------CreateServiceComponent------->", locations);

	useEffect(() => {
		dispatch(createLocation());
		dispatch(fetchLocations());
	}, [dispatch]);

	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [zipCode, setZipCode] = useState();
	const [country, setCountry] = useState("");
	const [lat, setLat] = useState();
	const [lng, setLng] = useState();
	const [name, setName] = useState("");
	const [errors, setErrors] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newLocation = {
			address: address,
			city: city,
			state: state,
			zipCode: Number(zipCode),
			country: country,
			lat: Number(lat),
			lng: Number(lng),
			name: name,
		};
      console.log(newLocation)
		// let newLocation;
		if (newLocation) {
			await dispatch(createLocation(newLocation)).then((newLocation) => {
				if (!newLocation.errors) {
					closeModal();
				} else {
					setErrors(newLocation.errors);
				}
			});
		}
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
				<input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
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
               type="number"
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
				<input type="number" id="lat" value={lat} onChange={(e) => setLat(e.target.value)} />
			</label>

			<label>
				Longitude:
				<input type="number" id="lng" value={lng} onChange={(e) => setLng(e.target.value)} />
			</label>

			<label>
				Name:
				<input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
			</label>

			<button type="submit">Create Location</button>
		</form>
	);
};

export default CreateLocation;
