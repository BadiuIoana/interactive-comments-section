import CommentsList from "./CommentsList";
import CreateCommentForm from "./Form/CreateCommentForm";
import { useContext } from "react";
import CommentsContect from "../store/comments-context";

const Comments = () => {
    const commentsCtx = useContext(CommentsContect);
    return (
        <section>
            {commentsCtx.comments.map((comment) => (
                <CommentsList comment={comment} key={comment.id} />
            ))}
            <CreateCommentForm />
        </section>
    );
};

export default Comments;
