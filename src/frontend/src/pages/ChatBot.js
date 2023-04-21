import React from "react";
import Menu from '../components/Menu';
import Chat from '../components/Chat';

import profile from "../assets/icons/profile.ico"

const backgroundStyle = {
    backgroundColor : "#151718",
    height: "auto",
    width: "100vw",
    minHeight: "100vh",
}

const ChatBot = () => {
    return (
        <div style={backgroundStyle} className="flex lg:p-[3vh]">
            <Menu profpics={profile} />
            <Chat profpics={profile} />
        </div>
    );
};

export default ChatBot;