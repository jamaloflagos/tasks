import { useNavigate, useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import useTask from "../hooks/useTask"
import { useEffect, useState } from "react";
import { deletedTask } from "../socket";


const Task = () => {
    const { id } = useParams();
    const [filteredTask, setFilteredTask] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();
    const {tasks, dispatch} = useTask();    

    const fetchTask = async () => {
        try {
            const res = await fetch(`http://localhost:4000/task/${id}`);
            
            if (res.status === 400 || res.status === 204) {
                const { message } = await res.json();
                setMessage(message)
            }
    
            if (res.ok && res.status !== 204) {
                const data = await res.json();
                
                setFilteredTask(tasks && tasks.filter(task => task._id === data._id));
            }
            
        } catch (err) {
            const error = `${err.name}: ${err.message}`
            setError(error);  
        } finally {
            setLoading(false);
        }
    }

    const deleteTask = async() => {
        const confirmDelete = window.confirm("Are you sure you want to delete task?");
        
        if (confirmDelete === false) return
        
        try {
            const res = await fetch(`http://localhost:4000/task/${id}`, {
                method: "DELETE"
            });

            if (res.status === 400 || res.status === 500) {
                const { message } = await res.json();
                setMessage(message)
            }
    
            if (res.ok) {
                const { task: data, message } = await res.json();
                dispatch({type: "DELETE_TASK", payload: data});
                
                deletedTask()

                navigate("/");
            }

        } catch (err) {
            const error = `${err.name}: ${err.message}`
            setError(error) 
        }
    }

    const handleTaskEdit = () => {
        localStorage.setItem("taskEdit", JSON.stringify(...filteredTask))
    } 

    useEffect(() => {
        fetchTask();
    }, []);

  return (
    <>
        {error && <h1>{error}</h1>}
        {message && <h1>{message}</h1>}
        <div>         
            <div>
                {isLoading ? (
                    <h1>Loading...</h1>
                ) : (
                    <div>
                        {filteredTask && <h1>{filteredTask[0].title}</h1>}
                        {filteredTask && <h1>{format(new Date(filteredTask[0].createdAt), "dd-MM-yyyy")}</h1>}
                    </div>
                )} 
            </div>

            <div>
                <Link to={`/edit-task/${id}`} onClick={handleTaskEdit}>
                    <i className="fa-regular fa-pen-to-square"></i>
                </Link>
                <button onClick={deleteTask}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>

        {filteredTask && filteredTask.map(task => {
            return (
                <div 
                    key={task._id}
                >
                    <h1>{task.name}</h1>
                    <h1>{task.description}</h1>
                    <h1>{task.frequency}</h1>
                    <h1>{task.due_date}</h1>
                </div>
            )
        })}
    </>
  )
}
export default Task