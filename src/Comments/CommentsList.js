import classes from "./CommentsList.module.css";
import { useState, Fragment } from "react";

import DeleteIcon from "../UI/ActionIcons/DeleteIcon";
import EditIcon from "../UI/ActionIcons/EditIcon";
import ReplyBtn from "../UI/ActionIcons/ReplyBtn";
import ScoreSection from "../UI/ActionIcons/ScoreSection";
import Card from "../UI/Card";

import EditCommentForm from "./Form/EditCommentForm";

const CommentsList = (props) => {
    const [toggleEditForm, setToggleEditForm] = useState(false);
    const [editedComment, setEditedComment] = useState({});
    const editCommentHandler = (comment) => {
        setEditedComment(comment);
        setToggleEditForm(true);
    };

    return (
        <Fragment>
            <Card>
                <ScoreSection>{props.commItem.score}</ScoreSection>
                <section>
                    <div className={classes["top-section"]}>
                        <div className={classes["user-info"]}>
                            <img src={props.commItem.user.image.png} alt='' />
                            <p className={classes.name}>
                                {props.commItem.user.username}
                            </p>
                            <p className={classes.date}>
                                {props.commItem.createdAt}
                            </p>
                        </div>
                        {props.isCurrentUser ? (
                            <div className={classes["actions-buttons"]}>
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
                            <ReplyBtn />
                        )}
                    </div>
                    <div className={classes.description}>
                        {props.commItem.content}
                    </div>
                </section>
            </Card>
            {toggleEditForm && (
                <EditCommentForm
                    editComment={props.editComment}
                    commItem={editedComment}
                />
            )}
        </Fragment>
    );
};

export default CommentsList;
