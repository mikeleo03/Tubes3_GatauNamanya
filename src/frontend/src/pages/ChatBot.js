import React, { useState } from "react";
import Chat from '../components/Chat';
import { useAuth0 } from '@auth0/auth0-react'
import profile from "../assets/icons/profile.ico"
import { getPages } from "../requests/Requests";

const backgroundStyle = {
    backgroundColor : "#151718",
    height: "auto",
    width: "100vw",
    minHeight: "100vh",
    maxHeight: "100vh",
}

const ChatBot = () => {
    const { getAccessTokenSilently, user } = useAuth0();

    /* useEffect(() => {
        const fetchData = async () => {
            const token = await getAccessTokenSilently();
            return token
        }
        fetchData()
        .then(token => {
            fetch("http://localhost:5000/queries/answers", {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${token}`,
                }),
            })
            .then((res) => res.json())
            .then((res) => console.log(res));
        })
    }) */

    const fetchData = async () => {
        const token = await getAccessTokenSilently();
        return token
    }

    const token = fetchData();
    let listQuestion = getPages(token, user.sub);
    // Process depending on retval
    const [pages, setPages] = useState(listQuestion ? (listQuestion) : ([{ convo: [], name : "" }]));
    const [currentPage, setCurrentPage] = useState(0);
    const [openHistory, setOpenHistory] = useState(true);
    
    return (
        <div style={backgroundStyle} className="flex lg:p-[3vh]">
            <Chat profpics={profile} style={backgroundStyle} className="flex p-[3vh]" 
            pages={pages} setPages={setPages} currentPage={currentPage} setCurrentPage={setCurrentPage}
            openHistory={openHistory} setOpenHistory={setOpenHistory} />
        </div>
    );
};

export default ChatBot;