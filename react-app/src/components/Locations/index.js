import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import { fetchLocations, fetchLocationById } from "../../store/location";
import LocationUpdateModal from "../LocationUpdateModal";
import DeleteLocation from "../LocationDeleteModal";
import CreateLocation from "../LocationAddModal";
import OpenModalButton from "../OpenModalButton";
import ComingSoon from "../ComingSoon";
import concordImg from "../Images/shopimg.jpeg";
import herculesShop from "../Images/herculesShop.jpg";
import { ModalProvider, useModal } from "../../context/Modal";
import logo from "../Images/remove.png";
import "./Locations.css"

const Locations = () => {
	const dispatch = useDispatch();
	const {id} = useParams();
	const locationReducer = useSelector((state) => state.locationReducer);
	const authUser = useSelector((state) => state.session.user)
	const location = Object.values(locationReducer);

	const [dropdownVisible, setDropdownVisible] = useState(true);
	const [isLoaded, setIsLoaded] = useState(true);
	const {setModalContent} = useModal();


	useEffect(() => {
		dispatch(fetchLocations());
		// dispatch(fetchLocationById(id));
	}, [dispatch]);

	// const userTransactions = Object.values(allTransactions).filter(
	//     (transaction) => transaction.user_id === userId
	// );

	return (
		<>
			<div className="locations-container">
				<div className="img-container-row">
					<div className="dropdown-container">
						{location.map((location) => (
							<div key={location.id}>
								<div className="leftside-container">
								<div
									className="left-side"
									onClick={() => {
										if (dropdownVisible === location.id) {
											setDropdownVisible(null);
										} else {
											setDropdownVisible(location.id);
										}
									}}
								>
									{location.name}
								</div>
								<div
									className={`locationdropdown ${
										dropdownVisible === location.id ? "show" : ""
									}`}
								>
									<div className="locationdropdown-container">
										{location.address}
										<OpenModalButton
											buttonText="update"
											modalComponent={<LocationUpdateModal locationProp={location} />}
										/>
										<OpenModalButton
											buttonText="Delete"
											modalComponent={<DeleteLocation location={location} />}
										/>
									</div>
								</div>
								</div>

							</div>
						))}
					</div>
					<div>
						<OpenModalButton
							buttonText="Create A New Location?"
							modalComponent={<CreateLocation />}
						/>
					</div>
					{/* </NavLink> */}
					{/* <img alt="locationLog" className="mid-img" src={logo} /> */}
					{/* <img
							alt="herculesShop"
							className="right-img"
							src={herculesShop}
							onClick={() => setModalContent(<ComingSoon />)}
						/> */}
				</div>
			</div>
		</>
	);
};

export default Locations;
