import { useEffect, useState } from "react";
import newsAPIGet from "../utils/utils";
import ArticleCard from "../components/ArticleCard";
import { useParams, useSearchParams } from "react-router-dom";
import SortArticles from "../components/SortArticles";
import PageError from "../components/PageError";
import styles from "../css/ArticleList.module.css";

export default function ArticleList() {
	const [articlesList, setArticlesList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errorState, setErrorState] = useState(null);

	const { topicSlug } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const [sortBy, setSortBy] = useState("created_at");
	const [sortOrder, setSortOrder] = useState("desc");
	const [perPage, setPerPage] = useState(5);
	const [page, setPage] = useState(1);
	const [totalCount, setTotalCount] = useState();

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
	}, [topicSlug, sortBy, sortOrder, perPage, page, searchParams]);

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
				page={page}
				setPage={setPage}
				totalCount={totalCount}
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
