import data from "../data.json";
import CommentsList from "./CommentsList";
import CreateCommentForm from "./Form/CreateCommentForm";
import { Fragment, useState, useReducer } from "react";

const defaultCommentState = data;

var today = new Date();
var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
const commentsReducer = (state, action) => {
    if (action.type === "ADD_COMMENT") {
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

    if (action.type === "REMOVE_COMMENT") {
        return {
            currentUser: state.currentUser,
            comments: state.comments.filter(
                (comment) => comment.id != action.id
            ),
        };
    }

    if (action.type === "EDIT_COMMENT") {
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

    if (action.type === "ADD_REPLY") {
        const mainCommentIndex = state.comments.findIndex(
            (comment) => comment.id == action.comment.commentId
        );
        let newReply = {
            id: Math.floor(Math.random() * 100),
            content: action.comment.content,
            createdAt: date,
            score: 0,
            replyingTo: action.comment.responseTo,
            user: state.currentUser,
        };

        const updatedComment = {
            ...state.comments[mainCommentIndex],
            replies: [...state.comments[mainCommentIndex].replies, newReply],
        };
        const updatedComments = [...state.comments];
        updatedComments[mainCommentIndex] = updatedComment;
        return {
            currentUser: state.currentUser,
            comments: updatedComments,
        };
    }
    if (action.type === "REMOVE_REPLY") {
        const mainCommentIndex = state.comments.findIndex(
            (comment) => comment.id == action.ids.commId
        );
        const undatedComment = {
            ...state.comments[mainCommentIndex],
            replies: [
                ...state.comments[mainCommentIndex].replies.filter(
                    (reply) => reply.id != action.ids.replyId
                ),
            ],
        };

        const updatedComments = [...state.comments];
        updatedComments[mainCommentIndex] = undatedComment;
        return {
            currentUser: state.currentUser,
            comments: updatedComments,
        };
    }
    if (action.type === "EDIT_REPLY") {
        const commentIndex = state.comments.findIndex(
            (comment) => comment.id == action.replyComment.comment_id
        );

        const replyIndex = state.comments[commentIndex].replies.findIndex(
            (reply) => reply.id == action.replyComment.reply_id
        );

        const reply = state.comments[commentIndex].replies[replyIndex];
        const updatedReply = { ...reply, content: action.replyComment.content };

        const replies = state.comments[commentIndex].replies;
        replies[replyIndex] = updatedReply;

        let updatedComments = state.comments;
        updatedComments[commentIndex] = {
            ...updatedComments[commentIndex],
            replies: replies,
        };

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
        dispatchCommentAction({ type: "ADD_COMMENT", comment: comment });
    };

    const removeCommentHandler = (id) => {
        dispatchCommentAction({ type: "REMOVE_COMMENT", id: id });
    };

    const editCommentHandler = (editedComment) => {
        dispatchCommentAction({
            type: "EDIT_COMMENT",
            editedComment: editedComment,
        });
    };

    const addReplyHandler = (comment) => {
        dispatchCommentAction({ type: "ADD_REPLY", comment: comment });
    };

    const removeReplyHandler = (ids) => {
        dispatchCommentAction({ type: "REMOVE_REPLY", ids: ids });
    };

    const editReplyHandler = (replyComment) => {
        dispatchCommentAction({
            type: "EDIT_REPLY",
            replyComment: replyComment,
        });
    };

    return (
        <section>
            {commentState.comments.map((comment) => (
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
                    currentUser={currentUser}
                    addReply={addReplyHandler}
                    removeReply={removeReplyHandler}
                    editReply={editReplyHandler}
                />
            ))}
            <CreateCommentForm
                currentUser={currentUser}
                newComment={addCommentHandler}
            />
        </section>
    );
};

export default Comments;
