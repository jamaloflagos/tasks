import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import useTask from "../hooks/useTask"
import Tasks from "./Tasks";
import SocketMessage from "./SocketMessage";

const Main = () => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const {tasks, dispatch} = useTask();

    const fetchTasks = async () => {
        try {
            const res = await fetch('http://localhost:4000/task');
    
            if(res.status === 204) {
                setIsLoading(false);
                setMessage("No task created");
            }
    
            if (res.ok && res.status !== 204) {
                const data = await res.json();
                dispatch({type: "FETCH_TASKS", payload: data});

                setIsLoading(false);
                setMessage(""); 
            }
            
        } catch (err) {
            const error = `${err.name}: ${err.message}`
            setError(error);

            setIsLoading(false);
        }
    }

    useEffect(() => {      
        fetchTasks()
    }, [])
    
  return (
    <div className="main">
        {isLoading && <h1>Fetching tasks...</h1>}
        {message && <h1>{`${message}, click on the plus icon below to create one`}</h1>}
        {error && <h1>{error}</h1>}

        <SocketMessage />

        <div>
            {tasks && <span>All Tasks</span>}
        </div>
        
        <div>
            {tasks && tasks.map(task => {
                return <Tasks 
                        key={task._id}
                        id={task._id}
                        title={task.title}
                        description={task.description} 
                        frequency={task.frequency}
                        due_date={task.due_date}
                        createdAt={task.createdAt}
                        setMessage={setMessage}
                        setError={setError}
                    />
            })}
        </div>

        <div className="add-task">
            <Link to="/add-task">
                <i className="fa-solid fa-plus fa-xm" style={{color: "#ffffff"}}></i>
            </Link>
        </div>
    </div>
  )
}
export default Main