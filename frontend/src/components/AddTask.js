import { useState } from "react";
import useTask from "../hooks/useTask";
import { useNavigate } from "react-router-dom";
import { addTask } from "../socket";

const AddTask = () => {
    const navigate = useNavigate();
    const {dispatch} = useTask();
    const [error, setError] = useState();
    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        frequency: "",
        due_date: ""
    });

    const onChange = (e) => {
        const {name, value} = e.target
        setTaskData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })

    }

    const onSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const res = await fetch("http://localhost:4000/task", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(taskData)
            });
            
            if (res.status === 400) {
                const { message } = await res.json();
                setError(message);
            }

            if (res.ok) {
                const data = await res.json();
                dispatch({type: "ADD_TASK", payload: data.task});

                addTask()

                navigate("/");
            }
    
        } catch (err) {
            const error = `${err.name}: ${err.message}`
            setError(error)
        }

    }

  return (
    <>
        <div>AddTask</div>

        <form onSubmit={onSubmit}>
            <label htmlFor="title">Title</label>
            <input 
                type="text" 
                name="title" 
                id="title" 
                value={taskData.title}
                onChange={onChange}
            />

            <label htmlFor="description">Descriptionn</label>
            <input 
                type="text" 
                name="description" 
                id="description" 
                value={taskData.description}
                onChange={onChange}
            />
            
            <label htmlFor="frequency">Frequency</label>
            <input 
                type="text" 
                name="frequency" 
                id="frequency" 
                value={taskData.frequency}
                onChange={onChange}
            />

            <label htmlFor="due_date">Due Date</label>
            <input 
                type="text" 
                name="due_date" 
                id="due_date" 
                value={taskData.due_date}
                onChange={onChange}
            />
            <button type="submit">Add</button>
        </form>

        {error && <h1>{error}</h1>}
    </>
  )
}
export default AddTask