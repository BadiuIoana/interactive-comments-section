import deleteIcon from "../../images/icon-delete.svg";

const DeleteButton = () => {
    return (
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <img src={deleteIcon} alt='delete icon' />
            <p style={{ color: "var(--soft-red)" }}>Delete</p>
        </div>
    );
};

export default DeleteButton;
