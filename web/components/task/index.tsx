import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";


const description = "issue description";

export type TaskProps = {
  description: string
};

export default function Task({description}: TaskProps ) {

  return (
    <div className={styles.issueContainer}>
      <p>{description}</p>
    </div>     
  );
};

