import editIcon from "../../images/icon-edit.svg";

const EditIcon = () => {
    return (
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <img src={editIcon} alt='edit icon' />
            <p style={{ color: "var(--moderate-blue)" }}>Edit</p>
        </div>
    );
};

export default EditIcon;
