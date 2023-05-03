import React, { useEffect, useState } from "react";
import Chat from '../components/Chat';
import { useAuth0 } from '@auth0/auth0-react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getPages, storeData } from "../requests/Requests";

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
    const [pages, setPages] = useState(listQuestion ? (listQuestion) : ([{ convo: [], name : "" }]));

    useEffect(() => {
        const fetchData = async () => {
            const token = await getAccessTokenSilently();
            setUserToken(token);
            return token
        }

        fetchData()
        .then(async token => getPages({token: token, id: user.sub}))
        .then(res => res.data ? (setListQuestion(res.data), setPages(res.data)) : (setPages([{ convo: [], name: "" }])));
    
    }, [getAccessTokenSilently])

    // Process depending on retval
    const width = window.innerWidth;
    // The width below which the mobile view should be rendered
    const breakpoint = 1000;
    const [currentPage, setCurrentPage] = useState(0);
    const [openHistory, setOpenHistory] = useState(width < breakpoint ? (false) : (true));

    if (!listQuestion) {
        /* const response = storeData ({ userToken, id: user.sub, pages })
        const { status, message, data } = response;
        if (status !== 200) {
            toast.error(message, {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            console.log(data);
        } */
    }
    
    return (
        <div style={backgroundStyle} className="flex lg:p-[3vh]">
            <Chat style={backgroundStyle} className="flex p-[3vh]" 
            pages={pages} setPages={setPages} currentPage={currentPage} setCurrentPage={setCurrentPage}
            openHistory={openHistory} setOpenHistory={setOpenHistory} token={userToken} user={user} />
            <ToastContainer />
        </div>
    );
};

export default ChatBot;