import React from 'react';

function MenuButton(props) {
    return (
        <button onClick={props.onClick} class="mr-5 py-3 text-light hover:font-bold focus:font-bold focus:bg-gray-700 hover:bg-gray-700 rounded-md my-1">
            {props.label}
        </button>
    );
}

export default MenuButton;