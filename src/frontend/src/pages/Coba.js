import { useState } from 'react';

const PAGE_SIZE = 20;

function ChatHistory({ pages, onPageChange }) {
    const [currentPage, setCurrentPage] = useState(pages.length - 1);
    const [showAllPages, setShowAllPages] = useState(false);

    const handleAddPage = () => {
        onPageChange([...pages, { messages: [] }]);
        setCurrentPage(currentPage + 1);
    };

    const handleLoadMore = () => {
        setCurrentPage(currentPage - 1);
    };

    const handlePageSelect = (pageIndex) => {
        setCurrentPage(pageIndex);
        setShowAllPages(false);
    };

    const handleRenamePage = (pageIndex, newName) => {
        const newPages = [...pages];
        newPages[pageIndex].name = newName;
        onPageChange(newPages);
    };

    const renderPageButton = (pageIndex) => (
        <button key={`page-${pageIndex}`} onClick={() => handlePageSelect(pageIndex)}>
            {pages[pageIndex].name || `Page ${pageIndex + 1}`}
        </button>
    );

    const currentMessages = pages[currentPage].messages;
    const renderedPages = showAllPages ? (
        pages.map((_, index) => renderPageButton(index))
        ) : (
        <>{currentMessages.map((message, index) => <div key={`message-${index}`}>{message}</div>)}</>
    );

    return (
        <div>
            {renderedPages}
            {currentPage > 0 && !showAllPages && (
                <button onClick={handleLoadMore}>Load More</button>
            )}
            <button onClick={handleAddPage}>Add Page</button>
            <button onClick={() => setShowAllPages(!showAllPages)}>Show All Pages</button>
            {pages.map((page, index) => (
                <div key={`page-${index}`}>
                <input
                    type="text"
                    value={page.name || ''}
                    onChange={(event) => handleRenamePage(index, event.target.value)}
                />
                </div>
            ))}
        </div>
    );
}

function Chat() {
    const [inputValue, setInputValue] = useState('');
    const [pages, setPages] = useState([{ messages: [] }]);

    const handleSend = () => {
        const lastPageIndex = pages.length - 1;
        const lastPage = pages[lastPageIndex];
        const newLastPage = {...lastPage, messages: [...lastPage.messages, inputValue],};
        const newPages = [...pages.slice(0, lastPageIndex), newLastPage];

        if (newLastPage.messages.length >= PAGE_SIZE) {
            setPages([...newPages, { messages: [] }]);
        } else {
            setPages(newPages);
        }

        setInputValue('');
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div>
            <div>
                <input type="text" value={inputValue} onChange={handleChange} />
                <button onClick={handleSend}>Send</button>
            </div>
            <ChatHistory pages={pages} onPageChange={setPages} />
        </div>
    );
}

export default Chat;