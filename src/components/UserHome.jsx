import React from 'react';
import { fetchMeetupList, fetchValidUsers  } from '../services/services';

import LogoutPage from './LogoutPage';
import Refresh from './Refresh';
import DeleteUser from './DeleteUser';
import CreateMeetupButton  from './CreateMeetupButton';
import CreatedMeetup from './CreatedMeetup';
import InvitedMeetup from './InvitedMeetup';


const UserHome = ({
    state,
    onCreate,
    onUpdate,
    onLogout,
    onDetails,
    onMeetupUpdate
}) => {

    const createMeetup = () => {
        fetchValidUsers()
        .then((user) => {
            onCreate(user, '');
        })
        .catch((error) => {
            onCreate({}, error.code);
        });  
    };

    const meetupList = () => {
        
        fetchMeetupList(state.username)
        .then((meetup) => {
            
            onUpdate(meetup.createMeetups, meetup.invitedMeetups, '');   
        })
        .catch((error) => {
            onUpdate([], [], error.code);
        });
    }

    return (
        <div className="user-home-container">
            <div className="navigation-button">
                <CreateMeetupButton onCreateMeetup={createMeetup}/>
          
                <DeleteUser state={state} onDelete={onLogout}/>
                <LogoutPage state={state} onUserLogout={onLogout}/>
            </div>

            <div className="created-meetup">
                <CreatedMeetup state={state} details={onDetails} update={onUpdate} meetupUpdate={onMeetupUpdate}/>
            </div>
            <div className="invited-meetup">
                <InvitedMeetup state={state} details={onDetails} update={onUpdate}/>
            </div>

        </div>
    );

    /*<Refresh onRefresh={meetupList}/> */
}


export default UserHome;