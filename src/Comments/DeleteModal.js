import Modal from "../UI/Modal";
import classes from "./DeleteModal.module.css";

const DeleteModal = (props) => {
    return (
        <Modal onClose={props.onClose}>
            <h2 className={classes.title}>Delete comment</h2>
            <p className={classes.message}>Are you sure you want to delete this comment?</p>
            <button onClick={props.onClose} className={classes.secondary}>No, cancel</button>
            <button onClick={props.confirmationHandler} className={classes.dangerous}>Yes, delete</button>
        </Modal>
    );
};

export default DeleteModal;
