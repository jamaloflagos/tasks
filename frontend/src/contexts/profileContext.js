import { createContext, useReducer, useEffect } from "react";

export const ProfileContext = createContext();

const profileReducer = (state, {payload, type}) => {
    switch(type) {
        case "CREATE_PROFILE": 
            return {
                profile: payload
            }
        case "EDIT_PROFILE": 
            return {
                profile: payload
            }
        default: return state
    }

}

export const ProfileContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(profileReducer, {
        profile: null
    })

    useEffect(()=> {
        const profile = JSON.parse(localStorage.getItem("profile"));     
    
        if (profile) {
            dispatch({type: "CREATE_PROFILE", payload: profile});
        }
        
    },[])

    return (
        <ProfileContext.Provider value={{...state, dispatch}}>
            {children}
        </ProfileContext.Provider>
    )
}