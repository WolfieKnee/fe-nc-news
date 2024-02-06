import { Link } from "react-router-dom"

export default function ArticleCard ({article}){
    const articleDate = new Date(article.created_at);
    const dateStr = articleDate.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'});

    return (
        <li className="article-card__li">
            <Link to={`/${article.article_id}`}>
            <h1>{article.title}</h1>
            <p>by: {article.author}</p>
            <img className="article-card__img" src={article.article_img_url } alt={`image for this article ${article.title} which is about ${article.topic}`}/>
        </Link>
            <p>on: {dateStr}</p>
            <p>votes: {article.votes}</p>
            <p>topic: {article.topic}</p>
            <p>comments: {article.comment_count}</p>
        </li>

    )
}