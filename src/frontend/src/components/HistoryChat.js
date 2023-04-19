import React from 'react';

function HistoryChat(msg) {
    return (
        <div className="message-list">                 
            <div>
                {msg.type}
            </div>
            <div>
                {msg.text}
            </div>
        </div>
    );
}

export default HistoryChat;