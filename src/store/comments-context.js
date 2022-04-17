import React from "react";

const CommentsContext = React.createContext({
    currentUser: {},
    comments: [],
    addComment: (comment) => {},
    removeComment: (id) => {},
    editComment: (editedComment) => {},
    addReply: (reply) => {},
    removeReply: (ids) => {},
    editReply: (reply) => {},
    likeComment: (ids) => {},
    dislikeComment: (ids) => {},
});

export default CommentsContext;
