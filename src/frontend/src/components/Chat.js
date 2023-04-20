import Header from './Header';
import React, { useState, useRef, useEffect } from "react";

const ChatBubble = ({ message, profpics }) => {
    return (
        <div class='current-bubble'>
            <div className="bg-gray-200 mt-4 py-6 px-8 pb-10 w-full rounded-lg" style={{float: 'right'}}>
                <div className='text-lg w-full'>
                    {message}
                </div>
            </div>
            <div className='mr-8 mt-[-2.5rem] bg-gray-700 px-2 pt-2 pb-2 rounded-lg' style={{float: 'right'}}>
                <img src={profpics} alt="Profile" className="h-16"></img>
            </div>
        </div>
    );
}

const Chat = (props) => {
    // Handle Users Messages
    const bottomRef = useRef(null);
    const [chatBubbles, setChatBubbles] = useState([]);
    const [inputText, setInputText] = useState(" ");

    //  Function that handles user submission
    const handleClick = (e) => {
        const code = e.keyCode || e.which;

        if (code === 13) {
            setChatBubbles([...chatBubbles, inputText]);
            setInputText(" ");
        }
    };

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [chatBubbles]);

    return (
        <div className="w-3/4 relative px-7">
            <Header title="Nama ibukota negara Indonesia yang baru"/>
            <div className="h-px bg-slate-200 ml-[-1.5rem] mr-[-1.5rem]"></div>
            <div className='h-150 overflow-auto flex flex-col chat-interface'>
                {chatBubbles.map((message, index) => (
                    <ChatBubble key={index} message={message} profpics={props.profpics} />
                ))}
                <div ref={bottomRef} />
            </div>
            <div className="absolute inset-x-0 bottom-0 mr-6 ml-6 mb-4 flex flex-col justify-center">
                <p className="mb-1">Insert your question here</p>
                <input className="bg-gray-700 h-10 pl-3 text-light rounded-md focus:border-none" 
                    onChange={e => setInputText(e.target.value)}
                    onKeyPress={handleClick}
                    value={inputText}
                    type="text"
                    placeholder="What are you thinking today?">
                </input>
            </div>
        </div>
    );
};
  
export default Chat;