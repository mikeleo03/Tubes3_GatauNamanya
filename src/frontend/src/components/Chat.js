import React, { useState, useRef, useEffect } from "react";
import { QuestionBubble, AnswerBubble } from "./ChatBubble";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatHistory from "./ChatHistory";
import ChatHeader from "./ChatHeader";
import ChatPlaceHolder from "./ChatPlaceHolder";

import send from "../assets/icons/send.png"

function Chat({ pages, setPages, currentPage, setCurrentPage, profpics, openHistory, setOpenHistory }) {
    // Handle Users Messages
    const bottomRef = useRef(null);
    const textareaRef = useRef(null);
    const [newQuestion, setNewQuestion] = useState('');

    let ans = "Jawabanmu tidak ada dalam database kami";

    const incrementPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const decrementPage = () => {
        setCurrentPage(currentPage - 1);
    };

    // Function that handles the new response
    const handleSubmit = (event) => {
        event.preventDefault();
        const currentPagePos = pages[currentPage];
        if (currentPagePos && currentPagePos.convo) {
            if (newQuestion !== "") {
                // Set page element
                console.log(currentPage);
                const newcurrentPagePos = {...currentPagePos, convo: [...currentPagePos.convo, { question: newQuestion, answer: '', answered: false }] };
                console.log(newcurrentPagePos);
                const newPages = [...pages.slice(0, currentPage), newcurrentPagePos, ...pages.slice(currentPage + 1)];
                console.log(newPages);

                // Inget buat consider panjangnya?
                setPages(newPages);
                console.log(pages);
                setNewQuestion('');
            }
        } else {
            toast.error("The chat page has been deleted, You can't add any message here!", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    const handleAnswer = (index) => {
        let pos = pages[currentPage].convo;
        ans = "Jawaban pertanyaan kamu tidak ada dalam database kami.";
        if (pos[index].question === "Nama ibukota negara Indonesia yang baru") {
            ans = "Ibukota negara Indonesia adalah Jakarta. Akan tetapi ada rencana melakukan pemindahan ibukota baru. Letak Ibu Kota baru Indonesia kembali diperbincangkan setelah pemerintah mengumumkan nama Nusantara. Nama Nusantara diumumkan oleh Kepala Bappenas Suharso Monoarfa saat rapat bersama panja RUU Ibu Kota Negara (IKN). Berada di Kalimantan Timur, Nusantara akan menggantikan Jakarta sebagai Ibukota. Di fase awal, Istana Negara akan dipindah segera pada 2024 mendatang bersama 4 Kementerian.";
        } else if (pos[index].question === "Mata kuliah wajib terseru semester 4") {
            ans = "Menurut riset yang dilakukan oleh sistem kami bernama GatauNamanya, udah pasti stima jawabannya :D";
        } else if (pos[index].question === "Asisten mata kuliah Strategi Algoritma ter-...") {
            ans = "Secara umum, asisten mata kuliah Stima memiliki perwatakan yang mirip, yaitu [Pesan terpotong]...";
        }
        console.log(pos[index].question);
        console.log(ans);
        pos[index].answer = ans;
        pos[index].answered = true;
    }

    useEffect(() => {
        // scroll to bottom every time questions change
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    });

    useEffect(() => {
        textareaRef.current.style.height = "0px";
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = scrollHeight + "px";
    }, [newQuestion]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };

    return (
        <div className="w-full bg-light flex lg:rounded-2xl">
            <div className={` ${openHistory ? 'lg:w-3/4' : 'lg:w-full'} w-full relative px-7 md:pb-20 pb-16`}>
                <ChatHeader pages={pages} currentPage={currentPage} setPages={setPages} openHistory={openHistory} setOpenHistory={setOpenHistory} incrementPage={incrementPage} decrementPage={decrementPage} setPageNow={setCurrentPage} profpics={profpics} />
                <div className="h-px bg-slate-200 ml-[-1.5rem] mr-[-1.5rem]"></div>
                <div className='h-full md:pb-20 pb-16 overflow-y-auto flex flex-col'>
                    {(pages[currentPage] && pages[currentPage].convo) ? ((pages[currentPage].convo.length > 0) ? 
                        (pages[currentPage].convo.map((question, index) => (
                            <div key={index}>
                                <QuestionBubble idx={index} message={question.question} currentPage={currentPage} pages={pages} setPages={setPages} profpics={profpics} handleKeyDown={handleKeyDown} />
                                {!question.answered ? (
                                    <div>{handleAnswer(index)}</div>
                                    ) : (
                                    <AnswerBubble message={question.answer} />
                                )}
                            </div>
                        ))) : (
                        <ChatPlaceHolder />
                    )) : (
                        <div className="pt-5 justify-center items-center h-full flex flex-col">
                            <h2 className="text-2xl font-bold mb-2">Page has been deleted!</h2>
                            <p className="text-xl text-gray-700">Please select another chat page</p>
                        </div>
                    )}
                        <div ref={bottomRef} class="bottom"/>
                </div>
                <div className="absolute inset-x-0 bottom-0 mr-6 ml-6 md:mb-4 flex flex-col justify-center bg-light md:pb-0 pb-3">
                    <form onSubmit={handleSubmit}>
                        <p className="mb-1 mt-2 md:text-base text-sm md:mt-1">Insert your question here</p>
                        <div className='flex'>
                            <textarea className="bg-gray-700 h-10 pl-3 pr-3 pt-2 pb-2.5 md:text-base text-sm text-light rounded-md focus:outline-none w-full" 
                                ref={textareaRef}
                                onChange={(event) => setNewQuestion(event.target.value)}
                                onKeyDown={handleKeyDown}
                                value={newQuestion}
                                type="text"
                                placeholder="What are you thinking today?">
                            </textarea>
                            <button type="submit" className='ml-1'>
                                <img src={send} alt="send" className="w-10"></img>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {openHistory && <ChatHistory pages={pages} onPageChange={setPages} incrementPage={incrementPage} decrementPage={decrementPage} setPageNow={setCurrentPage} profpics={profpics} />}
        </div>
    );
};
  
export default Chat;