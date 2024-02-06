export default function CommentCard({comment}){
    const commentDate = new Date(comment.created_at);
    const dateStr = commentDate.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'});
    return(
    <li className="comment-card__li">
        <h3>On {dateStr}, {comment.author} commented:</h3>
        <p>"{comment.body}"</p>
        <p>This comment has {comment.votes} votes.</p>
    </li>
    )

}