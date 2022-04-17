import replyIcon from "../../images/icon-reply.svg";
import classes from "./ReplyBtn.module.css";

const ReplyBtn = (props) => {
    return (
        <button onClick={props.onClick} className={classes["reply"]}>
            Reply
            <img src={replyIcon} alt='' />
        </button>
    );
};

export default ReplyBtn;
