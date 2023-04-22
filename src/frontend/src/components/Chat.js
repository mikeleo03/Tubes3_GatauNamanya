import React, { useState, useRef, useEffect } from "react";
import { QuestionBubble, AnswerBubble } from "./ChatBubble";
import ChatHistory from "./ChatHistory";
import ChatHeader from "./ChatHeader";

import send from "../assets/icons/send.png"

function Chat({ pages, setPages, currentPage, setCurrentPage, profpics }) {
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
        if (newQuestion !== "") {
            // Set page element
            console.log(currentPage);
            const currentPagePos = pages[currentPage];
            /* console.log(currentPagePos);
            console.log(currentPagePos.convo[0]); */
            const newcurrentPagePos = {...currentPagePos, convo: [...currentPagePos.convo, { question: newQuestion, answer: '', answered: false }] };
            console.log(newcurrentPagePos);
            const newPages = [...pages.slice(0, currentPage), newcurrentPagePos, ...pages.slice(currentPage + 1)];
            console.log(newPages);

            // Inget buat consider panjangnya?
            setPages(newPages);
            console.log(pages);
            setNewQuestion('');
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
        <div className="w-5/6 bg-light flex rounded-2xl">
            <div className="w-3/4 relative px-7">
                <ChatHeader pages={pages} currentPage={currentPage} setPages={setPages}/>
                <div className="h-px bg-slate-200 ml-[-1.5rem] mr-[-1.5rem]"></div>
                <div className='h-150 overflow-auto flex flex-col chat-interface'>
                    {(pages[currentPage] && pages[currentPage].convo) ? 
                        (pages[currentPage].convo.map((question, index) => (
                            <div key={index}>
                                <QuestionBubble key={index} message={question.question} profpics={profpics} />
                                {!question.answered ? (
                                    <div>{handleAnswer(index)}</div>
                                    ) : (
                                    <AnswerBubble message={question.answer} />
                                )}
                            </div>
                    ))) : (<></>)}
                    <div ref={bottomRef} />
                </div>
                <div className="absolute inset-x-0 bottom-0 mr-6 ml-6 mb-4 flex flex-col justify-center bg-light">
                    <form onSubmit={handleSubmit}>
                        <p className="mb-1 mt-1">Insert your question here</p>
                        <div className='flex'>
                            <textarea className="bg-gray-700 h-10 pl-3 pr-3 pt-2 pb-2 text-light rounded-md focus:outline-none w-full" 
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
            <ChatHistory pages={pages} onPageChange={setPages} incrementPage={incrementPage} decrementPage={decrementPage} setPageNow={setCurrentPage}/>
        </div>
    );
};
  
export default Chat;