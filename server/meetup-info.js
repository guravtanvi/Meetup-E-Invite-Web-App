

const meetupList = {
    '1': {
        meetupId: 1,
        title: 'Data Science Tech Meet',
        agenda: 'Plan Q2-2020 closure details',
        date: '08/20/2020',
        time: '03:00:00',
        place: 'Waltham',
        host: 'tanvigurav',
        members: ['snehav'],
        membersConfirmed: 0,
        membersNotConfirmed: 0
    },

    '2': {
        meetupId: 2,
        title: 'Teach Me Tuesday',
        agenda: 'Knowledge sharing session to freshers - ReactJS',
        date: '08/25/2020',
        time: '01:00:00',
        place: 'Quincy',
        host: 'vibhaabc',
        members: ['tanvigurav'],
        membersConfirmed: 0,
        membersNotConfirmed: 0
    },

    '3': {
        meetupId: 3,
        title: 'Stand-up Meeting',
        agenda: 'Payroll Discussion',
        date: '08/29/2020',
        time: '12:30:00',
        place: 'Fenway',
        host: 'snehav',
        members: ['vibhaabc'],
        membersConfirmed: 0,
        membersNotConfirmed: 0
    }
}

const increment = () => {
    let incr = 5;
    return () => {
        incr += 1;
        return incr;
    };
};

const incrementId = increment();

const createMeetup = ( task ) => {

    const incrementMeetupId = incrementId();
    let error='';

    if( !task.title || !(/\S/.test(task.title)) ) {
        error = error + 'Title ';
    }

    if( !task.place || !(/\S/.test(task.place)) ) {
        error = error + 'Place ';
    }

    if( !task.date || !(/\S/.test(task.date)) ) {
        error = error + 'Date ';
    }

    if( !task.time || !(/\S/.test(task.time)) ) {
        error = error + 'Time ';
    }

    if( !task.agenda || !(/\S/.test(task.agenda)) ) {
        error = error + 'Agenda ';
    }

    if( error != ''){
        error = error + 'Kindly fill empty field';
        return {code: 406, result: error};
    }

    meetupList[incrementMeetupId] = { 
        meetupId: incrementMeetupId,
        title: task.title,
        agenda: task.agenda,
        date: task.date,
        time: task.time,
        place: task.place,
        host: task.host,
        members: task.members,
        membersConfirmed: 0,
        membersNotConfirmed: 0
    };

    return {code: 0, result: meetupList[incrementMeetupId]};
};


const updateTask = (task) => {
    let error='';

    if( !task.title || !(/\S/.test(task.title)) ) {
        error = error + 'Title ';
    }

    if( !task.place || !(/\S/.test(task.place)) ) {
        error = error + 'Place ';
    }

    if( !task.date || !(/\S/.test(task.date)) ) {
        error = error + 'Date ';
    }

    if( !task.time || !(/\S/.test(task.time)) ) {
        error = error + 'Time ';
    }

    if( !task.agenda || !(/\S/.test(task.agenda)) ) {
        error = error + 'Agenda ';
    }

    if( error != '') {
        error = error + '* Kindly fill empty field';
        return {code: 406, result: error};
    }

    meetupList[task.meetupId] = { 
        meetupId: task.meetupId,
        title: task.title,
        agenda: task.agenda,
        date: task.date,
        time: task.time,
        place: task.place,
        host: task.host,
        members: task.members,
        membersConfirmed: 0,
        membersNotConfirmed: 0
    };

    return {code: 0, result: meetupList[task.meetupId]};
};

const updateMeetupFeedback = ( feedback, oldFeedback) => {

    const task = meetupList[feedback.meetupId];

    if(oldFeedback === '') {
        if(feedback.isAttending === 'Yes') {
            task.membersConfirmed += 1;
        }
        else if(feedback.isAttending === 'No') {
            task.membersNotConfirmed += 1;
        }
    }
    else if(oldFeedback === 'No') {
        if(feedback.isAttending === 'Yes') {
            task.membersConfirmed += task.membersConfirmed;
            task.membersNotConfirmed -= task.membersNotConfirmed;
        }
    }
    else if(oldFeedback === 'Yes') {
        if(feedback.isAttending === 'No') {
            task.membersConfirmed -= task.membersConfirmed;
            task.membersNotConfirmed += task.membersNotConfirmed;
        }
    }
};


const deleteMeetup = (meetupId) => {
    const task = meetupList[meetupId];
    delete meetupList[meetupId];
    return task;
  };


const getMeetupList = () => {
    return meetupList;
};
  
const getMeetup = (meetupId) => {

    if( !meetupList[meetupId] ) {
        return 403;
      }
      return meetupList[meetupId];

};


module.exports = {
    getMeetupList,
    deleteMeetup,
    updateMeetupFeedback,
    updateTask,
    createMeetup,
    getMeetup
};