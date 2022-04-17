import classes from "./CreateCommentForm.module.css";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import { useState, useContext } from "react";
import CommentsContect from "../../store/comments-context";

const CreateCommentForm = () => {
    const [commentContent, setNewCommentContent] = useState({});
    const commentsCtx = useContext(CommentsContect);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        commentsCtx.addComment(commentContent);
    };

    const editTextareaHandler = (e) => {
        setNewCommentContent({
            content: e.target.value,
        });
    };

    return (
        <Card>
            <form className={classes.form}>
                <img src={commentsCtx.currentUser.image.png} alt='' />
                <textarea
                    rows='4'
                    cols='50'
                    name='comment'
                    type='text'
                    onChange={editTextareaHandler}
                    className={classes["comment-text"]}
                />
                <Button onClick={onSubmitHandler}>Send</Button>
            </form>
        </Card>
    );
};

export default CreateCommentForm;
