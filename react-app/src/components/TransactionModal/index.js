import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import {createTransaction, fetchRegister} from "../../store/cashRegister";
import {useModal} from "../../context/Modal";
import {fetchServices} from "../../store/service";
import Services from "../Services";

const TransactionModal = () => {
	const dispatch = useDispatch();
	const barberUser = useState((state) => state.session.user);
	const {closeModal} = useModal();

   const [selectedService, setselectedService] = useSelector("");
   const [totaItems, setTotalItems] = useSelector(0);
   const [totaPrice, setTotalPrice] = useSelector(0);
   const [errors, setErrors] = useState([]);

   const handleServiceSelection = (service) => {
		setSelectedService(service.id);
		setTotalItems(totalItems + 1);
		setTotalPrice(totalPrice + service.price);
	};


	const handeSubmit = async (e) => {
		e.preventDefault();

		const transaction = {
			barber_id: barberUser.id,
			service_id: selectedService,
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

	// console.log(service);

	return (
		<div>
			Cash Register
			<div className="serviceContainer">
				{service.map((service) => (
					<div key={service.id}>
						{service.service_name}
						<br />
						{service.price}
						<br />
						{service.description}
						<br />
						{service.time_frame}
					</div>
				))}
			</div>
		</div>
	);
};

export default CashRegister;
