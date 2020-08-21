import React, { useState} from 'react';
import { fetchRegistrationPage } from '../services/services';

const Registration = ({isRegistered}) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState(''); 
    
    const implementRegistration = () => {

        if(!firstName) {
			isRegistered('FIRSTNAME_MANDATORY');
			return;
		}
		if(!lastName) {
			isRegistered('LASTNAME_MANDATORY');
			return;
		}
		fetchRegistrationPage( firstName.concat(lastName))
		.then( () => {
			setFirstName('');
			setLastName('');
			isRegistered('');
		})
		.catch((error) => {
			setFirstName('');
			setLastName('');
			isRegistered(error.code);
		});
    };

    const getLogin = (e) => {
        e.preventDefault();
        isRegistered('');
    };

    return(
        <div className="registration-container">
            <input className="first-name" value={firstName} placeholder="Enter First Name" onChange={(e) => setFirstName(e.target.value)}/>
            <input className="last-name" value={lastName} placeholder="Enter Last Name" onChange={(e) => setLastName(e.target.value)}/>
            <button className="register-button" onClick={implementRegistration}> Register New User </button>
            <div className="register-link">
            <a
              className="to-login"
              href="https://meetuplogin.com"
              title="Click to Login if already Registered"
              onClick={(e) => getLogin(e)}
            >
              Already Registered? Click to Login
            </a>
            </div>
        </div>
    );
};

export default Registration;