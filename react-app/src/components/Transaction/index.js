import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import {createTransaction, fetchRegister} from "../../store/cashRegister";
import {useModal} from "../../context/Modal";
import {fetchServices} from "../../store/service";
import Services from "../Services";
import RemoveItem from "../RemoveItem";
import {destroyItem} from "../../store/cashRegister";
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

	const handleSubmit = async (e) => {
		e.preventDefault();

		const transaction = {
			barber_id: barberUser.id,
			service_id: service.map((s) => s.id),
			total_items: totalItems,
			total_price: totalPrice,
		};

		if (transaction) {
			dispatch(createTransaction(transaction));
		}
	};

	return (
		<div>
			{service.length > 0 ? (
				<form onSubmit={handleSubmit}>
					<div>
						<label>
							Current Sale:
							{service.map((service, index) => (
								<div key={index}>
									{service.service_name}
								</div>
							))}
						</label>
						<label>
							Total Items:
							{totalItems}
						</label>
					</div>
					<button type="submit">Charge ${totalPrice}</button>
				</form>
			) : null}
		</div>
	);
};

export default Transaction;
