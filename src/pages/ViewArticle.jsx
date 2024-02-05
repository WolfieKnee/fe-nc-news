import { useEffect, useState } from "react";
import newsAPIGet from "../utils/utils";
import { useParams } from 'react-router-dom';



 export default function ViewArticle(){
   const [articleData, setArticleData] = useState({})
   const [isLoading, setIsLoading] = useState(false);
   const [errorState, setErrorState] = useState(null);

   const {article_id} = useParams()

   useEffect(()=>{
      setIsLoading(true)
      newsAPIGet(`/articles/${article_id}`)
      .then(({data})=>{
         const {article} = data;
         setIsLoading(false)
         setArticleData(article)         
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
      return <p>something went wrong getting the article</p>;
   }

   const articleDate = new Date(articleData.created_at);
   const dateStr = articleDate.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'});

   return(
      <section name="article">
         <h1>{articleData.title}</h1>
         <h2>by: {articleData.author}</h2>
         <p>{dateStr} Topic: {articleData.topic}</p>
         <img src={articleData.article_img_url } alt={`image for ${articleData.title}`}/>
         <p>{articleData.body}</p>
         <p>votes: {articleData.votes}, comments: {articleData.comment_count}</p>
      </section>

   )
}