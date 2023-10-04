import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useModal} from "../../context/Modal";
import {NavLink, useParams} from "react-router-dom";
import {destroyItem} from "../../store/cashRegister";

const RemoveItem = ({itemToRemove}) => {
	const dispatch = useDispatch();
	// const {serviceId} = useParams();
	const cashRegisterReducer = useSelector((state) => state.cashRegisterReducer);
	const {closeModal} = useModal();
	const register = Object.values(cashRegisterReducer);

	// console.log("<-------Services------->", itemToRemove);

	const handleRemoveItem = (itemToRemove) => {
	// 	const itemArr = selectedService.filter((item) => item === itemToRemove);
      dispatch(destroyItem(itemToRemove));
	// 	// console.log("<----here--->", itemToRemove);
	// 	if (itemArr) {
	// 		dispatch(destroyItem(itemArr));
	// 	}
	};

	return (
		<div>
			{/* <h1>Confirm Delete</h1> */}
			<p>Are you sure you want to delete this Service?</p>
			<button type="submit" onClick={handleRemoveItem}>
				Remove
			</button>
			{/* Delete Service
			</button>
			<button onClick={closeModal}>Keep Service</button> */}
		</div>
	);
};

export default RemoveItem;
