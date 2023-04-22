import React from 'react';
import bot from "../assets/icons/bot.webp"

const QuestionBubble = ({ message, profpics }) => {
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
}

const AnswerBubble = ({ message }) => {
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

export { QuestionBubble, AnswerBubble };