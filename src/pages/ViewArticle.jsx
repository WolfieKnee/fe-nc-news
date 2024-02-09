import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import newsAPIGet from "../utils/utils";
import CommentList from "../components/CommentList";
import ArticleVote from "../components/ArticleVote";
import PageError from "../components/PageError";

import styles from "../css/ViewArticle.module.css";

export default function ViewArticle() {
	const [articleData, setArticleData] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [errorState, setErrorState] = useState(null);
	const { article_id } = useParams();

	useEffect(() => {
		setIsLoading(true);
		newsAPIGet(`/articles/${article_id}`)
			.then(({ data }) => {
				const { article } = data;
				setIsLoading(false);
				setArticleData(article);
			})
			.catch((err) => {
				setIsLoading(false);
				setErrorState(err.response);
			});
	}, []);

	if (isLoading) {
		return <p>loading....</p>;
	}

	if (errorState) {
		return (
			<PageError
				clientMessage={" we couldn't get that article for you."}
				error={errorState}
			/>
		);
	}

	const articleDate = new Date(articleData.created_at);
	const dateStr = articleDate.toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});

	return (
		<section name="article">
			<div name="articleContent" className={styles.article__content}>
				<h2>{articleData.title}</h2>
				<h3>by: {articleData.author}</h3>
				<p>
					{dateStr} Topic:{" "}
					<Link to={`/topics/${articleData.topic}`}>
						{" "}
						{articleData.topic}
					</Link>
				</p>
				<img
					src={articleData.article_img_url}
					alt={`image for ${articleData.title} about ${articleData.topic}`}
				/>
				<p>{articleData.body}</p>
				{articleData.votes !== undefined && (
					<ArticleVote articleVotes={articleData.votes} />
				)}
			</div>
			<CommentList />
		</section>
	);
}
