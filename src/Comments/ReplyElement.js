import classes from "./CommentsList.module.css";
import DeleteIcon from "../UI/ActionIcons/DeleteIcon";
import EditIcon from "../UI/ActionIcons/EditIcon";
import ReplyBtn from "../UI/ActionIcons/ReplyBtn";
import ScoreSection from "./ScoreSection";
import CreateReplyForm from "./Form/CreateReplyForm";
import EditReplyForm from "./Form/EditReplyForm";
import Card from "../UI/Card";
import { Fragment, useState } from "react";

import { useContext } from "react";
import CommentsContect from "../store/comments-context";
import DeleteModal from "./DeleteModal";

const RepliesList = (props) => {
    const commentsCtx = useContext(CommentsContect);

    const [toggleReplyForm, setToggleForm] = useState(false);
    const replyHandler = () => {
        setToggleForm(true);
    };

    const [toggleEditForm, setToggleEditForm] = useState(false);
    const [editedComment, setEditedComment] = useState({});

    const editCommentHandler = (comment) => {
        setEditedComment(comment);
        setToggleEditForm(true);
    };

    const [modalIsShown, setModalIsShown] = useState(false);
    const showModalHandler = () => {
        setModalIsShown(true);
    };

    const hideModalHandler = () => {
        setModalIsShown(false);
    };

    const confirmDeleteHandler = () => {
        commentsCtx.removeReply({
            replyId: props.reply.id,
            commId: props.commentId,
        });
    };

    return (
        <Fragment>
            <Card key={props.reply.id}>
                <div className={classes["right-section"]}>
                    <ScoreSection
                        post_id={props.reply.id}
                        parent_id={props.commentId}
                    >
                        {props.reply.score}
                    </ScoreSection>
                </div>

                <div className={classes["left-section"]}>
                    <div className={classes["top-section"]}>
                        <div className={classes["user-info"]}>
                            <img src={props.reply.user.image.png} alt='' />
                            <p className={classes.name}>
                                {props.reply.user.username}
                            </p>
                            <p className={classes.date}>
                                {props.reply.createdAt}
                            </p>
                        </div>
                        <div className={classes["buttons"]}>
                            {commentsCtx.currentUser.username !==
                            props.reply.user.username ? (
                                <ReplyBtn onClick={replyHandler} />
                            ) : (
                                <div className={classes["buttons"]}>
                                    <button onClick={showModalHandler}>
                                        <DeleteIcon />
                                    </button>
                                    <button
                                        onClick={() =>
                                            editCommentHandler(props.reply)
                                        }
                                    >
                                        <EditIcon />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={classes["description"]}>
                        <span className={classes["replyingTo"]}>
                            @{props.reply.replyingTo}
                        </span>
                        {toggleEditForm ? (
                            <EditReplyForm
                                toggleEditForm={setToggleEditForm}
                                prevContent={props.reply.content}
                                commentId={props.commentId}
                                replyId={props.reply.id}
                            />
                        ) : (
                            props.reply.content
                        )}
                    </div>
                </div>
            </Card>

            {commentsCtx.currentUser.username !== props.reply.user.username
                ? toggleReplyForm && (
                      <div className={classes["reply-card-position"]}>
                          <CreateReplyForm
                              toggleForm={setToggleForm}
                              currentUser={commentsCtx.currentUser}
                              addReply={commentsCtx.addReply}
                              commentId={props.commentId}
                              mainCommentUsername={props.reply.user.username}
                          />
                      </div>
                  )
                : ""}
            {modalIsShown && (
                <DeleteModal
                    onClose={hideModalHandler}
                    confirmationHandler={confirmDeleteHandler}
                />
            )}
        </Fragment>
    );
};

export default RepliesList;
