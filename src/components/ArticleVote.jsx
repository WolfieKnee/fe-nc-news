import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { newsAPIPatch } from "../utils/utils";
import styles from "../css/ArticleVote.module.css";

export default function ArticleVote({ articleVotes }) {
	const [votes, setVotes] = useState(articleVotes);
	const [incrementVote, setIncrementVote] = useState(0);
	const [hasVoted, setHasVoted] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [errorState, setErrorState] = useState(null);
	const { article_id } = useParams();

	useEffect(() => {
		setIsLoading(true);
		newsAPIPatch(`articles/${article_id}`, { inc_votes: incrementVote })
			.then(({ data }) => {
				setIsLoading(false);
				setIncrementVote(0);
			})
			.catch(() => {
				setIsLoading(false);
				setErrorState(true);
				setHasVoted(null);
			});
	}, [incrementVote]);

	if (errorState) {
		return (
			<p className="error">
				something went wrong showing the votes, please try refreshing
				the page
			</p>
		);
	}

	function handleVote(e, newVote) {
		e.preventDefault();
		setVotes(votes + newVote);
		setIncrementVote(newVote);
		setHasVoted(true);
	}

	return (
		<p className={styles.votes}>
			votes:{votes}
			{!hasVoted ? (
				<button
					className="article__content-button"
					onClick={(e) => handleVote(e, -1)}
				>
					-
				</button>
			) : null}
			{!hasVoted ? (
				<button
					className="article__content-button"
					onClick={(e) => handleVote(e, 1)}
				>
					+
				</button>
			) : (
				" thanks for your vote"
			)}
		</p>
	);
}
