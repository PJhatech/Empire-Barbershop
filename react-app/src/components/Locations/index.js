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


	const [isLoaded, setIsLoaded] = useState(true);
	const {setModalContent} = useModal();


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
			<div className="locations-container">
				<div className="img-row">
					<img
						alt="concordImg"
						className="left-img"
						src={concordImg}
						onClick={() => setModalContent(<ComingSoon />)}
					/>
					{/* </NavLink> */}
					<img
						alt="herculesShop"
						className="right-img"
						src={herculesShop}
						onClick={() => setModalContent(<ComingSoon />)}
					/>
					<img alt="locationLog" className="" src={logo} />
				</div>

				<div>
					{location.map((location) => (
						<div key={location.id}>
							{authUser ? (
								<div>
									{location.name}
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
							) : (
								location.name
							)}
						</div>
					))}
				</div>
				<div>
					<OpenModalButton
						buttonText="Create A New Location?"
						modalComponent={<CreateLocation />}
					/>
				</div>
			</div>
		</>
	);
};

export default Locations;
