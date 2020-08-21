
export const convertErrorCodes = (err) => Promise.reject(err);

export const fetchLoginPageStatus = () => {
    return fetch('/session', {
        method: 'GET'
    })
    .catch(() => {
        return Promise.reject({ code: 'NETWORK_ERROR'});
    })
    .then(response => {
        if(!response.ok) {
            return response.json().then(convertErrorCodes);
        }
        return response.json();
    });
};


export const fetchRegistrationPage = (username, firstName, lastName) => {
    return fetch('/registration', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ username, firstName, lastName }),
    })
    .catch(() => {
        return Promise.reject({ code: 'NETWORK_ERROR'});
    })
    .then(response => {
        if(!response.ok) {
            return response.json().then(convertErrorCodes);
        }
        return response.json();
    });
};


export const fetchLoginPage = (username) => {
    console.log("fetch new login",username);
    return fetch('/session', {
        method: 'POST',
        headers: new Headers({
          'content-type': 'application/json',
        }),
        body: JSON.stringify( {username} ),
      })
      .catch( () => {
        return Promise.reject({code: 'NETWORK_ERROR'});
      })
      .then( response => {
        if(!response.ok) {
          return response.json().then( convertErrorCodes );
        }
        return response.json();
      });
}

export const fetchMeetupList = (username) => {
    return fetch(`/meetups/${username}`, {
        method: 'GET'
    })
    .catch(() => {
        return Promise.reject({ code: 'NETWORK_ERROR'});
    })
    .then(response => {
        if(!response.ok) {
            return response.json.then(convertErrorCodes);
        }
        return response.json();
    });
};

export const fetchMeetupForUser = (meetupId) => {
    return fetch(`/meetup/${meetupId}`, {
        method: 'GET'
    })
    .catch(() => {
        return Promise.reject({ code: 'NETWORK_ERROR' });
    })
    .then((response) => {
        if(!response.ok) {
            return response.json().then(convertErrorCodes);
        }
        return response.json();
    });
};

export const fetchLogout = () => {
    console.log("logout fetch");

    return fetch('/session', {
        method: 'DELETE',
    })
    .catch(() => {
        return Promise.reject({ code: 'NETWORK_ERROR'});
    })
    .then((response) => {
        if(!response.ok) {
            return response.json().then(convertErrorCodes);
        }
        return response.ok;
    });
};
  
export const fetchValidUsers = () => {
    return fetch('/users', {
        method: 'GET'
    })
    .catch(() => {
        return Promise.reject({ code: 'NETWORK_ERROR' });
    })
    .then((response) => {
        if(!response.ok) {
            return response.json().then(convertErrorCodes);
        }
        return response.json();
    });
};


export const fetchDeleteRegistration = () => {
    return fetch('/registration', {
        method: 'DELETE'
    })
    .catch(() => {
        return Promise.reject({ code: 'NETWORK_ERROR'});
    })
    .then((response) => {
        if(!response.ok) {
            return response.json().then(convertErrorCodes);
        }
        return response.ok;
    });
};

export const fetchCreateMeetupPage = (title, host, place, date, time, agenda, members) => {
    const meetup = {
        title: title,
        agenda: agenda,
        date: date,
        time: time,
        place: place,
        host: host,
        members: members
    };
    return fetch('/meetup', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
      body: JSON.stringify(meetup),
    })
    .catch( () => {
      return Promise.reject({code: 'NETWORK_ERROR'});
    })
    .then( (response) => {
      if(!response.ok) {
          return response.json().then( convertErrorCodes );
      }
      return response.json();
    });
  };


  export const fetchUpdateMeetup = (title, id , host, place, date, time, agenda, members) => {
      
    const meetup = {
        title: title,
        meetupId: id,
        host: host,
        place: place,
        date: date,
        time: time,
        agenda: agenda,
        members: members
    };
    console.log(meetup);

    return fetch('/meetup', {
        method: 'PUT',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify(meetup),
    })
    .catch(() => {
        return Promise.reject({ code: 'NETWORK_ERROR'});
    })
    .then((response) => {
        if(!response.ok) {
            return response.json().then(convertErrorCodes);
        }
        return response.json();
    });
};




export const fetchUpdateFeedback = (username, isAttending, meetupId) => {
    const feedback = {
        username: username,
        isAttending: isAttending,
        meetupId: meetupId
    };
    return fetch('/response', {
        method: 'PUT',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify(feedback)
    })
    .catch(() => {
        return Promise.reject({ code: 'NETWORK_ERROR'});
    })
    .then((response) => {
        if(!response.ok) {
            return response.json().then(convertErrorCodes);
        }
        return response.json();
    });
};

export const fetchRemoveCreatedMeetup = (meetupId) => {
    return fetch(`/meetup/${meetupId}`, {
        method: 'DELETE'
    })
    .catch(() => {
        return Promise.reject({ code: 'NETWORK_ERROR'});
    })
    .then((response) => {
        if(!response.ok) {
            return response.json().then(convertErrorCodes);
        }
        return response.ok;
    });
};

export const fetchRemoveInvitedMeetup = (username, meetupId) => {
    return fetch(`/${username}/meetup/${meetupId}`, {
        method: 'DELETE'
    })
    .catch(() => {
        return Promise.reject({ code: 'NETWORK_ERROR'});
    })
    .then((response) => {
        if(!response.ok) {
            return response.json().then(convertErrorCodes);
        }
        return response.ok;
    });
    
};
