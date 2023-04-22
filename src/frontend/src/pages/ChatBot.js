import React, { useEffect, useState } from "react";
import Menu from '../components/Menu';
import Chat from '../components/Chat';
import {useAuth0} from '@auth0/auth0-react'
import profile from "../assets/icons/profile.ico"

const backgroundStyle = {
    backgroundColor : "#151718",
    height: "auto",
    width: "100vw",
    minHeight: "100vh",
}

const ChatBot = () => {
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const fetchData = async () => {
            const token = await getAccessTokenSilently();
            return token
        }
        fetchData()
        .then(token => {

            fetch("http://localhost:5000", {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${token}`,
                }),
            })
            .then((res) => res.json())
            .then((res) => console.log(res));
        })
    }, [])

    const [pages, setPages] = useState([{ convo: [], starred : false, archieved : false, name : "" }]);
    const [currentPage, setCurrentPage] = useState(0);
    
    return (
        <div style={backgroundStyle} className="flex lg:p-[3vh]">
            <Menu profpics={profile} />
            <Chat profpics={profile} pages={pages} setPages={setPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </div>
    );
};

export default ChatBot;