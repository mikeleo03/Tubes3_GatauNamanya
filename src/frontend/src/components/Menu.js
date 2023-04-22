import React from "react";

// Component part
import MenuButton from './MenuButton';
import Profile from './Profile';

// Icon part
import chat from "../assets/icons/chat.png"
import search from "../assets/icons/search.png"
import star from "../assets/icons/star.png"
import archieved from "../assets/icons/archieved.png"
import text from "../assets/icons/text.png"

const Menu = (props) => {
    return (
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
                <Profile profpics={props.profpics} name="Michael Leon" email="leonmichael463@gmail.com"/>
                <button className="flex w-full bg-gray-700 pt-1 pb-1 flex justify-center align-center text-light rounded-md hover:bg-gray-600">
                    Settings
                </button>
            </div>
        </div>
    );
}

export default Menu;