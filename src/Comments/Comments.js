import data from "../data.json";
import CommentsList from "./CommentsList";
import CommentsReplies from "./CommentsReplies";
import CreateCommentForm from "./Form/CreateCommentForm";
import { Fragment, useState } from "react";

const Comments = () => {
    const currentUser = data.currentUser;
    const [newComment, setNewComment] = useState(data);
    var today = new Date();
    var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();

    const newCommentHandler = (commentContent) => {
        setNewComment((prevComment) => {
            console.log(commentContent);
            return {
                currentUser: prevComment.currentUser,
                comments: [
                    ...prevComment.comments,
                    {
                        id:
                            prevComment.comments[
                                prevComment.comments.length - 1
                            ].id + 1,
                        content: commentContent.content,
                        createdAt: date,
                        score: 0,
                        user: {
                            image: {
                                png: prevComment.currentUser.image.png,
                                webp: prevComment.currentUser.image.webp,
                            },
                            username: prevComment.currentUser.username,
                        },
                        replies: [],
                    },
                ],
            };
        });
    };
    return (
        <section>
            {newComment.comments.map((comment) => (
                <Fragment>
                    <CommentsList commItem={comment} key={comment.id} />
                    {comment.replies.length > 0 ? (
                        <CommentsReplies replies={comment.replies} />
                    ) : null}
                </Fragment>
            ))}
            <CreateCommentForm
                currentUser={currentUser}
                newComment={newCommentHandler}
            />
        </section>
    );
};

export default Comments;
