import React from 'react';

function Profile(props) {
    return (
        <div class="profile-section" className="h-18 flex space-x-1 mb-4 bg-gray-700 rounded-md">
            <div className="w-1/4 pt-2 pb-1 flex justify-center align-center">
                <img src={props.profpics} alt="Profile" className="h-12"></img>
            </div>
            <div className="w-3/4 pl-2 pt-2 pb-1">
                <p className="text-light">{props.name}</p>
                <p className="text-light text-xs text-elipsis">{props.email}</p>
            </div>
        </div>
    );
}

export default Profile;