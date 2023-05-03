import React from 'react';

function MenuButton(props) {
    return (
        <button onClick={props.onClick} className="flex-auto py-2 text-light bg-gray-600 focus:bg-gray-500 hover:bg-gray-500 rounded-md my-1">
            <p className='pl-3 pr-3 md:text-base text-sm'>{props.label}</p>
        </button>
    );
}

function Profile(props) {
    return (
        <button className="profile-section md:h-18 h-12 flex flex-row space-x-1 mb-4 bg-gray-600 focus:bg-gray-500 hover:bg-gray-500 rounded-md px-3 w-full">
            <div className="w-1/5 flex justify-center align-center md:py-2 py-1 pt-2 shrink-0">
                <img src={props.user.picture} alt="Profile" referrerPolicy="no-referrer" className="h-8 rounded-full"></img>
            </div>
            <div className="w-4/5 pl-2 pt-1 align-left overflow-hidden">
                <p className="text-light text-left md:text-base text-sm">{props.user.name}</p>
                <p className="text-light text-xs text-elipsis text-left">{props.user.email}</p>
            </div>
        </button>
    );
}

export { MenuButton, Profile } ;