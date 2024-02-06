import { useEffect, useState } from "react";
import newsAPIGet from "../utils/utils";
import { useParams } from 'react-router-dom';
import CommentList from "../components/CommentList";



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
      <section name="article" className="article__section">
            <h1>{articleData.title}</h1>
            <h2>by: {articleData.author}</h2>
            <p>{dateStr} Topic: {articleData.topic}</p>
         <div name="articleContent" className="article__content">
            <img src={articleData.article_img_url } alt={`image for ${articleData.title} about ${articleData.topic}`}/>
            <p>{articleData.body}</p>
         </div>
            <p>votes: {articleData.votes}, comments: {articleData.comment_count}</p>
{/* TODO: advanced styling - add a show-hide for this list */}
         <div name="comments">
            <CommentList/>
         </div>
      </section>
      

   )
}