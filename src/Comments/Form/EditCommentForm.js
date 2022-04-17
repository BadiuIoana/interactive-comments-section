import classes from "./EditCommentForm.module.css";
import Card from "../../UI/Card";
import { useState } from "react";
import ScoreSection from "../../UI/ActionIcons/ScoreSection";

const EditCommentForm = (props) => {
    const [editedComment, setEditedCommentContent] = useState({});
    const onSubmitHandler = (e) => {
        e.preventDefault();
        props.editComment(editedComment);
    };

    const editTextareaHandler = (e) => {
        setEditedCommentContent({
            id: props.commItem.id,
            content: e.target.value,
        });
    };

    return (
        <div className={classes["right-margin"]}>
            <Card>
                <ScoreSection>{props.commItem.score}</ScoreSection>
                <div className={classes["user-info"]}>
                    <img src={props.commItem.user.image.png} alt='' />
                    <p className={classes.name}>
                        {props.commItem.user.username}
                    </p>
                    <p className={classes.date}>{props.commItem.createdAt}</p>
                </div>
                <div className={classes.break}></div>
                <form className={classes["edit-form"]}>
                    <textarea
                        rows='4'
                        cols='50'
                        name='comment'
                        type='text'
                        onChange={editTextareaHandler}
                    />
                    <button type='submit' onClick={onSubmitHandler}>
                        Update
                    </button>
                </form>
            </Card>
        </div>
    );
};

export default EditCommentForm;
