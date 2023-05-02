import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import bot from "../assets/icons/bot.webp"

const QuestionBubble = ({ message, newQuestion, setNewQuestion, updateQuestion, setUpdateQuestion, profpics, handleKeyDown }) => {
    const handleSetQ = () => {
        setUpdateQuestion(!updateQuestion);
    };

    return (
        <div className='current-bubble'>
            <div className="bg-gray-100 mt-4 md:py-6 py-4 md:px-8 px-6 md:pb-16 pb-12 w-full rounded-lg border border-slate-300" style={{float: 'right'}}>
                {!updateQuestion ? (
                    <div className='md:text-lg text-base w-full break-words'>
                        {message}
                    </div>) : (
                    <textarea className="focus:outline-none w-full text-lg bg-gray-100" 
                        onKeyDown={handleKeyDown}
                        onChange={(event) => setNewQuestion(event.target.value)}
                        value={newQuestion || message}
                        type="text">
                    </textarea>
                )}
            </div>
            <div className='md:mr-8 mr-6 md:mt-[-2.5rem] mt-[-1.5rem] bg-gray-700 px-2 pt-2 pb-2 rounded-lg' style={{float: 'right'}}>
                <img src={profpics} alt="Profile" className="md:h-16 h-12"></img>
            </div>
            <div>
                <button className="md:py-1 py-0.5 px-2 md:mt-2.5 mt-1 mb-1 md:text-base text-sm text-light hover:bg-gray-400 bg-gray-500 rounded-md" onClick={handleSetQ}>Edit</button>
            </div>
        </div>
    );
}

function Message({ text }) {
    const lines = text.toString().split('\n');
    return (
        <div>
            {lines.map((line, index) => (
                <p key={index}>{line}</p>
            ))}
        </div>
    );
}

const AnswerBubble = ({ message, handleSubmit }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(message);
        toast.success('Copied succesfully!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000
        });
    };

    return (
        <div className='current-bubble'>
            <div className="bg-gray-300 mt-4 md:py-6 py-4 md:px-8 px-6 md:pb-16 pb-12 w-full rounded-lg" style={{float: 'left'}}>
                <div className='md:text-lg text-base w-full break-words'>
                    <Message text={message} />
                </div>
            </div>
            <div className='md:ml-8 ml-6 md:mt-[-2.5rem] mt-[-1.5rem] bg-gray-700 px-2 pt-2 pb-2 rounded-lg' style={{float: 'left'}}>
                <img src={bot} alt="Bot" className="md:h-16 h-12"></img>
            </div>
            <div style={{float: 'right'}} className='mt-1.5'>
                <button className="md:py-1 py-0.5 px-2 md:mt-2.5 mt-1 mb-1 md:text-base text-sm mr-3 text-light hover:bg-gray-400 bg-gray-500 rounded-md" onClick={handleSubmit}>Regenerate Response</button>
                <button className="md:py-1 py-0.5 px-2 md:mt-2.5 mt-1 mb-1 md:text-base text-sm text-light hover:bg-gray-400 bg-gray-500 rounded-md" onClick={handleCopy} >Copy</button>
                <ToastContainer />
            </div>
        </div>
    );
}

export { QuestionBubble, AnswerBubble };