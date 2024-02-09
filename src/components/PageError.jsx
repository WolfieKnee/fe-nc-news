import { Link } from "react-router-dom";
import styles from "../css/PageError.module.css";

export default function PageError({ clientMessage, error = false }) {
	return (
		<section name="pageError" className={styles.pageError}>
			<h2>Error!</h2>
			<p>
				Something bad happened which means
				<span className={styles.pageError}>{clientMessage} </span>
				{!error ? (
					<span>
						so we couldn't find anything on that url. <br />
						Please{" "}
					</span>
				) : null}
				{error ? (
					<span>
						<br />
						The server responded with "{error.status}:{" "}
						{error.data.msg}"
					</span>
				) : null}
				{error.status === 400 ? (
					<span>
						, which suggests your request was badly formatted.{" "}
						<br />
						Please try again or{" "}
					</span>
				) : null}
				{error.status === 404 ? (
					<span>
						, which suggests that it doesn't exist. <br />
						Please try again or{" "}
					</span>
				) : null}
				head back to the <Link to="/">Home Page</Link>.
			</p>
		</section>
	);
}
