import { useAuth0 } from "@auth0/auth0-react";
import bot from "../assets/icons/bot.webp"

const Login = () => {
    const {loginWithRedirect} = useAuth0();

    return ( 
        <div className="bg-gray-900 h-screen w-screen relative overflow-hidden flex justify-center items-center">
            <div className="h-80 w-80 bg-gradient-to-r from-slate-400 to-slate-700 rounded-full absolute lg:left-96 left-32 lg:top-20 top-12 transform rotate-160"></div>
            <div className="h-72 w-72 bg-gradient-to-r from-slate-700 to-slate-400 rounded-full absolute lg:bottom-24 bottom-12 lg:right-96 right-48 transform rotate-180"></div>
            <div className="container lg:h-96 lg:w-96 w-80 h-80 bg-white bg-opacity-10 rounded-2xl shadow-5xl relative z-2 border border-opacity-30 border-r-0 border-b-0 backdrop-filter backdrop-blur-sm flex flex-col justify-center items-center">
                <h2 className="md:text-3xl text-xl font-bold mb-2 text-light">Welcome to</h2>
                <h2 className="md:text-4xl text-2xl font-bold mb-3 text-light">GatauNamanya!</h2>
                <img src={bot} alt="Profile" className="z-10 md:h-16 h-12 mb-3"></img>
                <p className="md:text-base text-sm text-light mb-8">Your online chatbot platform</p>
                <p className="md:text-base text-sm text-light mb-3">Before you started, please sign in first!</p>
                <button className="lg:py-2 py-1 px-6 mb-3 text-light hover:bg-gray-700 bg-gray-900 rounded-md" onClick={() => loginWithRedirect()}>
                    Sign in
                </button>
            </div>
        </div>
     );
}
 
export default Login;