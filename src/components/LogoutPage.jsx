import React from 'react';

import {fetchLogout} from '../services/services';

const LogoutPage = ({ state, onUserLogout }) => {
	

	const userLogout = () => {
		
		fetchLogout()
		.then(() => {
			onUserLogout('');
		})
		.catch((error) => {
			onUserLogout(error.code);
		});
	};

	return (
			 state.isLoggedIn &&
            <button className="logout-btn" 
            title="Click to Logout" 
            onClick={ userLogout }>Logout
            </button> 
    );
};

export default LogoutPage;