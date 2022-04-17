import classes from "./CommentsList.module.css";
import ReplyElement from "./ReplyElement";

const RepliesList = (props) => {
    return (
        <div className={classes["reply-card-position"]}>
            {props.replies.map((reply) => (
                <ReplyElement
                    reply={reply}
                    key={reply.id}
                    commentId={props.commentId}
                />
            ))}
        </div>
    );
};

export default RepliesList;
