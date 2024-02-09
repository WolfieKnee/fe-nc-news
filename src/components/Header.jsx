import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import styles from "../css/Header.module.css";

export default function Header() {
	const { loggedInUser } = useContext(UserContext);
	return (
		<header>
			<h1>Welcome to NC News</h1>
			<h2>for all the latest news & comments</h2>
			<p>user: {loggedInUser}</p>
		</header>
	);
}
