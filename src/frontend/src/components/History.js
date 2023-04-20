import React from "react";

const HistoryContent = ({ title, content }) => {
    return (
        <div>
            <button className="hover:bg-gray-300 flex flex-col hover:rounded-lg focus:bg-gray-300 focus:rounded-lg max-h-36 overflow-hidden text-ellipsis">
                <h3 className='font-medium pl-3 pr-3 pb-1 pt-2 text-left text-ellipsis'>{title}</h3>
                <p className="text-sm pl-3 pr-3 pb-3 text-left text-ellipsis">{content}</p>
            </button>
            <div className="h-px bg-slate-400"></div>
        </div>
    );
}

export default HistoryContent;