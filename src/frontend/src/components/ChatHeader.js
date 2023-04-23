import React from 'react';

const ChatHeader = ({ pages, setPages, currentPage, openHistory, setOpenHistory }) => {
    const handleRenamePage = (pageIndex, newName) => {
        const newPages = [...pages];
        newPages[pageIndex].name = newName;
        setPages(newPages);
    };

    return (
        <div className="h-14 py-3 w-full flex">
            <div className='w-4/5 align-left'>
                <input
                    class="align-left font-medium text-lg focus:outline-none w-full pr-5 md:pr-3"
                    type="text"
                    value={ (pages[currentPage] && pages[currentPage].name) ? (pages[currentPage].name) : ("") }
                    onChange={(event) => handleRenamePage(currentPage, event.target.value)}
                    placeholder='Click here to rename the chat page'
                />
            </div>
            <div className='w-1/5 align-right md:hidden' style={{float: 'right'}}>
                <button
                    onClick={() => setOpenHistory(!openHistory)}
                    type="button"
                    className="bg-gray-700 inline-flex items-center justify-center p-2 py-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white mr-10"
                    aria-controls="mobile-menu"
                    aria-expanded="false"
                >
                {!openHistory ? (
                    <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                    </svg>
                ) : (
                    <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                    </svg>
                )}
                </button>
            </div>
        </div>
    );
}

export default ChatHeader;