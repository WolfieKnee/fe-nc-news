import { useEffect, useState } from "react";
import { newsAPIDelete } from "../utils/utils";
import styles from "../css/DeleteComment.module.css";

export default function DeleteComment({ comment_id, setCommentsList }) {
	const [deleteRequest, setDeleteRequest] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errorState, setErrorState] = useState(null);

	useEffect(() => {
		if (deleteRequest) {
			setIsLoading(true);
			setErrorState(false);
			newsAPIDelete(`/comments/${comment_id}`)
				.then(() => {
					setIsLoading(false);
					browserDelete();
				})
				.catch(() => {
					setErrorState(true);
					setIsLoading(false);
					setDeleteRequest(false);
				});
		}
	}, [deleteRequest]);

	const handleClick = (e) => {
		e.preventDefault();
		setDeleteRequest(true);
	};

	const browserDelete = () => {
		setCommentsList((tempCommentList) => {
			return tempCommentList.filter(
				(comment) => comment.comment_id !== comment_id
			);
		});
	};

	return (
		<span className={styles.deleteComment}>
			<button onClick={handleClick} disabled={isLoading}>
				delete your comment
			</button>
			{errorState ? (
				<p className="error">
					there was a problem deleting that comment, please refresh
					and try again
				</p>
			) : null}
		</span>
	);
}
