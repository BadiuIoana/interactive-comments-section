import classes from "./CommentsReplies.module.css";
import CommentsList from "./CommentsList";

const CommentsReplies = (props) => {
    return (
        <div className={classes["reply-card-position"]}>
            {props.replies.map((reply) => (
                <CommentsList
                    commItem={reply}
                    key={reply.id}
                    isCurrentUser={
                        reply.user.username === props.currentUser.username
                            ? true
                            : false
                    }
                    removeComment={props.removeComment}
                />
            ))}
        </div>
    );
};

export default CommentsReplies;
