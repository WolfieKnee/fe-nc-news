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
		setErrorState(false);
		newsAPIGet(url, apiQuery)
			.then(({ data }) => {
				const { articles } = data;
				setIsLoading(false);
				setArticlesList(articles);
			})
			.catch((err) => {
				setIsLoading(false);
				setErrorState(err.response);
			});
	}, [topicSlug, sortBy, sortOrder, perPage, page, totalCount, searchParams]);


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
					: `${totalCount} articles about ${topicSlug}`
			}
		>
			{topicSlug ? (
				<h2>
					{totalCount} articles on {topicSlug}
				</h2>
			) : (
				<h2>{totalCount} articles </h2>
			)}
			<SortArticles
				sortBy={sortBy}
				setSortBy={setSortBy}
				sortOrder={sortOrder}
				setSortOrder={setSortOrder}
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
