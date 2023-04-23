import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import bot from "../assets/icons/bot.webp"

const QuestionBubble = ({ message, /* pages, setPages, currentPage, */ profpics, handleKeyDown }) => {
    const [updateQuestion, setUpdateQuestion] = useState(false);

    /* const handleUpdateQ = (newQuestion) => {
        const currentPagePos = pages[currentPage];
        const newcurrentPagePos = [...pages[currentPage].convo.slice(0, idx), { question: newQuestion, answer: '', answered: false }, ...pages[currentPage].convo.slice(idx + 1)];
        setPages([...pages.slice(0, currentPage), newcurrentPagePos, ...pages.slice(currentPage + 1)]);
        console.log(newQuestion);
        message += newQuestion;
    } */

    const handleSetQ = () => {
        setUpdateQuestion(!updateQuestion);
    };

    return (
        <div class='current-bubble'>
            <div className="bg-gray-100 mt-4 py-6 px-8 pb-16 w-full rounded-lg border border-slate-300" style={{float: 'right'}}>
                {!updateQuestion ? (
                    <div className='text-lg w-full break-words'>
                        {message}
                    </div>) : (
                    <textarea className="focus:outline-none w-full text-lg" 
                        /* onChange={(event) => handleUpdateQ(event.target.value)} */
                        onKeyDown={handleKeyDown}
                        value={message}
                        type="text">
                    </textarea>
                )}
            </div>
            <div className='mr-8 mt-[-2.5rem] bg-gray-700 px-2 pt-2 pb-2 rounded-lg' style={{float: 'right'}}>
                <img src={profpics} alt="Profile" className="h-16"></img>
            </div>
            <div>
                <button class="py-1 px-2 mt-2.5 mb-1 text-light hover:bg-gray-400 bg-gray-500 rounded-md" onClick={handleSetQ}>Edit</button>
            </div>
        </div>
    );
}

const AnswerBubble = ({ message }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(message);
        toast.success('Copied succesfully!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000
        });
    };

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
                <button class="py-1 px-2 mt-2.5 mb-1 text-light hover:bg-gray-400 bg-gray-500 rounded-md" onClick={handleCopy} >Copy</button>
                <ToastContainer />
            </div>
        </div>
    );
}

export { QuestionBubble, AnswerBubble };