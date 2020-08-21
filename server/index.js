const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 5000;

const { authorize } = require('./authorize');
const {
    users,
    removeInvitedMeetup,
    updateFeedback,
    removeUser,
    getUser,
    //getUsers,
    getInvitedMeetups,
    getCreatedMeetups,
    removeMeetupInvited,
    removeMeetupOwnerList,
    appendMeetupIdInvited,
    appendMeetupIdOwner,
    createUser
} = require('./users-info');
const {
    meetups,
    deleteMeetup,
    updateMeetupFeedback,
    updateTask,
    createMeetup,
    getMeetup,
    getMeetupList
} = require('./meetup-info');

app.use(cookieParser());
app.use(express.static('./build'));

app.get('/session', (req, res) => {
    const id = req.cookies.id;

    if(!id) {
        res.status(401).json({ code: 'LOGIN_MANDATORY'});
        return;
    }
    if(!users[id]) {
        res.clearCookie('id');
        res.status(403).json({ code: 'UNAUTHORIZED_LOGIN'});
        return;
    }

    res.status(200).json(users[id]);
});

app.post('/session', express.json(), (req, res) => {
    const username = req.body.username;
    
	res.clearCookie('id');
	if(!username) {
		res.status(400).json({ code: 'USERNAME_MANDATORY' });
		return;
	}
	const response = getUser(username);
	if(response === 401){
		res.status(401).json({ code: 'REGISTRATION_MANDATORY' });
		return;
	}
	res.cookie('id', response.id);
	res.status(200).json(response);
});

app.delete('/logout', express.json, (req, res) => {
    const id = req.cookies.id;
    
    if(!id) {
        res.status(401).json({ code: 'ID_UNAVAILABLE'});
        return;
    }
	if(!users[id]) {
        res.clearCookie('id');
        res.status(403).json({ code: 'ID_NOT_KNOWN'});
        return;
    }
    res.clearCookie('id');
    res.sendStatus(200);
});

app.get('/users', (req, res) => {
    const id = req.cookies.id;
    if(!id) {
        res.status(401).json({ code: 'LOGIN_MANDATORY'});
        return;
    }
    if(!users[id]) {
		res.clearCookie('id');
		res.status(403).json({ code: 'UNAUTHORIZED_LOGIN' });
		return;
	}
	res.status(200).json(users);

});

app.get('/meetups/:username', (req, res) => {
    const id = req.cookies.id;
    const username = req.params.username;
    
    if(!id) {
        res.status(401).json({ code: 'ID_UNAVAILABLE'});
        return;
    }
    if(!users[id]) {
        res.clearCookie('id');
        res.status(403).json({ code: 'ID_NOT_KNOWN'});
        return;
    }

    
    const getCreatedMeet = getCreatedMeetups(username);
    const getInvitedMeet = getInvitedMeetups(username);
    
    res.json({ 
        createdMeetups: getCreatedMeet,
        invitedMeetups: getInvitedMeet
    })

});

app.get('/meetup/:meetupId', (req, res) => {
    const id = req.cookies.id;
    const meetupId = req.params.meetupId;

    if(!id) {
        res.status(401).json({ code: 'ID_UNAVAILABLE'});
        return;
    }
    if(!users[id]) {
        res.clearCookie('id');
        res.status(403).json({ code: 'ID_NOT_KNOWN'});
        return;
    }
    const meetup = getMeetup(meetupId);

    if(meetup === 403) {
        res.status(403).json({ code: 'NON_EXISTENT_MEETUP'});
        return;
    }
    res.json(getMeetup(meetupId));
});

app.post('/meetup', express.json(), (req, res) => {
    const id = req.cookies.id;
    
	if(!id) {
		res.status(401).json({ code: 'ID_UNAVAILABLE'});
		return;
	}
	if(!users[id]) {
		res.clearCookie('id');
		res.status(403).json({ code: 'ID_NOT_KNOWN'});
		return;
	}
    const meetup = req.body;
   
	const addMeet = createMeetup(meetup);
	if(addMeet.code === 406){
		res.status(406).json({ code: addMeet.result});
		return;
	}
	const newMeet = addMeet.result;
	appendMeetupIdOwner(newMeet.host, newMeet.meetupId);
	appendMeetupIdInvited(newMeet.members, newMeet.meetupId);
	res.json(newMeet);
});


