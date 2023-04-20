import Header from './Header';
import React, { useState, useRef, useEffect } from "react";
import HistoryContent from './History';

import bot from "../assets/icons/bot.webp"
import send from "../assets/icons/send.png"

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

let count = 0;
const Chat = (props) => {
    // Handle Users Messages
    const bottomRef = useRef(null);
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');

    let ans = "Jawabanmu tidak ada dalam database kami";

    // Function that handles the new response
    const handleSubmit = (event) => {
        event.preventDefault();
        setQuestions([...questions, { question: newQuestion, answer: '', answered: false }]);
        setNewQuestion('');
        console.log(questions);
    }

    const handleAnswer = (index) => {
        const updatedQuestions = [...questions];
        ans = "Jawaban pertanyaan kamu tidak ada dalam database kami.";
        if (updatedQuestions[index].question === "Nama ibukota negara Indonesia yang baru") {
            ans = "Ibukota negara Indonesia adalah Jakarta. Akan tetapi ada rencana melakukan pemindahan ibukota baru. Letak Ibu Kota baru Indonesia kembali diperbincangkan setelah pemerintah mengumumkan nama Nusantara. Nama Nusantara diumumkan oleh Kepala Bappenas Suharso Monoarfa saat rapat bersama panja RUU Ibu Kota Negara (IKN). Berada di Kalimantan Timur, Nusantara akan menggantikan Jakarta sebagai Ibukota. Di fase awal, Istana Negara akan dipindah segera pada 2024 mendatang bersama 4 Kementerian.";
        } else if (updatedQuestions[index].question === "Mata kuliah wajib terseru semester 4") {
            ans = "Menurut riset yang dilakukan oleh sistem kami bernama GatauNamanya, udah pasti stima jawabannya :D";
        } else if (updatedQuestions[index].question === "Asisten mata kuliah Strategi Algoritma ter-...") {
            ans = "Secara umum, asisten mata kuliah Stima memiliki perwatakan yang mirip, yaitu [Pesan terpotong]...";
        }
        console.log(updatedQuestions[index].question);
        console.log(ans);
        updatedQuestions[index].answer = ans;
        updatedQuestions[index].answered = true;
        setQuestions(updatedQuestions);
        count++;
    }
    
    // Function that handles user submission
    const handleClick = () => {
        count = 0;
    };

    useEffect(() => {
        // scroll to bottom every time messages change
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [questions]);

    return (
        <div className="w-5/6 bg-light flex rounded-2xl">
            <div className="w-3/4 relative px-7">
                <Header title="Nama ibukota negara Indonesia yang baru"/>
                <div className="h-px bg-slate-200 ml-[-1.5rem] mr-[-1.5rem]"></div>
                <div className='h-150 overflow-auto flex flex-col chat-interface'>
                    {questions.map((question, index) => (
                        <div key={index}>
                            <QuestionBubble key={index} message={question.question} profpics={props.profpics} />
                            {!question.answered ? (
                                <div>{handleAnswer(index)}</div>
                                ) : (
                                <AnswerBubble message={question.answer} />
                            )}
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>
                <div className="absolute inset-x-0 bottom-0 mr-6 ml-6 mb-4 flex flex-col justify-center">
                    <form onSubmit={handleSubmit}>
                        <p className="mb-1">Insert your question here</p>
                        <div className='flex'>
                            <input className="bg-gray-700 h-10 pl-3 text-light rounded-md focus:border-none w-full" 
                                onChange={(event) => setNewQuestion(event.target.value)}
                                value={newQuestion}
                                type="text"
                                placeholder="What are you thinking today?">
                            </input>
                            <button type="submit" className='ml-1'>
                                <img src={send} alt="send" className="w-10"></img>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="w-1/4 bg-greyish rounded-r-2xl pl-7 pr-7 relative">
                <p className="text-lg font-medium pt-5 pb-3">History Chat</p>
                <button class="py-2 px-6 mb-3 text-light hover:bg-gray-500 bg-gray-600 rounded-md w-full"
                    onClick={handleClick}>+ New Chat
                </button>
                <div className='h-150 overflow-auto flex flex-col chat-interface'>
                    {questions.map((content, idx) => (
                        <div key={idx}>
                            {count === 0 ? (
                                <HistoryContent title={content.question} content={content.answer}/>
                                ) : (
                                <HistoryContent title={content.question} content={content.answer}/>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
  
export default Chat;