import React, {useState, useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {logout} from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./ProfileButton.css";

function ProfileButton({user}) {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
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

	const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
	const closeMenu = () => setShowMenu(false);

	return (
		<div className="profileButtonContainer">
			<button className="profileButton"onClick={openMenu}>
				<i
					class="fa-solid fa-scissors fa-xl"
					style={{color: "#32cd32"}}
				></i>
			</button>
			<div className={ulClassName} ref={ulRef}>
				{user ? (
					<div>
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
