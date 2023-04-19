import Header from './Header';
import HistoryChat from './HistoryChat';
import React, { useState, useRef } from "react";

const Chat = () => {
    // Handle Users Message
    const msgRef = useRef(null);
    const [message, setMessage] = useState("");

    //  Function that handles user submission
    const handleClick = async (e) => {
        const code = e.keyCode || e.which;

        if (code === 13) {
            console.log(message);
            setMessage("");
        }
    };

    return (
        <div className="w-3/4 relative">
            <Header title="Apakah nama ibukota negara Indonesia?"/>
            <div className="h-px bg-slate-200"></div>
            <HistoryChat msg={message}/>
            <div className="absolute inset-x-0 bottom-0 mr-6 ml-6 mb-4 flex flex-col justify-center">
                <p className="mb-1">Insert your question here</p>
                <input className="bg-gray-700 h-10 pl-3 text-light rounded-md focus:border-none" placeholder="What are you thinking today?"
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleClick}
                    value={message}
                    ref={msgRef} type="text"></input>
            </div>
        </div>
    );
};
  
export default Chat;