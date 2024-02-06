// "DELETE /api/comments/:comment_id": {
//     "description": "Deletes the given comment_id, server no response",
//     "queries": []
//     },

import { useEffect, useState } from "react"
import { newsAPIDelete } from "../utils/utils"

export default function DeleteComment({comment_id, commentsList, setCommentsList}){
    
    const [deleteRequest,setDeleteRequest] = useState(false)
    
    useEffect(()=>{
        console.log("in useEffect")
        if (deleteRequest){
            console.log("delete found")

            newsAPIDelete(`/comments/${comment_id}`)
            .then((res)=>{
                setDeleteRequest(false)
            })
        }
    },[deleteRequest])

    const handleClick = (e)=>{
        e.preventDefault()
        setDeleteRequest(true)
        console.log(comment_id, "<< click", deleteRequest)
        const tempCommentList = [...commentsList]
        tempCommentList.shift()
        setCommentsList(tempCommentList)
    }

    return (
        <button onClick={handleClick}>delete your comment</button>
    )
}