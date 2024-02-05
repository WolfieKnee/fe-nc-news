import { NavLink } from "react-router-dom"

export default function Navigation(){
    return(
        <nav>
            <ul className="navigation">
            <NavLink to="/"><li>Home</li></NavLink>
            <NavLink to="/"><li>Topics</li></NavLink>
            </ul>
        </nav>
    )
}