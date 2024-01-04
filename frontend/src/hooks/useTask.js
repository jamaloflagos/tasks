import { useContext } from "react";

const { TaskContext } = require("../contexts/taskContext");

const useTask = () => {
    const context = useContext(TaskContext);

    if (!context) throw Error("Must be used within contex")
    
  return context
}
export default useTask