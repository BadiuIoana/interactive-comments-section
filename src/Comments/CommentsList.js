import classes from "./CommentsList.module.css";
import { useState, Fragment } from "react";
import RepliesList from "./RepliesList";

import DeleteIcon from "../UI/ActionIcons/DeleteIcon";
import EditIcon from "../UI/ActionIcons/EditIcon";
import ReplyBtn from "../UI/ActionIcons/ReplyBtn";
import ScoreSection from "../UI/ActionIcons/ScoreSection";
import CreateReplyForm from "./Form/CreateReplyForm";

import Card from "../UI/Card";

import EditCommentForm from "./Form/EditCommentForm";

const CommentsList = (props) => {
    const [toggleEditForm, setToggleEditForm] = useState(false);
    const [editedComment, setEditedComment] = useState({});
    const editCommentHandler = (comment) => {
        setEditedComment(comment);
        setToggleEditForm(true);
    };

    const [toggleReplyForm, setToggleForm] = useState(false);
    const replyHandler = () => {
        setToggleForm(true);
    };

    return (
        <Fragment>
            <Card>
                <div className={classes["right-section"]}>
                    <ScoreSection>{props.commItem.score}</ScoreSection>
                </div>

                <div className={classes["left-section"]}>
                    <div className={classes["top-section"]}>
                        <div className={classes["user-info"]}>
                            <img src={props.commItem.user.image.png} alt='' />
                            <p className={classes.name}>
                                {props.commItem.user.username}
                            </p>
                            <p className={classes.date}>
                                {props.commItem.createdAt}
                            </p>
                            {toggleEditForm && (
                                <p className={classes["current-user-label"]}>
                                    you
                                </p>
                            )}
                        </div>
                        {props.isCurrentUser ? (
                            <div className={classes["buttons"]}>
                                <button
                                    onClick={() =>
                                        props.removeComment(props.commItem.id)
                                    }
                                >
                                    <DeleteIcon />
                                </button>
                                <button
                                    onClick={() =>
                                        editCommentHandler(props.commItem)
                                    }
                                >
                                    <EditIcon />
                                </button>
                            </div>
                        ) : (
                            <ReplyBtn onClick={replyHandler} />
                        )}
                    </div>
                    <div className={classes["description"]}>
                        {toggleEditForm ? (
                            <EditCommentForm
                                editComment={props.editComment}
                                commItem={editedComment}
                                prevContent={props.commItem.content}
                                toggleEditForm={setToggleEditForm}
                            />
                        ) : (
                            props.commItem.content
                        )}
                    </div>
                </div>
            </Card>
            {props.commItem.replies.length > 0 ? (
                <RepliesList
                    replies={props.commItem.replies}
                    key={props.commItem.id}
                    currentUser={props.currentUser}
                    addReply={props.addReply}
                    commentId={props.commItem.id}
                    removeReply={props.removeReply}
                    editReply={props.editReply}
                />
            ) : null}

            {toggleReplyForm && (
                <div className={classes["reply-card-position"]}>
                    <CreateReplyForm
                        toggleForm={setToggleForm}
                        currentUser={props.currentUser}
                        addReply={props.addReply}
                        commentId={props.commItem.id}
                        mainCommentUsername={props.commItem.user.username}
                    />
                </div>
            )}
        </Fragment>
    );
};

export default CommentsList;
