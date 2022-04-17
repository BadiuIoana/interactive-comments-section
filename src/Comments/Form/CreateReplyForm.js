import classes from "./CreateReplyForm.module.css";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import { useState } from "react";
const CreateReplyForm = (props) => {
    const onSubmitHandler = (e) => {
        e.preventDefault();
        props.toggleForm(false);
        props.addReply({
            commentId: props.commentId,
            responseTo: props.mainCommentUsername,
            content: textareaText,
        });
    };

    let textareaText;
    const addReply = (e) => {
        textareaText = e.target.value;
    };

    return (
        <Card>
            <form className={classes.form}>
                <img src={props.currentUser.image.png} alt='' />
                <textarea
                    rows='4'
                    cols='50'
                    name='comment'
                    type='text'
                    onChange={addReply}
                    className={classes["comment-text"]}
                />
                <Button onClick={onSubmitHandler}>Reply</Button>
            </form>
        </Card>
    );
};

export default CreateReplyForm;
