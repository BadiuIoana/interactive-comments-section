import classes from "./CommentsList.module.css";
import { Fragment, useState } from "react";
import ReplyElement from "./ReplyElement";

const RepliesList = (props) => {
    return (
        <div className={classes["reply-card-position"]}>
            {props.replies.map((reply) => (
                <ReplyElement
                    reply={reply}
                    currentUser={props.currentUser}
                    commentId={props.commentId}
                    addReply={props.addReply}
                    key={reply.id}
                    removeReply={props.removeReply}
                    editReply={props.editReply}
                />
            ))}
        </div>
    );
};

export default RepliesList;
