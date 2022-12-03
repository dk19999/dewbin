import React from "react";
import "react-responsive-modal/styles.css";
import { Modal, ModalProps } from "react-responsive-modal";
import styles from "./user-options.module.css";
import { useRouter } from "next/router";
const customStyles: ModalProps["styles"] = {
  overlay: {
    backgroundColor: "transparent",
  },

  modal: {
    // backgroundColor:'#212121'
    backgroundColor: "#181e2e",
    right: "10px",
    placeSelf: "flex-end",
    position: "absolute",
    top: "40px",
    // height: "400px",
    padding: "0",
    width: "200px",
  },
};

function UserOptionsModal({ handleClose }: { handleClose: () => void }) {
  const router = useRouter();

  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        styles={customStyles}
        focusTrapped
        showCloseIcon={false}
        center={false}
      >
        <div className="modal-body" onClick={handleClose}>
          <div className={styles?.["modal-option"]}>
            <span className="option-text">Guest User</span>
          </div>
          <div
            className={styles?.["modal-option"]}
            onClick={() => router.push("/")}
          >
            <span className="option-text">Create new paste</span>
          </div>
          <div
            className={styles?.["modal-option"]}
            onClick={() => router.push("/public-pastes")}
          >
            <span className="option-text">Public Pastes</span>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default UserOptionsModal;
