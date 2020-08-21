import React, {useState} from 'react';
import { fetchUpdateMeetup, fetchMeetupList, fetchMeetupForUser} from '../services/services';


const UpdateMeetup = ({state, meetup, users, onHome, onDetails}) => {

    const [title, setMeetupTitle] = useState(meetup.title);
    const [place, setMeetupPlace] = useState(meetup.place);
    const [date, setMeetupDate] = useState(meetup.date);
    const [time, setMeetupTime] = useState(meetup.time);
    const [agenda, setMeetupAgenda] = useState(meetup.agenda);

    const userList = Object.keys(users);
    let selectedMembers = [];

    const implementUserAction = () => {

        const members = document.querySelector('#members');

        if (userList.length > 1) {
            selectedMembers = [].filter
              .call(members.options, (option) => option.selected)
              .map((option) => option.text);
        }
        fetchUpdateMeetup(title, meetup.meetupId, state.username, place,
            date, time, agenda, selectedMembers)
        .then((meetup) => {
            fetchMeetupForUser(meetup.meetupId)
            .then((meetup) => {
                onDetails(meetup, '');
            })
            .catch((error) => {
                onDetails({}, error.code);
            });
        })
        .catch((error) => {
            onDetails({}, error.code);
        });
    };

    const getMeetups = (e) => {
        e.preventDefault();
        fetchMeetupList(state.username)
		.then((meetups) => {
			onHome(meetups.createdMeetups, meetups.invitedMeetups, '');
		})
		.catch((error) => {
			onHome([], [], error.code);
		});
    };

    return (
        <div className="update-meetup-container">

            <div className="link-back-home">
                <a
                  className="back-home"
                  href="https://meetup.com"
                  title="Click to go back Home"
                  onClick={(e) => getMeetups(e)}>
                  Back Home
                </a>
            </div>

            <div className="new-meetup-page">
                <div className="meetup-title">
                    <p className="heading-title">Meetup Title</p>
                    <textarea className="new-meetup-title" id="title" value={title} onChange={e => setMeetupTitle(e.target.value)} name="title" rows="2" cols="50"></textarea>
                </div>

                <div className="meetup-date">
                    <p className="heading-title">Meetup Date</p>
                    <textarea className="new-meetup-date" id="date" value={date} onChange={e => setMeetupDate(e.target.value)} name="date" rows="2" cols="50"></textarea>
                </div>

                <div className="meetup-time">
                    <p className="heading-title">Meetup Time</p>
                    <textarea className="new-meetup-time" id="time" value={time} onChange={e => setMeetupTime(e.target.value)} name="time" rows="2" cols="50"></textarea>
                </div>

                <div className="meetup-place">
                    <p className="heading-title">Meetup Place</p>
                    <textarea className="new-meetup-place" id="place" value={place} onChange={e => setMeetupPlace(e.target.value)} name="place" rows="2" cols="50"></textarea>
                </div>

                <div className="meetup-agenda">
                    <p className="heading-title">Meetup Agenda</p>
                    <textarea className="new-meetup-agenda" id="agenda" value={agenda} onChange={e => setMeetupAgenda(e.target.value)} name="agenda" rows="2" cols="150"></textarea>
                </div>

                { userList.length <= 1 ? <p>Oops! No members found!! Update Event and come back later to add members!!</p> :
                <div>
                    <p className="instructions"> Press hold Ctrl/Command button for selecting multiple members</p>
                    <div className="select-users">
                        <label className="select-users">Invite Members for Meetup:</label>
                        <select className="filter-list" id="members" multiple size="users.length">
                        <option value='' disabled hidden></option>
                        { Object.values(users)
                            .filter((user) => user.username !== state.username)
                            .map((user, key) => (
                              <option key={key} value={user.username}>
                                {user.username}
                              </option>
                            ))
                        }
                        </select>
                    </div>
                </div>
                }
            </div>

            <button className="submit-button" type="submit" onClick={implementUserAction}>
              Submit
            </button>
        </div>
    );

};

export default UpdateMeetup;