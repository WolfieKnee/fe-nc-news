import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { newsAPIPatch } from "../utils/utils";

export default function ArticleVote({articleVotes}){
    const [votes, setVotes] = useState(articleVotes)
    const [incrementVote, setIncrementVote] = useState(0)
    
    const [isLoading, setIsLoading] = useState(false);
    const [errorState, setErrorState] = useState(null);
    const {article_id} = useParams()

    useEffect(()=>{
        setIsLoading(true)
        newsAPIPatch(`articles/${article_id}`,{inc_votes: incrementVote})
        .then(({data})=>{
            setIsLoading(false)
            setIncrementVote(0)
        })
        .catch(()=>{
            setIsLoading(false)
            setErrorState(true)
        })

    },[incrementVote])

    if (errorState) {
    return <p>something went wrong showing the votes, please try refreshing the page</p>;
    }



    function handleVote(e, newVote){
        e.preventDefault();
        setVotes(votes+newVote)
        setIncrementVote(newVote)
    }
    
    return (
        <>
            <button className="article__content-button"onClick={(e)=>handleVote(e,-1)}>-</button>
            votes: {votes}
            <button className="article__content-button"onClick={(e)=>handleVote(e, 1)}>+</button>
        </>
    )
}