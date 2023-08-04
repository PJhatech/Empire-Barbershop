import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import {createTransaction, fetchRegister} from "../../store/cashRegister";
import {useModal} from "../../context/Modal";
import {fetchServices} from "../../store/service";
import Services from "../Services";
import RemoveItem from "../RemoveItem";
import CashRegister from "../Register";
import { destroyItem } from "../../store/cashRegister";
import OpenModalButton from "../OpenModalButton";


const Transaction = ({service}) => {
	const dispatch = useDispatch();
	const barberUser = useSelector((state) => state.session.user);
	const {closeModal} = useModal();
	const [isLoaded, setIsLoaded] = useState(false);


	const [selectedService, setSelectedService] = useState([]);
	const [totalItems, setTotalItems] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		setSelectedService (service)
	}, [service])

	console.log(selectedService);
	const removeItem = (itemToRemove) => {
		const itemArr = selectedService.filter((item) => item !== itemToRemove);
		setSelectedService(itemArr);
	};

	useEffect(() => {
		setTotalItems(selectedService.length);
		setTotalPrice(selectedService.reduce((total, currentService) => total + currentService.price, 0));
	}, [selectedService]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const transaction = {
			barber_id: barberUser.id,
			service_id: service.map((s) => s.id),
			total_items: totalItems,
			total_price: totalPrice,
		};

		if (transaction) {
			// console.log(transaction)
			dispatch(createTransaction(transaction))
		}
	};

	return (
		<div>
			{service.length > 0 ? (
				<form onSubmit={handleSubmit}>
					<div>
						<label>
							Current Sale:
							{selectedService.map((service, index) => (
								<div key={index}>
									{service.service_name}

									<button onClick={() => removeItem(service)}>Remove</button>
									{/* <OpenModalButton buttonText="Remove" modalComponent={<RemoveItem itemToRemove={service} />} /> */}
								</div>
							))}
						</label>
						<label>
							Total Items:
							{/* <input type="text" id="totalItems" value={totalItems} /> */}
							{totalItems}
						</label>
						{/* {isLoaded ? <input type="text" id="totalPrice" value={totalPrice} /> : null} */}
					</div>
					<button type="submit">Charge ${totalPrice}</button>
				</form>
			) : null}
		</div>
	);
};

export default Transaction;
