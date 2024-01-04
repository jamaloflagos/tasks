import { useState } from "react";
// import { format } from "date-fns"
import useTask from "../hooks/useTask"
import { useNavigate } from "react-router-dom";
import { deletedTask, markAsComplete } from "../socket";

const Tasks = ({title, description, frequency, due_date, id, createdAt, setMessage, setError}) => {
    const {dispatch} = useTask();
    const [deleteAlert, setDeleteAlert] = useState("");
    const [isChecked, setChecked] = useState(false);
    const navigate = useNavigate();
    // const formattedDate = format(new Date(createdAt), "dd-MM-yyyy");  

    const deleteTask = async() => {
        const confirmDelete = window.confirm("Are you sure you want to delete task?");
        
        if (confirmDelete === false) return

        try {
            const res = await fetch(`http://localhost:4000/task/${id}`, {
                method: "DELETE"
            });
    
            if (res.status === 400 || res.status === 500) {
                const { message } = res.json();
                setMessage(message)
            }
    
            if (res.ok) {
                const { task: data, message } = await res.json();
                dispatch({type: "DELETE_TASK", payload: data});

                setDeleteAlert(message);

                deletedTask()
            }
            
        } catch (err) {
            const error = `${err.name}: ${err.message}`
            setError(error)  
        }
    }

    const onClick = () => {
        setChecked(prev => !prev);
        markAsComplete()
    }

   
  return (
    <>
        <div className="task-div">
            <div className={isChecked ? "tasks-checked" : "tasks"}>
                <div className={isChecked ? "circle-checked" : "circle"} onClick={onClick}>
                    {isChecked && <i class="fa-solid fa-check"></i>}
                </div>

                <div onClick={() => navigate(`/${id}`)} className="tasks-sub1">
                    <h3>{title}</h3>
                    <div className="tasks-sub2">
                        <h4>{due_date}</h4>
                        <h4>{frequency}</h4>
                    </div>
                    {/* <h1>{formattedDate}</h1> */}
                </div>
            </div>

            <div>
                <button onClick={deleteTask}><i className="fa-solid fa-trash"></i></button>
            </div>
        </div>

        <div>
            {deleteAlert && <h1>{deleteAlert}</h1>}
        </div>

    </>
  )
}
export default Tasks