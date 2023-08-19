import Link from "next/link";
import styles from "./styles.module.scss";


export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link href="/" className={`${styles.logo}`}>
          <h3>grindset</h3>
        </Link>
      </nav>
    </header>
);
}