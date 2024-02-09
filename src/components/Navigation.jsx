import { NavLink } from "react-router-dom";
import styles from "../css/Navigation.module.css";

export default function Navigation() {
	return (
		<nav>
			<ul className={styles.navigation}>
				<NavLink to="/">
					<li>Home</li>
				</NavLink>
				<NavLink to="/topics">
					<li>Topics</li>
				</NavLink>
			</ul>
		</nav>
	);
}
