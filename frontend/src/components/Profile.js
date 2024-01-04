import { Link } from "react-router-dom";

const Profile = () => {
  const {user} = JSON.parse(localStorage.getItem("profile"));
  console.log(user);
  
    
  return (
    <>
      <h1>Profile</h1>

      <div>
        <h1>{user.username}</h1>
        <h1>{user.email}</h1>
      </div>

      <div>
        <Link to="/edit-profile">Edit Profile</Link>
      </div>
    </>
  )
}
export default Profile