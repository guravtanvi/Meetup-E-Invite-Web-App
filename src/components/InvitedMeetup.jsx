import React, { useState } from 'react';
import { fetchMeetupForUser, fetchUpdateFeedback, fetchRemoveInvitedMeetup, fetchMeetupList } from '../services/services';


const InvitedMeetup = ({state, details, update}) => {

    const [feedback, setFeedbackState] = useState('');





    const feedbackAction = (e, meetupId) => {
        e.preventDefault();
        
        if(!feedback) {
            update([], [], 'Please Select a Feedback!');
        }
        if(feedback) {
            fetchMeetupForUser(meetupId)
            .then(() => {
                fetchUpdateFeedback(state.username, feedback, meetupId)
                .then((meetup) => {
                    setFeedbackState('');
                    update(meetup.createdMeetups, meetup.invitedMeetups, '');
                })
                .catch((error) => {
                    setFeedbackState('');
                    update([], [], error.code);
                });
            })
            .catch((error) => {
                update([], [], error.code);
            });
        }
    };
    
    const meetupDetails = (e, meetupId) => {

        e.preventDefault();
		fetchMeetupForUser(meetupId)
		.then((meetup) => {
			details(meetup, '');
		})
		.catch((err) => {
			details({}, err.code);
		});
    };
    
    const implementRemoveMeetup = (e, meetupId) => {
        e.preventDefault();
        fetchMeetupForUser(meetupId)
        .then (() => {
            fetchRemoveInvitedMeetup(state.username, meetupId)
            .then(() => {
                fetchMeetupList(state.username)
                .then((meetup) => {
                    update(meetup.createdMeetups, meetup.invitedMeetups,'');
                })
                .catch((error) => {
                    update([], [], error.code);
                });
            })
            .catch((error) => {
                update([], [], error.code);
            });
        })
        .catch ((error) => {
            update([], [], error.code);
        });
    };

    const implementUpdateFeedback = (e, meetupId) => {
        e.preventDefault();
        fetchMeetupForUser(meetupId)
        .then (() => {
            fetchMeetupList(state.username)
            .then((meetup) => {
                Object.values(meetup.invitedMeetups)
                .filter(meet => meet.meet.meetupId === meetupId)
                .map((meet) => (meet.isGoing = ''));
                update(meetup.createdMeetups, meetup.invitedMeetups, '');
            })
            .catch((error) => {
                update([], [], error.code);
            });
        })
        .catch ((error) => {
            update([], [], error.code);
        });
    };

    return (
        <div className="invited-meetup-container">
            <div className="meetup-heading">
                <p>My Invited Meetups</p>
            </div>
            
            {(state.invitedMeetups.length === 0) ?
                <p className="empty-meetups">You have no invited meetups yet!!</p> :
                <ul className="meetups">
                    {Object.values(state.invitedMeetups).map( (invited,key) => (
                         
                        <li key={key}>
                            <div className="meetup">
                                
                                <div>
                                    <a href="https://meetup1.com" 
                                    title="Click for Meetup Details" 
                                    onClick={(e) => meetupDetails(e, invited.meetup.meetupId)}>{invited.meetup.title}
                                    </a>
                                </div>

                                <div className="li-meetup-host">
                                    Host:{' '}
                                    <span>{invited.meetup.host}</span>
                                </div>

                                <div className="li-meetup-place">
                                    Place:{' '}
                                    <span>{invited.meetup.place}</span>
                                </div>

                                <div className="li-meetup-date">
                                    Date:{' '}
                                    <span>{invited.meetup.date}</span>
                                </div>

                                <div className="li-meetup-time">
                                    Time:{' '}
                                    <span>{invited.meetup.time}</span>
                                </div>
                                
                                {(invited.isGoing === '') ?
                                <span>
                                <div className="feedback-btn" onChange={e => setFeedbackState(e.target.value)}>
                                    <p className="feedback-header">Attending:</p>
                                    <input type="radio" value="Yes" name="feedback"/> Yes
                                    <input type="radio" value="No" name="feedback"/> No
                                </div>
                                <div className="feedback-button">
                                    <button className="submit-feedback-button" onClick={e => feedbackAction(e, invited.meetup.meetupId) }>Send Feedback</button>
                                </div>
                                </span>:
                                <span className="responded-block">
                                    <p className="responded-message">-- Attending Event: {invited.meetup.isGoing} --</p>
                                    <button className="update-feedback-button" onClick={e => implementUpdateFeedback(e, invited.meetup.meetupId)}>Update Feedback</button>
                                </span>}

                            </div>
                        </li>
                    ))}
                </ul>
            }
        </div>
    );

};

export default InvitedMeetup;