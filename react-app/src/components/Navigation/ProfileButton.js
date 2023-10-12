import React, {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import * as sessionActions from "../../store/session";
import "./ProfileButton.css";
import { useModal } from "../../context/Modal";
import {login} from "../../store/session";

function ProfileButton({user}) {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const ulRef = useRef();
	const modalRef = useModal();

	const [showMenu, setShowMenu] = useState(false);
	const [email, setEmail] = useState("ronesmith@example.com");
	const [password, setPassword] = useState("password");


	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	const demoSubmit = (e) => {
		setEmail("ronesmith@example.com");
		setPassword("password");
		return dispatch(login(email, password));
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (!ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
	};

	const {setModalContent, closeModal} = useModal();

	const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
	const closeMenu = () => setShowMenu(false);

	return (
		<div className="profileButtonContainer">
			<button className="profileButton" onClick={openMenu}>
			{sessionUser ? (
				<i class="fa-solid fa-scissors fa-xl" ></i>
			) : <i style={{color: "#32cd32"}}>Login</i> }
			</button>
			<div className={ulClassName} ref={ulRef}>
				{user ? (
					<div className="userInfo">
						<>{user.username}</>
						<br />
						<>{user.email}</>
						<br />
						<>
							<button onClick={handleLogout}>Log Out</button>
						</>
					</div>
				) : (
					<>
						<OpenModalButton
							buttonText="Log In"
							onItemClick={closeMenu}
							modalComponent={<LoginFormModal />}
						/>

							<button onClick={demoSubmit}>DemoBarber</button>


						<OpenModalButton
							buttonText="Sign Up"
							onItemClick={closeMenu}
							modalComponent={<SignupFormModal />}
						/>
					</>
				)}
			</div>
		</div>
	);
}

export default ProfileButton;
