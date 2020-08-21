import React from 'react';
import { fetchMeetupForUser,
         fetchRemoveCreatedMeetup,
         fetchMeetupList,
         fetchValidUsers } from '../services/services';

const CreatedMeetup = ({ state, details, update, meetupUpdate }) => {
    
    const getMeetupDetails = (e, meetupId) => {
        e.preventDefault();
        fetchMeetupForUser(meetupId)
        .then((meetup) => {
            details(meetup, '');
        })
        .catch((error) => {
            details({}, error.code);
        });
    };

    const implementRemoveMeetup = (e, meetupId) => {
        e.preventDefault();
        fetchRemoveCreatedMeetup(meetupId)
        .then(() => {
            fetchMeetupList(state.username)
            .then((meetup) => {
                update(meetup.createdMeetups, meetup.invitedMeetups, '');
            })
            .catch((error) => {
                update([], [], error.code);
            });
        })
        .catch((error) => {
            update([], [], error.code);
        });
    };

    const implementUpdateMeetup = (e, meetup) => {
        e.preventDefault();
        fetchValidUsers()
        .then((user) => {
            meetupUpdate(meetup, user,'');
        })
        .catch((error) => {
            meetupUpdate({}, {}, error.code);
        });
    };

    return (
        
        <div className="created-meetup-container">
            <div className="meetup-heading">
                <p>My Created Meetups</p>
            </div>
            
            {(state.createdMeetups.length === 0) ? 
            <p className="empty-meetups">You have not created any meetups yet! Create one now!!</p>:
            <ul className="meetups">
                

                {Object.values(state.createdMeetups).map((meetup, key) => (
                    <li key={key}>
                        <div className="li-meetup">
                        
                            <div className="li-meetup-name">
                                <a href="https://li-meetup1.com" 
                                title="Click for Meetup Details" 
                                onClick={e => getMeetupDetails(e, meetup.meetupId)} > 
                                {meetup.title}
                                </a>
                            </div>

                            <div className="li-meetup-place">
                                Place:{' '}
                                <span>{meetup.place}</span>
                            </div>

                            <div>
                                Date:{' '}
                                <span className="li-meetup-date">{meetup.date}</span>
                            </div>

                            <div>
                                Time:{' '}
                                <span className="li-meetup-time">{meetup.time}</span>
                            </div>

                            <div className="delete-meetup">
                                <button className="delete-meetup-btn" onClick={e => implementRemoveMeetup(e, meetup.meetupId)}>Delete Created Meetup</button>
                                <button className="update-meetup-btn" onClick={e => implementUpdateMeetup(e, meetup)}>Update Created Meetup</button>
                            </div>  
                        </div>
                    </li>
                ))}
            </ul>
        }
        </div>
    );
};

export default CreatedMeetup;