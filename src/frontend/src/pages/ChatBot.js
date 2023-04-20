import React from "react";
import MenuButton from '../components/MenuButton';
import Profile from '../components/Profile';
import History from '../components/History';
import Chat from '../components/Chat';

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
                <div className="flex flex-col">
                    <p className="text-lg pb-3 pl-3 pr-3 text-left text-light">Menu</p>
                    <div className="h-px bg-slate-400 w-56"></div>
                    <MenuButton label="Chat"/>
                    <MenuButton label="Search"/>
                    <MenuButton label="Favorite"/>
                    <MenuButton label="Archieved"/>
                </div>
                <div className="flex flex-col pt-5">
                    <p className="text-lg pb-3 pl-3 pr-3 text-left text-light">Algorithm</p>
                    <div className="h-px bg-slate-400 w-56"></div>
                    <MenuButton label="Knuth–Morris–Pratt"/>
                    <MenuButton label="Boyer–Moore"/>
                </div>
                <div className="absolute inset-x-0 bottom-0 mr-6">
                    <Profile profpics={profile} name="Michael Leon" email="leonmichael463@gmail.com"/>
                    <div class="color-button" className="h-10 flex space-x-2">
                        <button class="py-2 px-6 w-1/2 text-light hover:font-bold focus:font-bold bg-gray-700 rounded-md">Light</button>
                        <button class="py-2 px-6 w-1/2 text-light hover:font-bold focus:font-bold bg-gray-700 rounded-md">Dark</button>
                    </div>
                </div>
            </div>
            <div className="w-5/6 bg-light flex rounded-2xl">
                <Chat profpics={profile} />
                <div className="w-1/4 bg-greyish rounded-r-2xl pl-7 pr-7 relative">
                    <p className="text-lg font-medium pt-5 pb-3">History Chat</p>
                    <button class="py-2 px-6 mb-3 text-light hover:bg-gray-500 bg-gray-600 rounded-md w-full">New Chat</button>
                    <History 
                        title="Nama ibukota negara Indonesia yang baru"
                        content="Ibukota negara Indonesia adalah Jakarta. Akan tetapi ada rencana melakukan pemindahan ibukota baru..."/>
                    <History 
                        title="Mata kuliah wajib terseru semester 4"
                        content="Menurut riset yang dilakukan oleh sistem kami bernama GatauNamanya, udah pasti stima jawabannya :D"/>
                    <History 
                        title="Asisten mata kuliah Strategi Algoritma ter-..."
                        content="Secara umum, asisten mata kuliah Strategi Algoritma memiliki kelakuan yang mirip, yaitu [Pesan terpotong]..."/>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;