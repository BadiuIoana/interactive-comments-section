import classes from "./ScoreSection.module.css";
import minus from "../../images/icon-minus.svg";
import plus from "../../images/icon-plus.svg";
const ScoreSection = (props) => {
    return (
        <div>
            <div className={classes.score}>
                <span>
                    <img src={minus} alt='' />
                </span>
                <span>{props.children}</span>
                <span>
                    <img src={plus} alt='' />
                </span>
            </div>
        </div>
    );
};

export default ScoreSection;
