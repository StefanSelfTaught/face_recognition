import React from "react";
import Logo from '../Logo/Logo'

const Navigation = ({ onRouteChange, isSignedIn }) => {
		if(isSignedIn){
			return (
				<nav className='mb4' style={{ display: "flex", flexDirection: 'row-reverse', justifyContent: "space-between" }}>
					<p onClick={() => onRouteChange('signout')} className="f3 link dim black underline pa3 pointer">Sign Out</p>
					<Logo />
				</nav>
			)
		} else {
			return (
				<nav style={{ display: "flex", justifyContent: "flex-end" }}>
					<p onClick={() => onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">Sign In</p>
					<p onClick={() => onRouteChange('register')} className="f3 link dim black underline pa3 pointer">Register</p>
				</nav>
			)
		}
};

export default Navigation;
