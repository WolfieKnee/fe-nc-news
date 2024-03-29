import { useContext, useEffect, useState } from "react";
import { newsAPIPost } from "../utils/utils";
import { useParams } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import styles from "../css/CommentForm.module.css";

export default function CommentForm({ commentsList, setCommentsList }) {
	const [input, setInput] = useState("");
	const [newComment, setNewComment] = useState("");
	const [errorState, setErrorState] = useState(null);
	const [hasCommented, setHasCommented] = useState(null);
	const { article_id } = useParams();
	const { loggedInUser } = useContext(UserContext);

	useEffect(() => {
		if (newComment.length) {
			newsAPIPost(`/articles/${article_id}/comments`, {
				username: loggedInUser,
				body: newComment,
			})
				.then(({ data }) => {
					let tempCommentsList = [...commentsList];
					tempCommentsList.shift();
					tempCommentsList = [data.comment, ...tempCommentsList];
					setCommentsList(tempCommentsList);
				})
				.catch((err) => {
					setErrorState(err);
					const tempCommentsList = [...commentsList];
					tempCommentsList.shift();
					setCommentsList(tempCommentsList);
					setHasCommented(null);
				});
		}
	}, [newComment]);

	if (hasCommented) {
		return <p>thanks, for commenting on this article</p>;
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (input.length === 0) {
			setErrorState("empty");
		} else if (!hasCommented) {
			setNewComment(input);
			setCommentsList([
				{
					article_id: article_id,
					author: loggedInUser,
					body: input,
					created_at: Date.now(),
					comment_id: Date.now(),
					votes: 0,
				},
				...commentsList,
			]);
			setInput("");
			setHasCommented(true);
		}
	};

	return (
		<section
			name="comments"
			title="comments"
			className={styles.comment__form}
		>
			<form onSubmit={handleSubmit} title="new comment form">
				<label htmlFor="newComment">
					add a new comment as {loggedInUser}
				</label>
				<textarea
					id="newComment"
					name="newComment"
					rows={4}
					value={input}
					onChange={(e) => {
						setInput(e.target.value);
					}}
					placeholder="your comment"
				/>
				{errorState === "empty" ? (
					<p className={styles.error}>
						comments need to have content, please try again
					</p>
				) : null}
				{errorState && errorState !== "empty" ? (
					<p className={styles.error}>
						something went wrong posting your comment, please try
						again
					</p>
				) : null}
				<button type="submit">submit comment</button>
			</form>
		</section>
	);
}
