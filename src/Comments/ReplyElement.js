import classes from "./CommentsList.module.css";
import DeleteIcon from "../UI/ActionIcons/DeleteIcon";
import EditIcon from "../UI/ActionIcons/EditIcon";
import ReplyBtn from "../UI/ActionIcons/ReplyBtn";
import ScoreSection from "../UI/ActionIcons/ScoreSection";
import CreateReplyForm from "./Form/CreateReplyForm";
import EditReplyForm from "./Form/EditReplyForm";
import Card from "../UI/Card";
import { Fragment, useState } from "react";

const RepliesList = (props) => {
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

    return (
        <Fragment>
            <Card key={props.reply.id}>
                <div className={classes["right-section"]}>
                    <ScoreSection>{props.reply.score}</ScoreSection>
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
                            {props.currentUser.username !==
                            props.reply.user.username ? (
                                <ReplyBtn onClick={replyHandler} />
                            ) : (
                                <div className={classes["buttons"]}>
                                    <button
                                        onClick={() =>
                                            props.removeReply({
                                                replyId: props.reply.id,
                                                commId: props.commentId,
                                            })
                                        }
                                    >
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
                                editReply={props.editReply}
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

            {props.currentUser.username !== props.reply.user.username
                ? toggleReplyForm && (
                      <div className={classes["reply-card-position"]}>
                          <CreateReplyForm
                              toggleForm={setToggleForm}
                              currentUser={props.currentUser}
                              addReply={props.addReply}
                              commentId={props.commentId}
                              mainCommentUsername={props.reply.user.username}
                          />
                      </div>
                  )
                : ""}
        </Fragment>
    );
};

export default RepliesList;
