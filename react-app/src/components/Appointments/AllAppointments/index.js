// import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const AllAppointments = () => {
    const dispatch = useDispatch();
    const appointmentReducer = useSelector((state) => state.appointmentReducer);
    const allAppointments = Object.values(appointmentReducer);

    // console.log("<-------1------->", allAppointments)


    return (
        <>
            <h1>AllAppointments</h1>
        </>
    )

}

export default AllAppointments
