import classes from "./EditReplyForm.module.css";
import { useState } from "react";
import Button from "../../UI/Button";
import { useContext } from "react";
import CommentsContect from "../../store/comments-context";

const EditCommentForm = (props) => {
    const commentsCtx = useContext(CommentsContect);

    const [editedReply, setEditedCommentContent] = useState({});
    const onSubmitHandler = (e) => {
        e.preventDefault();
        commentsCtx.editReply(editedReply);
        props.toggleEditForm(false);
    };

    const editTextareaHandler = (e) => {
        setEditedCommentContent({
            comment_id: props.commentId,
            reply_id: props.replyId,
            content: e.target.value,
        });
    };

    return (
        <form className={classes["edit-form"]}>
            <textarea
                rows='4'
                cols='50'
                name='comment'
                type='text'
                onChange={editTextareaHandler}
                className={classes["updated-comment"]}
                defaultValue={props.prevContent}
            />
            <Button onClick={onSubmitHandler}>Update</Button>
        </form>
    );
};

export default EditCommentForm;
