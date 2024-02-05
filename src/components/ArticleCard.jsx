import "./ArticleCard.css";

export default function ArticleCard ({article}){
    const articleDate = new Date(article.created_at);
    const dateStr = articleDate.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
    }).replace(/ /g, '-');
    console.log(dateStr)
    return (
        <li className="article-card__li">
            <h1>{article.title}</h1>
            <img className="article-card__img" src={article.article_img_url } alt={`image for ${article.title}`}/>
            <p>by: {article.author}</p>
            <p>on: {dateStr}</p>
            <p>topic: {article.topic}</p>
            <p>votes: {article.votes}</p>
        </li>
    )
}