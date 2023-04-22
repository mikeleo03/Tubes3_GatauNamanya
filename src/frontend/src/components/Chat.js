import React, { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import bot from "../assets/icons/bot.webp"
import send from "../assets/icons/send.png"
import save from "../assets/icons/save.ico"
import fav from "../assets/icons/favorite.ico"

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

const PAGE_SIZE = 20;

function ChatHistory({ pages, onPageChange, incrementPage, decrementPage, setPageNow }) {
    const handleAddPage = () => {
        console.log(pages.length);
        if (pages.length < PAGE_SIZE) {
            onPageChange([...pages, { convo : [] }]);
            incrementPage();
            setPageNow(pages.length);
        } else {
            toast.error('You have excedeed the maximum number of chat pages!', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    const handlePageSelect = (pageIndex) => {
        console.log(pageIndex);
        setPageNow(pageIndex);
    };

    const handlePageDelete = (pageIndex) => {
        console.log(pageIndex);
        if (pages.length > 1) {
            if (pages.slice(pageIndex + 1).length !== 0) {
                onPageChange([...pages.slice(0, pageIndex), ...pages.slice(pageIndex + 1)]);
            } else {
                console.log("masuk siniii");
                onPageChange([...pages.slice(0, pageIndex)]);
            }
            decrementPage();
            setPageNow(pageIndex - 1);
            toast.success('The chat has been deleted successfully, please select another chat page', {
                position: toast.POSITION.TOP_RIGHT
            });
            console.log(pageIndex);
        } else {
            toast.error('You must have at least 1 chat page!', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    const renderPageButton = (pageIndex) => (
        <div id="group-button">
            <button key={`page-${pageIndex}`} onClick={() => handlePageSelect(pageIndex)}
            className="hover:bg-gray-300 flex hover:rounded-lg focus:bg-gray-300 focus:rounded-lg max-h-36 overflow-hidden text-ellipsis w-full">
                <h3 className='font-medium pl-3 pr-3 pt-2.5 text-left overflow-hidden break-all max-h-10 text-ellipsis w-full'>{pages[pageIndex].name || `Chat ${pageIndex + 1}`}</h3>
                <button className="pr-3 pl-2 w-12 h-12" onClick={() => handlePageDelete(pageIndex)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" id="trash"><path fill="#231F20" d="M10.289 14.211h3.102l1.444 25.439a1 1 0 0 0 .998.943h18.933a1 1 0 0 0 .998-.944l1.421-25.438h3.104a1 1 0 1 0 0-2h-3.741c-.055 0-.103.023-.156.031-.052-.008-.1-.031-.153-.031h-5.246V9.594a1 1 0 0 0-1-1h-9.409a1 1 0 0 0-1 1v2.617h-5.248c-.046 0-.087.021-.132.027-.046-.007-.087-.027-.135-.027H10.29a1 1 0 0 0-.001 2zm11.295-3.617h7.409v1.617h-7.409v-1.617zm13.598 3.617L33.82 38.594H16.778l-1.384-24.383h19.788z"></path><path fill="#231F20" d="M20.337 36.719l.058-.001a.999.999 0 00.941-1.055l-1.052-18.535a1.012 1.012 0 00-1.055-.942.999.999 0 00-.941 1.055l1.052 18.535a1 1 0 00.997.943zM30.147 36.718l.058.001a1 1 0 00.997-.943l1.052-18.535a1 1 0 00-.941-1.055 1.011 1.011 0 00-1.055.942l-1.052 18.535a1 1 0 00.941 1.055zM25.289 36.719a1 1 0 001-1V17.184a1 1 0 10-2 0v18.535a1 1 0 001 1z"></path></svg>
                </button>
            </button>
            <div className="mt-2 mb-2 h-px bg-slate-300"></div>
        </div>
    );

    const renderedPages = pages.map((_, index) => renderPageButton(index));

    return (
        <div className="w-1/4 bg-greyish rounded-r-2xl pl-7 pr-7 relative">
            <p className="text-lg font-medium pt-5 pb-3">History Chat</p>
            <button class="py-2 px-6 mb-3 text-light hover:bg-gray-500 bg-gray-600 rounded-md w-full"
                onClick={handleAddPage}>+ New Chat
            </button>
            <ToastContainer />
            <div className='h-150 overflow-auto flex flex-col chat-interface w-full' class="button-group">
                {renderedPages}
            </div>
        </div>
    );
}

function Chat(props) {
    // Handle Users Messages
    const bottomRef = useRef(null);
    const [newQuestion, setNewQuestion] = useState('');
    const [pages, setPages] = useState([{ convo: [] }]);
    const [currentPage, setCurrentPage] = useState(0);

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
            const newcurrentPagePos = {...currentPagePos, convo: [...currentPagePos.convo, { question: newQuestion, answer: '', answered: false }]};
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

    const handleRenamePage = (pageIndex, newName) => {
        const newPages = [...pages];
        newPages[pageIndex].name = newName;
        setPages(newPages);
    };

    useEffect(() => {
        // scroll to bottom every time questions change
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    });

    return (
        <div className="w-5/6 bg-light flex rounded-2xl">
            <div className="w-3/4 relative px-7">
                <div className="h-14 flex justify-between">
                    <div className='py-3 w-96'>
                        <input
                            class="align-left font-medium text-lg focus:outline-none w-128"
                            type="text"
                            value={ (pages[currentPage] && pages[currentPage].name) ? (pages[currentPage].name) : ("") }
                            onChange={(event) => handleRenamePage(currentPage, event.target.value)}
                            placeholder='Click here to rename the chat page'
                        />
                    </div>
                    <div class="align-right py-3">
                        <button class="mr-5 py-1">
                            <img src={fav} alt="fav" className="h-7"></img>
                        </button>
                        <button class="py-1">
                            <img src={save} alt="Save" className="h-7"></img>
                        </button>
                    </div>
                </div>
                <div className="h-px bg-slate-200 ml-[-1.5rem] mr-[-1.5rem]"></div>
                <div className='h-150 overflow-auto flex flex-col chat-interface'>
                    {(pages[currentPage] && pages[currentPage].convo) ? 
                        (pages[currentPage].convo.map((question, index) => (
                            <div key={index}>
                                <QuestionBubble key={index} message={question.question} profpics={props.profpics} />
                                {!question.answered ? (
                                    <div>{handleAnswer(index)}</div>
                                    ) : (
                                    <AnswerBubble message={question.answer} />
                                )}
                            </div>
                    ))) : (<></>)}
                    <div ref={bottomRef} />
                </div>
                <div className="absolute inset-x-0 bottom-0 mr-6 ml-6 mb-4 flex flex-col justify-center">
                    <form onSubmit={handleSubmit}>
                        <p className="mb-1">Insert your question here</p>
                        <div className='flex'>
                            <input className="bg-gray-700 h-10 pl-3 text-light rounded-md focus:outline-none w-full" 
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
            <ChatHistory pages={pages} onPageChange={setPages} incrementPage={incrementPage} decrementPage={decrementPage} setPageNow={setCurrentPage}/>
        </div>
    );
};
  
export default Chat;