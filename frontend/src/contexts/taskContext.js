import { createContext, useReducer } from "react";
export const TaskContext = createContext();

const taskReducer = (state, {payload, type}) => {
    switch(type) {
        case "FETCH_TASKS":
            return {
                tasks: payload
            }
        case "ADD_TASK": 
            return {
                tasks: [payload, ...(state.tasks ?? [])]
            }
        case "EDIT_TASK":
            return {
                notes: [payload, ...(state.notes ?? [])]
            }
        case "DELETE_TASK": 
            return {
                tasks: state.tasks.filter(task => task._id !== payload._id)
            }
        default: return state
    }

}

export const TaskContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(taskReducer, {
        tasks: null
    })
   
    return (
        <TaskContext.Provider value={{...state, dispatch}}>
            {children}
        </TaskContext.Provider>
    )

}