import React, { useState } from 'react';
import { fetchLoginPage, fetchMeetupList } from '../services/services';

const LoginPage = ({onLogin,isRegistered}) => {

    const [username, setUserSate] = useState('');

    const implementLogin = () => {
       
      if(!username) {
			onLogin('', {}, {}, 'USERNAME_MANDATORY');
			return;
		}
		fetchLoginPage(username)
		.then((details) => {
			setUserSate('');
			fetchMeetupList(details.username)
			.then((meetup) => {
				onLogin(details.username, meetup.createdMeetups, meetup.invitedMeetups, '');
			})
			.catch((error) => {
				onLogin('', {}, {}, error.code );
			});
		})
		.catch( (error) => {
			setUserSate('');
			onLogin('', {}, {}, error.code );
		});
    };

    const register = (e) => {

        e.preventDefault();
		isRegistered();
    };

    return(
        <div className="login-container">
            <input className="login-username" value={username} placeholder="Enter firstname+lastname" onChange={(e) => setUserSate(e.target.value)}/>
            <button className="login-button" onClick={ implementLogin }>Login</button>
              <div className="register-link">
            <a
              className="register-account"
              href="https://meetup.com"
              title="Click for Meetup Detail"
              onClick={(e) => register(e)}
            >
            New User? Register Now!!
            </a>
            </div>

        </div>
    );

};

export default LoginPage;