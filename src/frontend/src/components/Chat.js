import Header from './Header';
import React, { useState, useRef, useEffect } from "react";

import bot from "../assets/icons/bot.png"

const ChatBubble = ({ message, profpics, type }) => {
    if (type === "user") {
        return (
            <div class='current-bubble'>
                <div className="bg-gray-100 mt-4 py-6 px-8 pb-16 w-full rounded-lg border border-slate-300" style={{float: 'right'}}>
                    <div className='text-lg w-full'>
                        {message}
                    </div>
                </div>
                <div className='mr-8 mt-[-2.5rem] bg-gray-700 px-2 pt-2 pb-2 rounded-lg' style={{float: 'right'}}>
                    <img src={profpics} alt="Profile" className="h-16"></img>
                </div>
                <div>
                    <button class="py-1 px-2 mt-2.5 mb-1 text-light hover:bg-gray-400 bg-gray-500 rounded-md">Edit</button>
                </div>
            </div>
        );
    } else if (type === "bot") {
        return (
            <div class='current-bubble'>
                <div className="bg-gray-300 mt-4 py-6 px-8 pb-16 w-full rounded-lg" style={{float: 'left'}}>
                    <div className='text-lg w-full'>
                        {message}
                    </div>
                </div>
                <div className='ml-8 mt-[-2.5rem] bg-gray-700 px-2 pt-2 pb-2 rounded-lg' style={{float: 'left'}}>
                    <img src={bot} alt="Bot" className="h-16"></img>
                </div>
                <div style={{float: 'right'}}>
                    <button class="py-1 px-2 mt-2.5 mb-1 mr-3 text-light hover:bg-gray-400 bg-gray-500 rounded-md">Regenerate Response</button>
                    <button class="py-1 px-2 mt-2.5 mb-1 text-light hover:bg-gray-400 bg-gray-500 rounded-md">Copy</button>
                </div>
            </div>
        );
    }
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
                    <ChatBubble key={index} message={message} type="user" profpics={props.profpics} />
                ))}
                {chatBubbles.map((message, index) => (
                    <ChatBubble key={index} message="Ibukota negara Indonesia adalah Jakarta. Akan tetapi ada rencana melakukan pemindahan ibukota baru.
                    Letak Ibu Kota baru Indonesia kembali diperbincangkan setelah pemerintah mengumumkan nama Nusantara. Nama Nusantara diumumkan oleh Kepala Bappenas Suharso Monoarfa saat rapat bersama panja RUU Ibu Kota Negara (IKN).
                    Berada di Kalimantan Timur, Nusantara akan menggantikan Jakarta sebagai Ibukota. Di fase awal, Istana Negara akan dipindah segera pada 2024 mendatang bersama 4 Kementerian." type="bot" profpics={props.profpics} />
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