import React from 'react';

const ChatHeader = ({ pages, setPages, currentPage }) => {
    const handleRenamePage = (pageIndex, newName) => {
        const newPages = [...pages];
        newPages[pageIndex].name = newName;
        setPages(newPages);
    };

    return (
        <div className="h-14 py-3 w-full">
            <input
                class="align-left font-medium text-lg focus:outline-none w-128"
                type="text"
                value={ (pages[currentPage] && pages[currentPage].name) ? (pages[currentPage].name) : ("") }
                onChange={(event) => handleRenamePage(currentPage, event.target.value)}
                placeholder='Click here to rename the chat page'
            />
        </div>
    );
}

export default ChatHeader;