import { useEffect, useState } from "react";
import useTask from "../hooks/useTask";
import { useNavigate, useParams } from "react-router-dom";
import { editTask } from "../socket";

const EditTask = () => {
    const navigate = useNavigate();
    const {dispatch} = useTask();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const { id } = useParams()
  
    const { title, description, frequency, due_date } = JSON.parse(localStorage.getItem("taskEdit"));
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newFrequency, setNewFrequency] = useState("");
    const [newDue_date, setNewDue_date] = useState("");
    useEffect(() => {
        setNewTitle(title);
        setNewDescription(description);
        setNewFrequency(frequency);
        setNewDue_date(due_date);
    }, [title, description, frequency, due_date])

    
    const onSubmit = async (e) => {
        e.preventDefault()
        const taskData = {
            title: newTitle,
            description: newDescription,
            frequency: newFrequency,
            due_date: newDue_date
        }
        const res = await fetch(`http://localhost:4000/task/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(taskData)
        });

        try {
            if (res.status === 400 || res.status === 500) {
                const { message } = await res.json();
                
                setMessage(message);
            }

            if (res.ok) {
                const data = await res.json();
        
                dispatch({type: "EDIT_TASK", payload: data});

                editTask()
        
                navigate("/");
            }
            
        } catch (err) {
            const error = `${err.name}: ${err.message}`
            setError(error)
        }
    }

  return (
    <>
        <div>Edit Task</div>
        <form onSubmit={onSubmit}>
            <label htmlFor="title">Title</label>
            <input 
                type="text" 
                name="title" 
                id="title" 
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
            />

            <label htmlFor="description">Description</label>
            <input 
                type="text" 
                name="description" 
                id="description" 
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
            />
            
            <label htmlFor="frequency">Frequency</label>
            <input 
                type="text" 
                name="frequency" 
                id="frequency" 
                value={newFrequency}
                onChange={(e) => setNewFrequency(e.target.value)}
            />

            <label htmlFor="due_date">Due Date</label>
            <input 
                type="text" 
                name="due_date" 
                id="due_date" 
                value={newDue_date}
                onChange={(e) => setNewDue_date(e.target.value)}
            />
            <button type="submit">Add</button>
        </form>

        {error && <h1>{error}</h1>}
        {message && <h1>{message}</h1>}
    </>
  )
}
export default EditTask