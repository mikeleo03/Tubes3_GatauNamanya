import React from 'react';

function History(props) {
    return (
        <button className="pt-3 hover:bg-gray-300 hover:rounded-lg focus:bg-gray-300 focus:rounded-lg">
            <h3 className='font-medium pl-3 pr-3 pb-1 text-left'>{props.title}</h3>
            <p className="text-sm pb-3 pl-3 pr-3 text-left">{props.content}</p>
            <div className="h-px bg-slate-400"></div>
        </button>
    );
}

export default History;