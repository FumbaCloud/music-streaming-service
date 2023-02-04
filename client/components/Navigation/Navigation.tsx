import NavigationItem from "./NavigationItem";

import styles from "./styles.module.scss";

const Navigation = () => (
  <nav className={styles.nav}>
    <NavigationItem label={"Search"} href={"/"} />
    <NavigationItem label={"Tracks"} href={"/tracks"} />
    <NavigationItem label={"Upload"} href={"/upload"} />
  </nav>
);

export default Navigation;
