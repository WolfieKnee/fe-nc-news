import { useEffect, useState } from "react";
import newsAPIGet from "../utils/utils";
import ArticleCard from "../components/ArticleCard";
import { useParams } from "react-router-dom";
import SortArticles from "../components/SortArticles";

export default function ArticleList() {
	const [articlesList, setArticlesList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errorState, setErrorState] = useState(null);

	const { topicSlug } = useParams();
	const [sortBy, setSortBy] = useState("");
	const [sortOrder, setSortOrder] = useState("desc");

	useEffect(() => {
		const url = "/articles";
		const apiQuery = new URLSearchParams();
		if (topicSlug) {
			apiQuery.append("topic", topicSlug);
		}
		if (sortBy) {
			apiQuery.append("sort_by", sortBy);
		}
		if (sortOrder) {
			apiQuery.append("order", sortOrder);
		}

		setIsLoading(true);
		newsAPIGet(`${url}?${apiQuery}`)
			.then(({ data }) => {
				const { articles } = data;
				setIsLoading(false);
				setArticlesList(articles);
			})
			.catch(() => {
				setIsLoading(false);
				setErrorState(true);
			});
	}, [topicSlug, sortBy, sortOrder]);

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
			<SortArticles
				sortBy={sortBy}
				setSortBy={setSortBy}
				sortOrder={sortOrder}
				setSortOrder={setSortOrder}
			/>
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
