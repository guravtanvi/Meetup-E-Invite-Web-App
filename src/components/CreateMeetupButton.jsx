import React from 'react';

const CreateMeetupButton = ({onCreateMeetup}) => {
    
    return (    
        <button className="create-meetup-btn"  title="Click to Create New Meetup" onClick={onCreateMeetup}>
        Create Meetup
        </button>
    );
};

export default CreateMeetupButton;