app.post('/registration', express.json(), (req, res) => {
    const username = req.body.username;
    
    res.clearCookie('id');
    if(!username) {
        res.status(400).json({ code: 'USERNAME_MANDATORY'});
        return;
    }
    if(!authorize.isValidLogin(username)) {
        res.status(403).json({ code: 'UNAUTHORIZED_LOGIN'});
        return;
    }
    const incomingUser = createUser(username);
    if(incomingUser === 401) {
        res.status(401).json({ code: 'DUPLICATE_USERNAME'});
        return;
    }
    res.cookie('id', incomingUser.id);
    res.status(200).json(incomingUser);
});

app.delete('/registration', express.json(), (req, res) => {
    const id = req.cookies.id;

    if(!id) {
        res.status(401).json({ code: 'ID_UNAVAILABLE'});
        return;
    }
	if(!users[id]) {
        res.clearCookie('id');
        res.status(403).json({ code: 'ID_NOT_KNOWN'});
        return;
    }
    res.clearCookie('id');
    removeUser(id);
    res.sendStatus(200);
});


app.delete('/session', express.json(), (req, res) => {
    const id = req.cookies.id;
    
    
	if(!id) {
		res.status(401).json({ code: 'UID_MISSING' });
		return;
	}
	if(!users[id]) {
		res.clearCookie('id');
		res.status(403).json({ code: 'UID_UNKNOWN' });
		return;
	}
	res.clearCookie('id');
	res.sendStatus(200);
});

app.put('/meetup', express.json(), (req, res) => {
    const id = req.cookies.id;
    
    if(!id) {
        res.status(401).json({ code: 'ID_UNAVAILABLE'});
        return;
    }
	if(!users[id]) {
        res.clearCookie('id');
        res.status(403).json({ code: 'ID_NOT_KNOWN'});
        return;
    }

    const meetup = req.body;
    
	const prevMeetup = getMeetup(meetup.meetupId);
    removeMeetupInvited(prevMeetup.meetupId, prevMeetup.members);
    
    const updatedMeetup = updateTask(meetup);
    
	if(updatedMeetup.code === 406){
		res.status(406).json({ code: updatedMeetup.result});
		return;
    }
    
	const newMeetup = updatedMeetup.result;
	appendMeetupIdInvited(newMeetup.members, newMeetup.meetupId);
	res.json(newMeetup);
});

app.put('/response', express.json(), (req, res) => {
    const id = req.cookies.id;

    if(!id) {
        res.status(401).json({ code: 'ID_UNAVAILABLE'});
        return;
    }
	if(!users[id]) {
        res.clearCookie('id');
        res.status(403).json({ code: 'ID_NOT_KNOWN'});
        return;
    }

    const feedback = req.body;
    let oldFeedback = updateFeedback(feedback);
    updateMeetupFeedback(feedback, oldFeedback);

    const createdMeetup = getCreatedMeetups(feedback.username);
    const invitedMeetup = getInvitedMeetups(feedback.username);

    res.json({ 
        createdMeetups: createdMeetup,
        invitedMeetups: invitedMeetup});
});

app.delete('/meetup/:meetupId', express.json(), (req, res) => {
    const id = req.cookies.id;
    const meetupId = req.params.meetupId;

    if(!id) {
        res.status(401).json({ code: 'ID_UNAVAILABLE'});
        return;
    }
	if(!users[id]) {
        res.clearCookie('id');
        res.status(403).json({ code: 'ID_NOT_KNOWN'});
        return;
    }

    const meetup = deleteMeetup(meetupId);
    removeMeetupOwnerList(meetupId, meetup.host);
    removeMeetupInvited(meetupId, meetup.members);
    res.sendStatus(200);

});

app.delete('/:username/meetup/:meetupId', express.json(), (req, res) => {
    const id = req.cookies.id;
    const meetupId = req.params.meetupId;
    const username = req.params.username;

    if(!id) {
        res.status(401).json({ code: 'ID_UNAVAILABLE'});
        return;
    }
	if(!users[id]) {
        res.clearCookie('id');
        res.status(403).json({ code: 'ID_NOT_KNOWN'});
        return;
    }

    removeInvitedMeetup(username, meetupId);
    res.sendStatus(200);
});




app.listen(PORT, () => console.log(`http://localhost:${PORT}`) );
