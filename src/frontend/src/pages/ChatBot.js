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
    const { getAccessTokenSilently, user, logout } = useAuth0();
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
        .then(async (token) => {
            const res = await getPages({ token: token, id: user.sub });
            if (res.data) {
                setListQuestion(res.data);
                setPages(res.data);
            } else {
                setPages([{ convo: [], name: "" }]);
                const response = await storeData({ userToken, id: user.sub, pages });
                const { status, message, data } = response;
                if (status !== 200) {
                    toast.error(message, {
                    position: toast.POSITION.TOP_RIGHT
                    });
                } else {
                    console.log(data);
                }
            }
        });
    
    }, [getAccessTokenSilently, user.sub])

    // Process depending on retval
    const width = window.innerWidth;
    // The width below which the mobile view should be rendered
    const breakpoint = 1000;
    const [currentPage, setCurrentPage] = useState(0);
    const [openHistory, setOpenHistory] = useState(width < breakpoint ? (false) : (true));
    
    return (
        <div style={backgroundStyle} className="flex lg:p-[3vh]">
            <Chat style={backgroundStyle} className="flex p-[3vh]" 
            pages={pages} setPages={setPages} currentPage={currentPage} setCurrentPage={setCurrentPage}
            openHistory={openHistory} setOpenHistory={setOpenHistory} token={userToken} user={user} logout={logout} />
            <ToastContainer />
        </div>
    );
};

export default ChatBot;