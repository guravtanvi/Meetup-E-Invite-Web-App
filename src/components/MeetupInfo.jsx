import React from 'react';
import { fetchMeetupList } from '../services/services';

const MeetupInfo = ({state, meetup, onHome}) => {

    const getMeetups = (e) => {
        e.preventDefault();
        fetchMeetupList(state.username)
        .then((meetups) => {
            onHome(meetups.createdMeetups, meetups.invitedMeetups, '')
        })
        .catch((error) => {
            onHome([], [], error.code);
        });
    };

    return(
        <div className="meetup-details-container">
            <div className="link-back-home">
                <a
                  className="back-home"
                  href="https://meetuplogin.com"
                  title="Click to go back Home"
                  onClick={(e) => getMeetups(e)}>
                  Back Home
                </a>
            </div>

            <div className="meetup-details">
                <div className="meetup-title">
                    <p className="heading-title">Meetup Title</p>
                    <div className="title"><span>{meetup.title}</span></div>
                </div>

                <div className="meetup-host">
                    <p className="heading-title">Meetup Host</p>
                    <div className="host"><span>{meetup.host}</span></div>
                </div>

                <div className="meetup-date">
                    <p className="heading-title">Meetup Date</p>
                    <div className="date"><span>{meetup.date}</span></div>
                </div>

                <div className="meetup-time">
                    <p className="heading-title">Meetup Time</p>
                    <div className="time"><span>{meetup.time}</span></div>
                </div>

                <div className="meetup-place">
                    <p className="heading-title">Meetup Place</p>
                    <div className="place"><span>{meetup.place}</span></div>
                </div>

                <div className="meetup-agenda">
                    <p className="heading-title">Meetup Agenda</p>
                    <div className="agenda"><span>{meetup.agenda}</span></div>
                </div>
                
                <div className="meetup-members">
                    <p className="heading-title">Meetup Members</p>
                    {
                      Object.values(meetup.members).map((member, key) => (
                        <div className="member-names" key={key}>
                          <span>{member}</span>
                        </div>
                      ))
                    }
                </div>
                
                <div className="confirmed-members">
                    <p className="heading-title">Members Attending</p>
                    <div className="confirmed"><span>{meetup.membersConfirmed}</span></div>
                </div>

                <div className="not-confirmed-members">
                    <p className="heading-title">Members Not Attending</p>
                    <div className="not-confirmed"><span>{meetup.membersNotConfirmed}</span></div>
                </div>

            </div>
        </div>
        
    );
};

export default MeetupInfo;
