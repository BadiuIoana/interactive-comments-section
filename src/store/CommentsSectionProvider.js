import { useReducer } from "react";
import CommentsContext from "./comments-context";
import data from "../data.json";
var today = new Date();
var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
const defaultCommentState = data;

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
                (comment) => comment.id !== action.id
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
                    (reply) => reply.id !== action.ids.replyId
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

        const replies = [...state.comments[commentIndex].replies];
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
    if (action.type === "DISLIKE_COMMENT") {
        const commentHasLike = state.currentUser.likedPosts.includes(
            action.ids.post_id
        );

        if (!commentHasLike) {
            return state;
        }

        let updatedCurrentUser;
        updatedCurrentUser = {
            ...state.currentUser,
            likedPosts: [
                ...state.currentUser.likedPosts.filter(
                    (id) => id !== action.ids.post_id
                ),
            ],
        };

        let updatedComments;
        let updatedScore;
        if (action.ids.parent_id) {
            let parentIndex = state.comments.findIndex(
                (post) => post.id === action.ids.parent_id
            );
            let replyIndex = state.comments[parentIndex].replies.findIndex(
                (post) => post.id === action.ids.post_id
            );
            updatedScore =
                state.comments[parentIndex].replies[replyIndex].score - 1;

            const reply = state.comments[parentIndex].replies[replyIndex];
            const updatedReply = { ...reply, score: updatedScore };

            const replies = [...state.comments[parentIndex].replies];

            replies[replyIndex] = updatedReply;
            updatedComments = [...state.comments];
            updatedComments[parentIndex] = {
                ...updatedComments[parentIndex],
                replies: replies,
            };
        } else {
            let postIndex = state.comments.findIndex(
                (post) => post.id === action.ids.post_id
            );
            const existingComment = state.comments[postIndex];
            updatedScore = state.comments[postIndex].score - 1;

            const updatedComment = {
                ...existingComment,
                score: updatedScore,
            };

            updatedComments = [...state.comments];
            updatedComments[postIndex] = updatedComment;
        }

        return {
            currentUser: updatedCurrentUser,
            comments: updatedComments,
        };
    }

    if (action.type === "LIKE_COMMENT") {
        const isAlreayLiked = state.currentUser.likedPosts.includes(
            action.ids.post_id
        );

        if (isAlreayLiked) {
            return state;
        }

        let updatedCurrentUser;
        updatedCurrentUser = {
            ...state.currentUser,
            likedPosts: [...state.currentUser.likedPosts, action.ids.post_id],
        };

        let updatedComments;
        let updatedScore;
        if (action.ids.parent_id) {
            let parentIndex = state.comments.findIndex(
                (post) => post.id === action.ids.parent_id
            );
            let replyIndex = state.comments[parentIndex].replies.findIndex(
                (post) => post.id === action.ids.post_id
            );
            updatedScore =
                state.comments[parentIndex].replies[replyIndex].score + 1;

            const reply = state.comments[parentIndex].replies[replyIndex];
            const updatedReply = { ...reply, score: updatedScore };

            const replies = [...state.comments[parentIndex].replies];

            replies[replyIndex] = updatedReply;
            updatedComments = [...state.comments];
            updatedComments[parentIndex] = {
                ...updatedComments[parentIndex],
                replies: replies,
            };
        } else {
            let postIndex = state.comments.findIndex(
                (post) => post.id === action.ids.post_id
            );
            const existingComment = state.comments[postIndex];
            updatedScore = state.comments[postIndex].score + 1;

            const updatedComment = {
                ...existingComment,
                score: updatedScore,
            };

            updatedComments = [...state.comments];
            updatedComments[postIndex] = updatedComment;
        }

        return {
            currentUser: updatedCurrentUser,
            comments: updatedComments,
        };
    }

    return defaultCommentState;
};

const CommentsSectionProvider = (props) => {
    const [commentState, dispatchCommentAction] = useReducer(
        commentsReducer,
        defaultCommentState
    );

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

    const likeCommentHandler = (ids) => {
        dispatchCommentAction({
            type: "LIKE_COMMENT",
            ids: ids,
        });
    };

    const dislikeCommentHandler = (ids) => {
        dispatchCommentAction({
            type: "DISLIKE_COMMENT",
            ids: ids,
        });
    };

    const commentsContext = {
        currentUser: commentState.currentUser,
        comments: commentState.comments,
        addComment: addCommentHandler,
        removeComment: removeCommentHandler,
        editComment: editCommentHandler,
        addReply: addReplyHandler,
        removeReply: removeReplyHandler,
        editReply: editReplyHandler,
        likeComment: likeCommentHandler,
        dislikeComment: dislikeCommentHandler,
    };

    return (
        <CommentsContext.Provider value={commentsContext}>
            {props.children}
        </CommentsContext.Provider>
    );
};

export default CommentsSectionProvider;
