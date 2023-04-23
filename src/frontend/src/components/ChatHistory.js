import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { MenuButton, Profile } from './Additional';

const PAGE_SIZE = 20;

function ChatHistory({ pages, onPageChange, incrementPage, decrementPage, setPageNow, profpics }) {
    const handleAddPage = () => {
        console.log(pages.length);
        if (pages.length < PAGE_SIZE) {
            onPageChange([...pages, { convo : [], starred : false, archieved : false, name : "" }]);
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
        <div>
            <button key={`page-${pageIndex}`} onClick={() => handlePageSelect(pageIndex)}
            className="hover:bg-gray-300 flex hover:rounded-lg focus:bg-gray-300 focus:rounded-lg h-12 overflow-hidden text-ellipsis w-full">
                <h3 className='font-medium pl-3 pr-3 pt-2.5 text-left overflow-hidden break-all h-10 text-ellipsis w-full'>{pages[pageIndex].name || `Chat ${pageIndex + 1}`}</h3>
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
            <div className='h-96 overflow-auto flex flex-col chat-interface w-full'>
                {renderedPages}
            </div>
            <div className="absolute inset-x-0 bottom-0 mr-6 ml-6">
                <p className="text-lg font-medium pt-5 pb-3">Algorithm</p>
                <div className='flex flex-row space-x-4 mb-2'>
                    <MenuButton label="Knuth–Morris–Pratt"/>
                    <MenuButton label="Boyer–Moore"/>
                </div>
                <Profile profpics={profpics} name="Michael Leon" email="leonmichael463@gmail.com"/>
            </div>
        </div>
    );
}

export default ChatHistory;