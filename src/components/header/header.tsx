import React, { ReactNode } from "react";
import styles from "./header.module.css";
import { useRouter } from "next/router";

function Header({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <header className={styles?.["header"]}>
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
      </div>
    </header>
  );
}

export default Header;
