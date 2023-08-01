import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import {createTransaction, fetchRegister} from "../../store/cashRegister";
import {useModal} from "../../context/Modal";
import {fetchServices} from "../../store/service";
import Services from "../Services";

const Transaction = ({service}) => {
	const dispatch = useDispatch();
	const barberUser = useSelector((state) => state.session.user);
	const {closeModal} = useModal();

	// const [selectedService, setSelectedService] = useState([service]);
	const [totalItems, setTotalItems] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);
	const [errors, setErrors] = useState([]);


	useEffect(() => {
		setTotalItems(service.length);
		setTotalPrice(service.reduce((total, currentService) => total + currentService.price, 0));
	}, [service]);
	const handleSubmit = async (e) => {
		e.preventDefault();

		const transaction = {
			barber_id: barberUser.id,
			service_id: service.map((s) => s.id),
			total_items: totalItems,
			total_price: totalPrice,
		};

		if (transaction) {
			dispatch(createTransaction(transaction)).then((transaction) => {
				if (!transaction.errors) {
					closeModal();
				} else {
					setErrors(transaction.errors);
				}
			});
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					{/* {service.service_name} */}
					{service.map((service, index) => (
						<div key={index}>{service.service_name}</div>
					))}
					{totalPrice}
				</div>
				{totalItems}
				<button type="submit">Charge</button>
			</form>
		</div>
	);
};

export default Transaction;
