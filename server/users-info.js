const { v4: uuidv4 } = require('uuid');

const { getMeetup, deleteMeetup, getMeetupList } = require('./meetup-info');

const users = {
    '44': {
        id: '44',
        username: 'tanvigurav',
        meetupOwner: [1],
        invitedMeetup: [{
            meetupId: 2,
            isGoing: ''
        }]
    },

    '45': {
        id: '45',
        username: 'snehav',
        meetupOwner: [3],
        invitedMeetup: [{
            meetupId: 1,
            isGoing: ''
        }]
    },

    '46': {
        id: '46',
        username: 'vibhaabc',
        meetupOwner: [2],
        invitedMeetup: [{
            meetupId: 3,
            isGoing: ''
        }]
    }
};



const createUser = (username) => {
    const uid = uuidv4();
    const userList = Object.values(users);

    for(const user of userList) {
        if(user.username === username.toLowerCase()) {
            return 401;
        }
    }
    users[uid] = {
        id: uid,
        username: username.toLowerCase(),
        meetupOwner: [],
        invitedMeetup: []
    };
    return users[uid];
};

const appendMeetupIdOwner = (username, meetupId) => {
    const userList = Object.values(users);
    let matchedUser = {};
    
    for(const user of userList) {
        if(user.username === username.toLowerCase()){
            matchedUser = user;
            
            break;
        }
    }
    
    matchedUser.meetupOwner.push(meetupId);
}

const appendMeetupIdInvited = (invitedList, meetupId) => {
    const userList = Object.values(users);
    let matchedUser = {};

    for(const invitedUser of invitedList) {
        for(const user of userList) {
            if(user.username === invitedUser.toLowerCase()) {
                matchedUser = user;
                
                break;        
            }
        }
        matchedUser.invitedMeetup.push({
            meetupId: meetupId,
            isGoing: ''
        });
    }
};

const removeMeetupOwnerList = (meetupId, username) => {
    const userList = Object.values(users);
    let matchedUser = {};

    for(const user of userList) {
        if(user.username === username.toLowerCase()){
            matchedUser = user;
            
            break;
        }
    }

    if(matchedUser) {
        for(let index=0; index < matchedUser.meetupOwner.length; index++) {
            if(matchedUser.meetupOwner[index] === meetupId) {
                matchedUser.meetupOwner.splice(index, 1);
                
                break;
            }
        }
    }
};

const removeMeetupInvited = (meetupId, invitedList) => {
    const userList = Object.values(users);
    let matchedUser = {};

    for(const invitedUser of invitedList) {
        for(const user of userList) {
            if(user.username === invitedUser.toLowerCase()) {
                matchedUser = user;
                
                for(let index=0; index < matchedUser.invitedMeetup.length; index++) {
                    if(matchedUser.invitedMeetup[index].meetupId === meetupId) {
                        matchedUser.meetupOwner.splice(index, 1);
                        
                        break;
                    }
                }
            }
            
            break;
        }
    }
};

const getCreatedMeetups = (username) => {
    
    const userList = Object.values(users);
    const createdMeetups = [];
    let matchedUser = {};
    
    for(const user of userList) {
        if(user.username === username.toLowerCase()){
            matchedUser = user;
            break;
        }
    }
    
    matchedUser.meetupOwner.forEach((ownerId) => {
        createdMeetups.push(getMeetup(ownerId));
    })
    return createdMeetups; 
};

const getInvitedMeetups = (username) => {
    
    const userList = Object.values(users);
    let invitedList = [];
    const invitedMeetupIds = [];

    for(const user of userList) {
        if(user.username === username.toLowerCase()){
            invitedList = user.invitedMeetup;
            break;
        }
    }

    for(let i = 0; i < invitedList.length; i++){
        invitedMeetupIds.push({meetup: getMeetup(invitedList[i].meetupId), isGoing: invitedList[i].isGoing});
      }

    return invitedMeetupIds;
};

const getUsers = () => {
    return users;
};

const getUser = (username) => {
    const userList = Object.values(users);

    for(const user of userList) {
        if(user.username === username.toLowerCase()){
            return user;
        }
    }
    return 401;
};


const removeUser = (userId) => {
    const user = users[userId];
    const ownerMeetupList = user.meetupOwner;

    ownerMeetupList.forEach((meetup) => {
        deleteMeetup(meetup);
    })

    delete users[userId];
    return user;
};

const updateFeedback = (feedback) => {
    const userList = Object.values(users);
    const username = feedback.username;
    let matchedUser = {};
    let oldFeedback = '';

    for(const user of userList) {
        if(user.username === username.toLowerCase()){
            matchedUser = user;
            
            break;
        }
    }

    for(const invite of matchedUser.invitedMeetup) {
        if(invite.meetupId === feedback.eventId) {
            oldFeedback = invite.isGoing;
            invite.isGoing = feedback.isAttending;
            
            break;
        }
    }
    return oldFeedback;
}

const removeInvitedMeetup = (username, meetupId) => {
    const userList = Object.values(users);
    let matchedUser = {};
    

    for(const user of userList) {
        if(user.username === username.toLowerCase()){
            matchedUser = user;
            
            break;
        }
    }
    let meetupList1 = matchedUser.invitedMeetup;
    for(const meetup of meetupList1) {
        if(meetup.meetupId === meetupId) {
            matchedUser.invitedMeetup.splice(index, 1);
            
            break;
        }
    }
}

module.exports = {
    users,
    removeInvitedMeetup,
    updateFeedback,
    removeUser,
    getUser,
    getUsers,
    getInvitedMeetups,
    getCreatedMeetups,
    removeMeetupInvited,
    removeMeetupOwnerList,
    appendMeetupIdInvited,
    appendMeetupIdOwner,
    createUser
}   

