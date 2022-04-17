import classes from "./EditCommentForm.module.css";
import { useState } from "react";
import Button from "../../UI/Button";
import { useContext } from "react";
import CommentsContect from "../../store/comments-context";

const EditCommentForm = (props) => {
    const commentsCtx = useContext(CommentsContect);

    const [editedComment, setEditedCommentContent] = useState({});
    const onSubmitHandler = (e) => {
        e.preventDefault();
        commentsCtx.editComment(editedComment);
        props.toggleEditForm(false);
    };

    const editTextareaHandler = (e) => {
        setEditedCommentContent({
            id: props.comment.id,
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
