import data from "../data.json";
import CommentsList from "./CommentsList";
import CommentsReplies from "./CommentsReplies";
import CreateCommentForm from "./Form/CreateCommentForm";
import { Fragment, useState, useReducer } from "react";

const defaultCommentState = data;

var today = new Date();
var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
const commentsReducer = (state, action) => {
    if (action.type === "ADD") {
        return {
            currentUser: state.currentUser,
            comments: [
                ...state.comments,
                {
                    id: state.comments[state.comments.length - 1].id + 1,
                    content: action.comment.content,
                    createdAt: date,
                    score: 0,
                    user: {
                        image: {
                            png: state.currentUser.image.png,
                            webp: state.currentUser.image.webp,
                        },
                        username: state.currentUser.username,
                    },
                    replies: [],
                },
            ],
        };
    }

    if (action.type === "REMOVE") {
        return {
            currentUser: state.currentUser,
            comments: state.comments.filter(
                (comment) => comment.id != action.id
            ),
        };
    }

    if (action.type === "EDIT") {
        const existingCommentIndex = state.comments.findIndex(
            (comment) => comment.id === action.editedComment.id
        );

        const existingComment = state.comments[existingCommentIndex];
        const updatedComment = {
            ...existingComment,
            content: action.editedComment.content,
            createdAt: date,
        };

        let updatedComments = [...state.comments];
        updatedComments[existingCommentIndex] = updatedComment;

        return {
            currentUser: state.currentUser,
            comments: updatedComments,
        };
    }

    return defaultCommentState;
};

const Comments = () => {
    const [commentState, dispatchCommentAction] = useReducer(
        commentsReducer,
        defaultCommentState
    );

    const currentUser = commentState.currentUser;
    const addCommentHandler = (comment) => {
        dispatchCommentAction({ type: "ADD", comment: comment });
    };

    const removeCommentHandler = (id) => {
        dispatchCommentAction({ type: "REMOVE", id: id });
    };

    const editCommentHandler = (editedComment) => {
        dispatchCommentAction({ type: "EDIT", editedComment: editedComment });
    };

    return (
        <section>
            {commentState.comments.map((comment) => (
                <Fragment>
                    <CommentsList
                        commItem={comment}
                        key={comment.id}
                        isCurrentUser={
                            comment.user.username === currentUser.username
                                ? true
                                : false
                        }
                        removeComment={removeCommentHandler}
                        editComment={editCommentHandler}
                    />

                    {/* {comment.replies.length > 0 ? (
                        <CommentsReplies
                            replies={comment.replies}
                            isCurrentUser={
                                comment.user.username === currentUser.username
                                    ? true
                                    : false
                            }
                            key={comment.id}
                            removeComment={removeCommentHandler}
                            editComment={editCommentHandler}
                            currentUser={currentUser}
                        />
                    ) : null} */}
                </Fragment>
            ))}
            <CreateCommentForm
                currentUser={currentUser}
                newComment={addCommentHandler}
            />
        </section>
    );
};

export default Comments;
