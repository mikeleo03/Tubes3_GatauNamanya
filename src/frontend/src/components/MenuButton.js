import React from 'react';

function MenuButton(props) {
    return (
        <button onClick={props.onClick} class="mr-5 py-3 text-light hover:font-bold focus:font-bold focus:bg-gray-700 hover:bg-gray-700 rounded-md my-1">
            <div className='flex pl-3'>
                <img src={props.images} alt="icon" className="h-6"></img>
                <p className='pl-3'>{props.label}</p>
            </div>
        </button>
    );
}

export default MenuButton;