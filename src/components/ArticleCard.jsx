import { Link } from "react-router-dom";
import styles from "../css/ArticleCard.module.css";

export default function ArticleCard({ article }) {
	const articleDate = new Date(article.created_at);
	const dateStr = articleDate.toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});

	return (
		<Link
			to={`/articles/${article.article_id}`}
			className={styles.articleCard__li}
		>
			<li>
				<h3>{article.title}</h3>
				<p>by: {article.author}</p>
				<img
					className={styles.articleCard__img}
					src={article.article_img_url}
					alt={`image for this article ${article.title} which is about ${article.topic}`}
				/>
				<p>on: {dateStr}</p>
				<p>votes: {article.votes}</p>
				<p>
					topic:{" "}
					<Link to={`/topics/${article.topic}`}>{article.topic}</Link>
				</p>
				<p>comments: {article.comment_count}</p>
			</li>
		</Link>
	);
}
