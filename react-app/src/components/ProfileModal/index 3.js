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

    const {setModalContent, closeModal} = useModal();



	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
	};


	return (
		<div className="profileButtonContainer">
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
