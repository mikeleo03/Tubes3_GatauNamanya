import React, { useState } from "react";
import './ChatBot.css';
import save from "../assets/icons/save.ico"
import fav from "../assets/icons/favorite.ico"
import send from "../assets/icons/send.ico"
import { Button } from 'react-bootstrap';
import { useEffect } from "react";

const backgroundStyle = {
    backgroundColor : "#151718",
    height: "auto",
    width: "100vw",
    minHeight: "100vh",
    padding: "3vh",
}

const ChatBot = () => {
    const [inputText, setInputText] = useState("");

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    return (
        <div style={backgroundStyle} className="flex">
            <div className="w-1/6">
                
            </div>
            <div className="w-5/6 bg-light flex rounded-2xl">
                <div className="w-3/4">
                    <div className="h-14 flex justify-between">
                        <span class="align-left py-3 pl-6 font-medium text-lg">Apa Nama Ibukota Jakarta</span>
                        <span class="align-right py-3 pr-6">
                            <button class="mr-5 py-1">
                                <img src={fav} alt="fav" className="h-7"></img>
                            </button>
                            <button class="py-1">
                                <img src={save} alt="Save" className="h-7"></img>
                            </button>
                        </span>
                    </div>
                    <div className="h-px bg-slate-200"></div>
                    <div>
                        {/* konten chat */}
                    </div>
                    {/* <div class="absolute bottom-6 w-full overflow-hidden">
                        <form class="mx-4 flex flex-row gap-3 max-w-3xl">
                            <div class="relative flex h-full flex-1 md:flex-col">
                                <div class="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 border dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md">
                                    <textarea tabindex="0" data-id="root" rows="1" placeholder="Looking for something?" 
                                        class="m-0 w-full resize-none border-0 bg-transparent p-0 pr-8 border-none outline-none"></textarea>
                                    <button disabled="" class="absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:right-2">
                                        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 mr-1 mb-0.5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                            <line x1="22" y1="2" x2="11" y2="13"></line>
                                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div> */}
                </div>
                <div className="w-1/4 bg-greyish rounded-r-2xl">
                    
                </div>
            </div>
        </div>
    );
};

export default ChatBot;