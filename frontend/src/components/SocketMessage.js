import { useEffect, useState } from "react"
import {io} from "socket.io-client"

const socket = io("http://localhost:4000");

const SocketMessage = () => {
    const [message, setMessage] = useState("");

    
    useEffect(() => {
        socket.on("add-task", data => {
            setMessage(data)
        })

        socket.on("delete-task", data => {
            setMessage(data)
        })
     
        socket.on("edit-task", data => {
            setMessage(data)
        })

        socket.on("mark-as-complete", data => {
            setMessage(data)
        })
        socket.on("login", data => {
            setMessage(data)
        })
    }, [message]);

  return (
    <>
        {message && <div>{message}</div>}
    </>
  )
}
export default SocketMessage