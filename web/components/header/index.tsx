import Image from "next/image";
import Link from "next/link";
import { Inter } from 'next/font/google'
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