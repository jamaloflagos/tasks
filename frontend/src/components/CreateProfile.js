import { useState } from "react"
import useProfile from "../hooks/useProfile";
import { useNavigate } from "react-router-dom";
import { loginSocket } from "../socket";

const CreateProfile = () => {
    const navigate = useNavigate();
    const {dispatch} = useProfile();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault()

        const profileData = {username, email} 

        try {
            const res = await fetch("http://localhost:4000/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(profileData)
            });
    
            if (res.status === 400 || res.status === 409 || res.status === 500) {
                const { message } = await res.json();
                setMessage(message);
            }
              
            if (res.ok) {
                const data = await res.json();
                localStorage.setItem("profile", JSON.stringify(data));
                dispatch({type: "CREATE_PROFILE", payload: data});
        
                setEmail("");
                setUsername("");

                loginSocket()

                navigate("/");
            }
            
        } catch (err) {
            const error = `${err.name}: ${err.message}`
            setError(error)
        }

    }

  return (
    <>
        <h1>Create Profile</h1>

        <h1>Welcome to the team...</h1>
        <form onSubmit={onSubmit}>
            <label htmlFor="username">What's your name?</label>
            <input 
                type="text" 
                name="username" 
                id="username" 
                placeholder="Your name" 
                onChange={e => setUsername(e.target.value)}
            />
            <input 
                type="text" 
                name="email" 
                id="email" 
                placeholder="Your email" 
                onChange={e => setEmail(e.target.value)}
            />
            <button>Join</button>
        </form>

        {error && <h1>{error}</h1>}
        {message && <h1>{message}</h1>}
    </>
  )
}
export default CreateProfile