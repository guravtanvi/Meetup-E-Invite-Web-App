import React, {useEffect, useState} from 'react';
import Header from './components/Header';
import ErrorMessage from './components/ErrorMessage';
import UpdateMeetup from './components/UpdateMeetup';
import MeetupInfo from './components/MeetupInfo';
import NewMeetup from './components/NewMeetup';
import UserHome from './components/UserHome';
import LoginPage from './components/LoginPage';
import Registration from './components/Registration';
import {fetchLoginPageStatus, fetchMeetupList} from './services/services';
import './App.css';

function App() {
  const [error, setErrorState] = useState('');
  const [users, setUsers] = useState({});
  const [meetup, setMeetupState] = useState('');
  const [action, setUserAction] = useState({ isLoggedIn: false});
  const [page, setPageState] = useState('loginPage');
  
  useEffect(() => {
    fetchLoginPageStatus()
    .then(userDetails => {
      fetchMeetupList(userDetails.username)
      .then((meetups) =>{
        setErrorState('');
        setUserAction({
          isLoggedIn: true,
          username: userDetails.username,
          createdMeetups: meetups.createdMeetups,
          invitedMeetups: meetups.invitedMeetups
        });
        setPageState('homePage');
      })
      .catch((error) => {
        setErrorState(error.code);
      });
    })
  }, []);


  const login = (username, createdMeetups, invitedMeetups, error) => {
    setErrorState(error);
    if(!error) {
      setUserAction({
        isLoggedIn: true,
        username,
        createdMeetups,
        invitedMeetups
      });
      setPageState('homePage');
    }
  };

  const registration = () => {
    setErrorState('');
    setUserAction({
      ...action,
      isLoggedIn: false
    });
    setPageState('registrationPage');
  };

  const logoutPage = (error) => {
    setErrorState(error);
    setUserAction({
      ...action,
      isLoggedIn: false
    });
    setPageState('loginPage');
  };

  const createMeetupPage = (validUsers, error) => {
    setErrorState(error);
    if(!error) {
      setUsers(validUsers);
      setPageState('createMeetup');
    }
  }

  const meetupDetailsPage = (meetup, error) => {
    setErrorState(error);
    if(!error) {
      setMeetupState(meetup);
      setPageState('meetupDetails');
    }
  }

  const loginPage = (error) => {
    setErrorState(error);
    if(!error) {
      setPageState('loginPage');
    }
  }

  const updateMeetups = (createdMeetups, invitedMeetups, error) => {
    setErrorState(error);
    if(!error) {
      
      setUserAction({
        ...action,
        createdMeetups: createdMeetups,
        invitedMeetups: invitedMeetups
      });
    }
  };

  const homePage = (createdMeetups, invitedMeetups, error) => {
    setErrorState(error);
    if(!error) {
      setUserAction({
        ...action,
        createdMeetups,
        invitedMeetups
      });
      setPageState('homePage');
    }
  };

  const getUpadteMeetupPage = (meetup, validUsers, error) => {
    setErrorState(error);
    if(!error) {
      setMeetupState(meetup);
      setUsers(validUsers);
      setPageState('updateMeetupPage');
    }
  }

  let container;

  if(page === 'registrationPage') {
    container = <Registration isRegistered={loginPage}/>;
  }
  else if(page === 'loginPage') {
    container = <LoginPage onLogin={login} isRegistered={registration}/>;
  }
  else if(page === 'homePage') {
    container = <UserHome 
                state={action}
                onCreate={createMeetupPage}
                onUpdate={updateMeetups}
                onLogout={logoutPage}
                onDetails={meetupDetailsPage}
                onMeetupUpdate={getUpadteMeetupPage} />          
  }
  else if(page === 'createMeetup') {
    container = <NewMeetup state={action} users={users} onDetails={meetupDetailsPage} onHome={homePage}/>
  }
  else if(page === 'meetupDetails') {
    container = <MeetupInfo state={action} meetup={meetup} onHome={homePage}/>
  }
  else if(page === 'updateMeetupPage') {
    container = <UpdateMeetup state={action} meetup={meetup} users={users} onHome={homePage} onDetails={meetupDetailsPage}/>
  }

  return (
    <div className="App">
      <div className="header">
        <Header/>
      </div>

      <div className="error-message">
        <ErrorMessage error={error}/>
      </div>

      <div className="container">
        {container}
      </div>

      <div className="footer">
        <span>© seainfo6250</span>  
      </div>
    </div>
  );
}

export default App;
