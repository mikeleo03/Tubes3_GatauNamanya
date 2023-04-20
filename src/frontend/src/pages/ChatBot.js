import React from "react";
import MenuButton from '../components/MenuButton';
import Profile from '../components/Profile';
import Chat from '../components/Chat';

import profile from "../assets/icons/profile.ico"
import chat from "../assets/icons/chat.png"
import search from "../assets/icons/search.png"
import star from "../assets/icons/star.png"
import archieved from "../assets/icons/archieved.png"
import text from "../assets/icons/text.png"

const backgroundStyle = {
    backgroundColor : "#151718",
    height: "auto",
    width: "100vw",
    minHeight: "100vh",
    padding: "3vh",
}

const ChatBot = () => {
    return (
        <div style={backgroundStyle} className="flex">
            <div className="w-1/6 flex flex-col pr-2 pt-2 relative">
                <div className="bg-gray-700 mr-5 h-20 mb-4">
                    <p className="text-light pr-10">Insert logo here!</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-lg pb-3 pl-3 pr-3 text-left text-light">Menu</p>
                    <div className="h-px bg-slate-400 w-56"></div>
                    <MenuButton label="Chat" images={chat}/>
                    <MenuButton label="Search" images={search}/>
                    <MenuButton label="Favorite" images={star}/>
                    <MenuButton label="Archieved" images={archieved}/>
                </div>
                <div className="flex flex-col pt-5">
                    <p className="text-lg pb-3 pl-3 pr-3 text-left text-light">Algorithm</p>
                    <div className="h-px bg-slate-400 w-56"></div>
                    <MenuButton label="Knuth–Morris–Pratt" images={text}/>
                    <MenuButton label="Boyer–Moore" images={text}/>
                </div>
                <div className="absolute inset-x-0 bottom-0 mr-6">
                    <Profile profpics={profile} name="Michael Leon" email="leonmichael463@gmail.com"/>
                    <div class="color-button" className="h-10 flex space-x-2">
                        <button class="py-2 px-6 w-1/2 text-light hover:font-bold focus:font-bold bg-gray-700 rounded-md">Light</button>
                        <button class="py-2 px-6 w-1/2 text-light hover:font-bold focus:font-bold bg-gray-700 rounded-md">Dark</button>
                    </div>
                </div>
            </div>
            <Chat profpics={profile} />
        </div>
    );
};

export default ChatBot;