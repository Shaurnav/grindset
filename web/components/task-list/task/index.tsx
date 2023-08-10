import styles from "./styles.module.scss";

export type TaskProps = {
  description: string,
  status: string,
};

export default function Task({description, status}: TaskProps ) {

  return (
    <div className={styles.issueContainer}>
      <p>{description}</p>
    </div>     
  );
};

