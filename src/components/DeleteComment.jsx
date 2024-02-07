import { useEffect, useState } from "react";
import { newsAPIDelete } from "../utils/utils";

export default function DeleteComment({
	comment_id,
	commentsList,
	setCommentsList,
}) {
	const [deleteRequest, setDeleteRequest] = useState(false);
	const [errorState, setErrorState] = useState(null);
	const backupCommentList = [...commentsList];

	useEffect(() => {
		if (deleteRequest) {
			browserDelete();
			newsAPIDelete(`/comments/${comment_id}`).catch(() => {
				setErrorState(true);
				setCommentsList(backupCommentList);
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

	const browserRestore = () => {
		setCommentsList((tempCommentList) => {
			return tempCommentList.filter(
				(comment) => comment.comment_id !== comment_id
			);
		});
	};

	if (errorState) {
		return (
			<p>there was a problem deleting that comment, please try again</p>
		);
	}

	return <button onClick={handleClick}>delete your comment</button>;
}
