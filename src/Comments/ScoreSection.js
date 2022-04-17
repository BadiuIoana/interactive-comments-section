import classes from "./ScoreSection.module.css";
import minus from "../images/icon-minus.svg";
import plus from "../images/icon-plus.svg";
import { useContext } from "react";
import CommentsContect from "../store/comments-context";
const ScoreSection = (props) => {
    const commentsCtx = useContext(CommentsContect);
    const ids = {
        post_id: props.post_id,
        parent_id: props.parent_id,
    };
    return (
        <div className={classes.score}>
            <span onClick={() => commentsCtx.dislikeComment(ids)}>
                <img src={minus} alt='' />
            </span>
            <span>{props.children}</span>
            <span onClick={() => commentsCtx.likeComment(ids)}>
                <img src={plus} alt='' />
            </span>
        </div>
    );
};

export default ScoreSection;
