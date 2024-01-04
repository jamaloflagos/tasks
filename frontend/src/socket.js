import { io } from "socket.io-client"
import { format } from "date-fns"
const socket = io("http://localhost:4000");

export const loginSocket = () => {
    const {user: {username}} = JSON.parse(localStorage.getItem("profile"));
    console.log("called login socket");
    
    socket.emit("login", `${username} logged in at ${format(new Date(), "HH:mm:ss")}`);
}

export const addTask = () => {
    const {user: {username}} = JSON.parse(localStorage.getItem("profile"));
    socket.emit("add-task", `${username} added a new task at ${format(new Date(), "HH:mm:ss")}`);
}

export const editTask = () => {
    const {user: {username}} = JSON.parse(localStorage.getItem("profile"));
    socket.emit("edit-task", `${username} edited a task at ${format(new Date(), "HH:mm:ss")}`);
}

export const deletedTask = () => {
    const {user: {username}} = JSON.parse(localStorage.getItem("profile"));
    socket.emit("delete-task", `${username} deleted a task at ${format(new Date(), "HH:mm:ss")}`);
}

export const markAsComplete = () => {
    const {user: {username}} = JSON.parse(localStorage.getItem("profile"));
    socket.emit("mark-as-complete", `${username} marked a task as complete at ${format(new Date(), "HH:mm:ss")} `)
}