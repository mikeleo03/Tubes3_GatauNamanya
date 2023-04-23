import { useAuth0 } from "@auth0/auth0-react";
import bot from "../assets/icons/bot.webp"

const backgroundStyle = {
    backgroundColor : "#151718",
    height: "auto",
    width: "100vw",
    minHeight: "100vh",
    maxHeight: "100vh",
}

const Login = () => {
    const {loginWithRedirect} = useAuth0();

    return ( 
        <div style={backgroundStyle} className="flex justify-center items-center">
            <div className="z-20 bg-gradient-to-r from-slate-400/30 to-slate-700/30 lg:h-full p-20 flex justify-center items-center flex-col rounded-3xl">
                <h2 className="md:text-3xl text-xl font-bold mb-2 text-light">Welcome to</h2>
                <h2 className="md:text-4xl text-2xl font-bold mb-3 text-light">GatauNamanya!</h2>
                <p className="md:text-base text-sm text-light mb-8">Your online chatbot platform</p>
                <p className="md:text-base text-sm text-light mb-3">Before you started, please sign in first!</p>
                <button className="py-2 px-6 mb-3 text-light hover:bg-gray-500 bg-gray-700 rounded-md" onClick={() => loginWithRedirect()}>
                    Sign in
                </button>
            </div>
            <div className='ml-5 z-10 rotate-45 hover:rotate-[0deg] bg-gray-700 px-4 pt-4 pb-4 rounded-lg transition duration-300 ease-in-out'>
                <img src={bot} alt="Profile" className="z-10 md:h-36 h-12"></img>
            </div>
        </div>
     );
}
 
export default Login;