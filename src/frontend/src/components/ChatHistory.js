import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateData } from "../requests/Requests";

import { MenuButton, Profile } from './Additional';

const PAGE_SIZE = 20;

function ChatHistory({ pages, onPageChange, incrementPage, decrementPage, setPageNow, setIsKMP, openHistory, setOpenHistory, user, token }) {
    const handleAddPage = () => {
        if (pages.length < PAGE_SIZE) {
            onPageChange([...pages, { convo : [], name : "" }]);
            incrementPage();
            setPageNow(pages.length);
            // Update to database
            const response2 = updateData ({ token, id: user.sub, pages })
            const { status2, message2, data2 } = response2;
            if (status2 !== 200) {
                toast.error(message2, {
                    position: toast.POSITION.TOP_RIGHT
                });
            } else {
                console.log(data2);
            }
        } else {
            toast.error('You have excedeed the maximum number of chat pages!', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    const handlePageSelect = (pageIndex) => {
        setPageNow(pageIndex);
    };

    const handlePageDelete = (pageIndex) => {
        if (pages.slice(pageIndex + 1).length !== 0) {
            onPageChange([...pages.slice(0, pageIndex), ...pages.slice(pageIndex + 1)]);
        } else {
            onPageChange([...pages.slice(0, pageIndex)]);
        }
        decrementPage();
        toast.success('The chat has been deleted successfully', {
            position: toast.POSITION.TOP_RIGHT
        });

        // Update to database
        const response2 = updateData ({ token, id: user.sub, pages })
        const { status2, message2, data2 } = response2;
        if (status2 !== 200) {
            toast.error(message2, {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            console.log(data2);
        }
    };

    const handleKMP = () => {
        setIsKMP(true);
        toast.success('Algoritm is changed into Knuth–Morris–Pratt', {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    const handleBM = () => {
        setIsKMP(false);
        toast.success('Algoritm is changed into Boyer–Moore', {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    const renderPageButton = (pageIndex) => (
        <div key={pageIndex} className="overflow-hidden">
            <div className="hover:bg-gray-300 flex hover:rounded-lg focus:bg-gray-300 focus:rounded-lg md:h-12 h-10 w-full overflow-hidden">
                <div className='pt-3 w-full overflow-hidden'>
                    <button className="w-full overflow-hidden" onClick={() => handlePageSelect(pageIndex)}>
                        <h3 className='font-medium pl-3 pr-3 text-left overflow-hidden break-all h-6 text-ellipsis w-full md:text-base text-sm'>{pages[pageIndex].name || `Chat ${pageIndex + 1}`}</h3>
                    </button>
                </div>
                <div style={{float: 'right'}}>
                    <button className="pr-3 pl-2 w-12 md:h-12 h-6 md:pt-0 pt-2" onClick={() => handlePageDelete(pageIndex)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" id="trash"><path fill="#231F20" d="M10.289 14.211h3.102l1.444 25.439a1 1 0 0 0 .998.943h18.933a1 1 0 0 0 .998-.944l1.421-25.438h3.104a1 1 0 1 0 0-2h-3.741c-.055 0-.103.023-.156.031-.052-.008-.1-.031-.153-.031h-5.246V9.594a1 1 0 0 0-1-1h-9.409a1 1 0 0 0-1 1v2.617h-5.248c-.046 0-.087.021-.132.027-.046-.007-.087-.027-.135-.027H10.29a1 1 0 0 0-.001 2zm11.295-3.617h7.409v1.617h-7.409v-1.617zm13.598 3.617L33.82 38.594H16.778l-1.384-24.383h19.788z"></path><path fill="#231F20" d="M20.337 36.719l.058-.001a.999.999 0 00.941-1.055l-1.052-18.535a1.012 1.012 0 00-1.055-.942.999.999 0 00-.941 1.055l1.052 18.535a1 1 0 00.997.943zM30.147 36.718l.058.001a1 1 0 00.997-.943l1.052-18.535a1 1 0 00-.941-1.055 1.011 1.011 0 00-1.055.942l-1.052 18.535a1 1 0 00.941 1.055zM25.289 36.719a1 1 0 001-1V17.184a1 1 0 10-2 0v18.535a1 1 0 001 1z"></path></svg>
                    </button>
                </div>
            </div>
            <div className="md:mt-2 md:mb-2 mt-1 mb-1 h-px bg-slate-300"></div>
        </div>
    );

    const renderedPages = pages.map((_, index) => renderPageButton(index));

    return (
        <div className= {`${openHistory ? 'lg:w-1/4 transition-all duration-300' : 'lg:w-0 transition-all duration-300'} ${openHistory ? 'w-full transition-all duration-300' : 'w-0 transition-all duration-300'} z-30 bg-greyish rounded-r-2xl pl-7 pr-7 pb-36 relative lg:block transition-all duration-300`}>
            <div className="pt-5 pb-3 flex">
                <button
                    onClick={() => setOpenHistory(!openHistory)}
                    type="button"
                    className="lg:hidden block w-6 h-6 pt-2 pr-3"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 32 32" viewBox="0 0 32 32" id="cross"><path d="M18.12109,16L31.06055,3.06055c0.58594-0.58545,0.58594-1.53564,0-2.12109c-0.58594-0.58594-1.53516-0.58594-2.12109,0L16,13.87891L3.06055,0.93945c-0.58594-0.58594-1.53516-0.58594-2.12109,0c-0.58594,0.58545-0.58594,1.53564,0,2.12109L13.87891,16L0.93945,28.93945c-0.58594,0.58545-0.58594,1.53564,0,2.12109C1.23242,31.35352,1.61621,31.5,2,31.5s0.76758-0.14648,1.06055-0.43945L16,18.12109l12.93945,12.93945C29.23242,31.35352,29.61621,31.5,30,31.5s0.76758-0.14648,1.06055-0.43945c0.58594-0.58545,0.58594-1.53564,0-2.12109L18.12109,16z"></path></svg>
                </button>
                <p className='text-lg font-medium'>History Chat</p>
            </div>
            <button className="py-2 md:px-6 px-4 mb-3 text-light hover:bg-gray-500 bg-gray-600 rounded-md w-full md:text-base text-sm"
                onClick={handleAddPage}>+ New Chat
            </button>
            <ToastContainer />
            <div className='h-full pb-36 overflow-y-auto flex flex-col w-full'>
                {renderedPages}
            </div>
            <div className="absolute inset-x-0 bottom-0 mr-6 ml-6 bg-greyish">
                <p className="text-lg font-medium pt-1.5 pb-3">Algorithm</p>
                <div className='flex flex-row space-x-4 mb-2'>
                    <MenuButton label="Knuth–Morris–Pratt" onClick={handleKMP}/>
                    <MenuButton label="Boyer–Moore" onClick={handleBM}/>
                </div>
                <Profile user={user}/>
            </div>
        </div>
    );
}

export default ChatHistory;