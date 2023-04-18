import React from "react";
import MenuButton from '../components/MenuButton';
import Profile from '../components/Profile';
import Header from '../components/Header';

import profile from "../assets/icons/profile.ico"

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
                <MenuButton label="Chat"/>
                <MenuButton label="Search"/>
                <MenuButton label="Favorite"/>
                <MenuButton label="Archieved"/>
                <div className="absolute inset-x-0 bottom-0 mr-6">
                    <Profile profpics={profile} name="Michael Leon" email="leonmichael463@gmail.com"/>
                    <div class="color-button" className="h-10 flex space-x-2">
                        <button class="py-2 px-6 w-1/2 text-light hover:font-bold focus:font-bold bg-gray-700 rounded-md">Light</button>
                        <button class="py-2 px-6 w-1/2 text-light hover:font-bold focus:font-bold bg-gray-700 rounded-md">Dark</button>
                    </div>
                </div>
            </div>
            <div className="w-5/6 bg-light flex rounded-2xl">
                <div className="w-3/4 relative">
                    <Header title="Apa Nama Ibukota Jakarta"/>
                    <div className="h-px bg-slate-200"></div>
                    <div>
                        {/* konten chat */}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 mr-6 ml-6 mb-4 flex flex-col justify-center">
                        <p className="mb-1">Insert your question here</p>
                        <input className="bg-gray-700 h-10 pl-3 text-light rounded-md focus:border-none" placeholder="What are you thinking today?"></input>
                    </div>
                </div>
                <div className="w-1/4 bg-greyish rounded-r-2xl">
                    
                </div>
            </div>
        </div>
    );
};

export default ChatBot;