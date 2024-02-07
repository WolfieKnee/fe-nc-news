import { useEffect, useState } from "react";
import { newsAPIDelete } from "../utils/utils";

export default function DeleteComment({
	comment_id,
	commentsList,
	setCommentsList,
}) {
	const [deleteRequest, setDeleteRequest] = useState(false);
	const [errorState, setErrorState] = useState(null);

	useEffect(() => {
		console.log("in useEffect");
		if (deleteRequest) {
			console.log("delete found in useEffect");
			newsAPIDelete(`/comments/${comment_id}`)
				.then((res) => {
					setDeleteRequest(false);
					console.log(deleteRequest, "<< deleteRequest in .then");
				})
				.catch((err) => {
					console.log(err, "in catch");
					setErrorState(true);
				});
		}
	}, [deleteRequest]);

	const handleClick = (e) => {
		e.preventDefault();
		setDeleteRequest(true);
		console.log(comment_id, "<< click in onClick", deleteRequest);
		const tempCommentList = [...commentsList];
		tempCommentList.shift();
		setCommentsList(tempCommentList);
	};

	if (errorState) {
		return (
			<p>there was a problem deleting that comment, please try again</p>
		);
	}

	return <button onClick={handleClick}>delete your comment</button>;
}
