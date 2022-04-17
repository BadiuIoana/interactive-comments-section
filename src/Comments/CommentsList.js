import classes from "./CommentsList.module.css";
import replay from "../images/icon-reply.svg";
import minus from "../images/icon-minus.svg";
import plus from "../images/icon-plus.svg";
import editIcon from "../images/icon-edit.svg";
import deleteIcon from "../images/icon-delete.svg";
import Card from "../UI/Card";

const CommentsList = (props) => {
    return (
        <Card>
            <div className={classes.score}>
                <span>
                    <img src={minus} alt='' />
                </span>
                <span>{props.commItem.score}</span>
                <span>
                    <img src={plus} alt='' />
                </span>
            </div>
            <section>
                <div className={classes["top-section"]}>
                    <div className={classes["user-info"]}>
                        <img src={props.commItem.user.image.png} alt='' />
                        <p className={classes.name}>
                            {props.commItem.username}
                        </p>
                        <p className={classes.date}>
                            {props.commItem.createdAt}
                        </p>
                    </div>
                    <div className={classes["actions-buttons"]}>
                        <button>
                            <img src={deleteIcon} alt='' />
                        </button>
                        <button>
                            <img src={editIcon} alt='' />
                        </button>
                        <button className={classes["reply"]}>
                            Reply
                            <img src={replay} alt='' />
                        </button>
                    </div>
                </div>
                <div className={classes.description}>
                    {props.commItem.content}
                </div>
            </section>
        </Card>
    );
};

export default CommentsList;
