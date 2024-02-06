import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import newsAPIGet from "../utils/utils";
import CommentList from "../components/CommentList";
import ArticleVote from "../components/ArticleVote";

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
			.catch(() => {
				setIsLoading(false);
				setErrorState(true);
			});
	}, []);

	if (isLoading) {
		return <p>loading....</p>;
	}

	if (errorState) {
		return <p>something went wrong getting the article</p>;
	}

	const articleDate = new Date(articleData.created_at);
	const dateStr = articleDate.toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});

	return (
		<section name="article" className="article__section">
			<h1>{articleData.title}</h1>
			<h2>by: {articleData.author}</h2>
			<p>
				{dateStr} Topic:{" "}
				<Link to={`/topics/${articleData.topic}`}>
					{" "}
					{articleData.topic}
				</Link>
			</p>
			<div name="articleContent" className="article__content">
				<img
					src={articleData.article_img_url}
					alt={`image for ${articleData.title} about ${articleData.topic}`}
				/>
				<div>
					<p>{articleData.body}</p>
					{articleData.votes !== undefined && (
						<ArticleVote articleVotes={articleData.votes} />
					)}
				</div>
			</div>
			{/* TODO: advanced styling - add a show-hide for this list */}
			<CommentList />
		</section>
	);
}
