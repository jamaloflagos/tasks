import { useContext } from "react"
import { ProfileContext } from "../contexts/profileContext"

const useProfile = () => {
    const context = useContext(ProfileContext);

    if (!context) throw Error("Must be used within context");

  return context
}
export default useProfile