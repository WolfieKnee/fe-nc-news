import { NavLink } from "react-router-dom";
import styles from "../css/Navigation.module.css";

export default function Navigation() {
	return (
		<nav>
			<ul className={styles.navigation}>
				<li>
					<NavLink to="/">Home</NavLink>
				</li>
				<li>
					<NavLink to="/topics">Topics</NavLink>
				</li>
			</ul>
		</nav>
	);
}
