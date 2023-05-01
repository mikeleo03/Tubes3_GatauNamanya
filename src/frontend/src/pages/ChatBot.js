import React, { useEffect, useState } from "react";
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
    const [listQuestion, setListQuestion] = useState();
    const [userToken, setUserToken] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const token = await getAccessTokenSilently();
            setUserToken(token);
            return token
        }

        fetchData()
        .then(async token => getPages({token: token, id: user.sub}))
        .then(res => {console.log(res.data); setListQuestion(res.data)})
    
    }, [getAccessTokenSilently, user.sub])

    // Process depending on retval
    const width = window.innerWidth;
    // The width below which the mobile view should be rendered
    const breakpoint = 1000;
    const [pages, setPages] = useState(listQuestion ? (listQuestion) : ([{ convo: [], name : "" }]));
    const [currentPage, setCurrentPage] = useState(0);
    const [openHistory, setOpenHistory] = useState(width < breakpoint ? (false) : (true));
    
    return (
        <div style={backgroundStyle} className="flex lg:p-[3vh]">
            <Chat profpics={profile} style={backgroundStyle} className="flex p-[3vh]" 
            pages={pages} setPages={setPages} currentPage={currentPage} setCurrentPage={setCurrentPage}
            openHistory={openHistory} setOpenHistory={setOpenHistory} token={userToken} />
        </div>
    );
};

export default ChatBot;