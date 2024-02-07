import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import DeleteComment from "./DeleteComment";

export default function CommentCard({
	comment,
	commentsList,
	setCommentsList,
}) {
	const { loggedInUser } = useContext(UserContext);

	const commentDate = new Date(comment.created_at);
	const dateStr = commentDate.toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
	return (
		<li className="comment-card__li">
			<h3>
				On {dateStr}, {comment.author} commented:
			</h3>
			<p>"{comment.body}"</p>
			<p>This comment has {comment.votes} votes.</p>
			<p>#{comment.comment_id}</p>
			{comment.author === loggedInUser ? (
				<DeleteComment
					comment_id={comment.comment_id}
					commentsList={commentsList}
					setCommentsList={setCommentsList}
				/>
			) : null}
		</li>
	);
}
