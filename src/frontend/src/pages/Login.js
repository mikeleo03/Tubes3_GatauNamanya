import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {

    const {loginWithRedirect} = useAuth0();

    return ( 
        <div>
            <h2>LOGIN PLS :D</h2>
            <button onClick={() => loginWithRedirect()}>
                Sign In
            </button>
        </div>
     );
}
 
export default Login;