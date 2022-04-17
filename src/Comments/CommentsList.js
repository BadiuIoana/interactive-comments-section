import classes from "./CommentsList.module.css";
import { useState, Fragment } from "react";
import RepliesList from "./RepliesList";

import DeleteIcon from "../UI/ActionIcons/DeleteIcon";
import EditIcon from "../UI/ActionIcons/EditIcon";
import ReplyBtn from "../UI/ActionIcons/ReplyBtn";
import ScoreSection from "./ScoreSection";
import CreateReplyForm from "./Form/CreateReplyForm";
import DeleteModal from "./DeleteModal";

import { useContext } from "react";
import CommentsContect from "../store/comments-context";

import Card from "../UI/Card";

import EditCommentForm from "./Form/EditCommentForm";

const CommentsList = (props) => {
    const [toggleEditForm, setToggleEditForm] = useState(false);
    const [toggleReplyForm, setToggleReplyForm] = useState(false);

    const [editedComment, setEditedComment] = useState({});
    const editCommentHandler = (comment) => {
        setEditedComment(comment);
        setToggleEditForm(true);
    };

    const commentsCtx = useContext(CommentsContect);

    const [modalIsShown, setModalIsShown] = useState(false);
    const showModalHandler = () => {
        setModalIsShown(true);
    }

    const hideModalHandler = () => {
        setModalIsShown(false);
    };

    const confirmDeleteHandler = () => {
        commentsCtx.removeComment(props.comment.id);
    };


    return (
        <Fragment>
            <Card>
                <div className={classes["right-section"]}>
                    <ScoreSection post_id={props.comment.id} parrent_id={null}>
                        {props.comment.score}
                    </ScoreSection>
                </div>

                <div className={classes["left-section"]}>
                    <div className={classes["top-section"]}>
                        <div className={classes["user-info"]}>
                            <img src={props.comment.user.image.png} alt='' />
                            <p className={classes.name}>
                                {props.comment.user.username}
                            </p>
                            <p className={classes.date}>
                                {props.comment.createdAt}
                            </p>
                            {toggleEditForm && (
                                <p className={classes["current-user-label"]}>
                                    you
                                </p>
                            )}
                        </div>
                        {props.comment.user.username ===
                        commentsCtx.currentUser.username ? (
                            <div className={classes["buttons"]}>
                                <button onClick={showModalHandler}>
                                    <DeleteIcon />
                                </button>
                                <button
                                    onClick={() =>
                                        editCommentHandler(props.comment)
                                    }
                                >
                                    <EditIcon />
                                </button>
                            </div>
                        ) : (
                            <ReplyBtn
                                onClick={() => setToggleReplyForm(true)}
                            />
                        )}
                    </div>
                    <div className={classes["description"]}>
                        {toggleEditForm ? (
                            <EditCommentForm
                                editComment={props.editComment}
                                comment={editedComment}
                                prevContent={props.comment.content}
                                toggleEditForm={setToggleEditForm}
                            />
                        ) : (
                            props.comment.content
                        )}
                    </div>
                </div>
            </Card>
            {props.comment.replies.length > 0 ? (
                <RepliesList
                    replies={props.comment.replies}
                    key={props.comment.id}
                    commentId={props.comment.id}
                />
            ) : null}

            {toggleReplyForm && (
                <div className={classes["reply-card-position"]}>
                    <CreateReplyForm
                        toggleForm={setToggleReplyForm}
                        currentUser={commentsCtx.currentUser}
                        addReply={commentsCtx.addReply}
                        commentId={props.comment.id}
                        mainCommentUsername={props.comment.user.username}
                    />
                </div>
            )}
            {modalIsShown && (
                <DeleteModal
                    onClose={hideModalHandler}
                    confirmationHandler={confirmDeleteHandler}
                />
            )}
        </Fragment>
    );
};

export default CommentsList;
