import { useEffect, useState } from "react"
import { newsAPIPost } from "../utils/utils"
import { useParams } from "react-router-dom"

export default function CommentForm({commentsList, setCommentsList, commentCount, setCommentCount}){
    const [input,setInput] = useState("")
    const [newComment, setNewComment] = useState("")
    const [errorState, setErrorState] = useState(null);
    const [hasCommented, setHasCommented] = useState(null)
    const {article_id} = useParams()
    // note: hard-coded author
    const author = "weegembump"


    useEffect(()=>{
        if(newComment.length){
            newsAPIPost(`/articles/${article_id}/comments`,{username: author, body: newComment})
            .catch((err)=>{
                setErrorState((err))
                commentCount=commentCount-1;             
                const correctCommentList = [...commentsList]
                correctCommentList.shift()
                setCommentsList(correctCommentList)
                setCommentCount(commentCount)
                setHasCommented(null)
            })
        }
            
    },[newComment])

    if (hasCommented){
        return <p>thanks, for commenting on this article</p>
    }
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(input.length===0){
            setErrorState("empty")
        }else if(!hasCommented){
            setNewComment(input)
            const tempCommentCount=commentCount+1;
            setCommentCount(tempCommentCount)
            setCommentsList([{article_id: article_id,
                author:author,
                body:input,
                created_at:Date.now(),
                comment_id:Date.now(),
                votes: 0,
            }, ...commentsList])
            setInput("")
            setHasCommented(true)
        }
    }

    return (
        <>
        {errorState === "empty"?<p>comments need to hbadness</p>:null}
        {errorState && errorState !== "empty"?<p>badness, please try again</p>:null}
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>add a new comment as {author}</legend>
                <label htmlFor="newComment">comment*:</label>
                <input id = "newComment" type="text" value={input} onChange={(e)=>{setInput(e.target.value)}} placeholder="your comment"/>
            <p>*required</p>
            </fieldset>
            <button type="submit">submit comment</button>
        </form>
        </>
    )
}