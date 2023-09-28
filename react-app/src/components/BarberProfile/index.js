import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import aaron from "../Images/remove.png";
import shop from "../Images/shopimg.jpeg";
import background from "../Images/blkBackGround.jpeg";
import "./BarberProfile.css";
import Appointments from "../Appointments";
import Services from "../Services";
import CashRegister from "../CashRegister";
import Locations from "../Locations";
import stateofmind from "../Images/stateofmind.jpg";
import video from "../Images/video.mov";
import LocationPage from "../LocationPage";

const BarberProfile = () => {
	const client = useSelector((state) => state.session.user);
	const barber = useSelector((state) => state.session.user);
	const [isLoaded, setIsLoaded] = useState(true);
	const [activePage, setActivePage] = useState("Appointments");
	const [activeColor, setActiveColor] = useState("#30cd30");

	useEffect(() => {
		setActivePage("Appointments");
		setActiveColor("#30cd30");
	}, []);

	function openPage(pageName, color) {
		setActivePage(pageName);
		setActiveColor(color);
	}

	if (!barber) {
		return <Redirect to="/" />;
	}

	return (
		<div className="pageContainer">
			<div className="row">
				<div className="leftColumn">
					<video
						id="video"
						src={video}
						className="video"
						muted={true}
						autoPlay={true}
						loop={true}
					/>
					<img alt="lo" className="stateofmind" src={stateofmind} />
					<img alt="concordShop" className="shop" src={shop} />
				</div>
				<div className="rightColumn">
					{["Appointments", "Services", "Register", "Locations"].map((pageName, index) => (
						<button
							key={index}
							className={`tablink ${activePage === pageName ? "active" : ""}`}
							onClick={() => openPage(pageName, index === 0 ? "#30cd30" : "#30cd30")}
							style={{backgroundColor: activePage === pageName ? activeColor : ""}}
							id={pageName === "Appointments" ? "defaultOpen" : ""}
						>
							{pageName}
						</button>
					))}

					{/* <div
						id="Appointments"
						className="tabcontent"
						style={{display: activePage === "Appointments" ? "block" : "none"}}
					>
						{Appointments()}
					</div> */}
					<div
						id="Services"
						className="tabcontent"
						style={{display: activePage === "Services" ? "block" : "none"}}
					>
						{Services()}
					</div>
					<div
						id="Register"
						className="tabcontent"
						style={{display: activePage === "Register" ? "block" : "none"}}
					>
						{<CashRegister />}
					</div>
					<div
						id="Locations"
						className="tabcontent"
						style={{display: activePage === "Locations" ? "block" : "none"}}
					>
						{<Locations />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default BarberProfile;
