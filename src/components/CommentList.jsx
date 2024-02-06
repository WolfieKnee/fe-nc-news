import { useEffect, useState } from "react";
import newsAPIGet from "../utils/utils";
import CommentCard from "./CommentCard";
import { useParams } from "react-router-dom";

export default function CommentList({comment_count}){
    const [commentsList, setCommentsList] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [errorState, setErrorState] = useState(null);
    const {article_id} = useParams()

    useEffect(()=>{
        setIsLoading(true)

        newsAPIGet(`/articles/${article_id}/comments`)
        .then(({data})=>{
            const {comments} = data;
            setIsLoading(false)
            setCommentsList(comments)
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
    return <p>something went wrong getting the comments</p>;
    }
    return(
        <>
        <h2>{comment_count} Comments</h2>
        <ol className="comments-list__ol">
            {commentsList.map((comment)=>{
                return <CommentCard key={comment.comment_id} comment={comment}/>
            })
            }
        </ol>        
        </>
        )
}