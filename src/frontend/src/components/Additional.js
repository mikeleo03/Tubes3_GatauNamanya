import React from 'react';

function MenuButton(props) {
    return (
        <button onClick={props.onClick} class="flex-auto py-3 text-light bg-gray-600 focus:bg-gray-500 hover:bg-gray-500 rounded-md my-1">
            <p className='pl-3 pr-3'>{props.label}</p>
        </button>
    );
}

function Profile(props) {
    return (
        <button class="profile-section" className="h-18 flex flex-row space-x-1 mb-4 bg-gray-600 focus:bg-gray-500 hover:bg-gray-500 rounded-md px-3 w-full">
            <div className="w-1/5 flex justify-center align-center py-2">
                <img src={props.profpics} alt="Profile" className="h-10"></img>
            </div>
            <div className="w-4/5 pl-2 py-2 align-left">
                <p className="text-light text-left">{props.name}</p>
                <p className="text-light text-xs text-elipsis text-left">{props.email}</p>
            </div>
        </button>
    );
}

export { MenuButton, Profile } ;