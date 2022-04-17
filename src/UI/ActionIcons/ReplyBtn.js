import replyIcon from "../../images/icon-reply.svg";
import classes from "./ReplyBtn.module.css";

const ReplyBtn = () => {
    return (
        <button className={classes["reply"]}>
            Reply
            <img src={replyIcon} alt='' />
        </button>
    );
};

export default ReplyBtn;
