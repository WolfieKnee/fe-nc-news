import { useState } from "react";
import styles from "../css/Expandable.module.css";

export default function Expandable({ children }) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = () => setIsOpen((currOpen) => !currOpen);

	return (
		<div className={styles.expandable}>
			<button onClick={toggleOpen}>{isOpen ? "Hide" : "Show"}</button>
			{isOpen && children}
		</div>
	);
}
