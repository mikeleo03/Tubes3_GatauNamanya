import React from 'react';
import save from "../assets/icons/save.ico"
import fav from "../assets/icons/favorite.ico"

const ChatHeader = ({ pages, setPages, currentPage }) => {
    const handleRenamePage = (pageIndex, newName) => {
        const newPages = [...pages];
        newPages[pageIndex].name = newName;
        setPages(newPages);
    };

    const handleArchieved = () => {
        const newPages = [...pages];
        newPages[currentPage].archieved = true;
        setPages(newPages);
    }

    const handleStarred = () => {
        const newPages = [...pages];
        console.log(pages);
        console.log(currentPage);
        newPages[currentPage].starred = true;
        setPages(newPages);
    }

    return (
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
                <button class="mr-5 py-1" onClick={handleStarred}>
                    <img src={fav} alt="fav" className="h-7"></img>
                </button>
                <button class="py-1" onClick={handleArchieved}>
                    <img src={save} alt="Save" className="h-7"></img>
                </button>
            </div>
        </div>
    );
}

export default ChatHeader;