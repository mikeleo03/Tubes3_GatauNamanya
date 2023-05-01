import React, { useState, useRef, useEffect } from "react";
import { QuestionBubble, AnswerBubble } from "./ChatBubble";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatHistory from "./ChatHistory";
import ChatHeader from "./ChatHeader";
import ChatPlaceHolder from "./ChatPlaceHolder";
import { getAnswer } from "../requests/Requests";

import send from "../assets/icons/send.webp"

function Chat({ pages, setPages, currentPage, setCurrentPage, profpics, openHistory, setOpenHistory, token }) {
    // Handle Users Messages
    const bottomRef = useRef(null);
    const textareaRef = useRef(null);
    const [newQuestion, setNewQuestion] = useState('');
    const [isKMP, setIsKMP] = useState(false);
    let ans;

    const incrementPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const decrementPage = () => {
        setCurrentPage(currentPage - 1);
    };

    // Function that handles the new response
    const handleSubmit = async (event) => {
        event.preventDefault();
        const currentPagePos = pages[currentPage];
        if (currentPagePos && currentPagePos.convo) {
            if (newQuestion !== "") {
                // Set page element
                const newcurrentPagePos = {...currentPagePos,
                convo: [...currentPagePos.convo, { question: newQuestion, answer: '', answered: false }]};

                const newPages = [...pages.slice(0, currentPage), newcurrentPagePos, ...pages.slice(currentPage + 1)];
                
                setPages(newPages);
                setNewQuestion('');
        
                // Get the answer
                const response = await getAnswer({ token, question: newQuestion, algorithm: isKMP ? 'KMP' : 'BM' });
                const { status, data, message } = response;
        
                // Update the page element with the answer
                if (status === 200) {
                    const answerIndex = newcurrentPagePos.convo.length - 1;
                    newcurrentPagePos.convo[answerIndex].answer = data;
                    newcurrentPagePos.convo[answerIndex].answered = true;
                    setPages([
                        ...pages.slice(0, currentPage),
                        newcurrentPagePos,
                        ...pages.slice(currentPage + 1)
                    ]);
                } else {
                    toast.error(message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            }
        } else {
            toast.error("The chat page is empty, You can't add any message here!", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    /* const handleAnswer = async (index) => {
        let pos = pages[currentPage].convo;
        let question = pos[index].question;
        let response;
        try {
            if (isKMP) {
                response = await getAnswer({ token, question, algorithm: "KMP" });
            } else {
                response = await getAnswer({ token, question, algorithm: "BM" });
            }
            if (response.status === 200) {
                pos[index].answer = response.data;
                pos[index].answered = true;
            } else {
                toast.error(response.message , {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        } catch (err) {
            toast.error(err.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }; */

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    });

    useEffect(() => {
        textareaRef.current.style.height = "38px";
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
            <div className={` ${openHistory ? 'lg:block lg:w-3/4 transition-all duration-300' : 'lg:block lg:w-full transition-all duration-300'} ${openHistory ? 'hidden w-full transition-all duration-300' : 'block w-full transition-all duration-300'} relative ${openHistory ? 'px-0 transition-all duration-300' : 'px-7 transition-all duration-300'} lg:px-7 md:pb-20 pb-16`}>
                <ChatHeader pages={pages} currentPage={currentPage} setPages={setPages} openHistory={openHistory} setOpenHistory={setOpenHistory} incrementPage={incrementPage} decrementPage={decrementPage} setPageNow={setCurrentPage} profpics={profpics} />
                <div className="h-px bg-slate-200 ml-[-1.5rem] mr-[-1.5rem]"></div>
                <div className='h-full md:pb-20 pb-16 overflow-y-auto flex flex-col'>
                    {(pages[currentPage] && pages[currentPage].convo) ? ((pages[currentPage].convo.length > 0) ? 
                        (pages[currentPage].convo.map((question, index) => (
                            <div key={index}>
                                <QuestionBubble idx={index} message={question.question} currentPage={currentPage} pages={pages} setPages={setPages} profpics={profpics} handleKeyDown={handleKeyDown} />
                                {question.answered && (<AnswerBubble message={question.answer} />)}
                            </div>
                        ))) : (
                        <ChatPlaceHolder />
                    )) : (
                        <div className="pt-5 justify-center items-center h-full flex flex-col">
                            <h2 className="text-2xl text-center font-bold mb-2">This is an empty page!</h2>
                            <p className="text-xl text-center text-gray-700">Please add a page or select another chat page</p>
                        </div>
                    )}
                        <div ref={bottomRef} className="bottom"/>
                </div>
                <div className="absolute inset-x-0 bottom-0 mr-6 ml-6 md:mb-4 flex flex-col justify-center bg-light md:pb-0 pb-3">
                    <form onSubmit={handleSubmit}>
                        <p className="mb-1 mt-2 md:text-base text-sm md:mt-1">Insert your question here</p>
                        <div className='flex'>
                            <textarea className="bg-gray-700 h-10 pl-3 pr-3 pt-2 pb-2.5 md:text-base text-sm text-light rounded-md focus:outline-none w-full" style={{"minHeight" : "38px"}} 
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
            {openHistory && <ChatHistory pages={pages} onPageChange={setPages} incrementPage={incrementPage} decrementPage={decrementPage} setPageNow={setCurrentPage} profpics={profpics} isKMP={isKMP} setIsKMP={setIsKMP} openHistory={openHistory} setOpenHistory={setOpenHistory}/>}
        </div>
    );
};
  
export default Chat;