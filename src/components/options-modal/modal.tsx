import React, { useContext } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import styles from "./modal.module.css";
import PasteContext, { IPasteContextState } from "../../contexts/paste";
import { closeIcon } from "../../assets/icons";
const customStyles = {
  overlay: {
    backgroundColor: "transparent",
  },

  modal: {
    // backgroundColor:'#212121'
    backgroundColor: "#181e2e",
    height: "400px",
    width: "360px",
  },
};



function OptionsModal({ handleClose }: { handleClose: () => void }) {
  const contextValue = useContext(PasteContext);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (contextValue?.setPasteState)
      contextValue?.setPasteState((state: IPasteContextState) => {
        const newPasteState = { ...state, [name]: value };
        return newPasteState;
      });
  };

  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        styles={customStyles}
        closeIcon={closeIcon}
      >
        <form className={styles.form}>
          <div className={styles?.["form-control"]}>
            <label>Paste Name/Title</label>
            <input
              value={contextValue?.pasteState?.title}
              name="title"
              onChange={onChange}
              placeholder="Enter the paste name"
            ></input>
          </div>
          <div className={styles?.["form-control"]}>
            <span>Choose who can see your paste</span>
            <label>Paste Exposure</label>
            <select
              value={contextValue?.pasteState?.exposure}
              name="exposure"
              onChange={onChange}
              className={styles?.["select-css"]}
            >
              <option>PUBLIC</option>
              {/* <option>PRIVATE</option> */}
              <option>UNLISTED</option>
            </select>
          </div>

          <div className={styles?.["form-control"]}>
            <label>Paste Expiration</label>
            <select
              onChange={(e) => {
                contextValue?.setPasteState((state: IPasteContextState) => {
                  const newPasteState = { ...state };
                  newPasteState["expiration"] = +e.target.value;
                  return newPasteState;
                });
              }}
              value={contextValue?.pasteState?.expiration}
              name="expiration"
              className={styles?.["select-css"]}
            >
             
              <option value={0}>Never</option>
              <option value={1}>1 hour</option>
              <option value={2}>2 hours</option>
              <option value={24}>1 day</option>
              <option value={48}>2 days</option>
            </select>
          </div>

          <div className={styles?.["modal-actions"]}>
            <button
              type="button"
              className={styles?.["cancel-btn"]}
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default OptionsModal;
