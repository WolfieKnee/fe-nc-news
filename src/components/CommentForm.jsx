import { useContext, useEffect, useState } from "react"
import { newsAPIPost } from "../utils/utils"
import { useParams } from "react-router-dom"
import UserContext from "../contexts/UserContext";

export default function CommentForm({commentsList, setCommentsList}){
    const [input,setInput] = useState("")
    const [newComment, setNewComment] = useState("")
    const [errorState, setErrorState] = useState(null);
    const [hasCommented, setHasCommented] = useState(null)
    const {article_id} = useParams()
    const {loggedInUser} = useContext(UserContext)

    useEffect(()=>{
        if(newComment.length){
            newsAPIPost(`/articles/${article_id}/comments`,{username: loggedInUser, body: newComment})
            .catch((err)=>{
                setErrorState((err))
                const correctCommentList = [...commentsList]
                correctCommentList.shift()
                setCommentsList(correctCommentList)
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
            setCommentsList([{article_id: article_id,
                author:loggedInUser,
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
        {errorState === "empty"?<p>comments need to have content, please try again</p>:null}
        {errorState && errorState !== "empty"?<p>something went wrong, please try again</p>:null}
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>add a new comment as {loggedInUser}</legend>
                <label htmlFor="newComment">comment*:</label>
                <input id = "newComment" type="text" value={input} onChange={(e)=>{setInput(e.target.value)}} placeholder="your comment"/>
            <p>*required</p>
            </fieldset>
            <button type="submit">submit comment</button>
        </form>
        </>
    )
}