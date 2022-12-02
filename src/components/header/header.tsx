import React, { ReactNode, useState } from "react";
import styles from "./header.module.css";
import { AvatarIcon } from "../../assets/icons";
import UserOptionsModal from "../user-options-modal/user-options-modal";
import { useRouter } from "next/router";

function Header({ children }: { children: ReactNode }) {
  const [isUserOptionModalOpen, setIsUserOptionModalOpen] = useState(false);
  const router = useRouter();

  const toggleUserOptionsModal = () => {
    setIsUserOptionModalOpen((state) => !state);
  };

  return (
    <header className={styles?.["header"]}>
      {isUserOptionModalOpen && (
        <UserOptionsModal handleClose={toggleUserOptionsModal} />
      )}
      <div className={styles?.content}>
        <div
          className="flex"
          style={{ flexWrap: "wrap", display: "flex", alignItems: "center" }}
        >
          <span className={styles?.title} onClick={() => router.push("/")}>
            Dewbin
          </span>
          {children}
        </div>
        <div className={styles?.["avatar"]}>
          <AvatarIcon
            onClick={toggleUserOptionsModal}
            cursor="pointer"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
