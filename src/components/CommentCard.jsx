import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import DeleteComment from "./DeleteComment";
import styles from "../css/CommentCard.module.css";

export default function CommentCard({ comment, setCommentsList }) {
	const { loggedInUser } = useContext(UserContext);

	const commentDate = new Date(comment.created_at);
	const dateStr = commentDate.toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
	return (
		<li className={styles.commentCard__li}>
			<h3>
				On {dateStr}, {comment.author} commented:
			</h3>
			<p>"{comment.body}"</p>
			{comment.author === loggedInUser ? (
				<DeleteComment
					comment_id={comment.comment_id}
					setCommentsList={setCommentsList}
				/>
			) : null}
		</li>
	);
}
