import classes from "./CommentsReplies.module.css";
import CommentsList from "./CommentsList";

const CommentsReplies = (props) => {
    return (
        <div className={classes["reply-card-position"]}>
            {props.replies.map((reply) => (
                <CommentsList commItem={reply} key={reply.id} />
            ))}
        </div>
    );
};

export default CommentsReplies;
