import { FC, ReactNode } from "react";

import Navigation from "../components/Navigation";

import styles from "./styles.module.scss";
import Player from "../components/Player";

type Props = {
  children?: ReactNode;
  title?: string;
};

const MainLayout: FC<Props> = ({ children, title }) => (
  <div className={styles.wrapper}>
    <aside className={styles.aside}>
      <Navigation />
    </aside>
    <main className={styles.main}>
      {title && <h4 className={styles.title}>{title}</h4>}
      {children}
    </main>
    <footer>
      <Player />
    </footer>
  </div>
);

export default MainLayout;
