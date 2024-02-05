import { useEffect, useState } from "react"
import newsAPIGet from "../utils/utils"
import ArticleCard from "./ArticleCard"
import "./ArticleList.css"

export default function ArticleList(){
    const [articlesList, setArticlesList] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [errorState, setErrorState] = useState(null);

    useEffect(()=>{
        setIsLoading(true)

        newsAPIGet("/articles")
        .then(({data})=>{
            const {articles} = data;
            setIsLoading(false)
            setArticlesList(articles)
        })
        .catch(()=>{
            setIsLoading(false)
            setErrorState(true)
        })

    },[])

    if (isLoading) {
        return <p>loading....</p>;
    }

    if (errorState) {
    return <p>something went wrong getting the articles</p>;
    }

    return(
        <div name="articleList">
            <ul className="article-list">
                {articlesList.map((article)=>{
                    return <ArticleCard key={article.article_id} article={article}/>
                })}
            </ul>
        </div>
    )
}