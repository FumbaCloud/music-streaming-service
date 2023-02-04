import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./styles.module.scss";

interface NavigationItemProps {
  label: string;
  href: string;
}

const NavigationItem: FC<NavigationItemProps> = ({ label, href }) => {
  const router = useRouter();

  return (
    <Link
      href={href}
      className={styles.navItem}
      data-active={router.pathname === href}
    >
      {label}
    </Link>
  );
};

export default NavigationItem;
