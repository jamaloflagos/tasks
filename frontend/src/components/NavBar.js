import { useState } from "react"
import { Link, Outlet } from "react-router-dom"

const NavBar = () => {
    const [isTaskActive, setTaskActive] =useState(true);
    const [isProfileActive, setProfileActive] =useState(false);

    const onSetTaskActive = () => {
        setTaskActive(true);
        setProfileActive(false);
    }

    const onSetProfileActive = () => {
        setProfileActive(true);
        setTaskActive(false);
    }

  return (
    <>
        <nav>
            <ul>
                <li>
                    <Link to='/' onClick={onSetTaskActive}>
                        <i className="fa-solid fa-list-check fa-xl" style={{color: isTaskActive ? "#ADD8E6" : "#808080"}}></i>
                    </Link>
                </li>

                <li>
                    <Link to='/profile' onClick={onSetProfileActive}>
                        <i className="fa-regular fa-user fa-xl" style={{color: isProfileActive ? "#ADD8E6" : "#808080"}}></i>
                    </Link>
                </li>

            </ul>
        </nav>

        <Outlet />
    </>
  )
}
export default NavBar