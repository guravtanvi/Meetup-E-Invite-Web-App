import React from 'react';

import { fetchDeleteRegistration } from '../services/services';

const DeleteUser = ({state, onDelete}) => {

	const del = () => {
		fetchDeleteRegistration()
		.then( () => {
			onDelete('');
		})
		.catch((error) => {
			onDelete(error.code);
		});
	};

	return (	
			state.isLoggedIn &&
			<button className="delete-user-btn" title="Click to Delete Account" onClick={del}>Delete Account</button> 
   );

};

export default DeleteUser;