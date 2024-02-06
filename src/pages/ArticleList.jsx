import { useEffect, useState } from "react";
import newsAPIGet from "../utils/utils";
import ArticleCard from "../components/ArticleCard";
import { useParams } from "react-router-dom";

export default function ArticleList() {
	const [articlesList, setArticlesList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errorState, setErrorState] = useState(null);

	const { topicSlug } = useParams();

	useEffect(() => {
		setIsLoading(true);

		newsAPIGet("/articles")
			.then(({ data }) => {
				const { articles } = data;
				setIsLoading(false);
				if (topicSlug) {
					const topicArticles = articles.filter((article) => {
						return article.topic === topicSlug;
					});
					setArticlesList(topicArticles);
				} else {
					setArticlesList(articles);
				}
			})
			.catch(() => {
				setIsLoading(false);
				setErrorState(true);
			});
	}, [topicSlug]);

	if (isLoading) {
		return <p>loading....</p>;
	}

	if (errorState) {
		return <p>something went wrong getting the articles</p>;
	}

	return (
		<div name="article List">
			{topicSlug ? (
				<h2>
					{articlesList.length} articles on {topicSlug}
				</h2>
			) : null}
			<ul className="article-list">
				{articlesList.map((article) => {
					return (
						<ArticleCard
							key={article.article_id}
							article={article}
						/>
					);
				})}
			</ul>
		</div>
	);
}
