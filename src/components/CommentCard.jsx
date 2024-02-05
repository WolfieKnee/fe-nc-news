export default function CommentCard({comment}){
    const commentDate = new Date(comment.created_at);
    const dateStr = commentDate.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'});
    return(
    <li>
        <p>On {dateStr}, {comment.author} commented:</p>
        <p>"{comment.body}"</p>
        <p>This comment has {comment.votes} votes</p>
    </li>
    )

}