import { useRef } from "react";
import classes from "./modal.module.css";

function Modal(props: {
  message: string;
  title: string;
  onConfirm: () => void;
  onClose: () => void;
  show?: boolean;
}) {
  const { message, title, onConfirm, show, onClose } = props;
  const modalRef = useRef<HTMLDivElement>(null);

  const onModalConfirm = () => {
    onConfirm();
  };

  return (
    <div
      ref={modalRef}
      className={[classes["modal-overlay"], show ? classes["show"] : ""].join(
        " "
      )}
    >
      <div className={classes["modal-content"]}>
        <h3 className={classes["modal-title"]}>{title}</h3>

        <p className={classes["modal-message"]}>{message}</p>

        <div className={classes["modal-actions-modal"]}>
          <button className="btn btn-secondary" onClick={onClose}>
            No
          </button>
          <button className="btn btn-primary" onClick={onModalConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
