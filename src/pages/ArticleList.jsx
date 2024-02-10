import { useEffect, useState } from "react";
import newsAPIGet from "../utils/utils";
import ArticleCard from "../components/ArticleCard";
import { useParams } from "react-router-dom";
import SortArticles from "../components/SortArticles";
import PageError from "../components/PageError";
import styles from "../css/ArticleList.module.css";

export default function ArticleList() {
	const [articlesList, setArticlesList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errorState, setErrorState] = useState(null);

	const { topicSlug } = useParams();
	const [sortBy, setSortBy] = useState("created_at");
	const [sortOrder, setSortOrder] = useState("desc");
	const [perPage, setPerPage] = useState("all");

	useEffect(() => {
		const apiUrl = "/articles";
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
		if (perPage !== "all") {
			apiQuery.append("limit", perPage);
		}
		setIsLoading(true);
		setErrorState(false);
		newsAPIGet(apiUrl, apiQuery)
			.then(({ data }) => {
				if (perPage !== "all") {
					console.log(data);
					const { articlesPage } = data.articles;
					console.log(articlesPage);
					setArticlesList(articlesPage);
				} else {
					const { articles } = data;
					setArticlesList(articles);
				}
				setIsLoading(false);
			})
			.catch((err) => {
				setIsLoading(false);
				setErrorState(err.response);
			});
	}, [topicSlug, sortBy, sortOrder, perPage]);

	if (isLoading) {
		return <p>loading....</p>;
	}

	if (errorState && topicSlug) {
		return (
			<PageError
				clientMessage={
					" we couldn't get the the articles for that topic."
				}
				error={errorState}
			/>
		);
	}

	if (errorState) {
		return (
			<PageError
				clientMessage={" we couldn't get the articles."}
				error={errorState}
			/>
		);
	}

	return (
		<section
			name="article list"
			title={
				!topicSlug
					? "article list"
					: `${articlesList.length} articles about ${topicSlug}`
			}
		>
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
				perPage={perPage}
				setPerPage={setPerPage}
			/>
			<ul className={styles.articleList}>
				{articlesList.map((article) => {
					return (
						<ArticleCard
							key={article.article_id}
							article={article}
						/>
					);
				})}
			</ul>
		</section>
	);
}
